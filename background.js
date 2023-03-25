// Listen for the browser action (extension icon) to be clicked
chrome.browserAction.onClicked.addListener(function(tab) {
    // Open the popup window
    chrome.windows.create({
      url: chrome.extension.getURL("popup.html"),
      type: "popup",
      width: 400,
      height: 600
    });
  });
  
  // Listen for the "new mail" notification and display a desktop notification
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === "new-mail") {
      chrome.notifications.create({
        type: "basic",
        iconUrl: "icon.png",
        title: "New email!",
        message: "You have a new email."
      });
    }
  });

  // Listen for the user clicking on a notification
  chrome.notifications.onClicked.addListener(function(notificationId) {
    // Open the email in a new tab
    chrome.tabs.create({ url: "https://mail.google.com/mail/u/0/#inbox/" });
  });