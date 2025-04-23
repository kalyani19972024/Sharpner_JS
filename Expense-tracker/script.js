const form = document.getElementById('expense-form');
const expensesList = document.getElementById('expenses-list');
const totalEl = document.getElementById('total');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let editId = null; // 🔧 Track if we're editing an expense

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const date = document.getElementById('date').value;
  const category = document.getElementById('category').value;

  if (editId) {
    // 🛠 Update existing expense
    expenses = expenses.map(exp => {
      if (exp.id === editId) {
        return { ...exp, name, amount, date, category };
      }
      return exp;
    });
    editId = null;
  } else {
    // ➕ Create new expense
    const expense = {
      id: Date.now(),
      name,
      amount,
      date,
      category
    };
    expenses.push(expense);
  }

  saveAndRender();
  form.reset();
});

function saveAndRender() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
  renderExpenses();
  updateTotal();
}

function renderExpenses() {
  expensesList.innerHTML = '';

  expenses.forEach(expense => {
    const div = document.createElement('div');
    div.classList.add('expense-item');
    div.innerHTML = `
      <strong>${expense.name}</strong> - $${expense.amount.toFixed(2)} 
      (${expense.category}, ${expense.date})
      <button onclick="editExpense(${expense.id})">Edit</button>
      <button onclick="deleteExpense(${expense.id})">Delete</button>
    `;
    expensesList.appendChild(div);
  });
}

function updateTotal() {
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  totalEl.textContent = total.toFixed(2);
}

function deleteExpense(id) {
  expenses = expenses.filter(exp => exp.id !== id);
  saveAndRender();
}

function editExpense(id) {
  const exp = expenses.find(e => e.id === id);
  if (!exp) return;

  document.getElementById('name').value = exp.name;
  document.getElementById('amount').value = exp.amount;
  document.getElementById('date').value = exp.date;
  document.getElementById('category').value = exp.category;

  editId = id;
}
