package middleware

import (
	"os"
	"time"


	"github.com/golang-jwt/jwt/v5"
)

// generateToken creates a new JWT token
func GenerateToken(id int, username string) (string, error) {
	// Create token with claims
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["admin_id"] = id
	claims["username"] = username
	claims["exp"] = jwt.NewNumericDate(time.Now().Add(30 * time.Minute)) // ✅ pass time.Time, not Unix()

	// Generate encoded token
	return token.SignedString([]byte(os.Getenv("JWT_SECRET_KEY"))) // Use environment variable for secret
}