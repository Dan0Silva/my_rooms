package database

import (
	"database/sql"

	"github.com/Dan0Silva/my_rooms/src/config"
	_ "github.com/go-sql-driver/mysql"
)

func Connect() (*sql.DB, error) {
	db, err := sql.Open("mysql", config.StringConnectionDB)
	if err != nil {
		return nil, err
	}

	if err := db.Ping(); err != nil {
		return nil, err
	}

	return db, nil
}