document.addEventListener("DOMContentLoaded", async function () {
  // Function to fetch favorite instructors by learnerId
  const fetchFavoriteInstructors = async (learnerId) => {
    try {
      const response = await fetch(
        `/api/followingInstructors/learner/${learnerId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch favorite instructors");
      }
      return await response.json(); // Assuming the response is in JSON format
    } catch (error) {
      console.error("Error fetching instructors:", error);
    }
  };

  // Render function for favorite instructors
  const renderFavoriteInstructors = (instructors) => {
    const favoriteInstructorsContainer = document.getElementById(
      "favorite-instructors"
    );
    favoriteInstructorsContainer.innerHTML = ""; // Clear previous content

    instructors.forEach((instructor) => {
      const instructorHTML = `
        <div class="instructor-item">
          <img src="${instructor.instructorId.profilePicture}" alt="${instructor.instructorId.firstName} ${instructor.instructorId.lastName}" />
          <h2>${instructor.instructorId.firstName} ${instructor.instructorId.lastName}</h2>
          <h3>${instructor.instructorId.jobTitle}</h3>
          <p>${instructor.instructorId.Bio}</p>
        </div>
      `;
      favoriteInstructorsContainer.innerHTML += instructorHTML;
    });
  };

  // Extract the learnerId from the URL (assumed to be the last part of the URL)
  const urlSegments = window.location.pathname.split("/");
  const learnerId = urlSegments[urlSegments.length - 1]; // Get the last segment of the URL

  console.log("Extracted learnerId:", learnerId); // Verify that the learnerId is correct

  // Fetch the favorite instructors using the extracted learnerId
  const favoriteInstructors = await fetchFavoriteInstructors(learnerId);

  if (favoriteInstructors && favoriteInstructors.length > 0) {
    // Render favorite instructors
    renderFavoriteInstructors(favoriteInstructors);
  } else {
    document.getElementById("favorite-instructors").innerHTML =
      "<p>No favorite instructors found</p>";
  }
});
