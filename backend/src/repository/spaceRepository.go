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

func (repository spaces) Edit(spaceId string, editedSpace models.Space) error {
	var setClauses []string
	var args []interface{}

	// Adiciona cláusulas ao UPDATE para os campos que não estão vazios
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
	if editedSpace.Capacity != 0 { // Verifica se o campo Capacity é diferente de zero (valor padrão)
		setClauses = append(setClauses, "CAPACITY = ?")
		args = append(args, editedSpace.Capacity)
	}
	if editedSpace.Locate != "" {
		setClauses = append(setClauses, "LOCATE = ?")
		args = append(args, editedSpace.Locate)
	}

	// Se não houver campos para atualizar, retorna um erro
	if len(setClauses) == 0 {
		return fmt.Errorf("no fields to update")
	}

	// Prepara a query com as cláusulas SET dinâmicas
	query := fmt.Sprintf("UPDATE SPACES SET %s WHERE ID = ?", strings.Join(setClauses, ", "))
	args = append(args, spaceId)

	// Prepara a declaração
	statement, err := repository.database.Prepare(query)
	if err != nil {
		return err
	}
	defer statement.Close()

	// Executa a query
	_, err = statement.Exec(args...)
	if err != nil {
		return err
	}

	return nil
}