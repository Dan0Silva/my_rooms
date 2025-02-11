package repository

import "database/sql"


type spaces struct {
	database *sql.DB
}

func NewSpacesRepository(db *sql.DB) *spaces {
	return &spaces{db}
}