package handlers

import (
    "database/sql"
    "github.com/gofiber/fiber/v2"
    "github.com/Jelshen/BrewBeanCafe/models"
)

func GetCategories(db *sql.DB) fiber.Handler {
    return func(c *fiber.Ctx) error {
        rows, err := db.Query("SELECT category_id, name, created_at FROM categories")
        if err != nil {
            return c.Status(500).SendString(err.Error())
        }
        defer rows.Close()

        var categories []models.Category
        for rows.Next() {
            var cat models.Category
            err := rows.Scan(&cat.CategoryID, &cat.CategoryName, &cat.CreatedAt)
            if err != nil {
                return c.Status(500).SendString(err.Error())
            }
            categories = append(categories, cat)
        }

        return c.JSON(categories)
    }
}

func AddCategory(db *sql.DB) fiber.Handler {
    return func(c *fiber.Ctx) error {
        var cat models.Category
        if err := c.BodyParser(&cat); err != nil {
            return c.Status(400).SendString("Invalid JSON")
        }

        err := db.QueryRow(
            "INSERT INTO categories (name) VALUES ($1) RETURNING category_id, created_at",
            cat.CategoryName,
        ).Scan(&cat.CategoryID, &cat.CreatedAt)

        if err != nil {
            return c.Status(500).SendString(err.Error())
        }

        return c.Status(201).JSON(cat)
    }
}

func DeleteCategory(db *sql.DB) fiber.Handler {
    return func(c *fiber.Ctx) error {
        id := c.Params("id")
        result, err := db.Exec("DELETE FROM categories WHERE category_id = $1", id)
        if err != nil {
            return c.Status(500).SendString(err.Error())
        }

        rowsAffected, err := result.RowsAffected()
        if err != nil {
            return c.Status(500).SendString(err.Error())
        }

        if rowsAffected == 0 {
            return c.Status(404).SendString("Category not found")
        }

        return c.SendStatus(204)
    }
}
