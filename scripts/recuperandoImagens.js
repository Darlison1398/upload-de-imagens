document.addEventListener('DOMContentLoaded', async () => {
    const imageListDiv = document.getElementById('imageList');

    try {
        const response = await fetch('http://localhost:8282/imagem/listaImagens');
        const imagens = await response.json();

        if (!Array.isArray(imagens)) {
            throw new Error('A lista de imagens não é um array.');
        }

        imagens.forEach(imagem => {
            const imageUrl = imagem.url;

            // Cria um elemento <img> para cada imagem
            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            imgElement.alt = imagem.filename;
            imgElement.style.maxWidth = '300px';
            imgElement.style.maxHeight = '300px';

            // editar
            var editarBtn = document.createElement('button');
            editarBtn.innerHTML = '<i class="fas fa-pen"></i>';

            // apagar
            var apagarBtn = document.createElement('button');
            apagarBtn.innerHTML = '<i class="fas fa-trash-can"></i>';

            // Adiciona um ID ao elemento div
            const divElement = document.createElement('div');
            divElement.id = `image-container-${imagem.id}`;
            divElement.classList.add('image-container');
            divElement.appendChild(imgElement);
            divElement.appendChild(editarBtn);
            divElement.appendChild(apagarBtn);

            apagarBtn.addEventListener('click', function() {
                if (confirm("Tem certeza que deseja excluir essa imagem?")) {
                    excluirDados(divElement.id, imagem.id);
                }
            });

            editarBtn.addEventListener('click', function() {
                window.location.href = 'editar.html?id=' + imagem.id;
            })

            // Adiciona o <div> à lista de imagens
            imageListDiv.appendChild(divElement);
        });
    } catch (error) {
        console.error('Erro:', error);
        imageListDiv.textContent = 'Erro ao carregar imagens.';
    }
});

// função para excluir um dado
function excluirDados(boxId, id) {
    var endpointURL = 'http://localhost:8282/imagem/apagarImagem/' + id;
    fetch(endpointURL, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            var elementoRemover = document.getElementById(boxId);
            if (elementoRemover) {
                elementoRemover.remove();
            }
            success('Imagem excluída com sucesso');
        } else {
            throw new Error('Erro ao excluir a imagem');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}

function success(message) {
    alert(message); // Você pode personalizar esta função para exibir mensagens de sucesso de outras formas.
}