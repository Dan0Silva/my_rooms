package routes

import (
	"net/http"

	reserveController "github.com/Dan0Silva/my_rooms/src/controller"
)

var ReserveRoutes = []Routes{
	{
		Uri: "/reserves",
		Method: http.MethodPost,
		Function: reserveController.CreateReserve,
		RequireAuth: false,
	},
	{
		Uri: "/reserves",
		Method: http.MethodGet,
		Function: reserveController.ListReserves,
		RequireAuth: true,
	},
	{
		Uri: "/reserves/{id}",
		Method: http.MethodDelete,
		Function: reserveController.DeleteReserve,
		RequireAuth: true,
	},
}