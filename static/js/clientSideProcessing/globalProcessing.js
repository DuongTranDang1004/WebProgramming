document.addEventListener("DOMContentLoaded", function () {
  const dropdown = document.querySelector(".dropdown");
  const dropdownContent = document.querySelector(".dropdown-content");

  dropdown.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevents the click from bubbling up

    // If the dropdown content is empty, populate it
    if (dropdownContent.innerHTML.trim() === "") {
      dropdownContent.innerHTML = `
        <li><a href="/views/general/browseCourses.html">Browse Courses by Name</a></li>
        <li><a href="/views/general/browseCourses.html">Browse Courses by Category</a></li>
        <li><a href="/views/general/browseInstructors.html">Browse Instructors</a></li>
      `;
    }

    dropdownContent.classList.toggle("show");
  });

  // Close the dropdown and clear content if the user clicks outside of it
  document.addEventListener("click", function (event) {
    if (!dropdown.contains(event.target)) {
      dropdownContent.classList.remove("show");
      dropdownContent.innerHTML = ""; // Clear the dropdown content
    }
  });
});
