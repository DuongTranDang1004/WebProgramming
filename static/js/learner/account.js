// Step 1: Extract the learner ID from the URL
function getLearnerIdFromUrl() {
  const url = window.location.href; // Get the current URL
  const learnerId = url.substring(url.lastIndexOf("/") + 1); // Extract learner ID from the last part of the URL
  console.log("learnerID" + learnerId);
  return learnerId;
}

// Step 2: Fetch learner details from the API
async function fetchLearner(learnerId) {
  try {
    const response = await fetch(`/api/learners/${learnerId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch learner details");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching learner details:", error);
    return null;
  }
}

// Step 3: Render the learner details (except token, id, and createdTime)
function renderLearnerInfo(learner) {
  if (!learner) {
    document.getElementById("learner-info").innerHTML =
      "<p>Error loading learner information.</p>";
    return;
  }

  // Create the HTML content for displaying learner details
  const learnerInfoHtml = `
      <div class="learner-info">
        <img src="${learner.profilePicture}" alt="${learner.firstName} ${learner.lastName}" width="100" height="100" />
        <p><strong>First Name:</strong> ${learner.firstName}</p>
        <p><strong>Last Name:</strong> ${learner.lastName}</p>
        <p><strong>Email:</strong> ${learner.email}</p>
        <p><strong>Address:</strong> ${learner.address}</p>
        <p><strong>City:</strong> ${learner.city}</p>
        <p><strong>Zipcode:</strong> ${learner.zipcode}</p>
        <p><strong>Country:</strong> ${learner.country}</p>
        <p><strong>Phone:</strong> ${learner.phone}</p>
      </div>
    `;

  // Render the learner info on the page
  document.getElementById("learner-info").innerHTML = learnerInfoHtml;
}

// Step 4: Main function to execute the fetching and rendering
document.addEventListener("DOMContentLoaded", async function () {
  const learnerId = getLearnerIdFromUrl(); // Step 1: Get learner ID
  const learner = await fetchLearner(learnerId); // Step 2: Fetch learner details
  renderLearnerInfo(learner); // Step 3: Render learner info
});
