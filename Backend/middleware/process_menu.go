package middleware

import (
	"bytes"
	"fmt"
	"image"
	"image/jpeg"
	"image/png"
	"io"
	"strconv"

	"github.com/chai2010/webp"
	"github.com/disintegration/imaging"
	"github.com/gofiber/fiber/v2"

	"github.com/Jelshen/BrewBeanCafe/models"
)

func convertToWebP(reader io.Reader, mimeType string) ([]byte, error) {
	var img image.Image
	var err error

	fmt.Println("🔄 Starting image conversion to WebP...")

	// Read the image into a buffer to measure its original size
	var originalBuf bytes.Buffer
	tee := io.TeeReader(reader, &originalBuf)

	switch mimeType {
	case "image/jpeg":
		fmt.Println("🖼️ Detected JPEG format")
		img, err = jpeg.Decode(tee)
	case "image/png":
		fmt.Println("🖼️ Detected PNG format")
		img, err = png.Decode(tee)
	case "image/webp":
		fmt.Println("🖼️ Detected WebP format")
		img, err = webp.Decode(tee)
	default:
		errMsg := fmt.Sprintf("❌ Unsupported image type: %s", mimeType)
		fmt.Println(errMsg)
		return nil, fmt.Errorf(errMsg)
	}
	if err != nil {
		fmt.Println("❌ Error decoding image: ", err)
		return nil, err
	}

	originalSize := originalBuf.Len()
	fmt.Printf("📏 Original image size: %d B (%.2f KB / %.4f MB)\n", originalSize, float64(originalSize)/1024, float64(originalSize)/(1024*1024))

	// Optionally resize (for compression)
	fmt.Println("📐 Resizing image to width 800px...")
	img = imaging.Resize(img, 800, 0, imaging.Lanczos)

	var buf bytes.Buffer
	err = webp.Encode(&buf, img, &webp.Options{Quality: 70})
	if err != nil {
		fmt.Println("❌ Error encoding image to WebP:", err)
		return nil, err
	}

	finalSize := buf.Len()
	fmt.Printf("✅ Image conversion successful!\n")
	fmt.Printf("   🔹 Final size: %d B (%.2f KB / %.4f MB)\n", finalSize, float64(finalSize)/1024, float64(finalSize)/(1024*1024))

	return buf.Bytes(), nil
}


func ParseMenuForm(c *fiber.Ctx) (models.Menu, error) {
	var menu models.Menu

	fmt.Println("📝 Parsing form data...")

	menu.MenuName = c.FormValue("menu_name")
	fmt.Println("✅ menu_name:", menu.MenuName)

	if idStr := c.FormValue("menu_id"); idStr != "" {
		id, err := strconv.Atoi(idStr)
		if err != nil {
			fmt.Println("❌ Invalid menu_id:", idStr)
			return menu, c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid menu_id"})
		}
		menu.MenuId = id
		fmt.Println("✅ menu_id:", menu.MenuId)
	}

	priceStr := c.FormValue("menu_price")
	if priceStr != "" {
		price, err := strconv.ParseFloat(priceStr, 64)
		if err != nil {
			fmt.Println("❌ Invalid menu_price:", priceStr)
			return menu, c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid menu_price"})
		}
		menu.MenuPrice = price
		fmt.Println("✅ menu_price:", menu.MenuPrice)
	}

	menu.MenuDescription = c.FormValue("menu_description")
	fmt.Println("✅ menu_description:", menu.MenuDescription)

	catStr := c.FormValue("category_id")
	if catStr != "" {
		catId, err := strconv.Atoi(catStr)
		if err != nil {
			fmt.Println("❌ Invalid category_id:", catStr)
			return menu, c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid category_id"})
		}
		menu.CategoryId = catId
		fmt.Println("✅ category_id:", menu.CategoryId)
	}

	// Handle image
	file, err := c.FormFile("menu_image")
	if err == nil {
		// ✅ File uploaded, process it
		fmt.Println("📎 Image file found:", file.Filename)

		src, err := file.Open()
		if err != nil {
			fmt.Println("❌ Failed to open image file:", err)
			return menu, c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to open image"})
		}
		defer src.Close()

		menu.MenuImage, err = convertToWebP(src, file.Header.Get("Content-Type"))
		if err != nil {
			fmt.Println("❌ Image conversion failed:", err)
			return menu, c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Image conversion failed"})
		}
	} else if err != nil {
		// Handle edge case where no file is uploaded
		if file == nil {
			fmt.Println("ℹ️ No file uploaded")
			// Acceptable edge case — skip
		} else {
			fmt.Println("❌ Unexpected error retrieving file:", err)
			return menu, c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "Image upload failed",
			})
		}
	} 

	fmt.Println("✅ Form parsing completed")
	return menu, nil
}
