document.addEventListener("DOMContentLoaded", async function () {
  // Function to fetch all bought courses by learnerId
  const fetchBoughtCourses = async (learnerId) => {
    try {
      const response = await fetch(`/api/boughtCourses/learner/${learnerId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      return await response.json(); // Assuming the response is in JSON format
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // Render function for bought courses
  const renderBoughtCourses = (courses) => {
    const boughtCoursesContainer = document.getElementById(
      "display-bought-courses"
    );
    boughtCoursesContainer.innerHTML = ""; // Clear previous content

    courses.forEach((course) => {
      const courseHTML = `
          <div class="bought-course-item">
            <h2>${course.courseInfo.name}</h2>
            <img src="https://picsum.photos/seed/${course._id}/640/480" alt="Course Image">
          </div>
        `;
      boughtCoursesContainer.innerHTML += courseHTML;
    });
  };

  // Render function for learning courses (on progress)
  const renderLearningCourses = (courses) => {
    const learningCoursesContainer = document.getElementById(
      "display-learning-coures"
    );
    learningCoursesContainer.innerHTML = ""; // Clear previous content

    courses.forEach((course) => {
      const progress = Math.floor(Math.random() * 100); // You can calculate real progress
      const courseHTML = `
          <div class="learning-course-item">
            <h2>${course.courseInfo.name}</h2>
            <img src="https://picsum.photos/seed/${course._id}/640/480" alt="Course Image">
            <h3>Progress: ${progress}%</h3>
          </div>
        `;
      learningCoursesContainer.innerHTML += courseHTML;
    });
  };

  // Render function for completed courses
  const renderCompletedCourses = (courses) => {
    const completedCoursesContainer = document.getElementById(
      "display-completed-courses"
    );
    completedCoursesContainer.innerHTML = ""; // Clear previous content

    courses.forEach((course) => {
      const courseHTML = `
          <div class="completed-course-item">
            <h2>${course.courseInfo.name}</h2>
            <img src="https://picsum.photos/seed/${
              course._id
            }/640/480" alt="Course Image">
            <h3>Completion Date: ${new Date(
              course.completionDateTime
            ).toLocaleDateString()}</h3>
          </div>
        `;
      completedCoursesContainer.innerHTML += courseHTML;
    });
  };

  // Render function for certificates
  const renderCertificates = (courses) => {
    const certificatesContainer = document.getElementById("display-cert");
    certificatesContainer.innerHTML = ""; // Clear previous content

    courses.forEach((course) => {
      const certHTML = `
          <div class="cert-item">
            <img id="IT-learning-logo" src="https://picsum.photos/seed/cert${
              course._id
            }/640/480" alt="Certificate Image">
            <h1>Completion Certificate</h1>
            <h4>has been presented to</h4>
            <h2 id="learnerName">Your Name</h2>
            <h4>on ${new Date(
              course.completionDateTime
            ).toLocaleDateString()}</h4>
            <h2>to the Course of <span>${course.courseInfo.name}</span></h2>
          </div>
        `;
      certificatesContainer.innerHTML += certHTML;
    });
  };

  // Extract the learnerId from the URL (assumed to be the last part of the URL)
  const urlSegments = window.location.pathname.split("/");
  const learnerId = urlSegments[urlSegments.length - 1]; // Get the last segment of the URL

  console.log("Extracted learnerId:", learnerId); // Verify that the learnerId is correct

  // Fetch the bought courses using the extracted learnerId
  const boughtCourses = await fetchBoughtCourses(learnerId);

  if (boughtCourses) {
    // Distinguish between courses
    const allBoughtCourses = boughtCourses; // All bought courses
    const learningCourses = boughtCourses.filter(
      (course) => !course.courseCompletionStatus
    ); // Courses that are in progress
    const completedCourses = boughtCourses.filter(
      (course) => course.courseCompletionStatus
    ); // Completed courses
    const certificateCourses = boughtCourses.filter(
      (course) => course.isCertificate
    ); // Courses with certificates

    // Render courses
    renderBoughtCourses(allBoughtCourses);
    renderLearningCourses(learningCourses);
    renderCompletedCourses(completedCourses);
    renderCertificates(certificateCourses);
  }
});
