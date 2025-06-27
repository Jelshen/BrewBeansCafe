package middleware

import (
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
)

// Authenticate Protected Routes 
func Authenticate() fiber.Handler {
	return func(c *fiber.Ctx) error {
		cookie := c.Cookies("token") // get cookie by name
		if cookie == "" {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "Unauthorized, token missing",
			})
		}
		
		// Load environment variables
		err := godotenv.Load("../.env")
		if err != nil {
			return fiber.NewError(fiber.StatusInternalServerError, "Error loading environment variables")
		}

		// Get the secret key from environment variables
		secret := os.Getenv("JWT_SECRET_KEY")
		if secret == "" {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Server misconfiguration",
			})
		}

		// Parse the JWT token
		token, err := jwt.Parse(cookie, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fiber.ErrUnauthorized
			}
			return []byte(secret), nil
		})

		if err != nil || !token.Valid {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "Invalid token",
			})
		}

		// Optional: extract and check claims
		if claims, ok := token.Claims.(jwt.MapClaims); ok {
			// Set admin_id and expiration time in context
			c.Locals("admin_id", claims["admin_id"])
		} else {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "Invalid token claims",
			})
		}

		return c.Next()
	}
}