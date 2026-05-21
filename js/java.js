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
function IrPortfolio() { navegarPara("portfolio"); }
function IrBlog() { navegarPara("blog"); }
function IrContato(servico = "") {
    navegarPara("contato");

    if (servico) {
        const select = document.querySelector('[name="servico"]');
        if (select) select.value = servico;
    }
}
/* ==========================================================================
   CAROUSEL
   ========================================================================== */
const carouselTrack = document.querySelector(".carousel-track");
const slidesOriginais = Array.from(document.querySelectorAll(".carousel-track img"));

if (carouselTrack && slidesOriginais.length > 0) {
    // Clona primeiro e último
    const primeiro = slidesOriginais[0].cloneNode(true);
    const ultimo = slidesOriginais[slidesOriginais.length - 1].cloneNode(true);

    carouselTrack.appendChild(primeiro);
    carouselTrack.insertBefore(ultimo, slidesOriginais[0]);

    const slides = document.querySelectorAll(".carousel-track img");
    let index = 1; // começa no 1 pois o 0 é o clone do último

    function irPara(i, animado = true) {
        carouselTrack.style.transition = animado ? "transform 0.5s ease" : "none";
        carouselTrack.style.transform = `translateX(-${i * 100}%)`;
        index = i;
    }

    // Posiciona sem animação no início
    irPara(1, false);

    carouselTrack.addEventListener("transitionend", () => {
        if (index === 0) irPara(slides.length - 2, false);
        if (index === slides.length - 1) irPara(1, false);
    });

    function proximo() { irPara(index + 1); }
    function anterior() { irPara(index - 1); }

    document.querySelector(".next")?.addEventListener("click", () => { proximo(); reiniciarAutoPlay(); });
    document.querySelector(".prev")?.addEventListener("click", () => { anterior(); reiniciarAutoPlay(); });

    let autoPlay = setInterval(proximo, 4000);
    function reiniciarAutoPlay() {
        clearInterval(autoPlay);
        autoPlay = setInterval(proximo, 4000);
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
        { nome: "Atuação em projetos técnicos ambientais e geológicos. - MG", coords: [-19.9167, -43.9345], tipo: "grande" },
        { nome: "Atuação em estudos técnicos e consultoria ambiental. - RJ", coords: [-22.9068, -43.1729], tipo: "grande" },
        { nome: "Atuação em projetos ambientais e geológicos. - BA", coords: [-12.9714, -38.5014], tipo: "grande" },
        { nome: "Atuação em projetos de geofísica aplicada. - RS", coords: [-30.0346, -51.2177], tipo: "grande" },
        { nome: "Atuação em consultoria ambiental e estudos técnicos. - GO", coords: [-16.6864, -49.2643], tipo: "grande" },

        // Espírito Santo — ícone pequeno

        { nome: "Vitória - ES", coords: [-20.3155, -40.3128], tipo: "pequeno" },
        { nome: "Serra - ES", coords: [-20.1286, -40.3072], tipo: "pequeno" },
        { nome: "Cariacica - ES", coords: [-20.2642897, -40.430602], tipo: "pequeno" },
        { nome: "Linhares - ES", coords: [-19.3912, -40.0647], tipo: "pequeno" },
        { nome: "São Mateus - ES", coords: [-18.7157, -39.8592], tipo: "pequeno" },
        { nome: "Aracruz - ES", coords: [-19.8215944, -40.3078049], tipo: "pequeno" },
        { nome: "Fundão - ES", coords: [-19.9330917, -40.423408], tipo: "pequeno" },
        { nome: "Itapemirim - ES", coords: [-21.0103, -40.8325], tipo: "pequeno" },
        { nome: "Santa Leopoldina - ES", coords: [-20.0996401, -40.5520932], tipo: "pequeno" },
        { nome: "Conceição da Barra - ES", coords: [-18.5831473, -39.7443488], tipo: "pequeno" },
        { nome: "Jaguaré - ES", coords: [-18.9096309, -40.0818343], tipo: "pequeno" },
    ];

    const iconeGrande = L.icon({ iconUrl: "IMG/map-marker.svg", iconSize: [40, 40], iconAnchor: [20, 40] });
    const iconePequeno = L.icon({ iconUrl: "IMG/map-marker.svg", iconSize: [18, 18], iconAnchor: [9, 18] });

    locais.forEach(({ nome, coords, tipo }) => {
        L.circleMarker(coords, {
            radius: 6,
            fillColor: "#009ED7",
            color: "#006fa3",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8,
        })
        .addTo(map)
        .bindPopup(`<b>${nome}</b>`);
});
}

/* ==========================================================================
   CARDS - SOLICITAR PROPOSTA
   ========================================================================== */

document.querySelectorAll(".card-btn-proposta").forEach(botao => {
    botao.addEventListener("click", () => {
        const titulo = botao.closest(".card").querySelector(".card-titulo").textContent;
        IrContato(titulo);
    });
});
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

/* ========== CARDS - SAIBA MAIS ========== */
// abrir
document.querySelectorAll(".card-btn-saiba").forEach(botao => {
    botao.addEventListener("click", () => {
        const card = botao.closest(".card");

        // fecha todos
        document.querySelectorAll(".card").forEach(c => c.classList.remove("ativo"));

        // abre só o clicado
        card.classList.add("ativo");
    });
});

// fechar
document.querySelectorAll(".card-voltar").forEach(botao => {
    botao.addEventListener("click", () => {
        botao.closest(".card").classList.remove("ativo");
    });
});