// Fetch data and update the DOM to re-render the view according to the recieved JSON objects from back-end response

//All the fetching and rendering should be in the same js file for better file management

//Separate between fetch functions and render functions
async function getAllCoursesData() {
  const url = "http://localhost:3000/courses"; //API url
  //replace the url with the real physical's server URL later on
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    displayCourses(json);
  } catch (error) {
    console.error(error.message);
  }
}

function displayCourses(courses) {
  const courseDisplay = document.getElementById("course-display");
  courseDisplay.innerHTML = "";

  courses.forEach((course) => {
    const courseDiv = document.createElement("div");
    courseDiv.textContent = `Course Name: ${course.name}, Description: ${course.description}`;
    courseDisplay.appendChild(courseDiv);
  });
}

// Call the function to fetch and display the courses when the page loads
window.onload = getAllCoursesData;
