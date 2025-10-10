// scripts.js - Lógica adaptada do site, incluindo alternância de tema e outras funcionalidades originais

// Função auxiliar para verificar se um elemento existe
function checkElement(selector, errorMessage) {
    const element = document.querySelector(selector);
    if (!element) console.warn(errorMessage);
    return element;
}

// Alternância de Tema
const themeToggle = checkElement('#theme-toggle-checkbox', 'Botão de alternância de tema não encontrado.');
const htmlElement = document.documentElement;

if (themeToggle) {
    themeToggle.addEventListener('change', () => {
        const newTheme = themeToggle.checked ? 'light' : 'dark';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    if (themeToggle) themeToggle.checked = savedTheme === 'light';
});

// Categorias de Produtos
const btnsCategoria = document.querySelectorAll('.categoria-btn');
const categoriasProdutos = document.querySelectorAll('.categoria-produtos');

btnsCategoria.forEach(btn => {
    btn.addEventListener('click', () => {
        btnsCategoria.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const categoria = btn.getAttribute('data-categoria');
        categoriasProdutos.forEach(cat => cat.classList.remove('active'));
        const categoriaElement = document.getElementById(categoria);
        if (categoriaElement) {
            categoriaElement.classList.add('active');
        } else {
            console.warn(`Categoria com ID "${categoria}" não encontrada.`);
        }
    });
});

// Submenu Navigation
document.querySelectorAll('.submenu a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href') ? .substring(1) || '';
        const targetSection = document.getElementById(targetId);
        const categoryButton = document.querySelector(`.categoria-btn[data-categoria="${targetId}"]`);

        if (targetSection && categoryButton) {
            targetSection.classList.add('active');
            categoryButton.classList.add('active');
            btnsCategoria.forEach(b => {
                if (b !== categoryButton) b.classList.remove('active');
            });
            categoriasProdutos.forEach(cat => {
                if (cat !== targetSection) cat.classList.remove('active');
            });
            targetSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            console.warn(`Seção ou botão de categoria com ID "${targetId}" não encontrado.`);
        }
    });
});

// Galeria
const modal = checkElement('#modalGaleria', 'Modal da galeria não encontrado.');
const modalImg = checkElement('#modalImagem', 'Imagem do modal não encontrada.');
const modalCaption = checkElement('#modalCaption', 'Caption do modal não encontrada.');
const verMaisBtns = document.querySelectorAll('.btn-ver-mais');
const fecharModal = checkElement('.fechar-modal', 'Botão de fechar modal não encontrado.');
const prevBtn = checkElement('.nav-btn.prev', 'Botão "Anterior" do modal não encontrado.');
const nextBtn = checkElement('.nav-btn.next', 'Botão "Próximo" do modal não encontrado.');
const itensGaleria = document.querySelectorAll('.galeria-item');
let currentIndex = 0;

verMaisBtns.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = index;
        const item = btn.closest('.galeria-item');
        if (!item) return console.warn('Item da galeria não encontrado.');
        const img = item.querySelector('img');
        const titulo = (item.querySelector('h3') ? .textContent) || 'Sem título';
        const descricao = (item.querySelector('p') ? .textContent) || 'Sem descrição';
        if (modal && modalImg && modalCaption) {
            modal.style.display = 'flex';
            modalImg.src = img.src;
            modalCaption.innerHTML = `<h3>${titulo}</h3><p>${descricao}</p>`;
        }
    });
});

