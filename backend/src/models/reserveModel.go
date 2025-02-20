package models

import "time"

type Reserve struct {
	ID          string    `json:"id"`
	UserName    string    `json:"user_name"`
	UserEmail   string    `json:"user_email"`
	SpaceId     string    `json:"space_id"`
	ReserveDate time.Time `json:"reserve_date"`
	CreatedAt   time.Time `json:"created_at,omitempty"`
}
