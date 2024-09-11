const target = window.location.href.split("/").at(window.location.href.split("/").length - 1);

async function fillData() {
    const token = localStorage.getItem("token");
    const response = await fetch(`/api/courses/${target}`, {
        method: "GET",
        headers: {"Authorization": token}
    });
    const data = await response.json();
    console.log(data);

    document.getElementById("name").value = data.name;
    document.getElementById("category").value = data.category;
    document.getElementById("price").value = data.price;
    document.getElementById("description").value = data.description;
    document.getElementById("public").checked = data.isPublish;
    
}
fillData();


async function updateCourse() {
    const data = {
        name: document.getElementById("name").value,
        category: document.getElementById("category").value,
        price: document.getElementById("price").value,
        description: document.getElementById("description").value,
        isPublish: document.getElementById("public").checked
    }
    const token = localStorage.getItem("token");
    const response = await fetch(`/api/courses/${target}`, {
        method: "PUT",
        headers: {"Authorization": token, "Content-Type": "application/json"},
        body: JSON.stringify(data)
    });
    const result = await response.json();
    console.log(result);
    window.location.href = "/admin/management/courses";
}