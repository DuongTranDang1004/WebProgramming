const role = localStorage.getItem("role");
if (!role || role != "instructor") {
    window.location.href = "/auth/login/"
}