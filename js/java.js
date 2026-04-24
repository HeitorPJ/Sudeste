/*-------Troca a logo quando o zoom esta entre 950 e 1050*/
function trocarLogo() {
    const logo = document.getElementById("btnVoltarAoTopo");
    const header = document.querySelector("header");
    if (!logo || !header) return;

    if (window.innerWidth <= 1050 && window.innerWidth >= 950) {
        logo.src = "IMG/Logo-2.png";
        header.style.padding = "35px 0";
    } else {
        logo.src = "IMG/Logo-1.png";
        header.style.padding = "10px 0";
    }
}
window.addEventListener("resize", trocarLogo);
trocarLogo();

/*-------Abrir e fechar menu*/
const menuBtn = document.getElementById("btn-menu");
const menu = document.getElementById("btnsHeader");
const icon = document.getElementById("menu-icon");
const itensMenu = document.querySelectorAll(".nav-item");

if (menuBtn && menu && icon) {
    menuBtn.addEventListener("click", () => {
        menu.classList.toggle("active");
        icon.src = menu.classList.contains("active") ? "IMG/close.svg" : "IMG/menu.svg";
    });

    itensMenu.forEach(item => {
        item.addEventListener("click", () => {
            menu.classList.remove("active");
            icon.src = "IMG/menu.svg";
        });
    });
}

/*------ funcoes do header-------*/
function voltarAoTopo() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const m = document.getElementById("btnsHeader");
    const i = document.getElementById("menu-icon");
    if (m) m.classList.remove("active");
    if (i) i.src = "IMG/menu.svg";
}
function IrClientes() {
    const el = document.getElementById("clientes");
    if (el) el.scrollIntoView({ behavior: "smooth" });
}
function IrQuemSomos() {
    const el = document.getElementById("QuemSomos");
    if (el) el.scrollIntoView({ behavior: "smooth" });
}
function IrServicos() {
    const el = document.getElementById("servicos");
    if (el) el.scrollIntoView({ behavior: "smooth" });
}
function IrPortifolio() {
    const el = document.getElementById("portifolio");
    if (el) el.scrollIntoView({ behavior: "smooth" });
}
function IrBlog() {
    const el = document.getElementById("blog");
    if (el) el.scrollIntoView({ behavior: "smooth" });
}
function IrContato() {
    const el = document.getElementById("contato");
    if (el) el.scrollIntoView({ behavior: "smooth" });
}

/*------- Carousel -------*/
const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.carousel-track img');

if (track && slides.length > 0) {
    let index = 0;

    document.querySelector('.next').onclick = () => {
        index = (index + 1) % slides.length;
        track.style.transform = `translateX(-${index * 100}%)`;
    };

    document.querySelector('.prev').onclick = () => {
        index = (index - 1 + slides.length) % slides.length;
        track.style.transform = `translateX(-${index * 100}%)`;
    };
}

/*------- Mapa -------*/
if (document.getElementById('mapa-imagem')) {
    var map = L.map('mapa-imagem', {
        scrollWheelZoom: false,
        touchZoom: true,
    }).setView([-15.111675, -53], 3.5);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var locais = [
        { nome: "Vitória - ES", coords: [-20.315357, -40.337874] },
        { nome: "São Paulo - SP", coords: [-23.5505, -46.6333] },
        { nome: "BH - MG", coords: [-19.9167, -43.9345] },
        { nome: "Belem - PA", coords: [-1.449461, -48.492891] },
        { nome: "Brasilia - DF", coords: [-15.777537, -47.897793] }
    ];

    var iconeAzul = L.icon({
        iconUrl: 'IMG/map-marker.svg',
        iconSize: [40, 40],
        iconAnchor: [20, 40]
    });

    locais.forEach(local => {
        L.marker(local.coords, { icon: iconeAzul })
            .addTo(map)
            .bindPopup(`<b>${local.nome}</b>`);
    });
}

/*------- Pop-up -------*/
function abrirPopup() {
    const popup = document.getElementById("popup-email");
    if (popup) popup.classList.add("ativo");
}

function fecharPopup() {
    const popup = document.getElementById("popup-email");
    if (popup) popup.classList.remove("ativo");
}

/*------- EmailJS -------*/
emailjs.init("DLX-zTcyjTBOES62i");

// Formulário de Contato
const formContato = document.querySelector(".contato-form-container");
if (formContato) {
    formContato.addEventListener("submit", function(e) {
        e.preventDefault();

        const btn = document.querySelector(".contato-form-btn button");
        btn.textContent = "Enviando...";
        btn.disabled = true;

        const params = {
            nome:      this.querySelector('[name="nome"]').value,
            email:     this.querySelector('[name="email"]').value,
            empresa:   this.querySelector('[name="empresa"]').value,
            telefone:  this.querySelector('[name="telefone"]').value,
            servico:   this.querySelector('[name="servico"]').value,
            descricao: this.querySelector('[name="descricao"]').value,
        };

        emailjs.send("service_ym07nvo", "template_9ltwmsj", params)
            .then(() => {
                btn.textContent = "Mensagem enviada! ✓";
                btn.style.backgroundColor = "#28a745";
                this.reset();
                setTimeout(() => {
                    btn.textContent = "ENVIAR MENSAGEM";
                    btn.style.backgroundColor = "";
                    btn.disabled = false;
                }, 4000);
            })
            .catch(() => {
                btn.textContent = "Erro ao enviar. Tente novamente.";
                btn.style.backgroundColor = "#dc3545";
                btn.disabled = false;
                setTimeout(() => {
                    btn.textContent = "ENVIAR MENSAGEM";
                    btn.style.backgroundColor = "";
                }, 4000);
            });
    });
}

// Formulário Popup Portfólio
const formPopup = document.getElementById("form-popup");
if (formPopup) {
    formPopup.addEventListener("submit", function(e) {
        e.preventDefault();

        const btn = this.querySelector("button");
        btn.textContent = "Enviando...";
        btn.disabled = true;

        const params = {
            email_cliente:  this.querySelector('[name="email-popup"]').value,
            link_portfolio: "https://drive.google.com/file/d/1OzZnfagimh0yuutVJuu1mdYHJmswZH6M/view?usp=sharing"
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