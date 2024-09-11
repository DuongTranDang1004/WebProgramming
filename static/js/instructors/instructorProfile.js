// Function to fetch instructor details by ID
const instructorId = localStorage.getItem("id");

function fetchInstructor() {
    if (instructorId) {
        fetch(`/api/instructors/${instructorId}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('instructor-name').textContent = data.firstName + " " + data.lastName;
                document.getElementById('job-title').textContent = data.jobTitle;
                document.getElementById('school').textContent = data.schoolOrCompanyName;
                document.getElementById('instructor-image').src = data.profilePicture;
                document.getElementById('email').textContent = data.email;
                document.getElementById('phone').textContent = data.phone;
                document.getElementById('bio').textContent = data.Bio;
            })
            .catch(error => console.error('Error:', error));
    }
}

function card() {
    if (instructorId) {
        fetch(`/api/courses/instructor/${instructorId}`)
            .then(response => response.json())
            .then(data => {
                const publishedCourses = data.filter(course => course.isPublish);
                let cardContent = ``;
                publishedCourses.forEach(c => cardContent += createCourseCard(c));
                document.querySelector('#card').innerHTML = cardContent;
            });
    }
}

function createCourseCard(c) {
    return `
        <div class="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src="${c.thumbnailImage}" alt="${c.name}" class="w-full h-48 object-cover">
            <div class="p-6">
                <h2 class="text-xl font-bold mb-2">${c.name}</h2>
                <p class="text-gray-700 mb-4">${c.description}</p>
                <span class="text-lg font-semibold text-green-600">Price: $${c.price}</span>
            </div>
        </div>
    `;
}

// Fetch data when the page loads
fetchInstructor();
card();