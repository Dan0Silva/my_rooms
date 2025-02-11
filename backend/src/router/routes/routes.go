package routes

import (
	"net/http"

	pingController "github.com/Dan0Silva/my_rooms/src/controller"
	"github.com/gorilla/mux"
)

type Routes struct {
	Uri 					string
	Method 				string
	Function 			func(http.ResponseWriter, *http.Request)
	RequireAuth 	bool
}

var pingRoute = Routes{
	Uri: "/ping",
	Method: http.MethodGet,
	Function: pingController.Ping,
	RequireAuth: false,
}

func GenerateRoutes(router *mux.Router) {
	allroutes := []Routes{}

	allroutes = append(allroutes, pingRoute)
	allroutes = append(allroutes, SpaceRoutes...)

	for _, route := range allroutes {
		router.HandleFunc(route.Uri, route.Function).Methods(route.Method)
	}
}
