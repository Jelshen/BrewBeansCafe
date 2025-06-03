package handlers

import (
	"database/sql"
	"github.com/gofiber/fiber/v2"

	"github.com/Jelshen/BrewBeanCafe/models"
)

// GET API
func GetMenus(db *sql.DB) fiber.Handler {
    return func(c *fiber.Ctx) error {
        categoryID := c.Query("category_id") // e.g. ?category_id=2

        var rows *sql.Rows
        var err error

        if categoryID != "" {
            rows, err = db.Query("SELECT menu_id, menu_name, menu_price, menu_description, picture_url, category_id, is_available, created_at FROM menus WHERE category_id = $1", categoryID)
        } else {
            rows, err = db.Query("SELECT menu_id, menu_name, menu_price, menu_description, picture_url, category_id, is_available, created_at FROM menus")
        }

        if err != nil {
            return c.Status(500).SendString(err.Error())
        }

        defer rows.Close()

        var menus []models.Menu
        for rows.Next() {
            var m models.Menu
            err := rows.Scan(&m.MenuID, &m.MenuName, &m.MenuPrice, &m.MenuDescription, &m.PictureURL, &m.CategoryID, &m.IsAvailable, &m.CreatedAt)
            if err != nil {
                return c.Status(500).SendString(err.Error())
            }
            menus = append(menus, m)
        }

        return c.JSON(menus)
    }
}

// POST API
func UpsertMenu(db *sql.DB) fiber.Handler {
	return func(c *fiber.Ctx) error {
		var menu models.Menu

		// Parse JSON input
		if err := c.BodyParser(&menu); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid input"})
		}

		// Upsert logic
		if menu.MenuID == 0 {
			// Insert
			err := db.QueryRow(`
				INSERT INTO menus (menu_name, menu_price, menu_description, picture_url, category_id, is_available)
				VALUES ($1, $2, $3, $4, $5, $6)
				RETURNING menu_id, created_at
			`, menu.MenuName, menu.MenuPrice, menu.MenuDescription, menu.PictureURL, menu.CategoryID, menu.IsAvailable).
				Scan(&menu.MenuID, &menu.CreatedAt)

			if err != nil {
				return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
			}
			return c.Status(fiber.StatusCreated).JSON(menu)
		} else {
			// Update
			_, err := db.Exec(`
				UPDATE menus
				SET menu_name = $1, menu_price = $2, menu_description = $3, picture_url = $4, category_id = $5, is_available = $6
				WHERE menu_id = $7
			`, menu.MenuName, menu.MenuPrice, menu.MenuDescription, menu.PictureURL, menu.CategoryID, menu.IsAvailable, menu.MenuID)

			if err != nil {
				return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
			}
			// Return the updated object
			return c.JSON(menu)
		}
	}
}

func DeleteMenu(db *sql.DB) fiber.Handler {
    return func(c *fiber.Ctx) error {
        id := c.Params("id")
        if id == "" {
            return c.Status(fiber.StatusBadRequest).SendString("Menu ID is required")
        }

        result, err := db.Exec("DELETE FROM menus WHERE menu_id = $1", id)
        if err != nil {
            return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
        }

        rowsAffected, err := result.RowsAffected()
        if err != nil {
            return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
        }

        if rowsAffected == 0 {
            return c.Status(fiber.StatusNotFound).SendString("Menu not found")
        }

        return c.SendStatus(fiber.StatusNoContent) // 204 No Content
    }
}
