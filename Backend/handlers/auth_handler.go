package handlers

import (
	"fmt"
	"database/sql"
	"github.com/Jelshen/BrewBeanCafe/models"
	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
	
	"github.com/Jelshen/BrewBeanCafe/middleware"
)

var ErrInvalidCredentials = fiber.NewError(fiber.StatusUnauthorized, "Invalid credentials")

func Logout(c *fiber.Ctx) error {
	c.Cookie(&fiber.Cookie{
		Name:     "token",
		Value:    "",
		HTTPOnly: true,
		Secure:   false, // true in production
		SameSite: "Strict",
		MaxAge: 0, // 30 minutes
		Path:     "/",
	})
    
    return c.JSON(fiber.Map{
        "message": "Logged out successfully",
    })
}

// ValidateCredentials handles the login process
func ValidateCredentials(db *sql.DB) fiber.Handler {
	return func(c *fiber.Ctx) error {
		admin, err := parseCredentials(c)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error":       "Invalid input format",
				"description": err.Error(),
			})
		}

		err = verifyCredentials(db, admin)
		if err != nil {
			if err == ErrInvalidCredentials {
				return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
					"error": "Invalid username or password",
				})
			}
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error":       "Server error during login",
				"description": err.Error(),
			})
		}

		token, err := middleware.GenerateToken(admin.AdminId)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error":       "Could not generate token",
				"description": err.Error(),
			})
		}

		c.Cookie(&fiber.Cookie{
			Name:     "token",
			Value:    token,
			HTTPOnly: true,
			Secure:   false, // true in production
			SameSite: "Strict",
			MaxAge: 10800, // 30 minutes
			Path:     "/",
		})

		return c.JSON(fiber.Map{
			"message": "Login successful",
		})
	}
}

// parseCredentials parses and validates the request body
func parseCredentials(c *fiber.Ctx) (*models.Admin, error) {
	admin := new(models.Admin)
	if err := c.BodyParser(admin); err != nil {
		return nil, err
	}
	return admin, nil
}

// verifyCredentials securely checks credentials using bcrypt
func verifyCredentials(db *sql.DB, admin *models.Admin) error {
	var storedHashedPassword string
	var adminId int

	err := db.QueryRow(
		"SELECT admin_id, password FROM admins WHERE username = $1",
		admin.Username,
	).Scan(&adminId, &storedHashedPassword)

	if err != nil {
		if err == sql.ErrNoRows {
			return ErrInvalidCredentials
		}
		return err
	}

	err = bcrypt.CompareHashAndPassword([]byte(storedHashedPassword), []byte(admin.Password))
	if err != nil {
		return ErrInvalidCredentials
	}

	admin.AdminId = adminId // Set the ID on the model after validation
	return nil
}
