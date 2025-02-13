package authentication

import (
	"errors"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/Dan0Silva/my_rooms/src/config"
	"github.com/golang-jwt/jwt"
)

var mySigninKey = []byte(config.SecretKey)

func CreateToken(nick string) (string, error) {
	claims := jwt.MapClaims{
		"authorized": true,
		"nick": nick,
		"exp": time.Now().Add(time.Hour * 6).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(mySigninKey)
}

func ValidateToken(r *http.Request) error {
	tokenString := extractToken(r)
	token, err := jwt.Parse(tokenString, getVerificationKey)

	if err != nil {
		return err
	}

	if _, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		return nil
	}

	return errors.New("invalid token")
}

func extractToken(r *http.Request) string {
	token := r.Header.Get("Authorization")

	if splitedToken := strings.Split(token, " "); len(splitedToken) == 2 {
		return splitedToken[1]
	}

	return ""
}

func getVerificationKey(token *jwt.Token) (interface{}, error) {
	if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
		return nil, fmt.Errorf("unexpected signature method: %v", token.Header["alg"])
	}

	return mySigninKey, nil
}
