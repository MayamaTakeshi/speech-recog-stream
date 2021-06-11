# speech-recog-stream
A node module to stream audio to speech recognition servers

## Overview

This was created to permit to connect to our [julius_server](https://github.com/MayamaTakeshi/julius_server)

The protocol is specific for it and so you cannot use this to talk with Google Speech, Amazon Polly etc.

## Installation
```
npm install speech-recog-stream
```
## Sample Usage

See https://github.com/MayamaTakeshi/julius_server/blob/main/tests/manual/test.js

Here is the output of a test session:
```

$ node test.js -b 320 -l ../artifacts/ohayou_gozaimasu.4times.raw 
audio_port=43039
2021-06-11 10:44:38.973 : ready
2021-06-11 10:44:38.977 : starting audio transmission from ../artifacts/ohayou_gozaimasu.4times.raw
2021-06-11 10:44:38.978 : {"event":"speech_ready"}
2021-06-11 10:44:39.875 : {"event":"speech_start"}
2021-06-11 10:44:42.796 : {"event":"speech_stop"}
2021-06-11 10:44:42.863 : {"event":"result","text":"  おはよう ござい ます 。"}
2021-06-11 10:44:42.866 : {"event":"speech_ready"}
2021-06-11 10:44:48.075 : {"event":"speech_start"}
2021-06-11 10:44:50.980 : {"event":"speech_stop"}
2021-06-11 10:44:51.042 : {"event":"result","text":"  おはよう ござい ます 。"}
2021-06-11 10:44:51.045 : {"event":"speech_ready"}
2021-06-11 10:44:56.152 : {"event":"speech_start"}
2021-06-11 10:44:59.188 : {"event":"speech_stop"}
2021-06-11 10:44:59.242 : {"event":"result","text":"  おはよう ござい ます 。"}
2021-06-11 10:44:59.245 : {"event":"speech_ready"}
2021-06-11 10:45:04.387 : {"event":"speech_start"}
2021-06-11 10:45:07.408 : {"event":"speech_stop"}
2021-06-11 10:45:07.478 : {"event":"result","text":"  おはよう ござい ます 。"}
2021-06-11 10:45:07.480 : {"event":"speech_ready"}
2021-06-11 10:45:11.724 : No more data from file.
2021-06-11 10:45:11.726 : starting audio transmission from ../artifacts/ohayou_gozaimasu.4times.raw
2021-06-11 10:45:12.603 : {"event":"speech_start"}
2021-06-11 10:45:15.620 : {"event":"speech_stop"}
2021-06-11 10:45:15.688 : {"event":"result","text":"  おはよう ござい ます 。"}
2021-06-11 10:45:15.691 : {"event":"speech_ready"}
2021-06-11 10:45:20.796 : {"event":"speech_start"}
2021-06-11 10:45:23.823 : {"event":"speech_stop"}
2021-06-11 10:45:23.891 : {"event":"result","text":"  おはよう ござい ます 。"}
2021-06-11 10:45:23.894 : {"event":"speech_ready"}
2021-06-11 10:45:28.984 : {"event":"speech_start"}
2021-06-11 10:45:32.004 : {"event":"speech_stop"}
2021-06-11 10:45:32.055 : {"event":"result","text":"  おはよう ござい ます 。"}
2021-06-11 10:45:32.058 : {"event":"speech_ready"}
2021-06-11 10:45:37.067 : {"event":"speech_start"}
2021-06-11 10:45:40.227 : {"event":"speech_stop"}
2021-06-11 10:45:40.282 : {"event":"result","text":"  おはよう ござい ます 。"}
2021-06-11 10:45:40.284 : {"event":"speech_ready"}
2021-06-11 10:45:44.438 : No more data from file.
2021-06-11 10:45:44.439 : starting audio transmission from ../artifacts/ohayou_gozaimasu.4times.raw
2021-06-11 10:45:45.292 : {"event":"speech_start"}
```
