async function resetPass() {
    // Get forget token from query string
    const forgetToken = window.location.search.split('=')[1];
    // Get password from input
    const password = document.getElementById('password').value;
    // Get confirm password from input
    const confirmPassword = document.getElementById('confirm-password').value;
    // Check if password equals confirm password
    if (password !== confirmPassword) {
        alert('Password and Confirm Password must be the same');
        return;
    }
    // Send request to server
    const response = await fetch('/api/resetPass', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            forgetToken,
            newPass: password,
        }),
    });
    if (response.status === 200) {
        alert('Change password successfully');
        window.location.href = '/auth/login';
    } else {
        alert("Change password failed");
    }
}