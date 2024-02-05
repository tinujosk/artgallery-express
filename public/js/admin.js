async function addArt() {
  const form = document.getElementById('addArtForm');
  const formData = new FormData(form);
  try {
    const response = await fetch('/art/add', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    alert('Art added successfully!');
    form.reset();
  } catch (error) {
    console.error('Error adding art:', error);
    alert('Error adding art. Please try again.');
  }
}
