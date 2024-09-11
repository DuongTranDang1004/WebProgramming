document.addEventListener('DOMContentLoaded', function () {
const sidebar = document.getElementById('sidebar');
const toggleSidebarDesktop = document.getElementById('toggleSidebarDesktop');
const toggleSidebarMobile = document.getElementById('toggleSidebarMobile');

toggleSidebarDesktop.addEventListener('click', function () {
    sidebar.classList.toggle('sidebar-hidden');
});

toggleSidebarMobile.addEventListener('click', function () {
    sidebar.classList.toggle('sidebar-active');
});

// Close sidebar when a lecture is selected (for tablet/phone)
document.querySelectorAll('.lecture-link').forEach(link => {
    link.addEventListener('click', function () {
        sidebar.classList.remove('sidebar-active');
    });
});

const urlParams = new URLSearchParams(window.location.search);
const courseId = "66e07cb88a0cafe880f72f51";
const boughtCourseId = "66e07cb98a0cafe880f72fe3"; // Replace with dynamic value if needed

if (courseId) {
    fetchCourseDetails();
    fetchLectures();
}

function fetchCourseDetails() {
    fetch(`/api/courses/${courseId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('course1').textContent = data.name;
            document.getElementById('course2').textContent = data.name;
        })
        .catch(error => console.error('Error fetching course details:', error));
}

function fetchLectures() {
    fetch(`/api/lectures/course/${courseId}`)
        .then(response => response.json())
        .then(data => {
            const lectureList = document.getElementById('lecture-list');
            lectureList.innerHTML = ''; // Clear existing list

            data.forEach(lecture => {
                const lectureItem = document.createElement('li');
                lectureItem.classList.add('flex', 'items-center');
                lectureItem.innerHTML = `
                    <span class="mr-2" id="status-${lecture._id}">
                        ❌ <!-- Default status -->
                    </span>
                    <a href="#" data-lecture-id="${lecture._id}" class="hover:text-purple-600 lecture-link">${lecture.name}</a>
                `;
                lectureList.appendChild(lectureItem);
            });

            // Add event listener to each lecture link
            document.querySelectorAll('.lecture-link').forEach(link => {
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    const lectureId = this.getAttribute('data-lecture-id');
                    fetchLectureDetails(lectureId);
                });
            });

            // Update sidebar with completion status
            fetch(`/api/boughtCourses/${boughtCourseId}`)
                .then(response => response.json())
                .then(boughtCourse => {
                    const lectureStatuses = boughtCourse.lectureCompletionStatus;
                    lectureStatuses.forEach(status => {
                        const statusElement = document.getElementById(`status-${status.lectureId}`);
                        if (statusElement) {
                            if (status.completeStatus) {
                                statusElement.textContent = '✅'; // Completed
                            } else {
                                statusElement.textContent = '❌'; // Not completed
                            }
                        }
                    });
                })
                .catch(error => console.error('Error fetching bought course details:', error));
        })
        .catch(error => console.error('Error fetching lectures:', error));
}

function fetchLectureDetails(lectureId) {
    fetch(`/api/lectures/${lectureId}`)
        .then(response => response.json())
        .then(data => {
            const lecture = data.lecture;
            document.getElementById('current-lecture').textContent = lecture.name;
            document.getElementById('lecture-title').textContent = lecture.name;
            document.getElementById('video').src = lecture.video;
            document.getElementById('lecture-duration').textContent = `${lecture.index} min`;

            const exercise = lecture.exercise;
            document.getElementById('question').textContent = exercise.question;

            const optionsContainer = document.getElementById('options');
            optionsContainer.innerHTML = ''; // Clear any previous options

            exercise.options.forEach(option => {
                const optionElement = document.createElement('div');
                optionElement.classList.add('option');
                optionElement.innerHTML = `
                    <label class="inline-flex items-center">
                        <input type="radio" name="option" value="${option}" class="form-radio">
                        <span class="ml-2">${option}</span>
                    </label>`;
                optionsContainer.appendChild(optionElement);
            });

            // Fetch bought course details to check completion status
            fetch(`/api/boughtCourses/${boughtCourseId}`)
                .then(response => response.json())
                .then(boughtCourse => {
                    const lectureStatus = boughtCourse.lectureCompletionStatus.find(status => status.lectureId === lectureId);

                    const exerciseForm = document.getElementById('exerciseForm');
                    const submitButton = exerciseForm.querySelector('button[type="submit"]');
                    const resultElement = document.getElementById('result');

                    if (lectureStatus && lectureStatus.completeStatus) {
                        // Lecture already completed
                        submitButton.style.display = 'none'; // Hide submit button
                        resultElement.textContent = "You have already completed this lecture.";
                        resultElement.classList.add('text-gray-600');

                        // Display the previous answer if available
                        const userAnswer = boughtCourse.userAnswers.find(answer => answer.lectureId === lectureId);
                        if (userAnswer) {
                            resultElement.textContent = `Your previous answer: ${userAnswer.answer}. ${userAnswer.correct ? 'Correct!' : 'Incorrect.'}`;
                            resultElement.classList.add(userAnswer.correct ? 'text-green-600' : 'text-red-600');
                        }
                    } else {
                        submitButton.style.display = 'block'; // Show submit button

                        exerciseForm.addEventListener('submit', function (e) {
                            e.preventDefault();
                            const selectedOption = document.querySelector('input[name="option"]:checked');

                            if (selectedOption) {
                                const userAnswer = selectedOption.value;

                                const requestBody = {
                                    boughtCourseId: boughtCourseId,
                                    lectureId: lectureId,
                                    userAnswer: userAnswer
                                };

                                fetch(`/api/lectures/markLecture`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(requestBody)
                                })
                                .then(response => response.json())
                                .then(result => {
                                    if (userAnswer === exercise.correctAnswer) {
                                        resultElement.textContent = "Correct! 🎉";
                                        resultElement.classList.add('text-green-600');
                                    } else {
                                        resultElement.textContent = "Incorrect. Try again!";
                                        resultElement.classList.add('text-red-600');
                                    }
                                    // Disable the submit button after submission
                                    submitButton.disabled = true;
                                })
                                .catch(error => {
                                    console.error('Error submitting the answer:', error);
                                });
                            }
                        });
                    }
                })
                .catch(error => console.error('Error fetching bought course details:', error));
        })
        .catch(error => console.error('Error fetching lecture details:', error));
}
});