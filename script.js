document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');
    const searchForm = document.getElementById('searchForm');

    // Função para buscar a nota
    function buscarNota() {
        const lastName = document.getElementById('lastName').value.trim().toLowerCase();
        const resultDiv = document.getElementById('result');

        console.log(`Buscando dados para o sobrenome: ${lastName}`);

        fetch('resultado.csv') // Substitua pelo caminho correto para o seu arquivo CSV
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na resposta da rede');
                }
                return response.text();
            })
            .then(csvText => {
                const rows = csvText.split('\n').map(row => row.split(','));
                let found = false;

                rows.forEach((row, index) => {
                    // Ignorar a linha do cabeçalho
                    if (index === 0) return;

                    if (row[1].toLowerCase() === lastName) {
                        found = true;
                        resultDiv.innerHTML = `
                            <h3>Resultado:</h3>
                            <p><strong>Nome:</strong> ${row[0]}</p>
                            <p><strong>Sobrenome:</strong> ${row[1]}</p>
                            <p><strong>E-mail:</strong> ${row[2]}</p>
                            <p><strong>Turma:</strong> ${row[3]}</p>
                            <p><strong>Prova Teórica:</strong> ${row[4]} Pontos</p>
                            <p><strong>Prova Prática:</strong> ${row[5]} Pontos</p>
                            <p><strong>Trabalhos:</strong> ${row[6]} Pontos</p>
                            <p><strong>Presença:</strong> ${row[7]}</p>
                            <p><strong>Nota Final:</strong> ${row[8]} Pontos</p>
                            <p><strong>Status: <span class="status-green">${row[9]}</span></p>  </strong>
                            <p><strong>Mensagem:</strong> ${row[10]}</p>
                        `;
                    }
                });

                if (!found) {
                    resultDiv.innerHTML = `
                        <h3>Resultado:</h3>
                        <p>Sobrenome não encontrado.</p>
                    `;
                }
            })
            .catch(error => {
                console.error('Erro ao buscar dados:', error);
                resultDiv.innerHTML = `
                    <h3>Erro:</h3>
                    <p>Não foi possível buscar os dados. Tente novamente mais tarde.</p>
                `;
            });
    }

    // Adiciona evento de clique ao botão
    searchButton.addEventListener('click', buscarNota);

    // Adiciona evento de submissão ao formulário para capturar a tecla Enter
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        buscarNota();
    });
});