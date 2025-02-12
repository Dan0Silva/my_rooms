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
	statement, err := repository.database.Prepare(`
	INSERT INTO SPACES (NAME, PHOTO_URL, DESCRIPTION, CAPACITY, LOCATE, ISAVAILABLE) 
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

	rows, err := repository.database.Query("SELECT ID, NAME, PHOTO_URL, DESCRIPTION, CAPACITY, LOCATE, ISAVAILABLE FROM SPACES")
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
			&newSpace.Locate,
			&newSpace.IsAvailable); 
		err != nil {
			return nil, err
		} 

		list = append(list, newSpace)
	}

	return list, nil
}

func (repository spaces) GetByID(spaceId string) (*models.Space, error) {
	var space models.Space
	
	rows, err := repository.database.Query(`
	SELECT ID, NAME, PHOTO_URL, DESCRIPTION, CAPACITY, LOCATE, ISAVAILABLE FROM SPACES WHERE ID = ?
	`, spaceId)

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		if err := rows.Scan(&space.ID, &space.Name, &space.Photo_url, &space.Description,
			&space.Capacity, &space.Locate, &space.IsAvailable); 
		err != nil {
			return nil, err
		}
	}

	return &space, nil

}