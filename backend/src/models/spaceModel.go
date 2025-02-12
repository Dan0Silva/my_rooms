package models

import "time"

type Space struct {
	ID 					string 		`json:"id"`
	Name 				string		`json:"name,omitempty"`
	Photo_url 	string		`json:"photo_url,omitempty"`
	Description string		`json:"description,omitempty"`
	Capacity 		int8			`json:"capacity"`
	Locate 			string		`json:"locate"`
	IsAvailable bool			`json:"isAvailable"`
	CreatedAt 	time.Time	`json:"createdAt,omitempty"`
}