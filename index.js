const net = require('net')
const { Writable } = require('stream')
const { EventEmitter } = require('events')

class SpeechRecogStream extends Writable {
    constructor(opts) {
        super()

        this.eventEmitter = new EventEmitter()

        this.acc = ""

        this.client = new net.Socket()
        this.audio_port_client = this.client

        this.send_length_prefix = false
        this.len_buffer = Buffer.alloc(4)

        this.client.on('end', () => {
            this.eventEmitter.emit('end')
        })

        this.client.on('error', err => {
            this.eventEmitter.emit('error', err)
        })

        this.client.on('data', data => {
            var data = data.toString('utf8')

            this.acc += data

            var pos = this.acc.indexOf("\n")
            while(pos >= 0) {
                var msg = this.acc.substring(0, pos)
                this.acc = this.acc.substring(pos+1)

                if(msg.startsWith('+AUDIO_PORT:')) {
                    var audio_port = parseInt(msg.split(":")[1])
                    console.log(`audio_port=${audio_port}`)

                    this.audio_port_client = new net.Socket()

                    this.audio_port_client.on('end', function() {
                        this.terminate()
                    })

                    this.audio_port_client.on('error', err => {
                        this.terminate(err)
                    })

                    this.audio_port_client.on('close', function() {
                        this.terminate()
                    })

                    this.audio_port_client.connect(audio_port, opts.server_ip) 

                    this.send_length_prefix = true
                } else if(msg == '+READY') {
                    this.eventEmitter.emit('ready')
                } else {
                    if(msg.startsWith('+SPEECH_')) {
                        this.eventEmitter.emit('data', {
                            event: msg.substring(1).toLowerCase()
                        })
                    } else if(msg.startsWith('+RESULT:')) {
                        this.eventEmitter.emit('data', {
                            event: "result",
                            text: msg.substring(8),
                        })
                    }
                }
                pos = this.acc.indexOf("\n")
            }
        })

        this.client.connect(opts.server_port, opts.server_ip)
    }

    terminate(err) {
        if(this.audio_port_client && this.audio_port_client != this.client) {
            this.audio_port_client.removeAllListeners()
            this.audio_port_client.end()
            this.audio_port_client = null
        }

        if(this.client) {
            this.client.removeAllListeners()
            this.client.end()
            this.client = null
        }

        if(err) {
            this.eventEmitter.emit('error', err)
        } else {
            this.eventEmitter.emit('end')
        }

        this.eventEmitter.removeAllListeners()
    }

    on(evt, cb) {
        this.eventEmitter.on(evt, cb)
    }

    _write(chunk, encoding, callback) {
        //console.log('_write', chunk)

        if(this.send_length_prefix) {
            this.len_buffer[0] = chunk.length & 0xff
            this.len_buffer[1] = (chunk.length >> 8) & 0xff
            this.len_buffer[2] = (chunk.length >> 16) & 0xff
            this.len_buffer[3] = (chunk.length >> 24) & 0xff
            this.audio_port_client.write(this.len_buffer)
        }

        for(var i=0 ;i<chunk.length/2 ; i++) {
            var temp = chunk[i*2]
            chunk[i*2] = chunk[i*2+1]
            chunk[i*2+1] = temp
        }

        this.audio_port_client.write(chunk)

        callback()
    }
}

module.exports = SpeechRecogStream
