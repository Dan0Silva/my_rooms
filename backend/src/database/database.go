package database

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
)
func Connect() (*sql.DB, error) {
	db, err := sql.Open("mysql", "connection-string")
	if err != nil {
		return nil, err
	}

	if err := db.Ping(); err != nil {
		return nil, err
	}

	return db, nil
}