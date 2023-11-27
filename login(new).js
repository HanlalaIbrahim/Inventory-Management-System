function login() {
  var loginUsername = document.getElementById("login-username").value;
  var loginPassword = document.getElementById("login-password").value;

  var userDataString = localStorage.getItem(loginUsername);

  if (userDataString) {
    var userData = JSON.parse(userDataString);

    if (userData.password === loginPassword) {
      alert("Welcome, " + userData.role + "!");
      // Redirect based on the user role
      switch (userData.role) {
        case "admin":
          window.location.href = "admin.html";
          break;
        case "manager":
          window.location.href = "product_manager.html";
          break;
        case "employee":
          window.location.href = "employee.html";
          break;
        default:
          alert("Invalid role");
      }
    } else {
      alert("Invalid password");
    }
  } else {
    alert("User not found");
  }
}
