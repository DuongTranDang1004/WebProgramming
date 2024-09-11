async function getAllCourses() {
    const token = localStorage.getItem("token");
    const response = await fetch(`/api/courses/`, {
        method: "GET",
        headers: {"Authorization": token}
    });
    const data = await response.json();
    console.log(data);

    for (let index = 0; index < data.length; index++) {
        const course = data[index];
        const courseName = course.name;
        const courseCategory = course.category;
        const coursePrice = `$${course.price}`;
        const instructor = course.instructorId;
        const instructorName = `${instructor.firstName} ${instructor.lastName}`;
        const courseID = course._id;

        const instructorHTML = `
            <tr>
                <td>${courseName}</td>
                <td>${courseCategory}</td>
                <td>${coursePrice}</td>
                <td>${instructorName}</td>
                <td>
                    <button class="btn btn-primary" onclick=editCourse("${courseID}")>Edit</button>
                    <button class="btn btn-danger" onclick=deleteCourse("${courseID}")>Delete</button>
                </td>
            </tr>
        `;

        document.getElementById("coursesTable").innerHTML += instructorHTML;
    }
}
getAllCourses();


function editCourse(courseID) {
    window.location.href = `/admin/management/courses/${courseID}`;
}


async function deleteCourse(courseID) {
    const token = localStorage.getItem("token");
    const response = fetch(`/api/courses/${courseID}`, {
        method: "DELETE",
        headers: {"Authorization": token}
    });
    console.log(await (await response).json());
    window.location.reload();
}