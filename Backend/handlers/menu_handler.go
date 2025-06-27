package handlers

import (
    "fmt"
	"database/sql"
	"github.com/gofiber/fiber/v2"

	"github.com/Jelshen/BrewBeanCafe/models"
    "github.com/Jelshen/BrewBeanCafe/middleware"
)

// GET API
func GetMenus(db *sql.DB) fiber.Handler {
    return func(c *fiber.Ctx) error {
        categoryId := c.Query("category_id") // e.g. ?category_id=2

        var rows *sql.Rows
        var err error

        if categoryId != "" {
            rows, err = db.Query("SELECT menu_id, menu_name, menu_price, menu_description, category_id, created_at FROM menus WHERE category_id = $1", categoryId)
        } else {
            rows, err = db.Query("SELECT menu_id, menu_name, menu_price, menu_description, category_id, created_at FROM menus")
        }

        if err != nil {
            return c.Status(500).SendString(err.Error())
        }

        defer rows.Close()

        var menus []models.Menu
        for rows.Next() {
            var m models.Menu
            err := rows.Scan(&m.MenuId, &m.MenuName, &m.MenuPrice, &m.MenuDescription, &m.CategoryId, &m.CreatedAt)
            if err != nil {
                return c.Status(500).SendString(err.Error())
            }
            menus = append(menus, m)
        }

        return c.JSON(menus)
    }
}

// Fetch image in a separate API to display
func GetMenuImage(db *sql.DB) fiber.Handler {
    return func(c *fiber.Ctx) error {
        menuId := c.Params("id")

        var imageData []byte
        err := db.QueryRow("SELECT menu_image FROM menus WHERE menu_id = $1", menuId).Scan(&imageData)
        if err != nil {
            return c.Status(404).SendString("Image not found")
        }

        c.Set("Content-Type", "image/webp")
        return c.Send(imageData)
    }
}

// POST API
func UpsertMenu(db *sql.DB) fiber.Handler {
	return func(c *fiber.Ctx) error {
		var menu models.Menu

        // Parse menu from FormData
        menu, err := middleware.ParseMenuForm(c)
        if err != nil {
            return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
        }

        fmt.Printf("Menu successfully parsed.\n")

		// Upsert logic
		if menu.MenuId == 0 {
			// Insert
			err := db.QueryRow(`
				INSERT INTO menus (menu_name, menu_price, menu_description, menu_image, category_id)
				VALUES ($1, $2, $3, $4, $5)
				RETURNING menu_id, created_at
			`, menu.MenuName, menu.MenuPrice, menu.MenuDescription, menu.MenuImage, menu.CategoryId).
				Scan(&menu.MenuId, &menu.CreatedAt)

			if err != nil {
				return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
			}
			return c.Status(fiber.StatusCreated).JSON(menu)
		} else {
			// Update
			_, err := db.Exec(`
				UPDATE menus
				SET menu_name = $1, menu_price = $2, menu_description = $3, menu_image = $4, category_id = $5
				WHERE menu_id = $6
			`, menu.MenuName, menu.MenuPrice, menu.MenuDescription, menu.MenuImage, menu.CategoryId, menu.MenuId)

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
