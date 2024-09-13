const learnerID = localStorage.getItem('id');

async function loadProfile() {
    const learner = await (await fetch(`/api/learners/${learnerID}`)).json();
    document.getElementById("firstname").value = learner.firstName;
    document.getElementById("lastname").value = learner.lastName;
    document.getElementById("email").value = learner.email;
    document.getElementById("address").value = learner.address;
    document.getElementById("city").value = learner.city;
    document.getElementById("zipcode").value = learner.zipcode;
    document.getElementById("phone").value = learner.phone;
    document.getElementById("country").value = learner.country;
    document.getElementById("password").value = learner.password;
}
loadProfile();

async function updateProfile() {
    const data = {
        firstName: document.getElementById("firstname").value,
        lastName: document.getElementById("lastname").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        zipcode: document.getElementById("zipcode").value,
        phone: document.getElementById("phone").value,
        country: document.getElementById("country").value,
        password: document.getElementById("password").value
    }
    const result = await fetch(`/api/learners/${learnerID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (result.status == 200) {
        alert("Profile updated successfully");
        window.location.href = "/myAccount";
    } else {
        alert("Error updating profile");
    }
}