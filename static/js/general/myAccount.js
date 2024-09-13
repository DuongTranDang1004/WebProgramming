const learnerID = localStorage.getItem('id');

async function loadProfile() {
    const learner = await (await fetch(`/api/learners/${learnerID}`)).json();
    document.getElementById("first_name").innerHTML = learner.firstName;
    document.getElementById("last_name").innerHTML = learner.lastName;
    document.getElementById("email").innerHTML = learner.email;
    document.getElementById("address").innerHTML = learner.address;
    document.getElementById("city").innerHTML = learner.city;
    document.getElementById("zipcode").innerHTML = learner.zipcode;
    document.getElementById("phone").innerHTML = learner.phone;

    const countries = await (await fetch("/countries.json")).json();
    document.getElementById("country").innerHTML = countries[learner.country];

    document.getElementById("image").src = learner.profilePicture;
}
loadProfile();

function redirectToUpdate() {
    window.location.href = "/updateAccount";
}