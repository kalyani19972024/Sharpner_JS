    const form = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    const BASE_URL = 'http://localhost:3000/api/expenses';

    
    async function defaultFormSubmit(e) {
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
    }

    // ✅ Attach the default submit on page load
    form.addEventListener('submit', defaultFormSubmit);

    // ✅ Load existing expenses
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

      // 🗑 Delete button
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

      // ✏️ Edit button
      const editBtn = document.createElement('button');
      editBtn.textContent = 'Edit';
      editBtn.onclick = () => {
        // Fill form with existing values
        document.getElementById('amount').value = expense.amount;
        document.getElementById('description').value = expense.description;
        document.getElementById('category').value = expense.category;

      
        li.remove();

        // ✅ Remove the default handler before attaching the edit handler
        form.removeEventListener('submit', defaultFormSubmit);

        // ✅ Edit handler
        const editHandler = async (e) => {
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
          } catch (err) {
            console.error('Error updating expense:', err);
          }

          // ✅ Cleanup: remove edit handler and reattach default
          form.removeEventListener('submit', editHandler);
          form.addEventListener('submit', defaultFormSubmit);
        };

        // ✅ Attach edit handler
        form.addEventListener('submit', editHandler);
      };

      li.appendChild(deleteBtn);
      li.appendChild(editBtn);
      expenseList.appendChild(li);
    }