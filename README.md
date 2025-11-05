# Documentação do Projeto "Chatbot WhatsApp"

## Visão Geral
Este repositório contém um protótipo de interface web para cadastro de usuários que será integrado a um fluxo de chatbot no WhatsApp. O foco atual é a coleta de dados (nome, e-mail, senha e telefone) e a demonstração de como a camada JavaScript pode interagir com APIs HTTP para persistência ou roteamento das informações.

## Estrutura de Pastas
- `index.html`: página principal com o formulário de cadastro.
- `script.js`: camada de comportamento que captura os dados do formulário e ilustra o envio a uma API.
- `HTML com API/index.html`: arquivo de rascunho (vazio no momento) para experimentos adicionais.

## APIs, Funções e Componentes Públicos

### Formulário de Cadastro (`index.html`)
- **Descrição**: componente principal da interface, composto por campos de texto (`nome`, `email`, `senha`, `telefone`) e um botão para envio.
- **Como usar**: abra `index.html` em um navegador e preencha os campos; ao clicar em “Cadastrar”, o script associado intercepta o envio para tratar os dados no frontend.
- **Integração com o chatbot**: os dados capturados podem ser serializados e enviados a um backend que, por sua vez, orquestra mensagens via API oficial do WhatsApp (ou provedores terceiros que possuam webhook).

### Função `cadastrar()` (`script.js`)
- **Descrição**: demonstração de chamada HTTP POST utilizando `fetch`.
- **Assinatura**: `cadastrar(): Promise<void>`.
- **Comportamento**:
  - Faz uma requisição `POST` para a rota `/echo/json`.
  - Envia um payload padrão `{ a: 1, b: 2 }` como exemplo de corpo JSON.
  - Registra o resultado com `console.log`, tanto para sucesso quanto falha.
- **Quando chamar**: idealmente após validar os campos do formulário e construir o objeto com os dados reais do usuário.
- **Exemplo de uso**:

  ```javascript
  const payload = {
    nome: Inome.value,
    email: Iemail.value,
    senha: Isenha.value,
    telefone: Itel.value,
  };

  fetch('/api/v1/contatos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  .then(resposta => resposta.json())
  .then(dados => console.log('Contato cadastrado:', dados))
  .catch(erro => console.error('Falha ao cadastrar:', erro));
  ```

### Listener de Envio do Formulário (`formulario.addEventListener('submit', ...)`)
- **Descrição**: intercepta o envio do formulário, impede o comportamento padrão e consolida os valores digitados pelo usuário.
- **Fluxo**:
  1. Chama `event.preventDefault()` para evitar o reload da página.
  2. Monta um objeto `dados` com os campos `nome`, `email`, `senha` e `telefone`.
  3. Registra o objeto no console.
- **Como integrar**: substitua o `console.log(dados)` por uma chamada a `cadastrar()` (ou a uma função semelhante) passando `dados` como parâmetro.
- **Exemplo de integração**:

  ```javascript
  formulario.addEventListener('submit', async (event) => {
    event.preventDefault();
    const dados = {
      nome: Inome.value,
      email: Iemail.value,
      senha: Isenha.value,
      telefone: Itel.value,
    };

    try {
      await cadastrar(dados);
      console.info('Cadastro enviado com sucesso');
    } catch (erro) {
      console.error('Erro ao enviar cadastro', erro);
    }
  });
  ```

## Próximos Passos Sugeridos
- Implementar validações de formulário (formatos de e-mail e telefone, força de senha, campos obrigatórios).
- Adaptar `cadastrar()` para receber dinamicamente os dados do usuário e utilizar o endpoint real de integração com o WhatsApp.
- Inserir feedback visual ao usuário (ex.: mensagens de sucesso/erro) em vez de depender apenas do console.
