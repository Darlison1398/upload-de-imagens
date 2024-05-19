document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', document.querySelector('input[type="file"]').files[0]);

    fetch('http://localhost:8282/imagem/upload', {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
