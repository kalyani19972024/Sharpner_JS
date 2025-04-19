let passwords = JSON.parse(localStorage.getItem('passwords')) || [];

function saveToLocalStorage() {
  localStorage.setItem('passwords', JSON.stringify(passwords));
}

function renderPasswords(filter = '') {
  const list = document.getElementById('passwordList');
  list.innerHTML = '';
  const filtered = passwords.filter(p => p.title.toLowerCase().includes(filter.toLowerCase()));
  filtered.forEach((p, index) => {
    const entry = document.createElement('div');
    entry.className = 'entry';
    entry.innerHTML = `
      <div><strong>${p.title}</strong>: ${p.password}</div>
      <div class="actions">
        <button onclick="editPassword(${index})">Edit</button>
        <button onclick="deletePassword(${index})">Delete</button>
      </div>
    `;
    list.appendChild(entry);
  });
}

function addPassword() {
  const title = document.getElementById('title').value;
  const password = document.getElementById('password').value;
  if (!title || !password) return alert('Both fields are required!');
  passwords.push({ title, password });
  saveToLocalStorage();
  renderPasswords();
  document.getElementById('title').value = '';
  document.getElementById('password').value = '';
}

function deletePassword(index) {
  passwords.splice(index, 1);
  saveToLocalStorage();
  renderPasswords();
}

function editPassword(index) {
  const newTitle = prompt('Enter new title', passwords[index].title);
  const newPassword = prompt('Enter new password', passwords[index].password);
  if (newTitle && newPassword) {
    passwords[index] = { title: newTitle, password: newPassword };
    saveToLocalStorage();
    renderPasswords();
  }
}

function searchPasswords() {
  const searchVal = document.getElementById('search').value;
  const count = passwords.filter(p => p.title.toLowerCase().includes(searchVal.toLowerCase())).length;
  document.getElementById('searchResult').innerText = `Count: ${count}`;
  renderPasswords(searchVal);
}

renderPasswords();
