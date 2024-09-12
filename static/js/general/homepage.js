document.addEventListener("DOMContentLoaded", async function () {
  // Function to fetch top 5 instructors
  const fetchTopInstructors = async () => {
    try {
      const response = await fetch("/followingInstructors/rank");
      if (!response.ok) {
        throw new Error("Failed to fetch top instructors");
      }
      return await response.json(); // Assuming the response is in JSON format
    } catch (error) {
      console.error("Error fetching top instructors:", error);
    }
  };

  // Function to fetch top 5 courses
  const fetchTopCourses = async () => {
    try {
      const response = await fetch("/favoritesCourses/rank");
      if (!response.ok) {
        throw new Error("Failed to fetch top courses");
      }
      return await response.json(); // Assuming the response is in JSON format
    } catch (error) {
      console.error("Error fetching top courses:", error);
    }
  };

  // Function to render top instructors
  const renderTopInstructors = (instructors) => {
    const instructorList = document.getElementById("instructor-list");
    instructorList.innerHTML = ""; // Clear previous content

    instructors.slice(0, 5).forEach((instructor) => {
      const instructorHTML = `
          <div class="item">
            <img src="${instructor.instructorDetails.profilePicture}" alt="${instructor.instructorDetails.firstName} ${instructor.instructorDetails.lastName}" />
            <div>
              <h3><a href="#">${instructor.instructorDetails.firstName} ${instructor.instructorDetails.lastName}</a></h3>
              <p>Specialization: ${instructor.instructorDetails.specialization}</p>
            </div>
          </div>
        `;
      instructorList.innerHTML += instructorHTML;
    });
  };

  // Function to render top courses
  const renderTopCourses = (courses) => {
    const courseList = document.getElementById("course-list");
    courseList.innerHTML = ""; // Clear previous content

    courses.slice(0, 5).forEach((course) => {
      const courseHTML = `
          <div class="item">
            <img src="${course.courseDetails.thumbnailImage}" alt="${course.courseDetails.name}" class="course-img" />
            <div>
              <h3><a href="#">${course.courseDetails.name}</a></h3>
              <p>By <a href="#">${course.courseDetails.instructorId}</a> - $${course.courseDetails.price}</p>
            </div>
          </div>
        `;
      courseList.innerHTML += courseHTML;
    });
  };

  // Fetch and render top instructors
  const topInstructors = await fetchTopInstructors();
  if (topInstructors) {
    renderTopInstructors(topInstructors);
  }

  // Fetch and render top courses
  const topCourses = await fetchTopCourses();
  if (topCourses) {
    renderTopCourses(topCourses);
  }
});
