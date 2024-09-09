// Sample data
let favoriteCourses = [
  {
    category: "front-end",
    name: "Rustic Fresh Sausages",
    thumbnailImage: "https://picsum.photos/seed/fp7Tc/640/480",
    price: "624.00",
    description: "Substantia accusator vito. Corpus peccatus sustineo demergo.",
  },
  // Add more courses as needed
];

// Function to render favorite courses
function renderCourses(courses) {
  const courseList = document.getElementById("favorite-courses");
  courseList.innerHTML = "";

  courses.forEach((course) => {
    const courseItem = document.createElement("div");
    courseItem.className = "course-item";

    courseItem.innerHTML = `
            <img src="${course.thumbnailImage}" alt="${course.name}">
            <div class="course-details">
                <h4>${course.name}</h4>
                <p>${course.description}</p>
                <p class="price">$${course.price}</p>
            </div>
            <button class="button" onclick="deleteFavoriteCourse('${course.name}')">Delete</button>
        `;

    courseList.appendChild(courseItem);
  });
}

// Function to filter courses by category
function filterCourses() {
  const searchInput = document
    .getElementById("search-input")
    .value.toLowerCase();
  const filteredCourses = favoriteCourses.filter((course) =>
    course.category.toLowerCase().includes(searchInput)
  );
  renderCourses(filteredCourses);
}

// Function to sort courses by name or price
function sortCourses() {
  const sortBy = document.getElementById("sort-select").value;
  favoriteCourses.sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "price") {
      return parseFloat(a.price) - parseFloat(b.price);
    }
  });
  renderCourses(favoriteCourses);
}

// Function to add a favorite course
function addFavoriteCourse() {
  const newCourse = {
    category: "back-end",
    name: "Awesome Steel Chicken",
    thumbnailImage: "https://picsum.photos/seed/newCourse/640/480",
    price: "499.00",
    description: "Newly added course description.",
  };
  favoriteCourses.push(newCourse);
  renderCourses(favoriteCourses);
}

// Function to delete a favorite course
function deleteFavoriteCourse(courseName) {
  favoriteCourses = favoriteCourses.filter(
    (course) => course.name !== courseName
  );
  renderCourses(favoriteCourses);
}

// Initial rendering of courses
renderCourses(favoriteCourses);