if (fecharModal) {
    fecharModal.addEventListener('click', () => {
        if (modal) modal.style.display = 'none';
    });
}

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Suporte a teclado (fechar modal com Esc)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
        }
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        console.log('Clicou em Anterior, currentIndex:', currentIndex); // Depuração
        currentIndex = (currentIndex - 1 + itensGaleria.length) % itensGaleria.length;
        const item = itensGaleria[currentIndex];
        if (!item) {
            console.warn('Item da galeria não encontrado no índice:', currentIndex);
            return;
        }
        const img = item.querySelector('img');
        if (!img) {
            console.warn('Imagem não encontrada no item da galeria:', item);
            return;
        }
        const titulo = (item.querySelector('h3') ? .textContent) || 'Sem título';
        const descricao = (item.querySelector('p') ? .textContent) || 'Sem descrição';
        if (modalImg && modalCaption) {
            modalImg.src = img.src;
            modalCaption.innerHTML = `<h3>${titulo}</h3><p>${descricao}</p>`;
        }
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        console.log('Clicou em Próximo, currentIndex:', currentIndex); // Depuração
        currentIndex = (currentIndex + 1) % itensGaleria.length;
        const item = itensGaleria[currentIndex];
        if (!item) {
            console.warn('Item da galeria não encontrado no índice:', currentIndex);
            return;
        }
        const img = item.querySelector('img');
        if (!img) {
            console.warn('Imagem não encontrada no item da galeria:', item);
            return;
        }
        const titulo = (item.querySelector('h3') ? .textContent) || 'Sem título';
        const descricao = (item.querySelector('p') ? .textContent) || 'Sem descrição';
        if (modalImg && modalCaption) {
            modalImg.src = img.src;
            modalCaption.innerHTML = `<h3>${titulo}</h3><p>${descricao}</p>`;
        }
    });
}

// Contador Animado para Estatísticas
const contadores = document.querySelectorAll('.stat-numero');
const velocidade = 200;

function iniciarContador(contador) {
    const alvo = +contador.getAttribute('data-target') || 0;
    const incremento = alvo / velocidade;
    let atual = +contador.innerText || 0;

    function atualizarContador() {
        if (atual < alvo) {
            atual += incremento;
            contador.innerText = Math.ceil(atual);
            requestAnimationFrame(atualizarContador);
        } else {
            contador.innerText = alvo;
        }
    }
    requestAnimationFrame(atualizarContador);
}

const observador = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const contador = entry.target;
            if (contador.innerText === '0' || !contador.hasAttribute('data-animated')) {
                contador.setAttribute('data-animated', 'true');
                iniciarContador(contador);
            }
        }
    });
}, { threshold: 0.5 });

contadores.forEach(contador => {
    observador.observe(contador);
});

// FAQ
const faqToggles = document.querySelectorAll('.faq-toggle');
faqToggles.forEach(toggle => {
    toggle.addEventListener('change', () => {
        const faqItem = toggle.closest('.faq-item');
        if (!faqItem) {
            console.warn('Contêiner .faq-item não encontrado para o toggle.', toggle);
            return;
        }

        const resposta = faqItem.querySelector('.faq-resposta');
        if (resposta) {
            resposta.classList.toggle('active');
        } else {
            console.warn('Elemento .faq-resposta não encontrado dentro do .faq-item.', faqItem);
        }
    });
});

// Depoimentos
const depoimentoRadios = document.querySelectorAll('input[name="depoimento"]');
const depoimentoCards = document.querySelectorAll('.depoimento-card');

depoimentoRadios.forEach((radio, index) => {
    radio.addEventListener('change', () => {
        depoimentoCards.forEach(card => card.classList.remove('active'));
        if (depoimentoCards[index]) {
            depoimentoCards[index].classList.add('active');
        } else {
            console.warn(`Card de depoimento no índice ${index} não encontrado.`);
        }
    });
});

// Ativar o primeiro depoimento ao carregar
if (depoimentoCards.length > 0) {
    depoimentoCards[0].classList.add('active');
}

// Inicializar primeira categoria por padrão (teclados)
document.addEventListener('DOMContentLoaded', () => {
    const primeiraCategoria = document.querySelector('.categoria-btn[data-categoria="teclados"]');
    const primeiraSecao = document.getElementById('teclados');
    if (primeiraCategoria && primeiraSecao) {
        primeiraCategoria.classList.add('active');
        primeiraSecao.classList.add('active');
    }
});