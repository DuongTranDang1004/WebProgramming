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
const courseId = "66e2ca31196d825b16fc3687";
const boughtCourseId = "66e2ca32196d825b16fc3716"; // Replace with dynamic value if needed

if (courseId) {
    fetchCourseDetails().then(() => {
        fetchLectures();
    });
    // Automatically fetch latest unfinished lecture
}

async function fetchCourseDetails() {
    course = await (await fetch(`/api/courses/${courseId}`)).json();
    document.getElementById('course1').textContent = course.name;
    document.getElementById('course2').textContent = course.name;

    const boughtCourses = await (await fetch(`/api/boughtCourses/learner/${localStorage.getItem('id')}`)).json();
    for (let index = 0; index < boughtCourses.length; index++) {
        if (boughtCourses[index].courseInfo._id === courseId) {
            boughtCourseId = boughtCourses[index]._id;
            break;
        }
    }
}

async function fetchLectures() {
    const lectures = await (await fetch(`/api/lectures/course/${courseId}`)).json();
    const lectureList = document.getElementById('lecture-list');
    lectureList.innerHTML = ''; // Clear existing list

    lectures.forEach(lecture => {
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
    boughtCourse = await (await fetch(`/api/boughtCourses/${boughtCourseId}`)).json();
    const lectureStatuses = boughtCourse.completedLectures;
    for (let index = 0; index < lectureStatuses.length; index++) {
        const status = lectureStatuses[index];
        const statusElement = document.getElementById(`status-${status.lectureId}`);
        if (statusElement) {
            if (status.completeStatus) {
                statusElement.textContent = '✅'; // Completed
            } else {
                statusElement.textContent = '❌'; // Not completed
            }
        }
    }
}

async function fetchLectureDetails(lectureId) {
    const lectures = await (await fetch(`/api/lectures/${lectureId}`)).json();
    const lecture = lectures.lecture;
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
                    const lectureStatus = boughtCourse.completedLectures.find(status => status.lectureId === lectureId);

    const exerciseForm = document.getElementById('exerciseForm');
    const submitButton = exerciseForm.querySelector('button[type="submit"]');
    const resultElement = document.getElementById('result');

    if (lectureStatus && lectureStatus.completeStatus) {
        // Lecture already completed
        submitButton.style.display = 'none'; // Hide submit button
        resultElement.textContent = "You have already completed this lecture.";
        resultElement.classList.add('text-gray-600');

        // Display the previous answer if available
        // const userAnswer = boughtCourse.userAnswers.find(answer => answer.lectureId === lectureId);
        // if (userAnswer) {
        //     resultElement.textContent = `Your previous answer: ${userAnswer.answer}. ${userAnswer.correct ? 'Correct!' : 'Incorrect.'}`;
        //     resultElement.classList.add(userAnswer.correct ? 'text-green-600' : 'text-red-600');
        // }
    } else {
        resultElement.textContent = ''; // Clear previous
        submitButton.style.display = 'block'; // Show submit button

        exerciseForm.addEventListener('submit', async function (e) {
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
                                    console.log('Answer received')
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