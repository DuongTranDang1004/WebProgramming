document.addEventListener("DOMContentLoaded", async function () {

  function getRandomRating() {
      const rating = (Math.random() * (5 - 3.5) + 3.5).toFixed(1); // Generates random rating between 3.5 and 5.0
      const stars = "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
      return { rating, stars };
  }
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

  // Function to fetch featured 5 instructors from /followingInstructors/rank
  const fetchFeaturedInstructors = async () => {
    try {
      const response = await fetch("/followingInstructors/rank");
      if (!response.ok) {
        throw new Error("Failed to fetch featured instructors");
      }
      return await response.json(); // Assuming the response is in JSON format
    } catch (error) {
      console.error("Error fetching featured instructors:", error);
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

  // Function to fetch top 5 favorite courses from /favoritesCourses/rank
  const fetchFeaturedCourses = async () => {
    try {
      const response = await fetch("/favoritesCourses/rank");
      if (!response.ok) {
        throw new Error("Failed to fetch featured courses");
      }
      return await response.json(); // Assuming the response is in JSON format
    } catch (error) {
      console.error("Error fetching featured courses:", error);
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
  const renderFeaturedInstructors = (instructors) => {
    const instructorList = document.getElementById("featured-instructor-list");
    instructorList.innerHTML = ""; // Clear previous content
    instructors.slice(0, 5).forEach((instructor) => {
      const instructorHTML = `
        <div class="course-card">
        <a href="/instructors/instructorProfile?instructorId=${instructor.instructorDetails._id}" style="text-decoration: none;">
          <img src="${instructor.instructorDetails.profilePicture}" alt="${instructor.instructorDetails.firstName} ${instructor.instructorDetails.lastName}" class="profile-img" />
          <div class="instructor-info">
            <h5>${instructor.instructorDetails.firstName} ${instructor.instructorDetails.lastName}</h5>
            <h6><strong>Specialization: ${instructor.instructorDetails.specialization}</strong></h6>
            <p>Current Role: ${instructor.instructorDetails.jobTitle}</p>
          </div>
        </a>
        </div>
      `;
      instructorList.innerHTML += instructorHTML;
    });
  };

  // Function to render top instructors
  const renderTopInstructors = (instructors) => {
    const instructorList = document.getElementById("top-instructor-list");
    instructorList.innerHTML = ""; // Clear previous content

    instructors.slice(0, 5).forEach((instructor) => {
      const instructorHTML = `
          <div class="course-card">
          <a href="/instructors/instructorProfile?instructorId=${instructor.instructorDetails._id}" style="text-decoration: none;">
            <img src="${instructor.instructorDetails.profilePicture}" alt="${instructor.instructorDetails.firstName} ${instructor.instructorDetails.lastName}" class="profile-img" />
            <div class="instructor-info">
              <h5>${instructor.instructorDetails.firstName} ${instructor.instructorDetails.lastName}</h5>
              <h6><strong>Specialization: ${instructor.instructorDetails.specialization}</strong></h6>
              <p>Current Role: ${instructor.instructorDetails.jobTitle}</p>
            </div>
          </a>
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
      <div class="course-card">
      <a href="/instructors/instructorProfile?instructorId=${instructor.instructorDetails._id}" style="text-decoration: none;">
          <img src="${instructor.profilePicture}" alt="${instructor.firstName} ${instructor.lastName}" class="profile-img" />
          <div class="instructor-info">
            <h5>${instructor.firstName} ${instructor.lastName}</h5>
            <h6><strong>Specialization: ${instructor.specialization}</strong></h6>
            <p>Current Role: ${instructor.jobTitle}</p>
          </div>
          
        </div>
    `;
      newInstructorList.innerHTML += instructorHTML;
    });
  };

  // Function to render top featured courses
  const renderFeaturedCourses = (courses) => {
    const courseList = document.getElementById("featured-course-list");
    courseList.innerHTML = ""; // Clear previous content

    courses.slice(0, 10).forEach(async (course) => {
      const { rating, stars } = getRandomRating();
      const instructor = await (await fetch(`/api/instructors/${course.courseDetails.instructorId}`)).json();
      const courseHTML = `
          <div class="course-card">
            <a href=/courses/detail/${course._id}>
              <img src="${course.courseDetails.thumbnailImage}" alt="Course Image">
              <h5>${course.courseDetails.name}</h5>
              <p>${instructor.firstName} ${instructor.lastName}</p>
              <p><strong>${rating}</strong> <span>${stars}</span></p>
              <p>₫${course.courseDetails.price}</p>
            </a>
          </div>
        `;
      courseList.innerHTML += courseHTML;
    });
  };
  // - $${course.courseDetails.price}

  // Function to render top courses
  const renderTopCourses = (courses) => {
    const courseList = document.getElementById("top-course-list");
    courseList.innerHTML = ""; // Clear previous content
  
    courses.slice(0, 10).forEach((course) => {
      const { rating, stars } = getRandomRating();
      const instructorName = `${course.instructorDetails.firstName} ${course.instructorDetails.lastName}`;
  
      const courseHTML = `
        <div class="course-card">
          <a href=/courses/detail/${course._id}>
            <img src="${course.courseDetails.thumbnailImage}" alt="Course Image">
            <h5>${course.courseDetails.name}</h5>
            <p>${instructorName}</p>
            <p><strong>${rating}</strong> <span>${stars}</span></p>
            <p>₫${course.courseDetails.price}</p>
          </a>
        </div>
        `;
      courseList.innerHTML += courseHTML;
    });
  };
  // - $${course.courseDetails.price}

  // Function to render new courses
  const renderNewCourses = (courses) => {
    const newCoursesList = document.getElementById("new-courses-list"); // Assuming you have an element with this ID in HTML
    newCoursesList.innerHTML = ""; // Clear previous content

    courses.slice(0, 10).forEach((course) => {
      const { rating, stars } = getRandomRating();
      const courseHTML = `
        <div class="course-card">
          <a href=/courses/detail/${course._id}>
            <img src="${course.thumbnailImage}" alt="Course Image">
            <h5>${course.name}</h5>
            <p>${course.instructorId.firstName} ${course.instructorId.lastName}</p>
            <p><strong>${rating}</strong> <span>${stars}</span></p>
            <p>₫${course.price}</p>
          </a>
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

  // Fetch and render top instructors
  const featuredInstructors = await fetchFeaturedInstructors();
  if (featuredInstructors) {
    renderFeaturedInstructors(featuredInstructors);
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

  // Fetch and render top courses
  const featuredCourses = await fetchFeaturedCourses();
  if (featuredCourses) {
    renderFeaturedCourses(featuredCourses);
  }

  // Fetch and render new courses
  const newCourses = await fetchNewCourses();
  if (newCourses) {
    renderNewCourses(newCourses);
  }
});
