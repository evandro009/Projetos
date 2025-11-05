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

### Função `cadastrar(dados)` (`script.js`)
- **Descrição**: recebe os dados do formulário e realiza o cadastro em duas modalidades:
  1. Se a variável global `window.CADASTRO_ENDPOINT` estiver definida, envia um `POST` JSON para a URL informada.
  2. Caso contrário, persiste o cadastro no `localStorage`, simulando o backend.
- **Assinatura**: `cadastrar(dados: CadastroPayload): Promise<RegistroCadastro>`.
- **Parâmetros** (`CadastroPayload`):
  - `nome` (`string`)
  - `email` (`string`)
  - `senha` (`string`)
  - `telefone` (`string`)
- **Retorno** (`RegistroCadastro`):
  - Todos os campos enviados
  - `id` (gerado com `crypto.randomUUID()` ou timestamp)
  - `criadoEm` (ISO string)
- **Erros**: lança `Error` caso a API externa retorne status não-ok ou aconteça falha no processamento.
- **Exemplo com API externa configurada**:

  ```javascript
  window.CADASTRO_ENDPOINT = 'https://sua-api.com/v1/cadastros';

  formulario.addEventListener('submit', async (event) => {
    event.preventDefault();
    const dados = {
      nome: Inome.value,
      email: Iemail.value,
      senha: Isenha.value,
      telefone: Itel.value,
    };

    try {
      const resposta = await cadastrar(dados);
      console.log('Cadastro sincronizado com a API:', resposta);
    } catch (erro) {
      console.error('Falha ao cadastrar:', erro.message);
    }
  });
  ```

### Listener de Envio do Formulário (`formulario.addEventListener('submit', ...)`)
- **Descrição**: controla o fluxo completo de cadastro no frontend.
- **Fluxo**:
  1. Normaliza os valores do formulário e monta o objeto `dados`.
  2. Valida os campos, acumulando mensagens caso haja erro (nome vazio, e-mail inválido, senha fraca, telefone fora do padrão).
  3. Exibe feedback ao usuário (`info`, `sucesso` ou `erro`) em um elemento com atributo `data-feedback`.
  4. Chama `cadastrar(dados)` e trata o resultado com `try/catch`.
  5. Em caso de sucesso, limpa o formulário, retorna o foco para o campo `Nome` e registra o payload no console.
- **Componente de feedback**: elemento `<p class="feedback" data-feedback>` com `aria-live="polite"` para acessibilidade.
- **Quando adaptar**: substitua o fallback local por integração real assim que o endpoint do chatbot estiver disponível.

## Próximos Passos Sugeridos
- Conectar `window.CADASTRO_ENDPOINT` ao backend real responsável por orquestrar o chatbot no WhatsApp.
- Implementar autenticação/autorização no backend antes de registrar contatos.
- Adicionar estados visuais (classes CSS) para os tipos de feedback exibidos (`info`, `sucesso`, `erro`).
- Criar página de listagem dos cadastros armazenados localmente para fins de depuração.
