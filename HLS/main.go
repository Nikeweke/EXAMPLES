package main

import (
	"fmt"
	"net/http"
	"strconv"
	"os/exec"

	"github.com/gorilla/mux"
)

var LOGIN = "Traffic_Control"
var PASSWORD = "Q1w2e3r4"
var CAM_IP = "92.60.180.73"

var RTSP = "rtsp://%s:%s@%s:55433/Streaming/Channels/2"
var HTTP_PREVIEW = "http://%s:%s@%s:133/ISAPI/Streaming/channels/102/httpPreview"

func main() {
	go GetVideoData()
	
	http.Handle("/", handlers())
	fmt.Println("HTTP-server working...")
	http.ListenAndServe(":8000", nil)
}


func GetVideoData() {
	fmt.Println("Video receiver enabled...")
	var URL = fmt.Sprintf(HTTP_PREVIEW, LOGIN, PASSWORD, CAM_IP)
	binary := "./ffmpeg.exe"

	// 
	args := []string{
		"-i", URL, 
		"-g", "22", 
		// "-s", "640x360",
		"-sc_threshold", "0",
		"-hls_time", "2",
		"-f", "hls", 
		"./assets/media/1/hls/index.m3u8",
	}

	// makes photo every frame
	// args := []string{
	// 	"-i", URL, 
	// 	"-f", "image2", 
	// 	"-vf", "fps=1",
	// 	"-g", "22", 
	// 	"-update", "1",
	// 	"./img.jpg",
	// }

	cmd := exec.Command(binary, args...)
  cmd.Run()
}

func handlers() *mux.Router {
	router := mux.NewRouter()
	router.HandleFunc("/", indexPage).Methods("GET")
	router.HandleFunc("/media/{mId:[0-9]+}/stream/", streamHandler).Methods("GET")
	router.HandleFunc("/media/{mId:[0-9]+}/stream/{segName:index[0-9]+.ts}", streamHandler).Methods("GET")
	return router
}

func indexPage(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "index.html")
}

func streamHandler(response http.ResponseWriter, request *http.Request) {
	vars := mux.Vars(request)
	mId, err := strconv.Atoi(vars["mId"])
	if err != nil {
		response.WriteHeader(http.StatusNotFound)
		return
	}

	segName, ok := vars["segName"]
	if !ok {
		mediaBase := getMediaBase(mId)
		m3u8Name := "index.m3u8"
		serveHlsM3u8(response, request, mediaBase, m3u8Name)
	} else {
		mediaBase := getMediaBase(mId)
		serveHlsTs(response, request, mediaBase, segName)
	}
}

func getMediaBase(mId int) string {
	mediaRoot := "assets/media"
	return fmt.Sprintf("%s/%d", mediaRoot, mId)
}

func serveHlsM3u8(w http.ResponseWriter, r *http.Request, mediaBase, m3u8Name string) {
	mediaFile := fmt.Sprintf("%s/hls/%s", mediaBase, m3u8Name)
	// fmt.Println(mediaFile)
	http.ServeFile(w, r, mediaFile)
	w.Header().Set("Content-Type", "application/x-mpegURL")
}

func serveHlsTs(w http.ResponseWriter, r *http.Request, mediaBase, segName string) {
	mediaFile := fmt.Sprintf("%s/hls/%s", mediaBase, segName)
	// fmt.Println(mediaFile)
	http.ServeFile(w, r, mediaFile)
	w.Header().Set("Content-Type", "video/MP2T")
}