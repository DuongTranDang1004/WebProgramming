document.addEventListener("DOMContentLoaded", async function () {

  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("nav-search-input");
  const searchResultsContainer = document.getElementById("search-results");
  const originalContent = document.getElementById("new-instructors").innerHTML; // Save original homepage content

  searchForm.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the default form submission

    const query = searchInput.value.trim();
    if (!query) return; // Do nothing if the query is empty

    // Perform the search
    const searchResults = await searchCoursesAndInstructors(query);

    // If there are search results, display them and hide the original homepage content
    if (searchResults) {
      displaySearchResults(searchResults);
    } else {
      displayNoResults();
    }
  });

  // Fetch search results from the backend
  const searchCoursesAndInstructors = async (query) => {
    try {
      const coursesResponse = await fetch(`/api/search/courses?q=${encodeURIComponent(query)}`);
      //const instructorsResponse = await fetch(`/api/search/instructors?q=${encodeURIComponent(query)}`);

      const courses = await coursesResponse.json();
      //const instructors = await instructorsResponse.json();

      return { courses, instructors };
    } catch (error) {
      console.error('Error fetching search results:', error);
      return null;
    }
  };

  // Display search results and hide original content
  const displaySearchResults = ({ courses, instructors }) => {
    // Hide original homepage content
    document.getElementById("new-instructors").style.display = 'none';
    document.getElementById("new-courses").style.display = 'none';

    // Clear previous search results
    searchResultsContainer.innerHTML = '';
    searchResultsContainer.style.display = 'block';

    // Display courses
    if (courses.length > 0) {
      const coursesHTML = `
        <h2>Courses</h2>
        <ul>
          ${courses.map(course => `
            <li>
              <a href="/courses/${course._id}">${course.name}</a> - By ${course.instructorName}
            </li>
          `).join('')}
        </ul>
      `;
      searchResultsContainer.innerHTML += coursesHTML;
    }

    // Display instructors
    if (instructors.length > 0) {
      const instructorsHTML = `
        <h2>Instructors</h2>
        <ul>
          ${instructors.map(instructor => `
            <li>
              <a href="/instructors/${instructor._id}">${instructor.firstName} ${instructor.lastName}</a> - ${instructor.specialization}
            </li>
          `).join('')}
        </ul>
      `;
      searchResultsContainer.innerHTML += instructorsHTML;
    }

    // If no results found
    if (courses.length === 0 && instructors.length === 0) {
      searchResultsContainer.innerHTML = '<p>No results found</p>';
    }
  };

  // If no results are found, display this message
  const displayNoResults = () => {
    searchResultsContainer.innerHTML = '<p>No results found for your query</p>';
    searchResultsContainer.style.display = 'block';
  };


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
        <div class="item">
          <img src="${instructor.instructorDetails.profilePicture}" alt="${instructor.instructorDetails.firstName} ${instructor.instructorDetails.lastName}" class="profile-img" />
          <div class="instructor-info">
            <h2>${instructor.instructorDetails.firstName} ${instructor.instructorDetails.lastName}</h2>
            <p><strong>Specialization: ${instructor.instructorDetails.specialization}</strong></p>
            <p>Current Role: ${instructor.instructorDetails.jobTitle}</p>
          </div>
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
          <div class="item">
            <img src="${instructor.instructorDetails.profilePicture}" alt="${instructor.instructorDetails.firstName} ${instructor.instructorDetails.lastName}" class="profile-img" />
            <div class="instructor-info">
              <h2>${instructor.instructorDetails.firstName} ${instructor.instructorDetails.lastName}</h2>
              <p><strong>Specialization: ${instructor.instructorDetails.specialization}</strong></p>
              <p>Current Role: ${instructor.instructorDetails.jobTitle}</p>
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
          <img src="${instructor.profilePicture}" alt="${instructor.firstName} ${instructor.lastName}" class="profile-img" />
          <div class="instructor-info">
            <h2>${instructor.firstName} ${instructor.lastName}</h2>
            <p><strong>Specialization: ${instructor.specialization}</strong></p>
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

    courses.slice(0, 5).forEach(async (course) => {
      const courseHTML = `
          <div class="item">
            <img src="${course.courseDetails.thumbnailImage}" alt="${course.courseDetails.name}" class="course-img" />
            <div>
              <h3><a href=/courses/detail/${course._id}>${course.courseDetails.name}</a></h3>
              <p>By ${course.instructorDetails.firstName} ${course.instructorDetails.lastName} - $${course.courseDetails.price}</p>
            </div>
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
  
    courses.slice(0, 5).forEach((course) => {
      const instructorName = `${course.instructorDetails.firstName} ${course.instructorDetails.lastName}`;
  
      const courseHTML = `
          <div class="item">
            <img src="${course.courseDetails.thumbnailImage}" alt="${course.courseDetails.name}" class="course-img" />
            <div>
              <h3><a href="/courses/detail/${course._id}">${course.courseDetails.name}</a></h3>
              <p><strong>Lecturer: <a href="#">${instructorName}</a><strong></p>
            </div>
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

    courses.slice(0, 5).forEach((course) => {
      const courseHTML = `
        <div class="item">
          <img src="${course.thumbnailImage}" alt="${course.name}" class="course-img" />
          <div>
            <h3><a href="/courses/detail/${course._id}">${course.name}</a></h3>
            <p>By ${course.instructorId.firstName} ${course.instructorId.lastName} - $${course.price}</p>
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
