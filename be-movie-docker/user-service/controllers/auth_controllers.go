package controllers

import (
	"be-movie-docker/user-service/models"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Logout(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "Logged out successfully. Please remove token on client-side.",
	})
}

func UpdateProfile(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID := c.GetUint("user_id") // didapat dari middleware

		var req struct {
			Name  *string `json:"name"`
			Email *string `json:"email"`
		}

		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid JSON"})
			return
		}

		// Ambil user dari DB menggunakan GORM
		var user models.User
		if err := db.First(&user, userID).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "user not found"})
			return
		}

		// Update jika ada perubahan
		updates := map[string]interface{}{}
		if req.Name != nil {
			trimmedName := strings.TrimSpace(*req.Name)
			if trimmedName == "" {
				c.JSON(http.StatusBadRequest, gin.H{"error": "name cannot be empty"})
				return
			}
			updates["name"] = trimmedName
		}

		// Jika ada field yang diupdate
		if len(updates) > 0 {
			if err := db.Model(&user).Updates(updates).Error; err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to update"})
				return
			}
			// Muat ulang data user setelah update
			db.First(&user, userID)
		} else {
            c.JSON(http.StatusBadRequest, gin.H{"error": "field 'name' is required for update"})
            return
        }

		c.JSON(http.StatusOK, gin.H{
			"message": "Profile updated successfully",
			"user": gin.H{
				"id":                      user.ID,
				"name":                    user.Name, // Nama yang baru
				"email":                   user.Email, // Email yang lama (tidak berubah)
				"subscription_type":       user.SubscriptionType,
				"subscription_expired_at": user.SubscriptionExpiredAt,
			},
		})
	}
}
