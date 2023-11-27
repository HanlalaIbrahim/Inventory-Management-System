function loadRegisteredUsers() {
  var tableBody = document.querySelector("#registered-users-table tbody");
  tableBody.innerHTML = "";

  for (var i = 0; i < localStorage.length; i++) {
    var username = localStorage.key(i);
    var userDataString = localStorage.getItem(username);

    try {
      // Try to parse the user data
      var userData = JSON.parse(userDataString);

      // Check if userData is undefined or has missing properties
      if (userData && userData.username && userData.password && userData.role) {
        var row = tableBody.insertRow();

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);

        cell1.textContent = userData.username;
        cell2.textContent = userData.password;
        cell3.textContent = userData.role;
        cell4.innerHTML = '<button onclick="editPassword(\'' + userData.username + '\')">Edit Password</button>';
        cell5.innerHTML = '<button onclick="editUsername(\'' + userData.username + '\')">Edit Username</button>';
        cell6.innerHTML = '<button onclick="deleteUser(\'' + userData.username + '\')">Delete User</button>';
      } else {
        console.warn("Invalid data found for user: " + username);
        // Remove the invalid data
        localStorage.removeItem(username);
      }
    } catch (error) {
      console.error("Error parsing data for user: " + username);
      // Remove the invalid data
      localStorage.removeItem(username);
    }
  }
}


// Register a new employee
function registerEmployee() {
  var employeeUsername = document.getElementById("employee-username").value;
  var employeePassword = document.getElementById("employee-password").value;
  var employeeRole = document.getElementById("employee-role").value;

  var userData = {
    username: employeeUsername,
    password: employeePassword,
    role: employeeRole
  };

  localStorage.setItem(employeeUsername, JSON.stringify(userData));
  loadRegisteredUsers();

  // Clear the registration form
  document.getElementById("employee-username").value = "";
  document.getElementById("employee-password").value = "";
  document.getElementById("employee-role").value = "admin";
}

// Edit password for a user
function editPassword(username) {
  var newPassword = prompt("Enter the new password for " + username);

  if (newPassword !== null) {
    var userDataString = localStorage.getItem(username);

    if (userDataString) {
      var userData = JSON.parse(userDataString);
      userData.password = newPassword;

      localStorage.setItem(username, JSON.stringify(userData));
      loadRegisteredUsers();
    }
  }
}

// Edit username for a user
function editUsername(username) {
  var newUsername = prompt("Enter the new username for " + username);

  if (newUsername !== null) {
    var userDataString = localStorage.getItem(username);

    if (userDataString) {
      var userData = JSON.parse(userDataString);
      var newPassword = userData.password;
      var newRole = userData.role;

      // Remove the old username
      localStorage.removeItem(username);

      // Add the user with the new username
      userData = {
        username: newUsername,
        password: newPassword,
        role: newRole
      };

      localStorage.setItem(newUsername, JSON.stringify(userData));
      loadRegisteredUsers();
    }
  }
}

// Delete user
function deleteUser(username) {
  var confirmDelete = confirm("Are you sure you want to delete the user " + username + "?");

  if (confirmDelete) {
    localStorage.removeItem(username);
    loadRegisteredUsers();
  }
}

// Load registered users on page load
window.onload = function() {
  loadRegisteredUsers();
};
