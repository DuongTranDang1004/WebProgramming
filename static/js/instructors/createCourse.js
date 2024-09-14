document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('courseId'); // Get the courseId parameter
    console.log(courseId);
    // const courseId = '66dd9c752e81ca3eaac0f42a';

    fetch(`/api/courses/${courseId}`)
        .then(response => response.json())
        .then(course => {
            // Populate form fields
            document.getElementById('title').value = course.name || '';
            document.getElementById('category').value = course.category || '';
            document.getElementById('price').value = course.price || '';
            document.getElementById('description').value = course.description || '';
        })
        .catch(error => {
            console.error('Error fetching course data:', error);
        });
});

async function updateCourse() {
    const courseId = new URLSearchParams(window.location.search).get('courseId');

    // Collect data from the form
    const name = document.getElementById("title").value;
    const category = document.getElementById("category").value;
    const price = document.getElementById("price").value;
    const description = document.getElementById("description").value;
    // Create formData object if image is uploaded, else regular object
    const formData = {
        name,
        category,
        price,
        description,
    };

    try {
        const response = await fetch(`/api/courses/${courseId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert('Course updated successfully!');
        } else {
            alert('Failed to update course. Please try again.');
        }
    } catch (error) {
        console.error('Error updating course:', error);
        alert('An error occurred while updating the course.');
    }
}


const links = document.querySelectorAll('.sidebar-link');
const sections = document.querySelectorAll('.content-section');

const defaultSection = 'curriculum';
document.getElementById(defaultSection).classList.add('active');

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

// Get courseID from query string
const courseId = new URLSearchParams(window.location.search).get('courseId');
let currentIndex = 1;
let isEdit = false;
let currentEditId = null;

const lectureList = document.getElementById('lectureBody');
const lectureModal = document.getElementById('lectureModal');
const modalTitle = document.getElementById('modalTitle');
const lectureTitleInput = document.getElementById('lectureTitle');
const lectureDescriptionInput = document.getElementById('lectureDescription');
const videoInput = document.getElementById('lectureVideo');
const quizQuestionInput = document.getElementById('quizQuestion');
const answerInputs = [document.getElementById('answer1'), document.getElementById('answer2'), document.getElementById('answer3')];
const correctAnswerInput = document.getElementById('correctAnswer');

async function getLecture() {
    try {
        const response = await fetch(`/api/lectures/course/${courseId}`);
        const data = await response.json();

        lectureList.innerHTML = '';
        data.forEach(lecture => {
            const newRow = document.createElement('tr');
            newRow.dataset.id = lecture._id;
            newRow.classList.add('border-b', 'border-gray-200', 'hover:bg-gray-100');
            newRow.innerHTML = `
                <td class="py-3 px-6">
                    <video class="w-24 h-auto" controls>
                        <source src="${lecture.video}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </td>
                <td class="py-3 px-6">${lecture.name}</td>
                <td class="py-3 px-6 text-center">
                    <button class="editLectureBtn px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-yellow-600 mx-2">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="deleteLectureBtn px-4 py-2 bg-gray-300 text-white rounded-lg hover:bg-red-600">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </td>
            `;
            lectureList.appendChild(newRow);
            addEventListeners(newRow);
        });
    } catch (error) {
        console.error('Error fetching lectures:', error);
    }
}

function addEventListeners(row) {
    const editButton = row.querySelector('.editLectureBtn');
    const deleteButton = row.querySelector('.deleteLectureBtn');
    const lectureId = row.dataset.id;

    editButton.addEventListener('click', () => editLecture(lectureId));
    deleteButton.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this lecture?')) {
            deleteLecture(lectureId);
        }
    });
}

async function editLecture(lectureId) {
    try {
        const response = await fetch(`/api/lectures/${lectureId}`);
        const lecture = await response.json();

        lectureTitleInput.value = lecture.lecture.name;
        lectureDescriptionInput.value = lecture.lecture.description;
        quizQuestionInput.value = lecture.lecture.exercise.question || '';
        answerInputs[0].value = lecture.lecture.exercise.options[0];
        answerInputs[1].value = lecture.lecture.exercise.options[1];
        answerInputs[2].value = lecture.lecture.exercise.options[2];
        correctAnswerInput.value = lecture.lecture.exercise.correctAnswer;

        isEdit = true;
        currentEditId = lectureId;
        modalTitle.textContent = 'Edit Lecture';
        lectureModal.classList.remove('hidden');
    } catch (error) {
        console.error('Error fetching lecture details:', error);
    }
}

async function saveLecture() {

    let existingVideo = null;

    if (isEdit) {
        // Fetch the existing lecture details to get the current video URL
        try {
            const response = await fetch(`/api/lectures/${currentEditId}`);
            const result = await response.json();
            existingVideo = result.lecture.video;
        } catch (error) {
            console.error('Error fetching lecture details:', error);
            alert('Failed to fetch lecture details. Please try again.');
            return;
        }
    }

    const lecture = {
        courseId: courseId,
        name: lectureTitleInput.value,
        description: lectureDescriptionInput.value,
        video: videoInput.files.length > 0 ? null : existingVideo,
        exercise: {
            question: quizQuestionInput.value,
            options: answerInputs.map(input => input.value),
            correctAnswer: correctAnswerInput.value
        },
        index: currentIndex 
    };
    console.log('Lecture object:', lecture);
    const url = isEdit
        ? `/api/lectures/${currentEditId}`
        : `/api/lectures`;
    const method = isEdit ? 'PUT' : 'POST';

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(lecture)
        });
        console.log('Response status:', response.status);
        if (response.ok) {

            const savedLecture = await response.json();
            const lectureId = savedLecture.lecture._id;
            console.log("Lecture ID:", lectureId);

            if (videoInput.files.length > 0) {
                if (lectureId) { 
                    await uploadVideo(lectureId);
                } else {
                    console.error("Error: Lecture ID is undefined");
                }
            }

            alert(isEdit ? 'Lecture updated successfully!' : 'Lecture added successfully!');
            getLecture();
            closeModal();
        } else {
            alert('Failed to save lecture. Please try again.');
        }
    } catch (error) {
        console.error('Error saving lecture:', error);
    }
}

async function uploadVideo(lectureId) {
    const formData = new FormData();
    formData.append('video', videoInput.files[0]);

    try {
        const response = await fetch(`/api/lectures/upload/${lectureId}`, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert('Video uploaded successfully!');
        } else {
            alert('Failed to upload video. Please try again.');
        }
    } catch (error) {
        console.error('Error uploading video:', error);
    }
}

async function deleteLecture(lectureId) {


    try {
        const response = await fetch(`/api/lectures/${lectureId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Lecture deleted successfully!');
            getLecture();
        } else {
            alert('Failed to delete lecture. Please try again.');
        }
    } catch (error) {
        console.error('Error deleting lecture:', error);
    }
}

function closeModal() {
    lectureModal.classList.add('hidden');
    isEdit = false;
    currentEditId = null;
    lectureTitleInput.value = '';
    lectureDescriptionInput.value = '';
    videoInput.value = '';
    quizQuestionInput.value = '';
    answerInputs.forEach(input => input.value = '');
    correctAnswerInput.value = '';
}

document.getElementById('addLectureBtn').addEventListener('click', () => {
    modalTitle.textContent = 'Add Lecture';
    lectureModal.classList.remove('hidden');
    currentIndex++; // Increment index for new lectures
});

document.getElementById('closeModalBtn').addEventListener('click', closeModal);
document.getElementById('saveLectureBtn').addEventListener('click', saveLecture);

getLecture();
