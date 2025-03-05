package middlewares

import (
	"net/http"

	"github.com/Dan0Silva/my_rooms/src/authentication"
	"github.com/Dan0Silva/my_rooms/src/response"
)

func Authenticate(next http.HandlerFunc) http.HandlerFunc {

	return func(w http.ResponseWriter, r *http.Request) {
		cookie, err := r.Cookie("jwt")
		if err != nil {
			response.Error(w, "Token not found", http.StatusInternalServerError, err.Error())
			return
		}

		tokenString := cookie.Value
		if err := authentication.ValidateToken(tokenString); err != nil {
			response.Error(w, "Not logged in", http.StatusUnauthorized, err.Error())
			return
		}

		next(w, r)
	}
}
