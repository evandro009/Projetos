const formulario = document.querySelector('form');
const Inome = document.querySelector('.nome');
const Iemail = document.querySelector('.email');
const Isenha = document.querySelector('.senha');
const Itel = document.querySelector('.tel');
const feedback = document.querySelector('[data-feedback]');

const STORAGE_KEY = 'cadastrosChatbotWhatsApp';
const API_URL = window?.CADASTRO_ENDPOINT || null;

function normalizarTelefone(valor) {
    return valor.replace(/\D/g, '');
}

function validarDados(dados) {
    const erros = [];

    if (!dados.nome.trim()) {
        erros.push('Informe um nome válido.');
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email);
    if (!emailValido) {
        erros.push('Informe um e-mail válido.');
    }

    if ((dados.senha ?? '').length < 6) {
        erros.push('A senha deve ter pelo menos 6 caracteres.');
    }

    const telefoneNormalizado = normalizarTelefone(dados.telefone);
    if (!/^\d{10,11}$/.test(telefoneNormalizado)) {
        erros.push('Informe um telefone com DDD contendo 10 ou 11 dígitos.');
    }

    return erros;
}

function exibirFeedback(mensagem, tipo = 'info') {
    if (!feedback) {
        return;
    }

    feedback.textContent = mensagem;
    feedback.dataset.status = tipo;
}

async function cadastrar(dados) {
    if (API_URL) {
        const resposta = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        if (!resposta.ok) {
            const erroApi = await resposta.json().catch(() => ({}));
            const mensagem = erroApi?.message || 'Erro ao comunicar com a API.';
            throw new Error(mensagem);
        }

        return resposta.json().catch(() => ({}));
    }

    const cadastros = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const registro = {
        ...dados,
        id: typeof crypto?.randomUUID === 'function' ? crypto.randomUUID() : String(Date.now()),
        criadoEm: new Date().toISOString()
    };

    cadastros.push(registro);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cadastros));

    return registro;
}

formulario.addEventListener('submit', async (event) => {
    event.preventDefault();

    const dados = {
        nome: Inome.value,
        email: Iemail.value,
        senha: Isenha.value,
        telefone: Itel.value,
    };

    const erros = validarDados(dados);

    if (erros.length) {
        exibirFeedback(erros.join(' '), 'erro');
        return;
    }

    exibirFeedback('Enviando cadastro...', 'info');

    try {
        const registro = await cadastrar(dados);
        exibirFeedback('Cadastro salvo com sucesso!', 'sucesso');
        formulario.reset();
        Inome.focus();
        console.info('Cadastro registrado:', registro);
    } catch (erro) {
        console.error('Erro ao cadastrar', erro);
        exibirFeedback(erro.message || 'Não foi possível cadastrar. Tente novamente.', 'erro');
    }
});