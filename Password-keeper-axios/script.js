const apiUrl = "https://crudcrud.com/api/4fdf12d656b0406aae26b91a220a31ea/password";
let passwords = [];

document.getElementById("passwordForm").addEventListener("submit",  function (e) {
    e.preventDefault();

    const id = document.getElementById("passwordId").value;
    const title = document.getElementById("name").value;
    const password = document.getElementById("password").value;

    const passwordObj = { title, password };

    if (id && id.trim() !== "") {
        axios.put(`${apiUrl}/${id}`, passwordObj)
            .then(() => {
                fetchPasswords();
                resetForm();
            })
            .catch((error) => {
                console.error("Error while updating passwords", error);
            });
    } else {
           axios.post(apiUrl, passwordObj)
          .then(response => {
                 passwords.push(response.data);
                 updateTotalCount();
                 renderPasswordList();
                 resetForm();
            })
          .catch(error => {
               console.error("Getting error while adding passwords", error);
            });
           }      
        });
 function fetchPasswords() {
       axios.get(apiUrl)
        .then(response => {
              passwords = response.data;
              updateTotalCount();
             renderPasswordList();
        })
     .catch (error => {
        console.error("Getting error while fetching passwords", error);
    });
}

function renderPasswordList(filter = "") {
    const list = document.getElementById("passwordList");
    list.innerHTML = "";

    const filtered = passwords.filter(p =>
        p.title.toLowerCase().includes(filter.toLowerCase())
    );

    filtered.forEach(passwordObj => {
        const li = document.createElement("li");
        li.innerHTML = `
        Title: ${passwordObj.title}, Password: ${passwordObj.password}
        <button onClick="editPassword('${passwordObj._id}', '${passwordObj.title}', '${passwordObj.password}')">Edit</button>
        <button onClick="deletePassword('${passwordObj._id}')">Delete</button>`;
        list.appendChild(li);
    });
}

function editPassword(id, title, password) {
    document.getElementById("passwordId").value = id;
    document.getElementById("name").value = title;
    document.getElementById("password").value = password;
}

function deletePassword(id) {
    axios.delete(`${apiUrl}/${id}`)
        .then(() => {
            passwords = passwords.filter(p => p._id !== id);
            updateTotalCount();
            renderPasswordList();
        })
        .catch((error) => {
            console.error("Getting error while deleting password", error);
        });
}

function searchByTitle() {
    const searchVal = document.getElementById('search').value.trim();
    renderPasswordList(searchVal);  
}

function updateTotalCount() {
    document.getElementById("totalCount").innerText = passwords.length;
}

function resetForm() {
    document.getElementById("passwordForm").reset();
    document.getElementById("passwordId").value = "";
}

// Initial fetch
window.onload = fetchPasswords;