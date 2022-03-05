# HLS - HTTP Live Streaming

* [HLS Basics](https://www.martin-riedl.de/2018/08/24/using-ffmpeg-as-a-hls-streaming-server-part-1/)
* [FFmpeg CheatSheet](https://gist.github.com/steven2358/ba153c642fe2bb1e47485962df07c730)
* [HLS time offset](https://hlsbook.net/how-to-start-playing-a-video-at-a-specific-point-in-time/)

### Quick start

1. Download [ffmpeg](https://ffmpeg.org/) binary inside project
2. Run `run.bat`

### How does it work
1. In go we start ffmpeg with flags and receiving from input resource video and decode it in HLS format( .m3u8, .ts). `m3u8` - is a playlist, `.ts` - video segments
2. Go-service serving html where thru HLS possibility plays video