// document.addEventListener("DOMContentLoaded", async function () {
//   // Function to fetch all favorite courses by learnerId
//   const fetchFavoriteCourses = async (learnerId) => {
//     try {
//       const response = await fetch(
//         `/api/favoritesCourses/learner/${learnerId}`
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch favorite courses");
//       }
//       return await response.json(); // Assuming the response is in JSON format
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//     }
//   };

//   // Function to render favorite courses
//   const renderFavoriteCourses = (courses) => {
//     const courseContainer = document.getElementById("coursesContainerS"); // Correct ID
//     courseContainer.innerHTML = ""; // Clear previous content

//     courses.forEach((course) => {
//       const courseHTML = `
//         <div class="course-item">
//           <h3>${course.courseId.name}</h3>
//           <p>Category: ${course.courseId.category}</p>
//           <p>Price: $${course.courseId.price}</p>
//           <p>Description: ${course.courseId.description}</p>
//         </div>
//       `;
//       courseContainer.innerHTML += courseHTML;
//     });
//   };

//   // Get learnerId from the URL (assumed to be the last part of the URL)
//   const urlSegments = window.location.pathname.split("/");
//   const learnerId = urlSegments[urlSegments.length - 1]; // Get the last segment of the URL

//   console.log("Extracted learnerId:", learnerId); // Check if learnerId is correct

//   // Fetch the favorite courses using the extracted learnerId
//   const favoriteCourses = await fetchFavoriteCourses(learnerId);

//   if (favoriteCourses) {
//     // Render favorite courses
//     renderFavoriteCourses(favoriteCourses);
//   }
// });
