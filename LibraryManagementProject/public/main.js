
const form = document.getElementById("borrow-form");
const borrowedDiv = document.getElementById("borrowed-books");
const returnedDiv = document.getElementById("returned-books");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("book-title").value;

  try {
    await axios.post("/api/borrow", { title });
    loadBorrowed();
  } catch (err) {
    console.error("Error borrowing book:", err);
  }
});

async function loadBorrowed() {
  try {
    const res = await axios.get("/api/borrowed");
    const books = res.data;
    borrowedDiv.innerHTML = "";

    books.forEach(b => {
      const div = document.createElement("div");
      div.innerHTML = `
        <p>${b.Book.title} - Borrowed: ${new Date(b.borrowDate).toLocaleString()} 
           | Return: ${new Date(b.returnDate).toLocaleString()} 
           | Fine: ₹${b.fineAmount}</p>
        <button onclick="returnBook(${b.id}, ${b.fineAmount})">Return</button>
      `;
      borrowedDiv.appendChild(div);
    });
  } catch (err) {
    console.error("Error loading borrowed books:", err);
  }
}

async function returnBook(id, fine) {
  try {
    const res = await axios.post(`/api/return/${id}`);
    const data = res.data;

    if (data.success) {
      loadBorrowed();
    } else {
      const payDiv = document.createElement("div");
      payDiv.innerHTML = `
        <p>₹${fine} fine due. Please pay.</p>
        <button onclick="payFine(${id})">Pay Fine</button>
      `;
      document.body.appendChild(payDiv);
    }
  } catch (err) {
    console.error("Error returning book:", err);
  }
}

async function payFine(id) {
  try {
    await axios.post(`/api/payfine/${id}`);
    loadBorrowed();
  } catch (err) {
    console.error("Error paying fine:", err);
  }
}

loadBorrowed();
