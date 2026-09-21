// Configure the brokerage number with country code + DDD + number (digits only).
// Keep this placeholder until a real destination is supplied.
const WHATSAPP_NUMBER = '55XXXXXXXXXXX';
const WHATSAPP_MESSAGE = 'Olá! Vim pelo site da NOVA ESTATE e gostaria de receber informações sobre os imóveis disponíveis.';

const properties = [
  {
    id: 'casa-lambari', title: 'CASA CONTEMPORÂNEA', city: 'LAMBARI — MG', price: 'R$ 2.850.000',
    image: 'public/images/property-01.webp', width: 1200, height: 896,
    alt: 'Casa contemporânea de concreto claro, varanda de vidro e jardim tropical ao entardecer',
    description: 'Arquitetura de linhas precisas, ambientes abertos ao jardim e materiais naturais. Uma residência para viver com tranquilidade em Lambari.'
  },
  {
    id: 'residencia-sao-lourenco', title: 'RESIDÊNCIA EXCLUSIVA', city: 'SÃO LOURENÇO — MG', price: 'R$ 3.200.000',
    image: 'public/images/property-02.webp', width: 1200, height: 896,
    alt: 'Residência com fachada de pedra natural, madeira, varanda de vidro e paisagismo tropical',
    description: 'Pedra, madeira e luz natural em uma composição acolhedora. Espaços generosos e uma relação próxima com a natureza em São Lourenço.'
  },
  {
    id: 'apartamento-bh', title: 'APARTAMENTO PREMIUM', city: 'BELO HORIZONTE — MG', price: 'R$ 1.850.000',
    image: 'public/images/moscow.jpg', width: 1200, height: 900,
    alt: 'Sala de estar contemporânea com sofás claros, grandes janelas e decoração em tons naturais',
    description: 'Interiores serenos, luz natural e ambientes integrados. Uma seleção para quem procura conforto e arquitetura contemporânea em Belo Horizonte.'
  },
  {
    id: 'villa-sul-minas', title: 'VILLA COM PISCINA', city: 'SUL DE MINAS — MG', price: 'R$ 4.500.000',
    image: 'public/images/bali.jpg', width: 1200, height: 800,
    alt: 'Villa contemporânea de dois pavimentos com piscina e jardim',
    description: 'Uma casa aberta à paisagem, com piscina e espaços para receber. Um refúgio para aproveitar o ritmo tranquilo do Sul de Minas.'
  }
];

const grid = document.querySelector('#property-grid');
grid.innerHTML = properties.map(p =>
  '<article class="property-card">' +
    '<div class="property-photo"><img src="' + p.image + '" alt="' + p.alt +
    '" loading="lazy" decoding="async" width="' + p.width + '" height="' + p.height + '"></div>' +
    '<div class="property-body"><h3>' + p.title + '</h3>' +
      '<p class="location">' + p.city + '</p><p class="price">' + p.price + '</p>' +
      '<button class="details" data-property="' + p.id + '" aria-label="Ver detalhes: ' + p.title +
      '">VER DETALHES <span aria-hidden="true">→</span></button>' +
    '</div></article>'
).join('');

const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
function closeMenu() {
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Abrir menu');
  nav.classList.remove('is-open');
}
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  nav.classList.toggle('is-open', open);
});
nav.addEventListener('click', e => { if (e.target.closest('a,button')) closeMenu(); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menu.focus();
  }
});
document.addEventListener('click', e => { if (!e.target.closest('.header')) closeMenu(); });
window.matchMedia('(min-width: 769px)').addEventListener('change', closeMenu);

const heroVideo = document.querySelector('.hero-video');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const motionButton = document.querySelector('.motion-toggle');
const dialog = document.querySelector('#detail-dialog');
let manuallyPaused = false;
function syncHeroPlayback() {
  heroVideo.muted = true;
  const paused = manuallyPaused || reducedMotion.matches || document.hidden || dialog.open;
  if (paused) heroVideo.pause();
  else heroVideo.play().catch(() => { /* Keep the poster when autoplay is unavailable. */ });
  motionButton.setAttribute('aria-pressed', String(manuallyPaused));
  motionButton.setAttribute('aria-label', manuallyPaused ? 'Reproduzir vídeo de fundo' : 'Pausar vídeo de fundo');
  motionButton.innerHTML = manuallyPaused
    ? '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="m5 3 8 5-8 5Z"/></svg>'
    : '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3v10M11 3v10"/></svg>';
  motionButton.hidden = reducedMotion.matches;
}
motionButton.addEventListener('click', () => { manuallyPaused = !manuallyPaused; syncHeroPlayback(); });
reducedMotion.addEventListener('change', syncHeroPlayback);
document.addEventListener('visibilitychange', syncHeroPlayback);
syncHeroPlayback();

