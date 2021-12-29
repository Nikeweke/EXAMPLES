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


// Define our user object
type User struct {
	Id       string  `json:"id"`
	// Username string  `json:"username"`
}


var (
     clients = make(map[User]*websocket.Conn)  // connected clients
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

               var user User
               user.Id = r.URL.Query()["user"][0]  // USER id
              //  user.Id = "12"

            	// Записываем нового юзера в массив подключенных 
               clients[user] = ws

              fmt.Println("CONNECTED ->" , clients, "\n")

            	for {
            		var msg Message
            		// Read in a new message as JSON and map it to a Message object
            		err := ws.ReadJSON(&msg)
			
            		if err != nil {
            			log.Printf("error: %v", err)
            			delete(clients, user)
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
          		for client, ws := range clients {
          			err := ws.WriteJSON(msg)

          			if err != nil {
          				log.Printf("error: %v", err)
          				ws.Close()
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
