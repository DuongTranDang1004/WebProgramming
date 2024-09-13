const instructorId = localStorage.getItem("id");

document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname.split('/').pop().split('.')[0]; // Get the base filename without extension
    document.querySelectorAll('#sidebar .sidebar-item').forEach(item => {
        if (item.getAttribute('data-page') === path) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const sortSelect = document.getElementById('sort-select');
    
    // Fetch and display courses on page load
    fetchCourses(sortSelect.value);
    
    // Add event listener for sorting options
    sortSelect.addEventListener('change', () => {
        fetchCourses(sortSelect.value);
    });
});

function fetchCourses(sortOrder) {
    fetch(`/api/courses/instructor/${instructorId}`)
        .then(response => response.json())
        .then(data => {
            // Sort courses based on selected sort order
            if (sortOrder === 'newest') {
                data.sort((a, b) => b.createTime.localeCompare(a.createTime)); // Assuming `date` field is available
            } else if (sortOrder === 'oldest') {
                data.sort((a, b) => a.createTime.localeCompare(b.createTime));
            } 
            // Optionally handle 'mostPopular' sorting if needed

            // Display courses
            const courseList = document.getElementById('course-list');
            if (data.length === 0) {
                courseList.innerHTML = '<p>No courses available.</p>';
            } else {
                courseList.innerHTML = data.map(course => `
                    <a href="/instructors/createCourse?courseId=${course._id}" class="block border-b py-4">
                        <div class="flex justify-between items-center mb-4">
                            <div>
                                <p class="text-lg font-semibold">${course.name}</p>
                                <p class="text-sm text-gray-500">${course.status} • ${course.isPublish ? 'Public' : 'Private'}</p>
                            </div>
                            <div class="text-sm text-gray-700">${course.completionStatus}</div>
                        </div>
                        <div class="h-2 bg-purple-700 w-3/4 rounded"></div>
                    </a>
                `).join('');
            }
        })
        .catch(error => {
            console.error('Error fetching courses:', error);
        });
}

document.querySelectorAll('#sidebar .sidebar-item a').forEach(item => {
    item.addEventListener('click', function() {
        // Save active state to local storage
        localStorage.setItem('activePage', this.parentElement.getAttribute('data-page'));
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const activePage = localStorage.getItem('activePage');
    if (activePage) {
        document.querySelectorAll('#sidebar .sidebar-item').forEach(item => {
            if (item.getAttribute('data-page') === activePage) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
});