package middleware

import (
	"github.com/gofiber/fiber/v2"
)

// middleware/authenticate.go
func Authenticate() fiber.Handler {
	return func(c *fiber.Ctx) error {
		tokenStr := c.Cookies("token")
		if tokenStr == "" {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "Unauthorized, token missing",
			})
		}

		claims, err := ParseAndValidateToken(tokenStr)
		if err != nil {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "Invalid token",
			})
		}

		c.Locals("admin_id", claims["admin_id"])
		return c.Next()
	}
}
