package repository

import (
	"database/sql"

	"github.com/Dan0Silva/my_rooms/src/models"
)

type reserves struct {
	database *sql.DB
}

func NewReservesRepository(db *sql.DB) *reserves {
	return &reserves{db}
}

func (repository reserves) Create(newReserve models.Reserve) error {
	statement, err := repository.database.Prepare(`
	INSERT INTO RESERVES (USER_NAME, USER_EMAIL, SPACEID, RESERVE_DATE)
	VALUES (?, ?, ?, ?)`)

	if err != nil {
		return err
	}

	defer statement.Close()

	_, err = statement.Exec(newReserve.UserName, newReserve.UserEmail, newReserve.SpaceId, newReserve.ReserveDate)
	if err != nil {
		return err
	}

	return nil
}