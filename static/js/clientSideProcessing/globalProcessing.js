//Function to change nav bar responsive between horizontal and vertical

function toggleResponsiveNav() {
  var x = document.getElementsByClassName("secondaryNav")[0]; // Get the first element with class "secondaryNav"

  if (x.className === "secondaryNav") {
    x.className += " responsive"; // Add 'responsive' class
  } else {
    x.className = "secondaryNav"; // Remove 'responsive' class
  }
}

// Function to handle dropdowns// Function to handle dropdowns
function showDropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
