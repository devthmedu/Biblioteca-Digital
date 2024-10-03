# Biblioteca Digital

## Descrição

Este projeto é um sistema de gerenciamento de biblioteca digital que permite aos usuários adicionar, visualizar e gerenciar livros de forma simples e intuitiva. Com uma interface amigável e responsiva, este aplicativo foi desenvolvido utilizando HTML, CSS e JavaScript, juntamente com o framework Bootstrap para estilização.

## Funcionalidades

- **Adicionar Livros**: Insira o nome, autor e tipo de livro (Ficção, Programação ou Culinária).
- **Visualização de Livros**: Todos os livros adicionados são exibidos em uma tabela, permitindo fácil visualização e acesso.
- **Data de Retirada e Prazo de Entrega**: Os usuários podem ver a data de retirada e o prazo de entrega (de 15 a 30 dias) diretamente na tabela.
- **Validação de Formulário**: O sistema valida os dados do formulário antes de adicionar um livro, garantindo que os campos obrigatórios estejam preenchidos corretamente.
- **Alertas**: Mensagens de sucesso ou erro são exibidas para informar o usuário sobre o status das operações.

## Tecnologias Utilizadas

- **HTML**: Estrutura básica do site.
- **CSS**: Estilização da interface, utilizando o framework Bootstrap para design responsivo.
- **JavaScript**: Lógica do aplicativo para gerenciar livros e interatividade da interface.
- **Bootstrap**: Framework CSS para garantir um design responsivo e estilizado.

## Estrutura do Projeto

```
/biblioteca-digital
│
├── src/
│   ├── styles.css        # Folha de estilo principal
│   ├── scripts/
│   │   └── index.js      # Lógica principal do aplicativo
│   └── assets/           # Imagens e outros recursos
│
├── index.html            # Página principal do aplicativo
└── README.md             # Documentação do projeto
```

## Como Usar

1. **Clone o Repositório**:
   ```bash
   git clone https://github.com/seuusuario/biblioteca-digital.git
   ```
2. **Abra o arquivo `index.html` em seu navegador**.
3. **Adicione um livro** preenchendo os campos do formulário e clique em "Adicionar Livro".
4. **Visualize a lista de livros** na tabela abaixo do formulário.
