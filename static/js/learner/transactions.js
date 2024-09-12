// Fetch transactions from API and render them
document.addEventListener("DOMContentLoaded", async function () {
  const transactions = await fetchTransactions();
  renderTransactions(transactions);
});

// Fetch transactions from the API
async function fetchTransactions() {
  try {
    const response = await fetch("/api/transactions"); // Adjust endpoint if needed
    if (!response.ok) throw new Error("Failed to fetch transactions");
    return await response.json();
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
}

// Render transactions in the list
function renderTransactions(transactions) {
  const list = document.getElementById("transaction-list");
  list.innerHTML = "";

  transactions.forEach((transaction) => {
    const transactionElement = document.createElement("div");
    transactionElement.className = "transaction";

    transactionElement.innerHTML = `
            <div class="transaction-info">
                <p><strong>Transaction ID:</strong> ${transaction._id}</p>
                <p><strong>Transaction Time:</strong> ${new Date(
                  transaction.transactionDate
                ).toLocaleString()}</p>
                <p><strong>Total Amount:</strong> $${
                  transaction.totalAmount
                }</p>
                <p><strong>Payment Method:</strong> ${
                  transaction.paymentMethod
                }</p>
            </div>
            <div class="transaction-items">
                ${transaction.transactionItems
                  .map(
                    (item) => `
                    <div class="item">
                        <p><strong>Course Name:</strong> ${item.courseName}</p>
                        <p><strong>Price:</strong> $${item.price.toFixed(2)}</p>
                        <p><strong>Instructor:</strong> ${
                          item.instructorName
                        }</p>
                        <p><strong>Course Access:</strong> ${
                          item.courseAccess
                        }</p>
                        <p><strong>Certificate:</strong> $${item.certificatePrice.toFixed(
                          2
                        )} (Optional)</p>
                    </div>
                `
                  )
                  .join("")}
            </div>
        `;

    list.appendChild(transactionElement);
  });
}

// Search transactions
function searchTransactions() {
  const query = document.getElementById("search").value.toLowerCase();
  const transactions = document.querySelectorAll(".transaction");

  transactions.forEach((transaction) => {
    const transactionText = transaction.innerText.toLowerCase();
    transaction.style.display = transactionText.includes(query) ? "" : "none";
  });
}

// Sort transactions
function sortTransactions() {
  const sortBy = document.getElementById("sort").value;
  const transactions = Array.from(document.querySelectorAll(".transaction"));
  const sortedTransactions = transactions.sort((a, b) => {
    const aValue =
      sortBy === "amount"
        ? parseFloat(
            a
              .querySelector(".transaction-info p:nth-child(3)")
              .innerText.replace("$", "")
          )
        : new Date(
            a.querySelector(".transaction-info p:nth-child(2)").innerText
          ).getTime();
    const bValue =
      sortBy === "amount"
        ? parseFloat(
            b
              .querySelector(".transaction-info p:nth-child(3)")
              .innerText.replace("$", "")
          )
        : new Date(
            b.querySelector(".transaction-info p:nth-child(2)").innerText
          ).getTime();

    return sortBy === "amount" ? aValue - bValue : aValue - bValue;
  });

  const list = document.getElementById("transaction-list");
  list.innerHTML = "";
  sortedTransactions.forEach((transaction) => list.appendChild(transaction));
}

// Filter transactions
function filterTransactions() {
  const filterBy = document.getElementById("filter").value;
  const transactions = document.querySelectorAll(".transaction");

  transactions.forEach((transaction) => {
    const paymentMethod = transaction
      .querySelector(".transaction-info p:nth-child(4)")
      .innerText.split(": ")[1];
    transaction.style.display =
      filterBy === "all" || paymentMethod === filterBy ? "" : "none";
  });
}
