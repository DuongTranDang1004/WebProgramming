// Step 1: Fetch the courses from the API /api/courses

//Step 2: Sort course by category attribute String: => store in array
// "front-end",
//           "back-end",
//           "data science",
//           "AI",
//           "cyber security",
//           "testing",

//Step 3: render into appropiate html ids:
// each course shows its logo, name, and price.
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

  // Step 2: Sort courses by category
  const sortCoursesByCategory = (courses) => {
    const categories = {
      "front-end": [],
      "back-end": [],
      "data science": [],
      AI: [],
      "cyber security": [],
      testing: [],
    };

    courses.forEach((course) => {
      if (categories[course.category]) {
        categories[course.category].push(course);
      }
    });

    return categories;
  };

  // Step 3: Render courses into appropriate HTML containers
  const renderCourses = (categories) => {
    const containerIds = {
      "front-end": "front-end-container",
      "back-end": "back-end-container",
      "data science": "data-science-container",
      AI: "AI-container",
      "cyber security": "cyber-security-container",
      testing: "testing-container",
    };

    for (const [category, courses] of Object.entries(categories)) {
      const container = document.getElementById(containerIds[category]);
      if (container) {
        container.innerHTML = ""; // Clear any existing content

        courses.forEach((course) => {
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
          container.appendChild(courseCard);
        });
      }
    }
  };

  // Main function to fetch, sort, and render courses
  const main = async () => {
    const courses = await fetchCourses();
    if (courses) {
      const sortedCourses = sortCoursesByCategory(courses);
      renderCourses(sortedCourses);
    }
  };

  main();
});
