document.addEventListener("DOMContentLoaded", () => {
  // Extract the learnerId from the URL
  const url = window.location.pathname; // Get the path part of the URL
  const learnerId = url.split("/")[3]; // Assuming the id is the 4th part of the URL
  const apiUrl = `/followingInstructors/learner/${learnerId}`; // Update to your API endpoint

  // Fetch the list of favorite instructors
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      renderInstructors(data);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
});

function renderInstructors(instructors) {
  const instructorList = document.getElementById("favorite-instructors");
  instructorList.innerHTML = ""; // Clear any existing content

  instructors.forEach((instructor) => {
    // Assuming each `instructor` object contains instructor's course details in `courseId`
    const course = instructor.courseId;

    // Dynamically create an instructor div
    const instructorDiv = document.createElement("div");
    instructorDiv.classList.add("instructor");

    // Assuming the avatar is a URL you can replace the placeholder with actual instructor avatar URL.
    instructorDiv.innerHTML = `
        <div class="instructor-info">
          <img src="https://via.placeholder.com/150" alt="${course.name}" class="instructor-avatar" />
          <div class="instructor-details">
            <h3>${course.name}</h3> <!-- Replace with instructor's name -->
            <p>Specialization: ${course.category}</p> <!-- Replace with instructor's specialization -->
            <p>Description: ${course.description}</p> <!-- Replace with course description -->
          </div>
        </div>
      `;

    // Append the new instructor div to the instructor list
    instructorList.appendChild(instructorDiv);
  });
}
