const role = localStorage.getItem("role");
if (!role || role != "admin") {
    window.location.href = "/auth/login/"
}