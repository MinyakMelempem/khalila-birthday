'use strict';

let currentPage = 'page-1';
let cakeState = 0; 
let typewriterTimer = null;
let isNavigating = false; 

function navigateTo(targetId) {
  if (targetId === currentPage || isNavigating) return;
  
  const current = document.getElementById(currentPage);
  const target  = document.getElementById(targetId);
  if (!target || !current) return;
  
  isNavigating = true; 
  current.classList.remove('active');
  
  setTimeout(() => {
    target.classList.add('active');
    currentPage = targetId;
    target.scrollTop = 0;
    onPageEnter(targetId);
    
    setTimeout(() => {
      isNavigating = false;
    }, 500);
  }, 120); 
}

const LETTER_TEXT =
  "Happy 19th birthdayy yaa Khalila Humaira Kinanti, semoga di umur yang baru inii kamu bisa mencapai semua target dan keinginan kamu, dapat dimudahkan segala urusan, dan pastinya tambah bahagia selaluu aaminn. Walaupun aku sekarang gaada di ulang tahun kamu tapi setidaknya aku ada kado kecil yang berupa website ini yang dulu sempet aku mention sebelumnya disaat kita putus. Website nya aku rombak sedikit sii bentukannya dari yang sebelumnya buat valentine. Jujur aku kepikiran lagi buat ngelanjutin website ini disaat awal bulan april si. Tapi pas udah tanggal 20 an, aku mulai langsung gerak lagi ngeredesign web nya jadi ultah kamu. Maaf kalo mungkin rada aneh ya ngebuat web begini walaupun kita udah gaada status lagi dan aku juga jujur gatau kalau kamu ada seseorang lagi atau engga dan maaf bgt kalo ada. Tapi ini cara aku apresiasi sama berterimakasih ke kamu untuk hubungan pertama aku. Aku gaakan pernah nyesel sumpah pernah pacaran sama kamu walaupun kita diakhir berantem mulu dan putus. You've made a great impact to my life, aku dapetin beberapa habit positif semenjak pacaran sama kamu dan bahkan sampe putus pun masih terbawa. Mungkin kalo bukan karena kamu, aku sekarang masih tertarik sama rokok dan probably minum, so thank you for that. Selain itu banyak lagi si hal positif nya cuman kayanya gamuat kalo semuanya disebut disini awikwok. You've been a wonderful girlfriend from time to time even tho we had our differences and i would be lying if i said i dont love you anymore. Semoga orang sekitar dan teman teman kamu juga bisa merasakan hal hal positif dari kamu kaya aku. Aku doakan semoga semua keberkahan dan kebaikan akan datang ke kamu di umur yang baru ini.";

function onPageEnter(pageId) {
  switch (pageId) {
    case 'page-5': startTypewriter(); break;
    case 'page-6': resetCake(); break;
  }
}

let typeDelayTimer; 

function startTypewriter() {
  const el     = document.getElementById('letter-text');
  const cursor = document.getElementById('cursor');
  if (!el || !cursor) return;
  
  clearInterval(typewriterTimer);
  clearTimeout(typeDelayTimer);
  
  el.textContent = '';
  cursor.classList.remove('hidden');
  let index = 0;
  const speed = 75; 
  
  typeDelayTimer = setTimeout(() => {
    typewriterTimer = setInterval(() => {
      if (index < LETTER_TEXT.length) {
        el.textContent += LETTER_TEXT[index];
        index++;
      } else {
        clearInterval(typewriterTimer);
        setTimeout(() => cursor.classList.add('hidden'), 1200);
      }
    }, speed);
  }, 2100); 
}

function cakeInteract() {
  if (cakeState === 0) { blowCandles(); } 
  else if (cakeState === 1) { cutCake(); }
}

