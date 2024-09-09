function activeUsers() {
    const activeUsersChart = new Chart("active-users-chart", {
    type: "line",
    data: {
        labels: [
        "00:00",
        "03:00",
        "06:00",
        "09:00",
        "12:00",
        "15:00",
        "18:00",
        "21:00",
        ],
        datasets: [
        {
            label: "Active users",
            data: [120, 110, 400, 1200, 1250, 1230, 1500, 1700],
            borderColor: "#4c51bf",
            fill: true,
        },
        ],
    },
    });
}
activeUsers();

function newUsers() {
    const activeUsersChart = new Chart("new-users-chart", {
    type: "line",
    data: {
        labels: [
        "Aug 25",
        "Aug 26",
        "Aug 27",
        "Aug 28",
        "Aug 29",
        "Aug 30",
        "Aug 31",
        "Sep 1",
        ],
        datasets: [
        {
            label: "New users",
            data: [15, 30, 50, 25, 7, 12, 45, 60],
            borderColor: "#4c51bf",
            fill: true,
        },
        ],
    },
    });
}
newUsers();

function boughtCourses() {
    const activeUsersChart = new Chart("bought-courses-chart", {
    type: "line",
    data: {
        labels: [
        "Aug 25",
        "Aug 26",
        "Aug 27",
        "Aug 28",
        "Aug 29",
        "Aug 30",
        "Aug 31",
        "Sep 1",
        ],
        datasets: [
        {
            label: "Bought courses",
            data: [16, 35, 55, 27, 10, 12, 50, 90],
            borderColor: "#4c51bf",
            fill: true,
        },
        ],
    },
    });
}
boughtCourses();

function newCourses() {
    const activeUsersChart = new Chart("new-courses-chart", {
    type: "line",
    data: {
        labels: [
        "Aug 25",
        "Aug 26",
        "Aug 27",
        "Aug 28",
        "Aug 29",
        "Aug 30",
        "Aug 31",
        "Sep 1",
        ],
        datasets: [
        {
            label: "New courses",
            data: [2, 1, 3, 0, 0, 3, 5, 1],
            borderColor: "#4c51bf",
            fill: true,
        },
        ],
    },
    });
}
newCourses();

function mostBoughtCourses() {
    const activeUsersChart = new Chart("most-bought-courses-chart", {
    type: "bar",
    data: {
        labels: [
        "Introduction to Programming",
        "Introduction to AI",
        "Machine Learning 101",
        "Web Programming",
        "System Security",
        "Git: Basic and Pro",
        "Java: Best Programming Language",
        "System Design",
        ],
        datasets: [
        {
            label: "Most bought courses",
            data: [3000, 2750, 2500, 2000, 1500, 1200, 1000, 800],
            backgroundColor: [
            "#4C51BF",
            "#4C51BF",
            "#4C51BF",
            "#4C51BF",
            "#4C51BF",
            "#4C51BF",
            "#4C51BF",
            "#4C51BF",
            ],
        },
        ],
    },
    });
}
mostBoughtCourses();

function bestInstructor() {
    const activeUsersChart = new Chart("best-instructor-chart", {
    type: "bar",
    data: {
        labels: ["John", "Peter", "Mary", "Jane", "Doe"],
        datasets: [
        {
            label: "Best instructor sold",
            data: [7231, 3456, 3111, 2000, 1500],
            backgroundColor: [
            "#4C51BF",
            "#4C51BF",
            "#4C51BF",
            "#4C51BF",
            "#4C51BF",
            ],
        },
        ],
    },
    });
}
bestInstructor();