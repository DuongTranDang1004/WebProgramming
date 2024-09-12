document.addEventListener("DOMContentLoaded", async function () {
  // Function to fetch top 5 instructors from /followingInstructors/rank
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

  // Function to fetch top 5 favorite courses from /favoritesCourses/rank
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

  // Function to fetch new instructors from /instructors (limit to 5)
  const fetchNewInstructors = async () => {
    try {
      const response = await fetch("/api/instructors");
      if (!response.ok) {
        throw new Error("Failed to fetch new instructors");
      }
      return await response.json(); // Assuming the response is in JSON format
    } catch (error) {
      console.error("Error fetching new instructors:", error);
    }
  };

  // Function to fetch all new courses from /api/courses
  const fetchNewCourses = async () => {
    try {
      const response = await fetch("/api/courses");
      if (!response.ok) {
        throw new Error("Failed to fetch new courses");
      }
      return await response.json(); // Assuming the response is in JSON format
    } catch (error) {
      console.error("Error fetching new courses:", error);
    }
  };

  // Function to render top instructors
  const renderTopInstructors = (instructors) => {
    const instructorList = document.getElementById("featured-instructor-list");
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

  // Function to render new instructors (limit to 5 items)
  const renderNewInstructors = (instructors) => {
    const newInstructorList = document.getElementById("new-instructor-list");
    newInstructorList.innerHTML = ""; // Clear previous content

    // Only display top 5 instructors
    instructors.slice(0, 5).forEach((instructor) => {
      const instructorHTML = `
      <div class="item">
        <img src="${instructor.profilePicture}" alt="${instructor.firstName} ${instructor.lastName}" />
        <div>
          <h3><a href="#">${instructor.firstName} ${instructor.lastName}</a></h3>
          <p>Specialization: ${instructor.specialization}</p>
        </div>
      </div>
    `;
      newInstructorList.innerHTML += instructorHTML;
    });
  };

  // Function to render top featured courses
  const renderTopCourses = (courses) => {
    const courseList = document.getElementById("featured-course-list");
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

  // Function to render new courses
  const renderNewCourses = (courses) => {
    const newCoursesList = document.getElementById("new-courses-list"); // Assuming you have an element with this ID in HTML
    newCoursesList.innerHTML = ""; // Clear previous content

    courses.slice(0, 5).forEach((course) => {
      const courseHTML = `
        <div class="item">
          <img src="${course.thumbnailImage}" alt="${course.name}" class="course-img" />
          <div>
            <h3><a href="#">${course.name}</a></h3>
            <p>By <a href="#">${course.instructorId}</a> - $${course.price}</p>
          </div>
        </div>
      `;
      newCoursesList.innerHTML += courseHTML;
    });
  };

  // Fetch and render top instructors
  const topInstructors = await fetchTopInstructors();
  if (topInstructors) {
    renderTopInstructors(topInstructors);
  }

  // Fetch and render new instructors
  const newInstructors = await fetchNewInstructors();
  if (newInstructors) {
    renderNewInstructors(newInstructors);
  }

  // Fetch and render top courses
  const topCourses = await fetchTopCourses();
  if (topCourses) {
    renderTopCourses(topCourses);
  }

  // Fetch and render new courses
  const newCourses = await fetchNewCourses();
  if (newCourses) {
    renderNewCourses(newCourses);
  }
});
