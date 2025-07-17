

document.getElementById('reviewForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    companyName: document.getElementById('companyName').value,
    pros: document.getElementById('pros').value,
    cons: document.getElementById('cons').value,
    rating: parseInt(document.getElementById('rating').value)
  };

  try {
    const res = await axios.post('/api/reviews/add', data);
    alert('Review added!');
    e.target.reset();
  } catch (err) {
    alert('Error adding review');
    console.error(err);
  }
});

// Search Reviews
document.getElementById('searchBtn').addEventListener('click', async () => {
  const name = document.getElementById('searchInput').value;

  try {
    const res = await axios.get(`/api/reviews/search`, {
      params: { name }
    });

    const { reviews, avgRating } = res.data;

    document.getElementById('Rating').innerText = ` Rating: ${avgRating}`;
    const resultDiv = document.getElementById('results');
    resultDiv.innerHTML = '';

    reviews.forEach(review => {
      const div = document.createElement('div');
      div.innerHTML = `
        <p><strong>Company:</strong> ${review.companyName}</p>
        <p><strong>Pros:</strong> ${review.pros}</p>
        <p><strong>Cons:</strong> ${review.cons}</p>
        <p><strong>Rating:</strong> ${review.rating}</p>
        <hr>
      `;
      resultDiv.appendChild(div);
    });

  } catch (err) {
    alert('Error fetching reviews');
    console.error(err);
  }
});
