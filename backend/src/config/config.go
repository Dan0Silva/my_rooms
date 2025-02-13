package config

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
)

var (
	StringConnectionDB = ""
	Port = ""

	AdminNick = ""
	AdminPassword = ""

	SecretKey = ""
)

func LoadEnvironment() {
	var err error

	if err = godotenv.Load(); err != nil {
		log.Fatal(err)
	}

	Port = os.Getenv("API_PORT")

	StringConnectionDB = fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8&parseTime=True&loc=Local",
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_ADDRESS"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_NAME"),
	)

	AdminNick = os.Getenv("ADMIN_NICK")
	AdminPassword = os.Getenv("ADMIN_PASSWORD")

	SecretKey = os.Getenv("SECRET_KEY")

	fmt.Printf("  Environment loaded successfully\n")
}
