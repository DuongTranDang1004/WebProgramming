// Fetch data and update the DOM to re-render the view according to the recieved JSON objects from back-end response
fetch("/api/users")
  .then((response) => response.json())
  .then((users) => {
    const userList = document.getElementById("user-list");
    userList.innerHTML = ""; // Clear existing content
    users.forEach((user) => {
      const listItem = document.createElement("li");
      listItem.classList.add("list-group-item"); // For Bootstrap styling
      listItem.textContent = `${user.firstName} ${user.lastName}`;
      userList.appendChild(listItem);
    });
  })
  .catch((error) => console.error("Error fetching users:", error));
