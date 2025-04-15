const dogContainer = document.getElementById('dog-container');
const novoDogButton = document.getElementById('novo-dog');

async function carregarDog() {
    dogContainer.innerHTML = '<p class="placeholder">Carregando um novo amigo...</p>'; // Feedback de carregamento
    try {
        const response = await fetch('https://api.thedogapi.com/v1/images/search', {
            headers: {
                'x-api-key': 'live_i3crrvf64ABnTlpHDVmr4ef7EiYOnSXPGHGdKmU76QOFIjJ6tal1kzXDfgo8isrb'
            }
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.length > 0 && data[0].url) {
            dogContainer.innerHTML = `
                <img src="${data[0].url}" alt="Cachorro fofo">
            `;
        } else {
            dogContainer.innerHTML = '<p class="placeholder">Não foi possível carregar a imagem do cachorro.</p>';
        }
    } catch (error) {
        console.error("Erro ao carregar a imagem do cachorro:", error);
        dogContainer.innerHTML = '<p class="placeholder">Ocorreu um erro ao buscar a imagem.</p>';
    }
}

// Carrega um cachorro automático ao abrir o site
window.onload = carregarDog;

// Adiciona um ouvinte de eventos ao botão
novoDogButton.addEventListener('click', carregarDog);