package repository

import (
	"database/sql"
	"fmt"

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
	INSERT INTO RESERVATIONS (USER_NAME, USER_EMAIL, SPACE_ID, RESERVE_DATE)
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

func (repository reserves) ListAll() ([]models.Reserve, error) {
	var list []models.Reserve

	rows, err := repository.database.Query("SELECT ID, USER_NAME, USER_EMAIL, SPACE_ID, RESERVE_DATE FROM RESERVATIONS")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var reserve models.Reserve

		if err = rows.Scan(&reserve.ID, &reserve.UserName, &reserve.UserEmail, &reserve.SpaceId, &reserve.ReserveDate); err != nil {
			return nil, err
		}

		list = append(list, reserve)
	}

	return list, nil
}

func (repository reserves) Delete(repositoryID string) error {
	statement, err := repository.database.Prepare("DELETE FROM RESERVATIONS WHERE ID = ?")
	if err != nil {
		return fmt.Errorf("error preparing delete statement: %v", err)
	}
	defer statement.Close()

	result, err := statement.Exec(repositoryID)
	if err != nil {
		return fmt.Errorf("error executing delete statement: %v", err)
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("error getting rows affected: %v", err)
	}
	if rowsAffected == 0 {
		return fmt.Errorf("no reserve found with ID: %s", repositoryID)
	}

	return nil
}
