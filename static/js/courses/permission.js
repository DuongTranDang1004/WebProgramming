const role = localStorage.getItem("role");
if (!role || role != "learner") {
    window.location.href = "/auth/login/"
}