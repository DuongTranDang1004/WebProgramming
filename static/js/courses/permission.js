const role = localStorage.getItem("role");
if (!role || role != "learner") {
    alert("You must be logged in as a learner to access this page.");
    window.location.href = "/auth/login/"
}