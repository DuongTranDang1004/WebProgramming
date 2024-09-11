document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('courseId'); // Get the courseId parameter
    console.log(courseId);
    // const courseId = '66dd9c752e81ca3eaac0f42a';

    fetch(`http://localhost:3000/courses/${courseId}`)
        .then(response => response.json())
        .then(course => {
            // Populate form fields
            document.getElementById('title').value = course.name || '';
            document.getElementById('category').value = course.category || '';
            // document.getElementById('price').value = course.price || '';
            document.getElementById('description').value = course.description || '';
        })
        .catch(error => {
            console.error('Error fetching course data:', error);
        });
});

const links = document.querySelectorAll('.sidebar-link');
const sections = document.querySelectorAll('.content-section');

links.forEach(link => {
    link.addEventListener('click', () => {
        const target = link.getAttribute('data-target');
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === target) {
                section.classList.add('active');
            }
        });
    });
});

document.getElementById('curriculum-btn').addEventListener('click', function () {
    var dropdownMenu = document.getElementById('dropdown-menu');
    dropdownMenu.classList.toggle('hidden');
});

// Close dropdown menu
document.getElementById('close-dropdown').addEventListener('click', function () {
    var dropdownMenu = document.getElementById('dropdown-menu');
    dropdownMenu.classList.add('hidden');
});

// Show lecture form
document.getElementById('lecture-btn').addEventListener('click', function () {
    document.getElementById('dropdown-menu').classList.add('hidden');
    document.getElementById('lecture-form').classList.remove('hidden');
});

// Add quiz button
document.getElementById('add-quiz').addEventListener('click', function () {
    const template = document.getElementById('quiz-form-template').content.cloneNode(true);
    document.getElementById('quiz-container').appendChild(template);
});

// Close lecture form
document.getElementById('close-lecture-form').addEventListener('click', function () {
    document.getElementById('lecture-form').classList.add('hidden');
});

// Add section
document.getElementById('section-btn').addEventListener('click', function () {
    document.getElementById('dropdown-menu').classList.add('hidden');
    document.getElementById('section-form').classList.remove('hidden');
});

// Add section
document.getElementById('add-section').addEventListener('click', function () {
const sectionName = document.getElementById('section-name').value;
if (sectionName) {
    const sectionTitle = document.getElementById('section-title');
    sectionTitle.textContent = `Unpublished Section: ${sectionName}`;
    document.getElementById('section-form').classList.add('hidden');
}
});

// Hide section form
document.getElementById('cancel-section').addEventListener('click', function () {
    document.getElementById('section-form').classList.add('hidden');
});

// Function to handle lecture submission (for sidebar button)
document.getElementById('sidebar-submit-button').addEventListener('click', function () {
// Handle lecture submission here
});


function createCourse() {

    // Fetch the number of lectures for the course
        fetch(`http://localhost:3000/lectures/course/{courseId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch lectures. Response status: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
                const lectures = Array.isArray(data) ? data : [];;
                const lectureCount = lectures.length; // If no lectures, length will be 0
                console.log(`Number of lectures: ${lectureCount}`); 
            }).catch(error => {
                console.error('Error fetching lectures:', error);
            });

    // Proceed with lecture creation after fetching the lecture count

    const name = document.querySelector('#lecture-name');
    const description = document.querySelector('#lecture-description');
    const video = document.querySelector('#video');
    const exerciseQuestion = document.querySelector('#quiz-title');
    const incorrectAnswer1 = document.querySelector('#incorrect-answer-1');
    const incorrectAnswer2 = document.querySelector('#incorrect-answer-2');
    const incorrectAnswer3 = document.querySelector('#incorrect-answer-3');
    const correctAnswer = document.getElementById('correct-answer');

    // Check if all elements exist
    if (!name || !description || !video || !exerciseQuestion || !incorrectAnswer1 || !incorrectAnswer2 || !incorrectAnswer3 || !correctAnswer) {
        console.error('One or more elements could not be found in the DOM. Please check your element IDs.');
        return;  // Stop the function if any element is not found
    }

    const nameValue = name.value;
    const descriptionValue = description.value;
    const videoValue = video.value;
    const exerciseQuestionValue = exerciseQuestion.value;
    const options = [
        incorrectAnswer1.value,
        incorrectAnswer2.value,
        incorrectAnswer3.value
    ];
    const correctAnswerValue = correctAnswer.value;

    // Construct the exercise if it exists
    const exercise = exerciseQuestionValue ? {
        question: exerciseQuestionValue,
        options,
        correctAnswer: correctAnswerValue
    } : null;

    // Construct the lecture data
    const lectureData = {
        courseId,
        name: nameValue,
        description: descriptionValue,
        video: videoValue,
        exercise,
        index: lectureCount + 1,
    };

    // Send POST request to create the lecture
    fetch('http://localhost:3000/lectures', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(lectureData),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    /* })
    .catch(error => {
        console.error('Error fetching lectures:', error);
    }); */
}
