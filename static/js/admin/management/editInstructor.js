const target = window.location.href.split("/").at(window.location.href.split("/").length - 1);

async function fillData() {
    const token = localStorage.getItem("token");
    const response = await fetch(`/api/instructors/${target}`, {
        method: "GET",
        headers: {"Authorization": token}
    });
    const data = await response.json();
    console.log(data);

    document.getElementById("firstname").value = data.firstName;
    document.getElementById("lastname").value = data.lastName;
    document.getElementById("email").value = data.email;
    document.getElementById("address").value = data.address;
    document.getElementById("city").value = data.city;
    document.getElementById("country").value = data.country;
    document.getElementById("zipcode").value = data.zipcode;
    document.getElementById("phone").value = data.phone;
    document.getElementById("school").value = data.schoolOrCompanyName;
    document.getElementById("title").value = data.jobTitle;
    document.getElementById("specialization").value = data.specialization;
    document.getElementById("bio").value = data.bio || "";
}
fillData();


async function updateProfile() {
    const data = {
        firstName: document.getElementById("firstname").value,
        lastName: document.getElementById("lastname").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        country: document.getElementById("country").value,
        zipcode: document.getElementById("zipcode").value,
        phone: document.getElementById("phone").value,
        schoolOrCompanyName: document.getElementById("school").value,
        jobTitle: document.getElementById("title").value,
        specialization: document.getElementById("specialization").value,
        bio: document.getElementById("bio").value
    }
    const token = localStorage.getItem("token");
    const response = await fetch(`/api/instructors/${target}`, {
        method: "PUT",
        headers: {"Authorization": token, "Content-Type": "application/json"},
        body: JSON.stringify(data)
    });
    window.location.href = "/admin/management/instructors";
}