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
1. Make a copy of the template sheet: [Click here](https://docs.google.com/spreadsheets/d/1GYkL8EEDFRq333Vn3ctoUazQ4vL2mb6zx_kh6gpvXDc/edit?usp=sharing)
   - Go to File → Make a copy (so you get your own editable version)
2. Open Extensions → Apps Script and paste Code.js
3. Create Form.html alongside it  
4. Run `setupDailyTrigger()` once to activate daily 8 AM emails
5. Deploy as a Web App for the logging form (Execute as: Me, Anyone with Google account)

## Adding your own questions
You can add as many questions as you want — just follow this format:

| Column A | Column B | Column C | Column D |
|----------|----------|----------|----------|
| Question name | LeetCode URL | Tutorial URL (optional) | Leave blank |

- Column D (Sent) must be left empty for new questions — that's how the script knows what hasn't been sent yet
- Column E and F are auto-filled by the web app when you log a completed question
