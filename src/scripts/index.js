console.log("Este é o index.js");

const LOCAL_STORAGE_KEY = 'livros';

// Classe Livro
class Livro {
    constructor(nome, autor, tipo, descricao = '', imagem = '') {
        this.nome = nome;
        this.autor = autor;
        this.tipo = tipo;
        this.descricao = descricao;
        this.imagem = imagem;
    }
}

// Classe Exibir
class Exibir {
    adicionar(livro) {
        console.log("Adicionando à interface");
        const tableBody = document.getElementById('tableBody');
        const uiString = `
            <tr>
                <td>${livro.nome}</td>
                <td>${livro.autor}</td>
                <td>${livro.tipo}</td>
                <td><img src="${livro.imagem}" alt="${livro.nome}" style="width:50px; height:75px;"></td>
                <td>${livro.descricao || 'Descrição não disponível'}</td>
                <td><button class="btn btn-danger" onclick="deletarLivro('${livro.nome}')" aria-label="Deletar livro ${livro.nome}">Deletar</button></td>
            </tr>`;
        tableBody.innerHTML += uiString;
    }

    limpar() {
        document.getElementById('libraryForm').reset();
    }

    validar(livro) {
        return livro.nome.length >= 2 && livro.autor.length >= 2;
    }

    mostrar(tipo, mensagem) {
        const message = document.getElementById('message');
        message.innerHTML = `
            <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
                <strong>Mensagem:</strong> ${mensagem}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>`;
        setTimeout(() => {
            message.innerHTML = '';
        }, 2000);
    }
}

// Adiciona evento de envio ao formulário
document.getElementById('libraryForm').addEventListener('submit', bibliotecaFormularioEnviar);

// Função para lidar com o envio do formulário
function bibliotecaFormularioEnviar(e) {
    e.preventDefault();
    console.log('Você enviou o formulário da biblioteca');

    const nome = document.getElementById('bookName').value;
    const autor = document.getElementById('author').value;
    const tipo = document.querySelector('input[name="type"]:checked').value;

    const livro = new Livro(nome, autor, tipo);
    const exibir = new Exibir();

    if (exibir.validar(livro)) {
        exibir.adicionar(livro);
        exibir.limpar();
        exibir.mostrar('success', 'Seu livro foi adicionado com sucesso');
        salvarNoLocalStorage(livro);
    } else {
        exibir.mostrar('danger', 'Desculpe, você não pode adicionar este livro');
    }
}

// Função para salvar o livro no localStorage
function salvarNoLocalStorage(livro) {
    const livros = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    livros.push(livro);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(livros));
}

// Função para deletar um livro
function deletarLivro(nome) {
    const livros = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    const novosLivros = livros.filter(livro => livro.nome !== nome);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(novosLivros));
    
    atualizarTabela();
    mostrarMensagem('success', 'Livro deletado com sucesso');
}

// Função para atualizar a tabela a partir do localStorage
function atualizarTabela() {
    const livros = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    livros.forEach(livro => {
        const uiString = `
            <tr>
                <td>${livro.nome}</td>
                <td>${livro.autor}</td>
                <td>${livro.tipo}</td>
                <td><img src="${livro.imagem}" alt="${livro.nome}" style="width:50px; height:75px;"></td>
                <td>${livro.descricao || 'Descrição não disponível'}</td>
                <td><button class="btn btn-danger" onclick="deletarLivro('${livro.nome}')" aria-label="Deletar livro ${livro.nome}">Deletar</button></td>
            </tr>`;
        tableBody.innerHTML += uiString;
    });
}

// Função para mostrar mensagens
function mostrarMensagem(tipo, mensagem) {
    const exibir = new Exibir();
    exibir.mostrar(tipo, mensagem);
}

// Função para buscar livros da Open Library API
async function buscarLivrosOpenLibrary(titulo) {
    try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(titulo)}`);
        if (!response.ok) {
            throw new Error('Erro na busca de livros');
        }
        const data = await response.json();
        
        const livros = await Promise.all(data.docs.map(async (doc) => {
            const livroDetailsResponse = await fetch(`https://openlibrary.org/books/${doc.key}.json`);
            const livroDetails = await livroDetailsResponse.json();
            const descricao = livroDetails.description ? (typeof livroDetails.description === 'string' ? livroDetails.description : livroDetails.description.value) : '';
            const imagem = livroDetails.covers && livroDetails.covers.length > 0 ? `https://covers.openlibrary.org/b/id/${livroDetails.covers[0]}-M.jpg` : '';

            return new Livro(doc.title || 'Título desconhecido', doc.author_name ? doc.author_name.join(', ') : 'Autor desconhecido', 'Livro', descricao, imagem);
        }));
        
        return livros;
    } catch (error) {
        console.error('Erro ao buscar livros:', error);
        mostrarMensagem('danger', 'Não foi possível buscar livros. Tente novamente mais tarde.');
    }
}

// Evento para buscar livros
document.getElementById('searchButton').addEventListener('click', async () => {
    const titulo = document.getElementById('searchInput').value;
    const livros = await buscarLivrosOpenLibrary(titulo);
    const exibir = new Exibir();
    
    if (livros && livros.length > 0) {
        livros.forEach(livro => {
            exibir.adicionar(livro);
        });
    } else {
        mostrarMensagem('warning', 'Nenhum livro encontrado.');
    }
});

// Chamada inicial para preencher a tabela com livros do localStorage ao carregar a página
window.onload = atualizarTabela;
