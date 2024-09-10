async function getAllLearners() {
    const token = localStorage.getItem("token");
    const response = await fetch(`/api/learners/`, {
        method: "GET",
        headers: {"Authorization": token}
    });
    const data = await response.json();
    console.log(data);

    for (let index = 0; index < data.length; index++) {
        const learner = data[index];
        const learnerID = learner._id;
        const learnerFirstName = learner.firstName;
        const learnerLastName = learner.lastName;
        const learnerEmail = learner.email;
        const learnerPhone = learner.phone;

        const learnerHTML = `
            <tr>
                <td>${learnerFirstName}</td>
                <td>${learnerLastName}</td>
                <td>${learnerEmail}</td>
                <td>${learnerPhone}</td>
                <td>
                    <button class="btn btn-primary" onclick=editLearner("${learnerID}")>Edit</button>
                    <button class="btn btn-danger" onclick=deleteLearner("${learnerID}")>Delete</button>
                </td>
            </tr>
        `;

        document.getElementById("learnersTable").innerHTML += learnerHTML;
    }
}

getAllLearners();


function editLearner(learnerID) {
    window.location.href = `/admin/management/learners/${learnerID}`;
}


function deleteLearner(learnerID) {
    const token = localStorage.getItem("token");
    const response = fetch(`/api/learners/${learnerID}`, {
        method: "DELETE",
        headers: {"Authorization": token}
    });
    console.log(response);
    window.location.reload();
}