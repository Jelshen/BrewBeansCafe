package models

import "time"

type Menu struct {
    MenuID      int       `json:"menu_id"`
    MenuName    string    `json:"menu_name"`
    MenuPrice   float64   `json:"menu_price"`
    MenuDescription string `json:"menu_description"`
    PictureURL  string    `json:"picture_url"`
    CategoryID  int       `json:"category_id"`
    IsAvailable bool      `json:"is_available"`
    CreatedAt   time.Time `json:"created_at"`
}
