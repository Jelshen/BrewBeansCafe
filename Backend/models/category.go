package models

import "time"

type Category struct {
    CategoryID   int       `json:"category_id"`
    CategoryName string    `json:"name"`
    CreatedAt    time.Time `json:"created_at"`
}