let previousFocus;
let selectedProperty = null;
function openDialog(content) {
  previousFocus = document.activeElement;
  document.querySelector('#dialog-content').innerHTML = content;
  dialog.showModal();
  document.body.style.overflow = 'hidden';
  syncHeroPlayback();
}
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => {
  if (e.target === dialog) {
    const r = dialog.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();
  }
  const contact = e.target.closest('.dialog-contact');
  if (contact) {
    selectedProperty = properties.find(p => p.id === contact.dataset.property) || null;
    dialog.close();
    document.querySelector('#whatsapp').focus({ preventScroll: true });
  }
});
dialog.addEventListener('close', () => {
  const film = dialog.querySelector('video');
  if (film) film.pause();
  document.body.style.overflow = '';
  previousFocus?.focus({ preventScroll: true });
  syncHeroPlayback();
});
grid.addEventListener('click', e => {
  const trigger = e.target.closest('[data-property]');
  if (!trigger) return;
  const p = properties.find(item => item.id === trigger.dataset.property);
  openDialog(
    '<img class="dialog-image" src="' + p.image + '" alt="' + p.alt + '">' +
    '<div class="dialog-body"><p class="eyebrow">' + p.city + '</p>' +
    '<h2 id="dialog-title">' + p.title + '</h2><p>' + p.description + '</p>' +
    '<p class="price">' + p.price + '</p><p class="disclosure">Imóvel demonstrativo. Imagem e valor ilustrativos.</p>' +
    '<a class="button button-gold dialog-contact" data-property="' + p.id + '" href="#contato">CONSULTAR ESTE IMÓVEL</a></div>'
  );
});
document.querySelector('[data-about]').addEventListener('click', () => openDialog(
  '<div class="dialog-body"><p class="eyebrow">NOVA ESTATE · MINAS GERAIS</p>' +
  '<h2 id="dialog-title">Um olhar para<br>o extraordinário.</h2>' +
  '<p>Uma boutique imobiliária dedicada à compra, venda e locação de imóveis em Minas Gerais. Arquitetura, localização e identidade orientam a nossa seleção.</p>' +
  '<p>Atendimento personalizado e discrição para encontrar um imóvel que faça sentido para a sua vida.</p>' +
  '<p class="disclosure">Projeto demonstrativo de uma imobiliária fictícia.</p>' +
  '<a class="button button-gold dialog-contact" href="#contato">FALE COM UM CORRETOR</a></div>'
));
document.querySelector('#film-trigger').addEventListener('click', () => openDialog(
  '<video class="film-video" controls autoplay muted playsinline preload="metadata" poster="public/images/hero-estate.webp" aria-label="Filme arquitetônico da NOVA ESTATE">' +
  '<source src="public/videos/hero-estate.mp4" type="video/mp4"></video>' +
  '<div class="dialog-body"><p class="eyebrow">NOVA ESTATE</p><h2 id="dialog-title">A arte de habitar.</h2>' +
  '<p>Arquitetura que acolhe. Espaços que inspiram. Encontre o extraordinário em Minas Gerais.</p></div>'
));

function normalizeBrazilianPhone(value) {
  if (!/^[+\d\s().-]+$/.test(value)) return null;
  let digits = value.replace(/\D/g, '');
  if (digits.startsWith('55') && (digits.length === 12 || digits.length === 13)) digits = digits.slice(2);
  if (!/^[1-9]\d(?:9\d{8}|[2-5]\d{7})$/.test(digits)) return null;
  if (/^(\d)\1+$/.test(digits)) return null;
  return '55' + digits;
}
function getWhatsAppUrl(phone, property = null) {
  const destination = normalizeBrazilianPhone(WHATSAPP_NUMBER);
  if (!destination) return null;
  let message = WHATSAPP_MESSAGE;
  if (property) message += ' Tenho interesse em ' + property.title + ' em ' + property.city + '.';
  message += ' Meu WhatsApp é +' + phone + '.';
  return 'https://wa.me/' + destination + '?text=' + encodeURIComponent(message);
}
const phoneInput = document.querySelector('#whatsapp');
const formStatus = document.querySelector('#form-status');
phoneInput.addEventListener('input', () => {
  phoneInput.setCustomValidity('');
  phoneInput.removeAttribute('aria-invalid');
  formStatus.textContent = '';
});
document.querySelector('#contact-form').addEventListener('submit', e => {
  e.preventDefault();
  const phone = normalizeBrazilianPhone(phoneInput.value);
  if (!phone) {
    phoneInput.setCustomValidity('Informe um telefone válido com DDD. Exemplo: (35) 99999-9999.');
    phoneInput.setAttribute('aria-invalid', 'true');
    phoneInput.reportValidity();
    return;
  }
  phoneInput.setCustomValidity('');
  phoneInput.removeAttribute('aria-invalid');
  const url = getWhatsAppUrl(phone, selectedProperty);
  if (!url) {
    formStatus.textContent = 'O atendimento pelo WhatsApp estará disponível em breve. Seu número não foi enviado nem armazenado.';
    return;
  }
  window.open(url, '_blank', 'noopener,noreferrer');
  formStatus.textContent = 'Continue a conversa na janela do WhatsApp. Envie a mensagem para iniciar o atendimento.';
});