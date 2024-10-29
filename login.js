document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('login-form');
  const logoutButton = document.getElementById('logout-button');
  const loginSection = document.getElementById('login-section');
  const logoutSection = document.getElementById('logout-section');
  const welcomeMessage = document.getElementById('welcome-message');

  // Check login status on page load
  const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
  const currentUser = localStorage.getItem('currentUser');

  if (currentUser) {
    showLogoutSection(currentUser);
  } else {
    showLoginSection();
  }

  // Login event
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Here, you might add some validation for username/password combination
    if (username && password) {
      // Add or update user in the stored users array
      const user = { username: username, password: password }; // Adjust as needed
      if (!storedUsers.find(u => u.username === username)) {
        storedUsers.push(user);
        localStorage.setItem('users', JSON.stringify(storedUsers)); // Store the updated user array
      }

      // Store the current user in local storage
      localStorage.setItem('currentUser', username);
      showLogoutSection(username);
    } else {
      alert('Please enter valid credentials.');
    }
  });

  // Logout event
  logoutButton.addEventListener('click', () => {
    localStorage.removeItem('currentUser'); // Remove current user info from local storage
    showLoginSection();
  });

  // Show login section
  function showLoginSection() {
    loginSection.style.display = 'block';
    logoutSection.style.display = 'none';
  }

  // Show logout section
  function showLogoutSection(username) {
    loginSection.style.display = 'none';
    logoutSection.style.display = 'block';

    // Display the username in the logout section
    welcomeMessage.textContent = `Welcome, ${username}!`;
  }
});
