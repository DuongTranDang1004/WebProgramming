function searchTransactions() {
  // Add your search functionality here
  let searchInput = document.getElementById("search").value.toLowerCase();
  let transactions = document.getElementsByClassName("transaction");

  Array.from(transactions).forEach(function (transaction) {
    if (transaction.innerText.toLowerCase().includes(searchInput)) {
      transaction.style.display = "";
    } else {
      transaction.style.display = "none";
    }
  });
}

function sortTransactions() {
  // Add your sort functionality here
  let sortOption = document.getElementById("sort").value;
  let transactionList = document.querySelector(".transaction-list");
  let transactions = Array.from(document.getElementsByClassName("transaction"));

  transactions.sort(function (a, b) {
    if (sortOption === "time") {
      return (
        new Date(
          b
            .querySelector(".transaction-info p:nth-child(2)")
            .innerText.split(": ")[1]
        ) -
        new Date(
          a
            .querySelector(".transaction-info p:nth-child(2)")
            .innerText.split(": ")[1]
        )
      );
    } else if (sortOption === "amount") {
      return (
        parseFloat(
          b
            .querySelector(".transaction-info p:nth-child(3)")
            .innerText.split(": $")[1]
        ) -
        parseFloat(
          a
            .querySelector(".transaction-info p:nth-child(3)")
            .innerText.split(": $")[1]
        )
      );
    }
  });

  transactions.forEach(function (transaction) {
    transactionList.appendChild(transaction);
  });
}

function filterTransactions() {
  // Add your filter functionality here
  let filterOption = document.getElementById("filter").value;
  let transactions = document.getElementsByClassName("transaction");

  Array.from(transactions).forEach(function (transaction) {
    if (
      filterOption === "all" ||
      transaction
        .querySelector(".transaction-info p:nth-child(4)")
        .innerText.includes(filterOption)
    ) {
      transaction.style.display = "";
    } else {
      transaction.style.display = "none";
    }
  });
}
