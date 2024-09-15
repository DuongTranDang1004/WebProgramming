let transactions = []; // Global variable to store transactions
const learnerID = localStorage.getItem("id"); // Get learner ID from local storage

// Fetch transactions from the API
async function fetchTransactions() {
  try {
    const response = await fetch("/api/transactions"); // Adjust endpoint if needed
    if (!response.ok) throw new Error("Failed to fetch transactions");
    const data = await response.json();
    console.log("Fetched transactions:", data); // Log the data to verify
    let filteredData = [];
    data.forEach((transaction) => {
      if (transaction.learnerId._id === learnerID) {
        filteredData.push(transaction);
      }
    });
    console.log("Filtered transactions:", filteredData); // Log the filtered
    return filteredData;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
}
function renderTransactions(transactions) {
  const list = document.getElementById("transaction-list");
  list.innerHTML = ""; // Clear previous content

  transactions.forEach((transaction) => {
    const transactionElement = document.createElement("div");
    transactionElement.className = "transaction";

    transactionElement.innerHTML = `
        <div class="transaction-info">
          <p><strong>Transaction ID:</strong> ${transaction._id}</p>
          <p><strong>Learner ID:</strong> ${transaction.learnerId._id}</p>
          <p><strong>Transaction Time:</strong> ${new Date(
            transaction.transactionDate
          ).toLocaleString()}</p>
          <p><strong>Total Amount:</strong> $${Number(
            transaction.totalAmount
          ).toFixed(2)}</p>
          <p><strong>Payment Method:</strong> ${transaction.paymentMethod}</p>
        </div>
        <div class="transaction-items">
          <h4>Transaction Items:</h4>
          ${transaction.transactionItems
            .map((item) => {
              const courseName =
                typeof item.courseId === "object" ? item.courseId.name : "N/A"; // Render course name if available
              return `
              <div class="item">
                <p><strong>Course Name:</strong> ${courseName || "N/A"}</p>
              </div>
              `;
            })
            .join("")}
        </div>
      `;

    list.appendChild(transactionElement);
  });
}

// Initialize by fetching and rendering transactions
document.addEventListener("DOMContentLoaded", async function () {
  const transactions = await fetchTransactions();
  renderTransactions(transactions);
});
