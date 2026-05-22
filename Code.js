function sendDailyLeetCode() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Questions") || ss.getSheets()[0];
  var data = sheet.getDataRange().getValues();

  var nameCol = 0, urlCol = 1, tutCol = 2, sentCol = 3;

  var unsent = [];
  for (var i = 1; i < data.length; i++) {
    var sent = data[i][sentCol];
    if (!sent || sent.toString().trim() === "") {
      unsent.push({ row: i + 1, name: data[i][nameCol], url: data[i][urlCol], tut: data[i][tutCol] });
    }
  }

  var email = Session.getActiveUser().getEmail();

  if (unsent.length === 0) {
    MailApp.sendEmail({ to: email, subject: "🎉 You finished every question!", htmlBody: "<h2>You crushed it! 🎉</h2><p>Every question is done. Add more, or start a review round!</p>" });
    return;
  }

  var shuffled = unsent.slice().sort(function() { return Math.random() - 0.5; });
  var picked = shuffled.slice(0, Math.min(2, unsent.length));
  var dateStr = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "EEEE, MMMM d, yyyy");

  var html = '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">';
  html += '<h2 style="color:#1a1a1a;">🧠 Daily LeetCode — ' + dateStr + '</h2>';
  html += '<p style="color:#555;">Here\'s your question' + (picked.length > 1 ? 's' : '') + ' for today. Let\'s get it! 💪</p>';
  html += '<hr style="border:none;border-top:1px solid #eee;">';
  picked.forEach(function(q, i) {
    html += '<div style="margin:20px 0;padding:16px;background:#f9f9f9;border-left:4px solid #1D9E75;border-radius:4px;">';
    html += '<h3 style="margin:0 0 8px;color:#1a1a1a;">' + (i+1) + '. ' + q.name + '</h3>';
    html += '<p style="margin:6px 0;"><a href="' + q.url + '" style="color:#2563eb;font-weight:bold;">→ Solve on LeetCode</a></p>';
    if (q.tut && q.tut.toString().includes("http")) {
      html += '<p style="margin:6px 0;"><a href="' + q.tut + '" style="color:#7c3aed;">📺 Watch Tutorial</a></p>';
    }
    html += '</div>';
  });
  html += '<hr style="border:none;border-top:1px solid #eee;">';
  html += '<p style="color:#aaa;font-size:12px;">' + (unsent.length - picked.length) + ' questions remaining · LeetCode Daily Tracker</p>';
  html += '</div>';

  MailApp.sendEmail({ to: email, subject: "🧠 LeetCode Daily — " + dateStr, htmlBody: html });

  var today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd");
  picked.forEach(function(q) { sheet.getRange(q.row, sentCol + 1).setValue(today); });
}

function setupDailyTrigger() {
  ScriptApp.getProjectTriggers().forEach(function(t) {
    if (t.getHandlerFunction() === "sendDailyLeetCode") ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger("sendDailyLeetCode")
    .timeBased().everyDays(1).atHour(8).create();
  Logger.log("✅ Trigger set! Daily email at 8 AM.");
}

function doGet() {
  return HtmlService.createHtmlOutputFromFile('Form')
    .setTitle('LeetCode Tracker')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getQuestions() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Questions")
              || SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var data = sheet.getDataRange().getValues();
  var out = [];
  for (var i = 1; i < data.length; i++) {
    if (!data[i][0]) continue;
    out.push({
      row: i + 1,
      name: String(data[i][0]),
      sent: data[i][3] ? String(data[i][3]) : '',
      status: data[i][4] ? String(data[i][4]) : '',
      confidence: data[i][5] ? String(data[i][5]) : ''
    });
  }
  return out;
}

function markDone(row, confidence) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Questions")
              || SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  sheet.getRange(row, 5).setValue("Done");
  sheet.getRange(row, 6).setValue(confidence);
}
