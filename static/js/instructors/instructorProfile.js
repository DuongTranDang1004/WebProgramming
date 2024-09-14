// Function to fetch instructor details by ID
const urlParams = new URLSearchParams(window.location.search);
const instructorId = urlParams.get('instructorId');

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
                if(!data.Bio == null && data.Bio == ""){
                    document.getElementById('bio').textContent = data.Bio;
                }
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

document.getElementById('favoriteBtn').addEventListener('click', async () => {
    try {
        const favoriteData = {
            learnerId: localStorage.getItem("id"),
            instructorId: instructorId
        };

        await fetch(`http://localhost:3000/api/followingInstructors`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(favoriteData),
        });

        // Update the heart icon to reflect favorited status
        document.getElementById('heartIcon').classList.add('text-red-600');
        alert('Course added to favorites');
    } catch (error) {
        console.error('Error adding to favorites:', error);
        alert('Failed to add course to favorites');
    }
});

function createCourseCard(c) {
    return `
        <div class="bg-white shadow-lg rounded-lg overflow-hidden">
            <a href="/courses/detail/${c._id}" style="text-decoration: none;">
                <img src="${c.thumbnailImage}" alt="${c.name}" class="w-full h-48 object-cover">
                <div class="p-6">
                    <h2 class="text-xl font-bold mb-2">${c.name}</h2>
                    <p class="text-gray-700 mb-4">${c.description}</p>
                    <span class="text-lg font-semibold text-green-600">Price: $${c.price}</span>
                </div>
            </a>
        </div>
    `;
}

// Fetch data when the page loads
fetchInstructor();
card();