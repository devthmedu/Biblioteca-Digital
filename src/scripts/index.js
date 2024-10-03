console.log("Este é o index.js");

const LOCAL_STORAGE_KEY = 'livros';

// Construtor de Livro
function Livro(nome, autor, tipo) {
    this.nome = nome;
    this.autor = autor;
    this.tipo = tipo;
}

// Construtor de Exibição
function Exibir() {}

// Método para adicionar um livro à interface
Exibir.prototype.adicionar = function (livro) {
    console.log("Adicionando à interface");
    const tableBody = document.getElementById('tableBody');
    const uiString = `
        <tr>
            <td>${livro.nome}</td>
            <td>${livro.autor}</td>
            <td>${livro.tipo}</td>
            <td><button class="btn btn-danger" onclick="deletarLivro('${livro.nome}')">Deletar</button></td>
        </tr>`;
    tableBody.innerHTML += uiString;
}

// Método para limpar o formulário
Exibir.prototype.limpar = function () {
    document.getElementById('libraryForm').reset();
}

// Método para validar o livro
Exibir.prototype.validar = function (livro) {
    return livro.nome.length >= 2 && livro.autor.length >= 2;
}

// Método para mostrar mensagens ao usuário
Exibir.prototype.mostrar = function (tipo, mensagem) {
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

// Adiciona um evento de envio ao formulário
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
    let livros = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
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
                <td><button class="btn btn-danger" onclick="deletarLivro('${livro.nome}')">Deletar</button></td>
            </tr>`;
        tableBody.innerHTML += uiString;
    });
}

// Função para mostrar mensagens
function mostrarMensagem(tipo, mensagem) {
    const exibir = new Exibir();
    exibir.mostrar(tipo, mensagem);
}


window.onload = atualizarTabela;
