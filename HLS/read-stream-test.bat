REM cd ..
REM .\ffmpeg.exe -i http://Traffic_Control:Q1w2e3r4@92.60.180.73:133/ISAPI/Streaming/channels/102/httpPreview output.mp4


cd ..
.\ffmpeg.exe -i http://Traffic_Control:Q1w2e3r4@92.60.180.73:133/ISAPI/Streaming/channels/102/httpPreview -profile:v baseline -level 3.0 -s 640x360 -start_number 0 -hls_time 10 -hls_list_size 0 -f hls index.m3u8