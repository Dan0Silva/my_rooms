package repository

import (
	"database/sql"

	"github.com/Dan0Silva/my_rooms/src/models"
)


type spaces struct {
	database *sql.DB
}

func NewSpacesRepository(db *sql.DB) *spaces {
	return &spaces{db}
}

func (repository spaces) Create(newSpace models.Space) error {
	statement, err := repository.database.Prepare("") // add query
	if err != nil {
		return err
	}
	defer statement.Close()

	_, err = statement.Exec() // parse the statement fields (newSpace.name, etc)
	if err != nil {
		return err
	}

	return nil
}