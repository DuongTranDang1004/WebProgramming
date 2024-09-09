// Sample data
let favoriteInstructors = [
  {
    profilePicture:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGvixi6V76LhCkZUz6pnFt5...",
    firstName: "Cassidy",
    lastName: "Kertzmann",
    specialization: "AI",
    jobTitle: "International Interactions Assistant",
    schoolOrCompanyName: "Torp Group",
  },
  // Add more instructors as needed
];

// Function to render favorite instructors
function renderInstructors(instructors) {
  const instructorList = document.getElementById("favorite-instructors");
  instructorList.innerHTML = "";

  instructors.forEach((instructor) => {
    const instructorItem = document.createElement("div");
    instructorItem.className = "instructor-item";

    instructorItem.innerHTML = `
            <img src="${instructor.profilePicture}" alt="${instructor.firstName} ${instructor.lastName}">
            <div class="instructor-details">
                <h4>${instructor.firstName} ${instructor.lastName}</h4>
                <p>${instructor.jobTitle} at ${instructor.schoolOrCompanyName}</p>
                <p>Specialization: ${instructor.specialization}</p>
            </div>
            <button class="button" onclick="deleteFavoriteInstructor('${instructor.firstName}', '${instructor.lastName}')">Delete</button>
        `;

    instructorList.appendChild(instructorItem);
  });
}

// Function to filter instructors by specialization
function filterInstructors() {
  const searchInput = document
    .getElementById("search-input")
    .value.toLowerCase();
  const filteredInstructors = favoriteInstructors.filter((instructor) =>
    instructor.specialization.toLowerCase().includes(searchInput)
  );
  renderInstructors(filteredInstructors);
}

// Function to add a favorite instructor
function addFavoriteInstructor() {
  const newInstructor = {
    profilePicture:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGvixi6V76LhCkZUz6pnFt5...",
    firstName: "New",
    lastName: "Instructor",
    specialization: "Data Science",
    jobTitle: "Lead Data Scientist",
    schoolOrCompanyName: "Tech Corp",
  };
  favoriteInstructors.push(newInstructor);
  renderInstructors(favoriteInstructors);
}

// Function to delete a favorite instructor
function deleteFavoriteInstructor(firstName, lastName) {
  favoriteInstructors = favoriteInstructors.filter(
    (instructor) =>
      !(instructor.firstName === firstName && instructor.lastName === lastName)
  );
  renderInstructors(favoriteInstructors);
}

// Initial rendering of instructors
renderInstructors(favoriteInstructors);
