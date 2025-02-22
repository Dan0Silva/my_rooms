package routes

import (
	"net/http"

	reserveController "github.com/Dan0Silva/my_rooms/src/controller"
)

var ReserveRoutes = []Routes{
	{
		Uri:         "/reservations",
		Method:      http.MethodPost,
		Function:    reserveController.CreateReserve,
		RequireAuth: false,
	},
	{
		Uri:         "/reservations",
		Method:      http.MethodGet,
		Function:    reserveController.ListReservations,
		RequireAuth: true,
	},
	{
		Uri:         "/reservations/{id}",
		Method:      http.MethodDelete,
		Function:    reserveController.DeleteReserve,
		RequireAuth: true,
	},
}
