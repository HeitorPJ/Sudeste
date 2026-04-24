/* ==========================================================================
   LOGO - troca imagem entre 950px e 1050px de largura
   ========================================================================== */
function trocarLogo() {
    const logo = document.getElementById("btnVoltarAoTopo");
    if (!logo) return;

    if (window.innerWidth <= 1050 && window.innerWidth >= 950) {
        logo.src = "IMG/Logo-2.png";
    } else {
        logo.src = "IMG/Logo-1.png";
    }
}

window.addEventListener("resize", trocarLogo);
trocarLogo();

/* ========================================================================== 
HEADER TRANSPARENTE NO TOPO 
========================================================================== */
const header = document.querySelector("header");

function atualizarHeader() {
    if (!header) return;
    if (window.scrollY === 0) {
        header.classList.add("transparente");
    } else {
        header.classList.remove("transparente");
    }
}

window.addEventListener("scroll", atualizarHeader);
atualizarHeader();

/* ==========================================================================
   MENU HAMBÚRGUER
   ========================================================================== */
const menuBtn = document.getElementById("btn-menu");
const menuNav = document.getElementById("btnsHeader");
const menuIcon = document.getElementById("menu-icon");
const itensMenu = document.querySelectorAll(".nav-item");

function abrirMenu() {
    if (!menuNav || !menuIcon) return;
    menuNav.classList.add("active");
    menuIcon.src = "IMG/close.svg";
}

function fecharMenu() {
    if (!menuNav || !menuIcon) return;
    menuNav.classList.remove("active");
    menuIcon.src = "IMG/menu.svg";
}

if (menuBtn && menuNav && menuIcon) {
    menuBtn.addEventListener("click", () => {
        menuNav.classList.contains("active") ? fecharMenu() : abrirMenu();
    });

    itensMenu.forEach(item => item.addEventListener("click", fecharMenu));

    // Fechar ao clicar fora
    document.addEventListener("click", (e) => {
        if (!menuBtn.contains(e.target) && !menuNav.contains(e.target)) {
            fecharMenu();
        }
    });

    // Fechar ao voltar para desktop
    window.addEventListener("resize", () => {
        if (window.innerWidth > 950) fecharMenu();
    });
}

/* ==========================================================================
   NAVEGAÇÃO SUAVE
   ========================================================================== */
function navegarPara(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
}

function voltarAoTopo() { window.scrollTo({ top: 0, behavior: "smooth" }); fecharMenu(); }
function IrClientes() { navegarPara("clientes"); }
function IrQuemSomos() { navegarPara("QuemSomos"); }
function IrServicos() { navegarPara("servicos"); }
function IrPortifolio() { navegarPara("portifolio"); }
function IrBlog() { navegarPara("blog"); }
function IrContato() { navegarPara("contato"); }

/* ==========================================================================
   CAROUSEL
   ========================================================================== */
const carouselTrack = document.querySelector(".carousel-track");
const carouselSlides = document.querySelectorAll(".carousel-track img");

if (carouselTrack && carouselSlides.length > 0) {
    let carouselIndex = 0;

    function atualizarCarousel() {
        carouselTrack.style.transform = `translateX(-${carouselIndex * 100}%)`;
    }

    const btnNext = document.querySelector(".next");
    const btnPrev = document.querySelector(".prev");

    if (btnNext) {
        btnNext.addEventListener("click", () => {
            carouselIndex = (carouselIndex + 1) % carouselSlides.length;
            atualizarCarousel();
        });
    }

    if (btnPrev) {
        btnPrev.addEventListener("click", () => {
            carouselIndex = (carouselIndex - 1 + carouselSlides.length) % carouselSlides.length;
            atualizarCarousel();
        });
    }
}

/* ==========================================================================
   MAPA (Leaflet)
   ========================================================================== */
