// Sample data
let instructors = [
  {
    profilePicture:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGvixi6V76LhCkZUz6pnFt5...",
    firstName: "Cassidy",
    lastName: "Kertzmann",
    specialization: "AI",
    jobTitle: "International Interactions Assistant",
    schoolOrCompanyName: "Torp Group",
    joinDateTime: "2023-01-01",
  },
  // Add more instructors as needed
];

let filteredInstructors = [...instructors];

// Function to render instructors
function renderInstructors(instructorsToRender) {
  const instructorList = document.getElementById("instructors-list");
  instructorList.innerHTML = "";

  instructorsToRender.forEach((instructor) => {
    const instructorItem = document.createElement("div");
    instructorItem.className = "instructor-item";

    instructorItem.innerHTML = `
            <img src="${instructor.profilePicture}" alt="${instructor.firstName} ${instructor.lastName}">
            <h4>${instructor.firstName} ${instructor.lastName}</h4>
            <p>${instructor.jobTitle} at ${instructor.schoolOrCompanyName}</p>
            <p>Specialization: ${instructor.specialization}</p>
            <p>Joined: ${instructor.joinDateTime}</p>
        `;

    instructorList.appendChild(instructorItem);
  });
}

// Function to sort instructors
function sortInstructors() {
  const sortBy = document.getElementById("sort-select").value;
  filteredInstructors.sort((a, b) => {
    if (sortBy === "name-asc") {
      return a.firstName.localeCompare(b.firstName);
    } else if (sortBy === "name-desc") {
      return b.firstName.localeCompare(a.firstName);
    } else if (sortBy === "join-asc") {
      return new Date(a.joinDateTime) - new Date(b.joinDateTime);
    } else if (sortBy === "join-desc") {
      return new Date(b.joinDateTime) - new Date(a.joinDateTime);
    }
  });
  renderInstructors(filteredInstructors);
}

// Function to filter instructors by specialization
function filterInstructors() {
  const checkboxes = document.querySelectorAll(
    '.checkbox-group input[type="checkbox"]'
  );
  const selectedSpecializations = Array.from(checkboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  filteredInstructors = instructors.filter((instructor) => {
    return (
      selectedSpecializations.length === 0 ||
      selectedSpecializations.includes(instructor.specialization)
    );
  });

  sortInstructors(); // Reapply sorting after filtering
}

// Function to search instructors by name or organization
function searchInstructors() {
  const searchInput = document
    .getElementById("search-input")
    .value.toLowerCase();

  filteredInstructors = instructors.filter((instructor) => {
    return (
      instructor.firstName.toLowerCase().includes(searchInput) ||
      instructor.lastName.toLowerCase().includes(searchInput) ||
      instructor.schoolOrCompanyName.toLowerCase().includes(searchInput)
    );
  });

  sortInstructors(); // Reapply sorting after searching
}

// Apply filters when the button is clicked
function applyFilters() {
  filterInstructors();
  searchInstructors();
}

// Initial rendering of instructors
renderInstructors(instructors);
