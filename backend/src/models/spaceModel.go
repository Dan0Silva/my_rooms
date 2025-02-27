package models

import "time"

type Space struct {
	ID          string    `json:"id"`
	Name        string    `json:"name,omitempty"`
	Photo_url   string    `json:"photo_url,omitempty"`
	Description string    `json:"description,omitempty"`
	Locate      string    `json:"locate"`
	IsAvailable bool      `json:"is_available"`
	CreatedAt   time.Time `json:"created_at,omitempty"`
}

// Capacity           int8      `json:"capacity"`
// Reservations_count int       `json:"reservations_count"`
