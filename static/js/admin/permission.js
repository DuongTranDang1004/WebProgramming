const role = localStorage.getItem("role");
if (!role || role != "admin") {
    alert("You must be logged in as an admin to access this page.");
    window.location.href = "/auth/login/"
}