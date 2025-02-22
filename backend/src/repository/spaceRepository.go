package repository

import (
	"database/sql"
	"fmt"
	"strings"

	"github.com/Dan0Silva/my_rooms/src/models"
)

type spaces struct {
	database *sql.DB
}

func NewSpacesRepository(db *sql.DB) *spaces {
	return &spaces{db}
}

func (repository spaces) Create(newSpace models.Space) error {
	statement, err := repository.database.Prepare(`
	INSERT INTO SPACES (NAME, PHOTO_URL, DESCRIPTION, CAPACITY, LOCATE, IS_AVAILABLE) 
	VALUES (?, ?, ?, ?, ?, ?)`)
	if err != nil {
		return err
	}
	defer statement.Close()

	_, err = statement.Exec(newSpace.Name, newSpace.Photo_url, newSpace.Description, newSpace.Capacity, newSpace.Locate, newSpace.IsAvailable)
	if err != nil {
		return err
	}

	return nil
}

func (repository spaces) ListAll() ([]models.Space, error) {
	list := []models.Space{}

	rows, err := repository.database.Query("SELECT * FROM SPACES")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var newSpace models.Space

		if err := rows.Scan(
			&newSpace.ID,
			&newSpace.Name,
			&newSpace.Photo_url,
			&newSpace.Description,
			&newSpace.Capacity,
			&newSpace.Reservations_count,
			&newSpace.Locate,
			&newSpace.IsAvailable,
			&newSpace.CreatedAt); err != nil {
			return nil, err
		}

		list = append(list, newSpace)
	}

	return list, nil
}

func (repository spaces) GetByID(spaceId string) (*models.Space, error) {
	var space models.Space

	rows, err := repository.database.Query(`
	SELECT * FROM SPACES WHERE ID = ?
	`, spaceId)

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		if err := rows.Scan(
			&space.ID,
			&space.Name,
			&space.Photo_url,
			&space.Description,
			&space.Capacity,
			&space.Reservations_count,
			&space.Locate,
			&space.IsAvailable,
			&space.CreatedAt); err != nil {
			return nil, err
		}
	}

	return &space, nil

}

func (repository spaces) Edit(spaceId string, editedSpace models.Space) error {
	var setClauses []string
	var args []interface{}

	if editedSpace.Name != "" {
		setClauses = append(setClauses, "NAME = ?")
		args = append(args, editedSpace.Name)
	}
	if editedSpace.Photo_url != "" {
		setClauses = append(setClauses, "PHOTO_URL = ?")
		args = append(args, editedSpace.Photo_url)
	}
	if editedSpace.Description != "" {
		setClauses = append(setClauses, "DESCRIPTION = ?")
		args = append(args, editedSpace.Description)
	}
	if editedSpace.Capacity != 0 {
		setClauses = append(setClauses, "CAPACITY = ?")
		args = append(args, editedSpace.Capacity)
	}
	if editedSpace.Locate != "" {
		setClauses = append(setClauses, "LOCATE = ?")
		args = append(args, editedSpace.Locate)
	}

	if len(setClauses) == 0 {
		return fmt.Errorf("no fields to update")
	}

	query := fmt.Sprintf("UPDATE SPACES SET %s WHERE ID = ?", strings.Join(setClauses, ", "))
	args = append(args, spaceId)

	statement, err := repository.database.Prepare(query)
	if err != nil {
		return err
	}
	defer statement.Close()

	_, err = statement.Exec(args...)
	if err != nil {
		return err
	}

	return nil
}

func (repository spaces) Delete(spaceId string) error {
	statement, err := repository.database.Prepare("DELETE FROM SPACES WHERE ID = ?")
	if err != nil {
		return fmt.Errorf("error preparing delete statement: %v", err)
	}
	defer statement.Close()

	result, err := statement.Exec(spaceId)
	if err != nil {
		return fmt.Errorf("error executing delete statement: %v", err)
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("error getting rows affected: %v", err)
	}
	if rowsAffected == 0 {
		return fmt.Errorf("no space found with ID: %s", spaceId)
	}

	return nil
}
