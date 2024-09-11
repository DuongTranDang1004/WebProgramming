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

  // Function to fetch course details by courseId (in order to get details like thumbnail)
  const fetchCourseDetails = async (courseId) => {
    try {
      const response = await fetch(`/api/courses/${courseId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch course details");
      }
      return await response.json(); // Return detailed course info
    } catch (error) {
      console.error(`Error fetching course ${courseId}:`, error);
    }
  };

  // Function to fetch all bought courses and add additional details like thumbnail
  const getBoughtCoursesWithDetails = async (learnerId) => {
    const boughtCourses = await fetchBoughtCourses(learnerId);
    const detailedCourses = [];

    for (let boughtCourse of boughtCourses) {
      const courseDetails = await fetchCourseDetails(boughtCourse.courseId); // Fetch detailed course info for each courseId
      if (courseDetails) {
        detailedCourses.push({
          courseInfo: courseDetails, // Store detailed course info like name, thumbnail
          ...boughtCourse, // Include any other data from boughtCourse
        });
      }
    }

    return detailedCourses; // Return all courses with detailed info
  };

  // Render function for bought courses
  const renderBoughtCourses = (courses) => {
    const boughtCoursesContainer = document.getElementById(
      "display-bought-courses"
    );
    boughtCoursesContainer.innerHTML = "<h1>All of my bought courses</h1>"; // Clear previous content

    courses.forEach((course) => {
      const courseHTML = `
        <div class="bought-course-item">
          <h2 id="course-name">${course.courseInfo.name}</h2>
          <img id="thumbnail-image" src="${course.courseInfo.thumbnail}" alt="Course Image">
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
      const progress = Math.floor(Math.random() * 100); // You can calculate real progress if you have the data
      const courseHTML = `
        <div class="learning-course-item">
          <h2 id="course-name">${course.courseInfo.name}</h2>
          <img id="thumbnail-image" src="${course.courseInfo.thumbnail}" alt="Course Image">
          <h3 id="learning-progress">Progress: ${progress}%</h3>
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
      const completionDate = new Date(
        course.completionDateTime
      ).toLocaleDateString();
      const courseHTML = `
        <div class="completed-course-item">
          <h2 id="course-name">${course.courseInfo.name}</h2>
          <img id="thumbnail-image" src="${course.courseInfo.thumbnail}" alt="Course Image">
          <h3 id="completion-date">Completion Date: ${completionDate}</h3>
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
      const completionDate = new Date(
        course.completionDateTime
      ).toLocaleDateString();
      const certHTML = `
        <div class="cert-item">
          <img id="IT-learning-logo" src="/img/Logo.png" alt="Certificate Image" width="50" height="50">
          <h1>Completion Certificate</h1>
          <h4>has been presented to</h4>
          <h2 id="learnerName">Your Name</h2>
          <h4>on ${completionDate}</h4>
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

  // Fetch the bought courses with details using the extracted learnerId
  const boughtCoursesWithDetails = await getBoughtCoursesWithDetails(learnerId);

  if (boughtCoursesWithDetails) {
    // Distinguish between courses
    const learningCourses = boughtCoursesWithDetails.filter(
      (course) => !course.courseCompletionStatus
    ); // Courses that are in progress
    const completedCourses = boughtCoursesWithDetails.filter(
      (course) => course.courseCompletionStatus
    ); // Completed courses
    const certificateCourses = boughtCoursesWithDetails.filter(
      (course) => course.isCertificate
    ); // Courses with certificates

    // Render courses in the correct sections
    renderBoughtCourses(boughtCoursesWithDetails);
    renderLearningCourses(learningCourses);
    renderCompletedCourses(completedCourses);
    renderCertificates(certificateCourses);
  }
});
