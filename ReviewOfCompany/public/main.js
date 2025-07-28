

document.getElementById('reviewForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    companyName: document.getElementById('companyName').value.trim(),
    
    pros: document.getElementById('pros').value.trim(),
    
    cons: document.getElementById('cons').value.trim(),
    rating: parseInt(document.getElementById('rating').value)
  };
    console.log(data.companyName);
    console.log(data.pros);
    console.log(data.cons);

  try {
    const res = await axios.post('http://localhost:3200/api/reviews/add', data);
    alert(res.data.message || 'Review added!');
    e.target.reset();
  } catch (err) {
    alert('Error adding review');
    console.error(err);
  }
});


document.getElementById('searchBtn').addEventListener('click', async () => {
  const name = document.getElementById('searchInput').value;

  try {
    const res = await axios.get(`http://localhost:3200/api/reviews/search`, {
      params: { name }
    });

    const { companyName, reviews, avgRating } = res.data;

    document.getElementById('Rating').innerText = ` Rating: ${avgRating}`;
    const resultDiv = document.getElementById('results');
    resultDiv.innerHTML = '';

    reviews.forEach(review => {
      const div = document.createElement('div');
      div.innerHTML = `
        <p><strong>Company:</strong> ${companyName}</p>
        <p><strong>Pros:</strong> ${review.pros}</p>
        <p><strong>Cons:</strong> ${review.cons}</p>
        <hr>
      `;
      resultDiv.appendChild(div);
    });

  } catch (err) {
    alert('Error fetching reviews');
    console.error(err);
  }
});
