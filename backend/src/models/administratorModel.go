package models

type Admin struct {
	Nick     string `json:nick`
	Password string `json:password`
}
