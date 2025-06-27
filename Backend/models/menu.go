package models

import "time"

type Menu struct {
    MenuId      int        `json:"menu_id"`
    MenuName    string     `json:"menu_name"`
    MenuPrice   float64    `json:"menu_price"`
    MenuDescription string `json:"menu_description"`
    MenuImage   []byte     `json:"-"`
    CategoryId  int        `json:"category_id"`
    CreatedAt   time.Time  `json:"created_at"`
}
