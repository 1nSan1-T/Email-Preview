const REFRESH_INTERVAL = 60 * 1000; // 1 minute

function renderEmails(emails) {
  const emailsContainer = document.querySelector('.emails');
  emailsContainer.innerHTML = '';
  for (let email of emails) {
    const emailElement = document.createElement('div');
    emailElement.classList.add('email');
    const subjectElement = document.createElement('div');
    subjectElement.classList.add('subject');
    subjectElement.textContent = email.subject;

    // Get the email content from the background page
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      if (request.type === 'emailContent') {
        const emailContent = request.content;
        document.getElementById('email-content').innerHTML = emailContent;
      }
    });

    // Close the popup when the close button is clicked
    document.getElementById('close-btn').addEventListener('click', function() {
      window.close();
    });  
  }
}

// Save the notification settings when the form is submitted
document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();

  const notificationEnabled = document.getElementById('notification-enable').checked;
  chrome.storage.sync.set({ notificationEnabled }, function() {
    alert('Settings saved!');
  });
});

// Load the notification settings when the page loads
chrome.storage.sync.get('notificationEnabled', function(data) {
  const notificationEnabled = data.notificationEnabled !== false; // default to true
  document.getElementById('notification-enable').checked = notificationEnabled;
});