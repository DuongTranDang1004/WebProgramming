async function getAdminData() {
    const token = localStorage.getItem("token");
    const adminID = localStorage.getItem("id");
    const response = await fetch(`/api/platformAdmins/${adminID}`, {
        method: "GET",
        headers: {"Authorization": token}
    });
    const data = await response.json();
    console.log(data);

    document.getElementById("first_name").innerHTML = data.firstName;
    document.getElementById("last_name").innerHTML = data.lastName;
    document.getElementById("email").innerHTML = data.email;
    document.getElementById("address").innerHTML = data.address;
    document.getElementById("city").innerHTML = data.city;
    document.getElementById("country").innerHTML = data.country;
    document.getElementById("zipcode").innerHTML = data.zipcode;
    document.getElementById("phone").innerHTML = data.phone;
    document.getElementById("admin-image").src = data.profilePicture;
}

getAdminData()


function redirectToUpdate() {
    window.location.href = "/admin/update"
}