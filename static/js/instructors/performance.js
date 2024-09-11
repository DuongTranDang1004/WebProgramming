// Function to fetch data from the API and update the overview section
async function fetchData() {
    const instructorID = localStorage.getItem("id");
    try {
        const response = await fetch(`/api/instructors/${instructorID}/earning`);
        const data = await response.json();

        // Handle null values
        const totalSales = data.totalSales || 0;
        const commissionRate = data.commissionRate || 0;
        const earnings = data.earnings || 0;

        document.getElementById('total-revenue').textContent = earnings;
        document.getElementById('revenue-subtext').textContent = `${earnings} this month`;
        
        document.getElementById('total-enrollments').textContent = `$${totalSales.toFixed(2)}`;
        document.getElementById('enrollments-subtext').textContent = `$${totalSales.toFixed(2)} this month`;
        
        document.getElementById('instructor-rating').textContent = (commissionRate * 100).toFixed(2);
        document.getElementById('rating-subtext').textContent = `${(commissionRate * 100).toFixed(2)}%`;

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Initialize the page with data
fetchData();

// Function to show content based on the clicked section
function showContent(id) {
    document.querySelectorAll('.content-item').forEach(function(item) {
        item.classList.add('hidden');
    });
    document.getElementById(id).classList.remove('hidden');
}