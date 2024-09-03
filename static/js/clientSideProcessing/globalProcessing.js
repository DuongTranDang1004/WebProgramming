// Function to handle dropdowns

document.addEventListener("DOMContentLoaded", function () {
  function setupDropdown(dropdownSelector, dropdownContentSelector, url) {
    const dropdown = document.querySelector(dropdownSelector);
    const dropdownContent = document.querySelector(dropdownContentSelector);

    dropdown.addEventListener("click", function (event) {
      event.stopPropagation(); // Prevents the click from bubbling up

      // If the dropdown content is empty, fetch it from the server
      if (dropdownContent.innerHTML.trim() === "") {
        fetch(url)
          .then((response) => response.text())
          .then((html) => {
            dropdownContent.innerHTML = html;
            dropdownContent.classList.toggle("show");
          })
          .catch((err) =>
            console.error("Error loading dropdown content:", err)
          );
      } else {
        dropdownContent.classList.toggle("show");
      }
    });

    // Close the dropdown and clear content if the user clicks outside of it
    document.addEventListener("click", function (event) {
      if (!dropdown.contains(event.target)) {
        dropdownContent.classList.remove("show");
        dropdownContent.innerHTML = ""; // Clear the dropdown content
      }
    });
  }

  // Setup for category dropdown
  setupDropdown(
    ".category-dropdown",
    ".dropdown-content.category",
    "/views/partial/categoryDropdown.ejs"
  );

  // Setup for browse dropdown
  setupDropdown(
    ".browse-dropdown",
    ".dropdown-content.browse",
    "/views/partial/browseDropdown.ejs"
  );
});
