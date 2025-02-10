package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/Dan0Silva/my_rooms/src/router"
)


func main() {

	port := 8080
	router := router.Generate()

	fmt.Println("> Running on port ", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", port), router))
}