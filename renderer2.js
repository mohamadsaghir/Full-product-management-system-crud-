document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Get input values
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Check if username and password are correct
    if (username === "admin" && password === "admin") {
        // Redirect to a page of your choice (e.g., login.html)
        window.location.href = "login.html";
    } else {
        // Display error message under the input fields
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "Invalid username or password. Please try again.";
        errorMessage.style.color = "red";
        document.getElementById("loginForm").appendChild(errorMessage);
         window.location.reload();
    } 
});
    

