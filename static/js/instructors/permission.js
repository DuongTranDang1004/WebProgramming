const role = localStorage.getItem("role");
if (!role || role != "instructor") {
    alert("You must be logged in as an instructor to access this page.");
    window.location.href = "/auth/login/"
}