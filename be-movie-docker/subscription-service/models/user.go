package models

import "time"


// mapping to users table in the database
type User struct {
	ID                    uint       `gorm:"primaryKey;column:id" json:"id"`
	Name                  string     `gorm:"column:name" json:"name"`
	Email                 string     `gorm:"column:email" json:"email"`
	SubscriptionType      string     `gorm:"column:subscription_type" json:"subscription_type"`
	SubscriptionExpiredAt *time.Time `gorm:"column:subscription_expired_at" json:"subscription_expired_at"`
}
