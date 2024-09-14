// Function to generate a random rating
function getRandomRating() {
    const rating = (Math.random() * (5 - 3.5) + 3.5).toFixed(1); // Generates random rating between 3.5 and 5.0
    const stars = "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
    return { rating, stars };
}

function getCategoryFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('category');
}

// Fetch top courses 
async function getTopCourses() {
    const response = await fetch("/api/courses/");
    const courses = await response.json();
    const category = getCategoryFromURL();
    const topCourses = courses.filter(course => course.category === category); // Assuming AI category
    const topCoursesContainer = document.getElementById("top-courses");

    topCourses.slice(0, 30).forEach(course => {
        const { rating, stars } = getRandomRating();
        topCoursesContainer.innerHTML += `
        <div class="course-card">
            <a href=/courses/detail/${course._id} style="text-decoration: none;">
                <img src="${course.thumbnailImage}" alt="Course Image">
                <h5>${course.name}</h5>
                <p>${course.instructorId.firstName} ${course.instructorId.lastName}</p>
                <p><strong>${rating}</strong> <span>${stars}</span></p>
                <p>₫${course.price}</p>
            </a>
        </div>`;
    });
}

// Fetch by category
async function getCourses(sortOrder = "newest") {
    const response = await fetch("/api/courses/");
    let courses = await response.json();
    const courseList = document.getElementById("course-list");
    const category = getCategoryFromURL();
    // Filter by category and sort by newest/oldest
    courses = courses.filter(course => course.category === category).sort((a, b) => {
        const dateA = new Date(a.createTime);
        const dateB = new Date(b.createTime);
        return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    courseList.innerHTML = '';

    courses.forEach(course => {
        const { rating, stars } = getRandomRating();
        courseList.innerHTML += `
        <div class="col-md-4">
            <div class="course-card">
                <a href=/courses/detail/${course._id} style="text-decoration: none;">
                    <img src="${course.thumbnailImage}" alt="Course Image">
                    <h5>${course.name}</h5>
                    <p>${course.instructorId.firstName} ${course.instructorId.lastName}</p>
                    <p><strong>${rating}</strong> <span>${stars}</span></p>
                    <p>₫${course.price}</p>
                </a>
            </div>
        </div>`;
    });
}

// Sort courses on sort selection change
function sortCourses() {
    const sortOrder = document.getElementById("sort-courses").value;
    getCourses(sortOrder); 
}

getTopCourses();
getCourses();