if (document.getElementById("mapa-imagem")) {
    const map = L.map("mapa-imagem", {
        scrollWheelZoom: false,
        touchZoom: true,
    }).setView([-15.111675, -53], 3.5);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const locais = [
        { nome: "Vitória - ES", coords: [-20.315357, -40.337874] },
        { nome: "São Paulo - SP", coords: [-23.5505, -46.6333] },
        { nome: "BH - MG", coords: [-19.9167, -43.9345] },
        { nome: "Belém - PA", coords: [-1.449461, -48.492891] },
        { nome: "Brasília - DF", coords: [-15.777537, -47.897793] },
    ];

    const iconeAzul = L.icon({
        iconUrl: "IMG/map-marker.svg",
        iconSize: [40, 40],
        iconAnchor: [20, 40],
    });

    locais.forEach(({ nome, coords }) => {
        L.marker(coords, { icon: iconeAzul })
            .addTo(map)
            .bindPopup(`<b>${nome}</b>`);
    });
}

/* ==========================================================================
   POPUP - RECEBER PORTFÓLIO
   ========================================================================== */
function abrirPopup() {
    const popup = document.getElementById("popup-email");
    if (popup) popup.classList.add("ativo");
}

function fecharPopup() {
    const popup = document.getElementById("popup-email");
    if (popup) popup.classList.remove("ativo");
}

// Fechar ao clicar fora da caixa
const popupOverlay = document.getElementById("popup-email");
if (popupOverlay) {
    popupOverlay.addEventListener("click", (e) => {
        if (e.target === popupOverlay) fecharPopup();
    });
}

/* ==========================================================================
   EMAILJS
   ========================================================================== */
emailjs.init("DLX-zTcyjTBOES62i");

/* ------ Formulário de Contato ------ */
const formContato = document.querySelector(".contato-form-container");

if (formContato) {
    formContato.addEventListener("submit", function (e) {
        e.preventDefault();

        const btn = this.querySelector(".contato-form-btn button");
        const htmlOriginal = btn.innerHTML;

        btn.textContent = "Enviando...";
        btn.disabled = true;

        const params = {
            nome: this.querySelector('[name="nome"]').value,
            email: this.querySelector('[name="email"]').value,
            empresa: this.querySelector('[name="empresa"]').value,
            telefone: this.querySelector('[name="telefone"]').value,
            servico: this.querySelector('[name="servico"]').value,
            descricao: this.querySelector('[name="descricao"]').value,
        };

        emailjs.send("service_ym07nvo", "template_9ltwmsj", params)
            .then(() => {
                btn.textContent = "Mensagem enviada! ✓";
                btn.style.backgroundColor = "#28a745";
                this.reset();
                setTimeout(() => {
                    btn.innerHTML = htmlOriginal;
                    btn.style.backgroundColor = "";
                    btn.disabled = false;
                }, 4000);
            })
            .catch(() => {
                btn.textContent = "Erro ao enviar. Tente novamente.";
                btn.style.backgroundColor = "#dc3545";
                btn.disabled = false;
                setTimeout(() => {
                    btn.innerHTML = htmlOriginal;
                    btn.style.backgroundColor = "";
                }, 4000);
            });
    });
}

/* ------ Formulário Popup Portfólio ------ */
const formPopup = document.getElementById("form-popup");

if (formPopup) {
    formPopup.addEventListener("submit", function (e) {
        e.preventDefault();

        const btn = this.querySelector("button");

        btn.textContent = "Enviando...";
        btn.disabled = true;

        const params = {
            email_cliente: this.querySelector('[name="email-popup"]').value,
            link_portfolio: "https://drive.google.com/file/d/1OzZnfagimh0yuutVJuu1mdYHJmswZH6M/view?usp=sharing",
        };

        emailjs.send("service_ym07nvo", "template_sw332p8", params)
            .then(() => {
                btn.textContent = "Enviado! ✓";
                btn.style.backgroundColor = "#28a745";
                this.reset();
                setTimeout(() => {
                    fecharPopup();
                    btn.textContent = "Receber";
                    btn.style.backgroundColor = "";
                    btn.disabled = false;
                }, 3000);
            })
            .catch(() => {
                btn.textContent = "Erro. Tente novamente.";
                btn.style.backgroundColor = "#dc3545";
                btn.disabled = false;
                setTimeout(() => {
                    btn.textContent = "Receber";
                    btn.style.backgroundColor = "";
                }, 4000);
            });
    });
}
/* ========== SCROLL REVEAL ========== */
const revelar = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visivel");
        }
    });
}, { threshold: 0.15 });

revelar.forEach(el => observer.observe(el));