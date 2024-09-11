async function getAllInstructors() {
    const token = localStorage.getItem("token");
    const response = await fetch(`/api/instructors/`, {
        method: "GET",
        headers: {"Authorization": token}
    });
    const data = await response.json();
    console.log(data);

    for (let index = 0; index < data.length; index++) {
        const instructor = data[index];
        const instructorID = instructor._id;
        const instructorFirstName = instructor.firstName;
        const instructorLastName = instructor.lastName;
        const instructorEmail = instructor.email;
        const instructorPhone = instructor.phone;

        const instructorHTML = `
            <tr>
                <td>${instructorFirstName}</td>
                <td>${instructorLastName}</td>
                <td>${instructorEmail}</td>
                <td>${instructorPhone}</td>
                <td>
                    <button class="btn btn-primary" onclick=editInstructor("${instructorID}")>Edit</button>
                    <button class="btn btn-danger" onclick=deleteInstructor("${instructorID}")>Delete</button>
                </td>
            </tr>
        `;

        document.getElementById("instructorsTable").innerHTML += instructorHTML;
    }
}
getAllInstructors();


function editInstructor(instructorID) {
    window.location.href = `/admin/management/instructors/${instructorID}`;
}


async function deleteInstructor(instructorID) {
    const token = localStorage.getItem("token");
    const response = fetch(`/api/instructors/${instructorID}`, {
        method: "DELETE",
        headers: {"Authorization": token}
    });
    console.log(await (await response).json());
    window.location.reload();
}