let courseName = '';
let coursePrice = '';
let courseImg = '';

function formatPrice(price) {
    let formattedPrice = price.toLocaleString('vi-VN'); 
    if (Number.isInteger(price)) {
        formattedPrice += '.000';
    }
    return formattedPrice;
}
const courseId = window.location.pathname.split("/")[window.location.pathname.split("/").length - 1];

// Function to fetch course details and lectures
async function fetchCourseDetails() {
    try {
        // Fetch course details
        const courseResponse = await fetch(`/api/courses/${courseId}`);
        if (!courseResponse.ok) throw new Error('Failed to fetch course details');
        const courseData = await courseResponse.json();

        courseName = courseData.name;
        instructorId = courseData.instructorId;
        coursePrice = formatPrice(courseData.price);
        courseImg = courseData.thumbnailImage;

        await displayCourseDetails(courseData);

        // Fetch lectures
        const lecturesResponse = await fetch(`/api/lectures/course/${courseId}`);
        if (!lecturesResponse.ok) throw new Error('Failed to fetch lectures');
        const lecturesData = await lecturesResponse.json();
        displayCourseLectures(lecturesData);

    } catch (error) {
        console.error('Error:', error);
        document.getElementById('course-container').innerHTML = '<p>Failed to load course data.</p>';
    }
}

