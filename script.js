document.getElementById('loadData').addEventListener('click', () => {
    const apiUrl = 'http://localhost:3000/consultas/disponiveis';  // Certifique-se de que a URL está correta

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro HTTP! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const dataContainer = document.getElementById('data');
            dataContainer.innerHTML = '';  // Limpa qualquer conteúdo anterior

            data.dates.forEach(date => {
                const dateElement = document.createElement('div');
                dateElement.className = 'date';
                dateElement.innerText = date;
                dataContainer.appendChild(dateElement);
            });
        })
        .catch(error => console.error('Erro ao carregar dados:', error));
});
