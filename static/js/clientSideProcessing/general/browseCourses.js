// Sample data
let courses = [
  {
    name: "Rustic Fresh Sausages",
    category: "frontend",
    thumbnailImage: "https://picsum.photos/seed/fp7Tc/640/480",
    price: "624.00",
    numberSold: 150,
    creationDateTime: "2024-01-01",
    instructor: "John Doe",
  },
  // Add more courses as needed
];

let filteredCourses = [...courses];

// Function to render courses
function renderCourses(coursesToRender) {
  const courseList = document.getElementById("courses-list");
  courseList.innerHTML = "";

  coursesToRender.forEach((course) => {
    const courseItem = document.createElement("div");
    courseItem.className = "course-item";

    courseItem.innerHTML = `
            <img src="${course.thumbnailImage}" alt="${course.name}">
            <h4>${course.name}</h4>
            <p>Instructor: ${course.instructor}</p>
            <p>Category: ${course.category}</p>
            <p class="price">$${course.price}</p>
            <p>Sold: ${course.numberSold}</p>
        `;

    courseList.appendChild(courseItem);
  });
}

// Function to sort courses
function sortCourses() {
  const sortBy = document.getElementById("sort-select").value;
  filteredCourses.sort((a, b) => {
    if (sortBy === "name-asc") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "name-desc") {
      return b.name.localeCompare(a.name);
    } else if (sortBy === "price-asc") {
      return parseFloat(a.price) - parseFloat(b.price);
    } else if (sortBy === "price-desc") {
      return parseFloat(b.price) - parseFloat(a.price);
    } else if (sortBy === "number-sold") {
      return b.numberSold - a.numberSold;
    } else if (sortBy === "creation-asc") {
      return new Date(a.creationDateTime) - new Date(b.creationDateTime);
    } else if (sortBy === "creation-desc") {
      return new Date(b.creationDateTime) - new Date(a.creationDateTime);
    }
  });
  renderCourses(filteredCourses);
}

// Function to filter courses by category and price range
function filterCourses() {
  const category = document.getElementById("category-select").value;
  const priceStart =
    parseFloat(document.getElementById("price-start").value) || 0;
  const priceEnd =
    parseFloat(document.getElementById("price-end").value) || Infinity;

  filteredCourses = courses.filter((course) => {
    return (
      (category === "all" || course.category === category) &&
      parseFloat(course.price) >= priceStart &&
      parseFloat(course.price) <= priceEnd
    );
  });

  sortCourses(); // Reapply sorting after filtering
}

// Function to search courses by name or instructor
function searchCourses() {
  const searchInput = document
    .getElementById("search-input")
    .value.toLowerCase();

  filteredCourses = courses.filter((course) => {
    return (
      course.name.toLowerCase().includes(searchInput) ||
      course.instructor.toLowerCase().includes(searchInput)
    );
  });

  sortCourses(); // Reapply sorting after searching
}

// Apply filters when the button