function blowCandles() {
  const candles = document.querySelectorAll('.candle-wrap');
  const hint = document.getElementById('cake-hint');
  const cutPrompt = document.getElementById('cut-prompt');

  candles.forEach((c, i) => {
    setTimeout(() => {
      c.classList.add('blowing');
      setTimeout(() => {
        c.classList.add('blown');
      }, 500);
    }, i * 150);
  });

  if (hint) hint.style.opacity = '0';

  setTimeout(() => {
    launchConfetti();
    if (cutPrompt) cutPrompt.classList.add('visible');
    const cakeSvg = document.getElementById('cake-svg-full');
    if (cakeSvg) cakeSvg.style.filter = 'drop-shadow(0 0 8px rgba(100,80,40,0.15))';
    cakeState = 1;
  }, (candles.length * 150) + 600);
}

function launchConfetti() {
  const confettiColors = ['#f472b6','#fb7185','#c084fc','#60a5fa','#fbbf24','#4ade80','#ffffff'];
  for (let i = 0; i < 80; i++) {
    const c = document.createElement('div');
    c.className = 'confetti-piece';
    c.style.cssText = `
      left: ${Math.random() * 100}%;
      background: ${confettiColors[Math.floor(Math.random() * confettiColors.length)]};
      animation-duration: ${2 + Math.random() * 2}s;
      animation-delay: ${Math.random() * 1.5}s;
      transform: rotate(${Math.random() * 360}deg);
      width: ${6 + Math.random() * 8}px;
      height: ${10 + Math.random() * 8}px;
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
    `;
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 5000);
  }
}

function cutCake() {
  const fullCake  = document.getElementById('full-cake');
  const cakeSlice = document.getElementById('cake-slice');
  if (!fullCake || !cakeSlice) return;

  fullCake.style.transition = 'opacity 0.4s ease';
  fullCake.style.opacity    = '0';

  setTimeout(() => {
    fullCake.style.display = 'none';
    cakeSlice.style.display = 'flex';
    cakeSlice.style.flexDirection = 'column';
    cakeSlice.style.alignItems = 'center';
    cakeSlice.style.justifyContent = 'center';
    cakeSlice.style.gap = '16px';
    
    cakeSlice.style.opacity = '0';
    cakeSlice.style.transform = 'translateY(20px)';
    cakeSlice.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
    void cakeSlice.offsetWidth; 

    cakeSlice.style.opacity = '1';
    cakeSlice.style.transform = 'translateY(0)';
  }, 400);

  cakeState = 2;
}

function resetCake() {
  cakeState = 0;
  const fullCake  = document.getElementById('full-cake');
  const cakeSlice = document.getElementById('cake-slice');
  
  if (fullCake)  { fullCake.style.display  = 'flex'; fullCake.style.opacity = '1'; }
  if (cakeSlice) { 
    cakeSlice.style.display = 'none'; 
    cakeSlice.style.opacity = '0'; 
    cakeSlice.style.transform = 'translateY(20px)';
  }

  const candles = document.querySelectorAll('.candle-wrap');
  candles.forEach(c => {
    c.classList.remove('blowing');
    c.classList.remove('blown');
  });

  const hint = document.getElementById('cake-hint');
  if (hint) hint.style.opacity = '1';
  const cutPrompt = document.getElementById('cut-prompt');
  if (cutPrompt) cutPrompt.classList.remove('visible');

  const cakeSvg = document.getElementById('cake-svg-full');
  if (cakeSvg) cakeSvg.style.filter = 'drop-shadow(0 0 20px rgba(255,180,80,0.25))';
}

document.addEventListener('touchmove', function (e) {
  const scrollablePages = ['page-3', 'page-4', 'page-5'];
  if (scrollablePages.includes(currentPage)) return;
  e.preventDefault();
}, { passive: false });

function setVhVar() { document.documentElement.style.setProperty('--real-vh', `${window.innerHeight * 0.01}px`); }
window.addEventListener('resize', setVhVar);
setVhVar(); 

window.addEventListener('DOMContentLoaded', () => {
  const page1 = document.getElementById('page-1');
  if (page1) {
    page1.style.opacity = '0';
    setTimeout(() => {
      page1.style.transition = 'opacity 1s ease';
      page1.style.opacity = '1';
      setTimeout(() => {
        page1.style.opacity = '';
      }, 1000);
    }, 100);
  }
});