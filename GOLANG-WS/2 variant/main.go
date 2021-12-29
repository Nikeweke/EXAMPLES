package main

import (
	"log"
	"net/http"
  "fmt"
  //"reflect"

	"github.com/gorilla/websocket" // WS
)


/*
|--------------------------------------------------------------------------
|  Переменные
|
|--------------------------------------------------------------------------
*/
// Define our message object
type Message struct {
	Email    string `json:"email"`
	Username string `json:"username"`
	Message  string `json:"message"`
}


var (
     clients   = make(map[*websocket.Conn]bool) // connected clients
     broadcast = make(chan Message)             // broadcast channel
)

// Configure the upgrader
var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}


          /* ----------------------------------------------
          |  СТАРТОВАЯ ЛИНИЯ
          |
          |------------------------------------------------
          */
          func main() {

          	// Create a simple file server
          	fs := http.FileServer(http.Dir("./public"))
          	http.Handle("/", fs)

          	// Configure websocket route
          	http.HandleFunc("/ws", handleConnections)

          	// Start listening for incoming chat messages
          	go handleMessages()

            RunIt("8000")
          }



          /* ----------------------------------------------
          |  ДЕЛАЕТ АДРЕС ДЛЯ подключения ( GET - "/ws" )
          |
          |------------------------------------------------
          */
          func handleConnections(w http.ResponseWriter, r *http.Request) {
           	// Upgrade initial GET request to a websocket
          	ws, err := upgrader.Upgrade(w, r, nil)
          	if err != nil {
            		log.Fatal(err)
          	}

          	// Make sure we close the connection when the function returns
          	defer ws.Close()

          	// Register our new client
            clients[ws] = true

            fmt.Println("CONNECTED ->" , clients, "\n")

          	for {
            		var msg Message

            		// Read in a new message as JSON and map it to a Message object
            		err := ws.ReadJSON(&msg)
            		if err != nil {
            			log.Printf("error: %v", err)
            			delete(clients, ws)
            			break
            		}

            		// Send the newly received message to the broadcast channel
            		broadcast <- msg
             }
          }


          /* ----------------------------------------------
          |  Обработка входящих сообщений (пишет всем написанное сообщение, которое достаеться из канала)
          |
          |------------------------------------------------
          */
          func handleMessages() {
	          	for {
	          		// Grab the next message from the broadcast channel
	          		msg := <-broadcast

	          		// Send it out to every client that is currently connected
	          		for client := range clients {
		          			err := client.WriteJSON(msg)

		          			if err != nil {
		          				log.Printf("error: %v", err)
		          				client.Close()
		          				delete(clients, client)
		          			}
	          		}
	          	}
          }



					/* ----------------------------------------------
					|  Запустить сервер
					|
					|------------------------------------------------
					*/
					func RunIt(port string){
							// Start the server on localhost port 8000 and log any errors
							log.Println("http server started on " + port)

							err := http.ListenAndServe(":" + port, nil)
							if err != nil {
								log.Fatal("ListenAndServe: ", err)
							}
					}
