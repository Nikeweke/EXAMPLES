package controllers

import (
    "time"
    "fmt"

    "github.com/revel/revel"
    "github.com/revel/modules/jobs/app/jobs"
)

type ReminderEmails struct {
    // Filtered
}

func (e ReminderEmails) Run() {
    // Queries the DB
    // Sends some email
    fmt.Println("hello")
}

func init() {
    revel.OnAppStart(func() {
        // jobs.Schedule("0 0 0 * * ?",  ReminderEmails{})
        // jobs.Schedule("@midnight",    ReminderEmails{})
        // jobs.Schedule("@every 24h",   ReminderEmails{})
        jobs.Every(1 * time.Second,    ReminderEmails{})
    })
}