// Function to display course details
async function displayCourseDetails(course) {
    const courseContainer = document.getElementById('course-container');

    // Generate random rating and other details
    const randomRating = (Math.random() * 4 + 1).toFixed(1); // Between 1.0 and 5.0
    const randomRatingCount = Math.floor(Math.random() * (10000 - 30 + 1)) + 100; // Between 100 and 10000
    const randomLearners = Math.floor(Math.random() * (10000 - 1000 + 1)) + 100;

    const instructor = await (await fetch(`/api/instructors/${course.instructorId}`, { method: "GET" })).json();

    courseContainer.innerHTML = `
        <!-- Breadcrumb -->
        <div class="text-sm mb-4 text-gray-600">
            <a href="#" class="hover:underline">Home</a> >
            <a href="#" class="hover:underline">${course.category}</a> > 
            <a href="#" class="text-gray-900 hover:underline">${course.name}</a>
        </div>

        <!-- Course Image -->
        <div class="mb-6">
            <img src="${course.thumbnailImage}" alt="${course.name}" class="w-full h-auto rounded-lg shadow-lg" style="width: 1300px; height: 300px; object-fit: cover;">
        </div>

        <!-- Course Header -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="col-span-2">
                <h1 class="text-3xl font-bold">${course.name}</h1>
                <p class="text-lg mt-2">Get yourself overwhelmed with fantastic contents our course provide</p>
                <button id="tryBtn" class="mt-2 bg-purple-600 text-white py-2 px-4 rounded-md">Start Trial</button>
                <div class="flex items-center mt-4">
                    <span class="text-yellow-400 text-xl">★ ${randomRating}</span>
                    <span class="ml-2 text-gray-600">(${randomRatingCount} ratings)</span>
                    <span class="ml-4 text-gray-600">${randomLearners} learners by far</span>
                </div>
                <p class="mt-2 text-gray-600">Course by <a href="#" class="text-indigo-600 hover:underline">${instructor.firstName} ${instructor.lastName}</a></p>
                <p class="text-gray-500">Date: ${new Date(course.createTime).toLocaleDateString()}</p>

                <!-- Placeholder for Course Lectures (will be dynamically inserted) -->
                <div id="course-lectures"></div>

                <!-- Description -->
                <div class="mt-8">
                    <h2 class="text-2xl font-semibold">Course Description</h2>
                    <p class="text-gray-700 mt-4 leading-relaxed">
                        ${course.description}
                    </p>
                </div>
            </div>

            <!-- Sidebar (Price and Buy Section) -->
            <div class="bg-white p-6 shadow-lg rounded-lg">
                <p class="text-3xl font-semibold text-purple-600"> ${formatPrice(course.price)} đ</p>
                <div class="flex items-center">
                    <!-- Add to Cart Button -->
                    <button class=" add-to-cart mt-4 bg-purple-600 text-white py-2 px-4 mr-5 w-full rounded-md" data-id="courseId" data-name="courseName" data-price="coursePrice">Add to cart</button>
                    <!-- Heart Icon Button -->
                    <button id="favoriteBtn" class="text-red-500 border border-gray-300 p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" id="heartIcon">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                    </button>
                </div>
                <button id="buyNowBtn" class="mt-2 border border-purple-600 text-purple-600 py-2 px-4 w-full rounded-md">Buy now</button>
                <button id="withoutCert" class="mt-2 border border-purple-600 text-purple-600 py-2 px-4 w-full rounded-md">Buy without certificate?</button>
                <p class="text-gray-500 mt-2">&copy; Certified by ITLearning</p>
                <div class="mt-6">
                    <h4 class="font-semibold">This course include:</h4>
                    <ul class="mt-2 space-y-2 text-gray-700">
                        <li>✔️ 30 minutes videos</li>
                        <li>✔️ Quizzes</li>
                        <li>✔️ Full access on many devices: include phone, tablet, and laptops</li>
                        <li>✔️ Lifetime access</li>
                        <li>✔️ Certificate</li>
                    </ul>
                </div>
            </div>
        </div>
    `;

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const courseId = course._id;
            const courseName = course.name;
            const coursePrice = course.price;
            const courseImage = course.thumbnailImage;
            const instructorId = course.instructorId;
            
            // Get the existing cart from localStorage or set it as an empty array
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
            // Add the course to the cart
            cart.push({
                courseId: courseId,
                name: courseName,
                price: coursePrice,
                image: courseImage,
                instructor: instructorId
            });
    
            // Save the updated cart back to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
    
            alert('Course added to cart');
        });
    });

    // Add event listener for the "Buy now" button
    document.getElementById('buyNowBtn').addEventListener('click', () => {
        const payUrl = new URL(`${window.location.origin}/courses/pay`);
        payUrl.searchParams.append('instructorId', instructorId);
        payUrl.searchParams.append('courseId', courseId);
        payUrl.searchParams.append('courseName', courseName);
        payUrl.searchParams.append('price', coursePrice);
        payUrl.searchParams.append('courseImg', courseImg);
        payUrl.searchParams.append('isCertificate', true);

        window.location.href = payUrl.toString();
    });

    const learner = await (await fetch(`/api/learners/${localStorage.getItem("id")}`, { method: "GET" })).json();
    document.getElementById('tryBtn').addEventListener('click', async () => {
        const data = {
            learnerId: learner._id,
            courseId: courseId,
            instructorId: instructor._id,
            endDate: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
        }
        await fetch(`/api/boughtCourses/`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });
        window.location.href = `/learners/myCourses/${learner._id}`;
    });

    //Add event listener to buy without cert button
    document.getElementById('withoutCert').addEventListener('click', () => {
        const payUrl = new URL(`${window.location.origin}/courses/pay`);
        payUrl.searchParams.append('instructorId', instructorId);
        payUrl.searchParams.append('courseId', courseId);
        payUrl.searchParams.append('courseName', courseName);
        payUrl.searchParams.append('price', coursePrice);
        payUrl.searchParams.append('courseImg', courseImg);
        payUrl.searchParams.append('isCertificate', false);

        window.location.href = payUrl.toString();
    });


    document.getElementById('favoriteBtn').addEventListener('click', async () => {
        try {
            const favoriteData = {
                learnerId: learner._id,
                courseId: course._id
            };

            await fetch(`http://localhost:3000/api/favoritesCourses`, {
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
}

// Function to display course lectures
function displayCourseLectures(lectures) {
    const lectureCount = lectures.length;
    const lectureTotalTime = lectureCount * 30; // Assuming each lecture is 30 minutes
    const lecturesContainer = document.getElementById('course-lectures');

    const courseContentContainer = document.createElement('div');
    courseContentContainer.classList.add('mt-8');
    courseContentContainer.innerHTML = `
        <h2 class="text-2xl font-semibold">Course content:</h2>
        <p class="text-gray-600 mb-4"> ${lectureCount} lectures • ${lectureTotalTime} mins </p>
        <div id="lecture-list" class="space-y-4 mt-4"></div>
    `;

    const lectureList = courseContentContainer.querySelector('#lecture-list');

    lectures.forEach(lecture => {
        const lectureItem = document.createElement('div');
        lectureItem.classList.add('bg-gray-100', 'p-4', 'rounded-lg');
        lectureItem.innerHTML = `
            <h3 class="text-lg font-semibold">${lecture.name}</h3>
            <p class="text-gray-600 mt-1">${lecture.description}</p>
            <p class="text-gray-500 text-sm mt-1">Duration: 30 mins</p>
        `;
        lectureList.appendChild(lectureItem);
    });

    lecturesContainer.appendChild(courseContentContainer);
}

// Fetch course details on page load
document.addEventListener('DOMContentLoaded', fetchCourseDetails);