// Define a function to fetch the user's emails
function fetchEmails() {
    // Make an HTTP request to fetch the user's emails
    // Replace the URL with the API endpoint that retrieves the user's emails
    fetch('https://example.com/emails')
      .then(response => response.json())
      .then(data => {
        // Get the "emails" div element from the popup.html file
        const emailsDiv = document.getElementById('emails');
  
        // Clear any existing emails from the "emails" div
        emailsDiv.innerHTML = '';
  
        // Loop through the emails and create an email element for each one
        data.emails.forEach(email => {
          // Create an email element
          const emailElement = document.createElement('div');
          emailElement.classList.add('email');
  
          // Add the email's subject and body to the email element
          const subjectElement = document.createElement('h2');
          subjectElement.textContent = email.subject;
          emailElement.appendChild(subjectElement);
  
          const bodyElement = document.createElement('p');
          bodyElement.textContent = email.body;
          emailElement.appendChild(bodyElement);
  
          // Add the email element to the "emails" div
          emailsDiv.appendChild(emailElement);
        });
      })
      .catch(error => {
        // Display an error message if the request fails
        console.error(error);
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Failed to fetch emails';
        document.body.appendChild(errorMessage);
      });
  }
  
  // Call the fetchEmails function when the popup is opened
  document.addEventListener('DOMContentLoaded', fetchEmails);
  
  // Add event listener to the login button
  const loginButton = document.getElementById('login-btn');
  loginButton.addEventListener('click', () => {
    // Request OAuth2 token from Chrome Identity API
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      } else {
        console.log('Token retrieved:', token);
        // Store token in Chrome Storage API
        chrome.storage.local.set({ token: token });
      }
    });
  });
  
  // Add event listener to the logout button
  const logoutButton = document.getElementById('logout-btn');
  logoutButton.addEventListener('click', () => {
    // Remove OAuth2 token from Chrome Identity API cache
    chrome.identity.removeCachedAuthToken({ token: token }, () => {
      console.log('Token removed');
    });
  });
  
  // Add event listener to the refresh button
  const refreshButton = document.getElementById('refresh');
  refreshButton.addEventListener('click', () => {
    // Retrieve OAuth2 token from Chrome Storage API
    chrome.storage.local.get(['token'], (result) => {
      console.log('Token retrieved:', result.token);
      // Use OAuth2 token to make request to Gmail API
      fetch(`https://www.googleapis.com/gmail/v1/users/me/messages?access_token=${result.token}`)
        .then(response => response.json())
        .then(data => {
          console.log('Emails retrieved:', data);
          // Call fetchEmails function to display emails
          fetchEmails();
        })
        .catch(error => {
          console.error(error);
        });
    });
  });  