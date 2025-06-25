package middleware

import (
	"os"

	"github.com/golang-jwt/jwt/v5"
)

// generateToken creates a new JWT token
func GenerateToken(id int) (string, error) {
	// Create token with claims
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["admin_id"] = id

	// Generate encoded token
	return token.SignedString([]byte(os.Getenv("JWT_SECRET_KEY"))) // Use environment variable for secret
}