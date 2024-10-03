const BASE_URL = "http://openlibrary.org";

// Função para obter as listas de um usuário
async function obterListasUsuario(username) {
    const response = await fetch(`${BASE_URL}/people/${username}/lists.json`);
    if (!response.ok) throw new Error(`Erro ao obter listas: ${response.statusText}`);
    return await response.json();
}

// Função para criar uma lista
async function criarLista(username, lista) {
    const response = await fetch(`${BASE_URL}/people/${username}/lists`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(lista),
    });

    if (!response.ok) throw new Error(`Erro ao criar lista: ${response.statusText}`);
    return await response.json();
}

// Função para deletar uma lista
async function deletarLista(username, listId) {
    const response = await fetch(`${BASE_URL}/people/${username}/lists/${listId}/delete.json`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) throw new Error(`Erro ao deletar lista: ${response.statusText}`);
    return await response.json();
}

// Função para adicionar seeds a uma lista
async function adicionarSeedsLista(username, listId, seeds) {
    const response = await fetch(`${BASE_URL}/people/${username}/lists/${listId}/seeds`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ add: seeds }),
    });

    if (!response.ok) throw new Error(`Erro ao adicionar seeds: ${response.statusText}`);
    return await response.json();
}

// Função para deletar seeds de uma lista
async function deletarSeedsLista(username, listId, seeds) {
    const response = await fetch(`${BASE_URL}/people/${username}/lists/${listId}/seeds`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ remove: seeds }),
    });

    if (!response.ok) throw new Error(`Erro ao deletar seeds: ${response.statusText}`);
    return await response.json();
}

// Função para buscar listas
async function buscarListas(query) {
    const response = await fetch(`${BASE_URL}/search/lists.json?q=${encodeURIComponent(query)}&limit=20`);
    if (!response.ok) throw new Error(`Erro ao buscar listas: ${response.statusText}`);
    return await response.json();
}

// Função para obter seeds de uma lista
async function obterSeedsLista(username, listId) {
    const response = await fetch(`${BASE_URL}/people/${username}/lists/${listId}/seeds.json`);
    if (!response.ok) throw new Error(`Erro ao obter seeds: ${response.statusText}`);
    return await response.json();
}

// Função para obter edições de uma lista
async function obterEdicoesLista(username, listId) {
    const response = await fetch(`${BASE_URL}/people/${username}/lists/${listId}/editions.json`);
    if (!response.ok) throw new Error(`Erro ao obter edições: ${response.statusText}`);
    return await response.json();
}

// Função para obter assuntos de uma lista
async function obterAssuntosLista(username, listId) {
    const response = await fetch(`${BASE_URL}/people/${username}/lists/${listId}/subjects.json`);
    if (!response.ok) throw new Error(`Erro ao obter assuntos: ${response.statusText}`);
    return await response.json();
}

// Exemplo de uso
(async () => {
    try {
        const listas = await obterListasUsuario("george08");
        console.log("Listas do usuário:", listas);

        const novaLista = {
            name: "Nova Lista de Teste",
            description: "Uma descrição para a nova lista.",
        };
        const listaCriada = await criarLista("george08", novaLista);
        console.log("Lista criada:", listaCriada);

        // Exemplo de como adicionar seeds
        const seeds = ["ol:OL12345M", "ol:OL67890M"]; // IDs de exemplo
        const resultadoAdicionarSeeds = await adicionarSeedsLista("george08", listaCriada.id, seeds);
        console.log("Seeds adicionados:", resultadoAdicionarSeeds);

    } catch (error) {
        console.error(error);
    }
})();
