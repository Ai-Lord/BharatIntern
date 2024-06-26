let transactions = [];

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "INR",
  signDisplay: "always",
});

const list = document.getElementById("transactionList");
const form = document.getElementById("transactionForm");
const status = document.getElementById("status");
const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");

form.addEventListener("submit", addTransaction);

async function fetchTransactions() {
  try {
    const response = await fetch("http://localhost:3000/transactions");
    const data = await response.json();
    transactions = data;
    renderList();
    updateTotal();
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }
}

function updateTotal() {
  const incomeTotal = transactions.reduce((total, trx) => total + (trx.type === "income" ? trx.amount : 0), 0);
  const expenseTotal = transactions.reduce((total, trx) => total + (trx.type === "expense" ? trx.amount : 0), 0);
  const balanceTotal = incomeTotal - expenseTotal;

  balance.textContent = formatter.format(balanceTotal).substring(1);
  income.textContent = formatter.format(incomeTotal);
  expense.textContent = formatter.format(expenseTotal * -1);
}

function renderList() {
  list.innerHTML = "";

  status.textContent = transactions.length ? "" : "No transactions.";

  transactions.forEach(({ _id, name, amount, date, type }) => {
    const sign = type === "income" ? 1 : -1;

    const li = document.createElement("li");
    li.innerHTML = `
      <div class="name">
        <h4>${name}</h4>
        <p>${new Date(date).toLocaleDateString()}</p>
      </div>
      <div class="amount ${type}">
        <span>${formatter.format(amount * sign)}</span>
      </div>
      <div class="action">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" onclick="deleteTransaction('${_id}')">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    `;
    list.appendChild(li);
  });
}

async function deleteTransaction(id) {
  try {
    const response = await fetch(`http://localhost:3000/transactions/${id}`, { method: "DELETE" });
    if (response.ok) {
      transactions = transactions.filter((trx) => trx._id !== id);
      renderList();
      updateTotal();
    }
  } catch (error) {
    console.error("Error deleting transaction:", error);
  }
}

async function addTransaction(e) {
  e.preventDefault();
  const formData = new FormData(form);

  const newTransaction = {
    name: formData.get("name"),
    amount: parseFloat(formData.get("amount")),
    date: new Date(formData.get("date")),
    type: formData.get("type") === "on" ? "income" : "expense",
  };

  try {
    const response = await fetch("http://localhost:3000/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTransaction),
    });
    const savedTransaction = await response.json();
    transactions.push(savedTransaction);
    form.reset();
    renderList();
    updateTotal();
  } catch (error) {
    console.error("Error adding transaction:", error);
  }
}

fetchTransactions();
