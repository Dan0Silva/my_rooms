package controller

import (
	"net/http"
	"time"

	"github.com/Dan0Silva/my_rooms/src/authentication"
	"github.com/Dan0Silva/my_rooms/src/response"
)

func CheckAuth(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie("jwt")
	if err != nil {
		response.Error(w, "Unauthorized", http.StatusUnauthorized, err.Error())
		return
	}

	tokenString := cookie.Value
	if err := authentication.ValidateToken(tokenString); err != nil {
		response.Error(w, "Invalid token", http.StatusUnauthorized, err.Error())
		return
	}

	response.Success(w, http.StatusOK, map[string]string{
		"message": "Authenticated",
	})
}

func Logout(w http.ResponseWriter, r *http.Request) {
	http.SetCookie(w, &http.Cookie{
		Name:     "jwt",
		Value:    "",
		HttpOnly: true,
		Secure:   true,
		SameSite: http.SameSiteStrictMode,
		Path:     "/",
		Expires:  time.Now().Add(-1 * time.Hour), // Expira no passado
	})

	response.Success(w, http.StatusOK, map[string]string{
		"message": "Logged out successfully",
	})
}
