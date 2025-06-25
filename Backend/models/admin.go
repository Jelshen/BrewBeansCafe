package models

import "time"

type Admin struct {
	AdminId    int       `json:"admin_id"`
	Username   string    `json:"username"`
	Password   string    `json:"password"`
	CreatedAt  time.Time `json:"created_at"`
}