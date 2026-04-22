/*-------Troca a logo quando o zoom esta entre 950 e 1050*/
function trocarLogo() {
    const logo = document.getElementById("btnVoltarAoTopo");
    const header = document.querySelector("header");

    if (window.innerWidth <= 1050 && window.innerWidth >= 950 ) {
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

menuBtn.addEventListener("click", () => {
    menu.classList.toggle("active");

    if (menu.classList.contains("active")) {
        icon.src = "IMG/close.svg";
    } else {
        icon.src = "IMG/menu.svg";
    }
});

// fechar ao clicar em qualquer item
itensMenu.forEach(item => {
    item.addEventListener("click", () => {
        menu.classList.remove("active");
        icon.src = "IMG/menu.svg";
    });
});

/*------ funcoes do header-------*/
function voltarAoTopo() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
    const menu = document.getElementById("btnsHeader");
    const icon = document.getElementById("menu-icon");

    menu.classList.remove("active");
    icon.src = "IMG/menu.svg";


}
function IrClientes() {
    document.getElementById("clientes").scrollIntoView({
        behavior: "smooth"
    });
}
function IrQuemSomos() {
    document.getElementById("QuemSomos").scrollIntoView({
        behavior: "smooth"
    });
}

function IrServicos() {
    document.getElementById("servicos").scrollIntoView({
        behavior: "smooth"
    });
}
function IrPortifolio() {
    document.getElementById("portifolio").scrollIntoView({
        behavior: "smooth"
    });
}
function IrBlog() {
    document.getElementById("blog").scrollIntoView({
        behavior: "smooth"
    });
}
function IrContato() {
    document.getElementById("contato").scrollIntoView({
        behavior: "smooth"
    });
}


// funcionalidade do carousel
const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.carousel-track img');

let index = 0;

document.querySelector('.next').onclick = () => {
    index = (index + 1) % slides.length;
    updateCarousel();
};

document.querySelector('.prev').onclick = () => {
    index = (index - 1 + slides.length) % slides.length;
    updateCarousel();
};

function updateCarousel() {
    track.style.transform = `translateX(-${index * 100}%)`;
}


// funcionalidades do mapa 
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

// ------- pop-up
function abrirPopup() {
    document.getElementById("popup-email").classList.add("ativo");
}

function fecharPopup() {
    document.getElementById("popup-email").classList.remove("ativo");
}

