console.log('Esta é a versão ES6 do Projeto 2');

class Livro {
    constructor(nome, autor, tipo, dataRetirada, dataEntrega) {
        this.nome = nome;
        this.autor = autor;
        this.tipo = tipo;
        this.dataRetirada = dataRetirada;
        this.dataEntrega = dataEntrega;
    }
}

class Exibir {
    adicionar(livro) {
        console.log("Adicionando à interface");
        let corpoTabela = document.getElementById('tableBody');
        let uiString = `<tr>
                            <td>${livro.nome}</td>
                            <td>${livro.autor}</td>
                            <td>${livro.tipo}</td>
                            <td>${livro.dataRetirada}</td>
                            <td>${livro.dataEntrega}</td>
                        </tr>`;
        corpoTabela.innerHTML += uiString;
    }

    limpar() {
        let formularioBiblioteca = document.getElementById('libraryForm');
        formularioBiblioteca.reset();
    }

    validar(livro) {
        if (livro.nome.length < 2 || livro.autor.length < 2) {
            return false;
        } else {
            return true;
        }
    }

    mostrar(tipo, mensagemExibir) {
        let mensagem = document.getElementById('message');
        let textoNegrito;
        if (tipo === 'success') {
            textoNegrito = 'Sucesso';
        } else {
            textoNegrito = 'Erro!';
        }
        mensagem.innerHTML = `<div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
                                <strong>${textoNegrito}:</strong> ${mensagemExibir}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Fechar">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>`;
        setTimeout(function () {
            mensagem.innerHTML = '';
        }, 5000);
    }
}

// Adiciona o evento de submit ao formularioBiblioteca
let formularioBiblioteca = document.getElementById('libraryForm');
formularioBiblioteca.addEventListener('submit', formularioBibliotecaSubmit);

function formularioBibliotecaSubmit(e) {
    console.log('Você enviou o formulário da biblioteca');
    let nome = document.getElementById('bookName').value;
    let autor = document.getElementById('author').value;
    let tipo;
    let ficcao = document.getElementById('fiction');
    let programacao = document.getElementById('programming');
    let culinaria = document.getElementById('cooking');

    if (ficcao.checked) {
        tipo = ficcao.value;
    } else if (programacao.checked) {
        tipo = programacao.value;
    } else if (culinaria.checked) {
        tipo = culinaria.value;
    }

    let dataRetirada = document.getElementById('withdrawalDate').value;
    
    if (!dataRetirada) {
        exibir.mostrar('danger', 'Por favor, insira uma data de retirada válida.');
        return;
    }

    let dataEntrega = calcularDataEntrega(dataRetirada);

    let livro = new Livro(nome, autor, tipo, dataRetirada, dataEntrega);
    console.log(livro);

    let exibir = new Exibir();

    if (exibir.validar(livro)) {
        exibir.adicionar(livro);
        exibir.limpar();
        exibir.mostrar('success', 'Seu livro foi adicionado com sucesso');
    } else {
        exibir.mostrar('danger', 'Desculpe, você não pode adicionar este livro');
    }

    e.preventDefault();
}

function calcularDataEntrega(dataRetirada) {
    const data = new Date(dataRetirada);
    data.setDate(data.getDate() + 30); 
    return data.toLocaleDateString('pt-BR'); 
}
