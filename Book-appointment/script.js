const apiUrl = "https://crudcrud.com/api/28172242a70346948ca3c401184047e0/patient";
let patients = [];

document.getElementById("patientForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const id = document.getElementById("patientId").value;
    const Name = document.getElementById("name").value;
    const Gmail = document.getElementById("mail").value;
    const Phone = document.getElementById("phonenumber").value;

    const patient = { Name, Gmail, Phone };

    if (id) {
        // Edit existing patient
        axios.put(`${apiUrl}/${id}`, patient)
            .then(() => {
                fetchPatients();
                resetForm();
            })
            .catch(error => console.error('Error updating patient:', error));
    } else {
        // Add new patient
        axios.post(apiUrl, patient)
            .then(response => {
                patients.push(response.data);
                renderPatients();
                resetForm();
            })
            .catch(error => console.error('Error adding patient:', error));
    }
});

function fetchPatients() {
    axios.get(apiUrl)
        .then(response => {
            patients = response.data;
            renderPatients();
        })
        .catch(error => console.error('Error fetching patients:', error));
}

function renderPatients() {
    const list = document.getElementById("patientList");
    list.innerHTML = "";

    patients.forEach(patient => {
        const li = document.createElement("li");
        li.innerHTML = `
            Name: ${patient.Name}, Gmail: ${patient.Gmail}, Phone: ${patient.Phone}
            <button onclick="editPatient('${patient._id}', '${patient.Name}', '${patient.Gmail}', '${patient.Phone}')">Edit</button>
            <button onclick="deletePatient('${patient._id}')">Delete</button>
        `;
        list.appendChild(li);
    });
}

function editPatient(id, name, gmail, phone) {
    document.getElementById("patientId").value = id;
    document.getElementById("name").value = name;
    document.getElementById("mail").value = gmail;
    document.getElementById("phonenumber").value = phone;
}

function deletePatient(id) {
    axios.delete(`${apiUrl}/${id}`)
        .then(() => {
            patients = patients.filter(p => p._id !== id);
            renderPatients();
        })
        .catch(error => console.error('Error deleting patient:', error));
}

function resetForm() {
    document.getElementById("patientForm").reset();
    document.getElementById("patientId").value = "";
}

window.onload = fetchPatients;
