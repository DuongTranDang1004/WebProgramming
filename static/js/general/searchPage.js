document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("search");
    const searchInput = document.getElementById("search-query");
    const searchType = document.getElementById("search-type");
    const specializationFilter = document.getElementById("specialization-filter");
    const searchResultsContainer = document.querySelector(".search-results");
    const searchResultsList = document.getElementById("search-results-list");

    searchButton.addEventListener("click", async function (event) {
        event.preventDefault(); // Prevent default form submission

        const query = searchInput.value.trim();
        const type = searchType.value; // Get the selected search type (Courses or Instructors)
        const specialization = specializationFilter.value; // Get the selected specialization filter

        if (!query && !specialization) return; // Do nothing if both query and specialization are empty

        // Construct the search URL with query and specialization
        let endpoint = type === 'instructors' ? `/api/instructors?q=${encodeURIComponent(query)}` : `/api/courses?q=${encodeURIComponent(query)}`;
        if (specialization) {
            endpoint += `&specialization=${encodeURIComponent(specialization)}`; // Append specialization to the query
        }

        // Fetch search results from the appropriate endpoint
        const response = await fetch(endpoint);
        const results = await response.json();

        // Clear previous search results
        searchResultsList.innerHTML = '';

        // If results found, render them in the item-container
        if (results.length > 0) {
            results.forEach(result => {
                let resultHTML = '';

                if (type === 'instructors') {
                    // Render instructors
                    resultHTML = `
                        <div class="item">
                            <img src="${result.profilePicture}" alt="${result.firstName} ${result.lastName}" class="profile-img" />
                            <div>
                                <h3><a href="/instructors/${result._id}">${result.firstName} ${result.lastName}</a></h3>
                                <p>Specialization: ${result.specialization}</p>
                            </div>
                        </div>
                    `;
                } else {
                    // Render courses
                    resultHTML = `
                        <div class="item">
                            <img src="${result.thumbnailImage}" alt="${result.name}" class="course-img" />
                            <div>
                                <h3><a href="/courses/detail/${result._id}">${result.name}</a></h3>
                                <p>By ${result.instructorId.firstName} ${result.instructorId.lastName}</p>
                            </div>
                        </div>
                    `;
                }

                searchResultsList.innerHTML += resultHTML;
            });

            // Show the search results container (if hidden initially)
            searchResultsContainer.style.display = 'block';
        } else {
            // Display message if no results found
            searchResultsList.innerHTML = `<p>No ${type} found matching your query and specialization filter.</p>`;
            searchResultsContainer.style.display = 'block';
        }
    });
});
