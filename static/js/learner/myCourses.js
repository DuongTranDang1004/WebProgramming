document.addEventListener("DOMContentLoaded", async function () {
  // Get the learnerId from the URL path
  function getLearnerIdFromUrl() {
    const url = window.location.href; // Get the full URL
    const parts = url.split("/"); // Split the URL by '/'
    return parts[parts.length - 1]; // Get the last part of the URL, which is the learnerId
  }

  const learnerId = getLearnerIdFromUrl(); // Extract learnerId dynamically

  // Fetch all bought courses with thumbnails for the learner
  const fetchBoughtCourses = async (learnerId) => {
    try {
      const response = await fetch(
        `/api/boughtCourses/learnerWithThumbnail/${learnerId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch bought courses");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching bought courses:", error);
    }
  };

  const renderBoughtCourses = (courses) => {
    const boughtCoursesContainer = document.getElementById(
      "display-bought-courses"
    );
    const learningCoursesContainer = document.getElementById(
      "display-learning-courses"
    );
    const completedCoursesContainer = document.getElementById(
      "display-completed-courses"
    );
    const certificateContainer = document.getElementById("display-cert");

    // Clear previous content
    boughtCoursesContainer.innerHTML = "";
    learningCoursesContainer.innerHTML = "";
    completedCoursesContainer.innerHTML = "";
    certificateContainer.innerHTML = "";

    // Add headers for each section
    boughtCoursesContainer.innerHTML += `<h1>All of my bought courses</h1>`;
    learningCoursesContainer.innerHTML += `<h1>Learning / On-Progress Courses</h1>`;
    completedCoursesContainer.innerHTML += `<h1>Completed Courses</h1>`;
    certificateContainer.innerHTML += `<h1>Certificates</h1>`;

    courses.forEach((course) => {
      const courseName = course.courseInfo.name;
      const thumbnailImage = course.courseInfo.thumbnailImage;
      const completionDate = course.completionDateTime;
      const courseCompletionStatus = course.courseCompletionStatus;
      const isCertificate = course.isCertificate;

      // For displaying all bought courses
      const boughtCourseHTML = `
        <div class="bought-course-item">
          <h2>${courseName}</h2>
          <img id="thumbnail-image" src="${thumbnailImage}" alt="Course Image" />
        </div>`;
      boughtCoursesContainer.innerHTML += boughtCourseHTML;

      // For displaying learning/on progress courses (courseCompletionStatus = false)
      if (!courseCompletionStatus) {
        const learningCourseHTML = `
          <div class="learning-course-item">
            <h2 id="course-name">${courseName}</h2>
            <img id="thumbnail-image" src="${thumbnailImage}" alt="Course Image" />
            <h3 id="learning-progress">Progress: In Progress</h3>
          </div>`;
        learningCoursesContainer.innerHTML += learningCourseHTML;
      }

      // For displaying completed courses (courseCompletionStatus = true)
      if (courseCompletionStatus) {
        const completedCourseHTML = `
          <div class="completed-course-item">
            <h2 id="course-name">${courseName}</h2>
            <img id="thumbnail-image" src="${thumbnailImage}" alt="Course Image" />
            <h3 id="completion-date">Completion Date: ${new Date(
              completionDate
            ).toLocaleDateString()}</h3>
          </div>`;
        completedCoursesContainer.innerHTML += completedCourseHTML;
      }

      // For displaying certificates (isCertificate = true + courseCompletionStatus = true)
      if (isCertificate && courseCompletionStatus) {
        const certificateHTML = `
          <div class="cert-item">
            <img id="IT-learning-logo" src="/img/Logo.png" alt="" width="50" height="50" />
            <h1>Completion Certificate</h1>
            <h4>has been presented to</h4>
            <h2 id="learnerName">Learner's Name</h2>
            <h4>on ${new Date(completionDate).toLocaleDateString()}</h4>
            <h2>to the Course of <span id="course-name">${courseName}</span></h2>
          </div>`;
        certificateContainer.innerHTML += certificateHTML;
      }
    });
  };

  // Fetch courses and render them
  const courses = await fetchBoughtCourses(learnerId);
  if (courses) {
    renderBoughtCourses(courses);
  }
});
