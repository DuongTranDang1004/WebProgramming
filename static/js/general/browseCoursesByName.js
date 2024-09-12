document.addEventListener("DOMContentLoaded", async function () {
  // Step 1: Fetch the courses from the API
  const fetchCourses = async () => {
    try {
      const response = await fetch("/api/courses");
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // Step 2: Sort courses alphabetically by name
  const sortCoursesAlphabetically = (courses) => {
    return courses.sort((a, b) => a.name.localeCompare(b.name));
  };

  // Step 3: Render courses in rows (5 items per row)
  const renderCourses = (courses) => {
    const container = document.getElementById("coursesContainer"); // Assuming this exists in your HTML
    container.innerHTML = ""; // Clear any existing content

    let row;
    courses.forEach((course, index) => {
      if (index % 5 === 0) {
        // Create a new row every 5 items
        row = document.createElement("div");
        row.className = "course-row"; // Add class for styling the row
        container.appendChild(row);
      }

      // Create course card
      const courseCard = document.createElement("div");
      courseCard.className = "course-card"; // Add class for styling the card
      courseCard.innerHTML = `
          <div class="course-item">
            <img src="${course.thumbnailImage}" alt="${course.name}" class="course-thumbnail"/>
            <div class="course-info">
              <h3 class="course-name">${course.name}</h3>
              <p class="course-price">Price: $${course.price}</p>
            </div>
          </div>
        `;
      row.appendChild(courseCard);
    });
  };

  // Main function to fetch, sort, and render courses
  const main = async () => {
    const courses = await fetchCourses();
    if (courses) {
      const sortedCourses = sortCoursesAlphabetically(courses);
      renderCourses(sortedCourses);
    }
  };

  main(); // Call the main function to execute
});
