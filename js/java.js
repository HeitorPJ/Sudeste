function voltarAoTopo() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });}
function IrClientes() {
    document.getElementById("clientes-id").scrollIntoView({
        behavior: "smooth"
    });
}
function IrQuemSomos() {
    document.getElementById("QuemSomos-id").scrollIntoView({
        behavior: "smooth"
    });
}

function IrServicos() {
    document.getElementById("servicos-id").scrollIntoView({
        behavior: "smooth"
    });
}
function IrPortifolio() {
    document.getElementById("portifolio-id").scrollIntoView({
        behavior: "smooth"
    });
}
function IrBlog() {
    document.getElementById("blog-id").scrollIntoView({
        behavior: "smooth"
    });
}
function IrContato() {
    document.getElementById("contato-id").scrollIntoView({
        behavior: "smooth"
    });
}
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