function login () {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const data = {
        email,
        password
    };
    fetch('/api/auth/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Clear token, role and id fields in local storage
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('id');
        // Save token
        const token = data.token;
        localStorage.setItem('token', token);
        // Check user role
        if (data.learner) {
            localStorage.setItem('role', 'learner');
            localStorage.setItem("id", data.learner._id);
        }
        if (data.instructor) {
            localStorage.setItem('role', 'instructor');
            localStorage.setItem("id", data.instructor._id);
            window.location.href = "/instructors/home"
        }
        if (data.admin) {
            localStorage.setItem('role', 'admin');
            localStorage.setItem("id", data.admin._id);
            window.location.href = "/admin/dashboard"
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}