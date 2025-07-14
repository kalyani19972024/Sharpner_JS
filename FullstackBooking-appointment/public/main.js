
const form = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const BASE_URL = 'http://localhost:3000/api/expenses';

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const amount = document.getElementById('amount').value;
  const description = document.getElementById('description').value;
  const category = document.getElementById('category').value;

  const expense = { amount, description, category };

  try {
    const res = await axios.post(BASE_URL, expense);
    showExpenseOnScreen(res.data);
    form.reset();
  } catch (err) {
    console.error('Error adding expense:', err);
  }
});

window.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await axios.get(BASE_URL);
    res.data.forEach(expense => showExpenseOnScreen(expense));
  } catch (err) {
    console.error('Error fetching expenses:', err);
  }
});

function showExpenseOnScreen(expense) {
  const li = document.createElement('li');
  li.textContent = `${expense.amount} - ${expense.description} - ${expense.category}`;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.onclick = async () => {
    try {
      await axios.delete(`${BASE_URL}/${expense.id}`);
      li.remove();
    } catch (err) {
      console.error('Error deleting expense:', err);
    }
  };

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.onclick = () => {
    
    document.getElementById('amount').value = expense.amount;
    document.getElementById('description').value = expense.description;
    document.getElementById('category').value = expense.category;

    
    li.remove();

    form.onsubmit = async (e) => {
      e.preventDefault();
      const updatedExpense = {
        amount: document.getElementById('amount').value,
        description: document.getElementById('description').value,
        category: document.getElementById('category').value
      };

      try {
        const res = await axios.put(`${BASE_URL}/${expense.id}`, updatedExpense);
        showExpenseOnScreen(res.data);
        form.reset();
        form.onsubmit = defaultFormSubmit;
      } catch (err) {
        console.error('Error updating expense:', err);
      }
    };
  };

  li.appendChild(deleteBtn);
  li.appendChild(editBtn);
  expenseList.appendChild(li);
}

const defaultFormSubmit = async (e) => {
  e.preventDefault();
  const amount = document.getElementById('amount').value;
  const description = document.getElementById('description').value;
  const category = document.getElementById('category').value;
  const expense = { amount, description, category };

  try {
    const res = await axios.post(BASE_URL, expense);
    showExpenseOnScreen(res.data);
    form.reset();
  } catch (err) {
    console.error('Error adding expense:', err);
  }
};

form.onsubmit = defaultFormSubmit;
