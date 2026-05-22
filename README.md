# 🧠 LeetCode Daily Tracker

A free, automated LeetCode practice system built with Google Apps Script — no Notion, no paid tools.

## What it does
- Sends 2 random LeetCode questions to my email every morning at 8 AM
- Never repeats a question
- Includes a link to a tutorial video for each question
- Sends a "you finished!" email when all questions are done

## Stack
- Google Sheets (question database)
- Google Apps Script (email automation + web app backend)
- HTML/CSS/JS (logging form)

## Features
- 98 questions pulled from a CodeSignal prep list + LeetCode 75
- Web app form to log completed questions with a confidence rating (Bad / Mid / Good)
- Confidence ratings saved back to the Google Sheet

## Files
- `Code.js` — main script (email sender, daily trigger, web app backend)
- `Form.html` — mobile-friendly logging form deployed as a Google Web App

## Setup
1. Copy questions into a Google Sheet with columns: Name, LeetCode URL, Tutorial URL, Sent
2. Open Extensions → Apps Script and paste Code.js
3. Create Form.html alongside it
4. Run `setupDailyTrigger()` once to activate daily emails
5. Deploy as a Web App for the logging form
