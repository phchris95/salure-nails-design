(() => {
  'use strict';
  const WA_NUMBER = '5511953691565';
  const waLink = (msg) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  const DEFAULT_MSG = 'Olá! Quero agendar um horário na Salure Nails Design.';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const hasGSAP = !!(window.gsap && window.ScrollTrigger);
  const animate = hasGSAP && !reduceMotion;
  const isMobile = () => matchMedia('(max-width: 760px)').matches;
  if (!animate) document.documentElement.classList.add('static-motion');

  /* ---------------- Dados ---------------- */
  const IMG = {
    poster: 'img/hero-poster.jpg', reelPoster: 'img/reel-poster.jpg', salao: 'img/salao.jpg', anna: 'img/anna.jpg', hand: 'img/hand.jpg', atlas: 'img/nail-atlas.png',
  };
  for (let i = 1; i <= 21; i++) { const k = 'p' + String(i).padStart(2, '0'); IMG[k] = `img/${k}.jpg`; }

  // [foto, descrição, estilos, formato]
  const WORKS = [
    ['p01', 'Alongamento com esmaltação nude e detalhes em nail art', ['nailart'], 'quadrado'],
    ['p02', 'Francesinha branca clássica, curta', ['francesinha'], 'quadrado'],
    ['p03', 'Esmaltação nude perolada com brilho', ['cromado', 'liso'], 'quadrado'],
    ['p04', 'Francesinha degradê com pedrarias', ['boomer', 'pedrarias'], 'quadrado'],
    ['p05', 'Francesinha degradê com pedrarias, trabalho em destaque', ['boomer', 'pedrarias'], 'quadrado'],
    ['p06', 'Alongamento amêndoa rosa com francesinha vermelha', ['francesinha'], 'amendoa'],
    ['p07', 'Nail art animal print com detalhes dourados', ['nailart'], 'amendoa'],
    ['p08', 'Nail art animal print em ambas as mãos', ['nailart'], 'quadrado'],
    ['p09', 'Esmaltação vermelha com nail art colorida em destaque', ['liso', 'nailart'], 'quadrado'],
    ['p10', 'Esmaltação azul metálica com efeito marmorizado', ['cromado', 'nailart'], 'quadrado'],
    ['p11', 'Francesinha dourada com nail art floral 3D', ['francesinha', 'nailart'], 'quadrado'],
    ['p12', 'Francesinha branca clássica com pedrarias', ['francesinha', 'pedrarias'], 'quadrado'],
    ['p13', 'Alongamento stiletto com glitter prateado degradê', ['glitter', 'boomer'], 'stiletto'],
    ['p14', 'Esmaltação caramelo com folha dourada e nail art floral', ['liso', 'nailart'], 'quadrado'],
    ['p15', 'Esmaltação caramelo com detalhes dourados', ['liso'], 'quadrado'],
    ['p16', 'Esmaltação caramelo com nail art floral delicada', ['liso', 'nailart'], 'quadrado'],
    ['p17', 'Francesinha branca com laço e charms de cereja', ['francesinha', 'nailart'], 'amendoa'],
    ['p18', 'Nail art vinho com flores 3D e glitter', ['nailart', 'glitter'], 'amendoa'],
    ['p19', 'Nail art vinho com flores 3D, close-up', ['nailart', 'glitter'], 'amendoa'],
    ['p20', 'Esmaltação rosa holográfica com glitter', ['glitter'], 'quadrado'],
    ['p21', 'Nail art delicada com flores e glitter dourado', ['glitter', 'nailart'], 'amendoa'],
  ];
  // Características de cada trabalho, para achar os parecidos com a escolha da cliente:
  // formatos (o primeiro é o principal), comprimento e as cores principais.
  const TRAITS = {
    p01: { shapes: ['ballerina', 'quadrado'], len: 'media', colors: ['#EBB7C0'] },
    p02: { shapes: ['quadrado'], len: 'curta', colors: ['#E9C6BE', '#F6F1EA'] },
    p03: { shapes: ['quadrado'], len: 'curta', colors: ['#D8C3C8'] },
    p04: { shapes: ['quadrado'], len: 'media', colors: ['#EAD9D2', '#F6F1EA'] },
    p05: { shapes: ['quadrado'], len: 'media', colors: ['#EAD9D2', '#F6F1EA'] },
    p06: { shapes: ['amendoa', 'stiletto'], len: 'longa', colors: ['#EE668C', '#D0101E'] },
    p07: { shapes: ['amendoa'], len: 'curta', colors: ['#EBCFC2'] },
    p08: { shapes: ['amendoa', 'quadrado'], len: 'media', colors: ['#E3BFAE'] },
    p09: { shapes: ['quadrado'], len: 'media', colors: ['#C0161E'] },
    p10: { shapes: ['amendoa'], len: 'media', colors: ['#1F3FB0'] },
    p11: { shapes: ['quadrado'], len: 'curta', colors: ['#E8C9C0', '#C9A063'] },
    p12: { shapes: ['ballerina', 'quadrado'], len: 'media', colors: ['#E3CFC9', '#F6F1EA'] },
    p13: { shapes: ['stiletto'], len: 'longa', colors: ['#E9C9BD', '#D9D9DE'] },
    p14: { shapes: ['amendoa', 'stiletto'], len: 'longa', colors: ['#A0603A', '#EBCDBF'] },
    p15: { shapes: ['quadrado', 'ballerina'], len: 'media', colors: ['#A86A45'] },
    p16: { shapes: ['quadrado', 'ballerina'], len: 'media', colors: ['#A86A45'] },
    p17: { shapes: ['amendoa'], len: 'media', colors: ['#F6F1EA', '#B5121E'] },
    p18: { shapes: ['amendoa'], len: 'longa', colors: ['#8E1A3E', '#E85A9A'] },
    p19: { shapes: ['amendoa'], len: 'media', colors: ['#8E1A3E'] },
    p20: { shapes: ['quadrado', 'ballerina'], len: 'media', colors: ['#F0B8D0'] },
    p21: { shapes: ['amendoa'], len: 'media', colors: ['#ECE6E6'] },
  };
  const SIZE = { p01: [640, 853], p02: [640, 853], p03: [640, 853], p07: [640, 360] };
  const FEATURED = ['p18', 'p06', 'p11', 'p13', 'p17', 'p10', 'p14', 'p20', 'p03', 'p09', 'p04', 'p21'];
  const FILTERS = [['todos', 'Todos'], ['francesinha', 'Francesinha'], ['boomer', 'Baby boomer'], ['glitter', 'Glitter'], ['nailart', 'Nail art'], ['liso', 'Liso'], ['cromado', 'Perolado e cromado'], ['pedrarias', 'Pedrarias']];

  /* ---------------- Conteúdo comum ---------------- */
  $$('[data-img]').forEach((el) => { const s = IMG[el.dataset.img]; if (s) el.src = s; });
  $$('[data-wa]').forEach((a) => { a.href = waLink(a.dataset.wa || DEFAULT_MSG); a.target = '_blank'; a.rel = 'noopener'; });
  $('#year').textContent = new Date().getFullYear();
  const STAR = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.6L22 9.3l-5 4.6 1.4 7.1L12 17.8l-6.4 3.2L7 14l-5-4.7 7.1-.7z"/></svg>';
  $$('.stars').forEach((s) => { s.innerHTML = STAR.repeat(5); });
  const MQ = [['Alongamento', 'Blindagem', 'Banho de gel', 'Nail art', 'Esmaltação em gel'], ['Reconstrução', 'Glow up', 'Francesinha', 'Baby boomer', 'Pedrarias']];
  const starSvg = '<svg class="mq-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z"/></svg>';
  $$('[data-mq]').forEach((el) => { const chunk = MQ[+el.dataset.mq].map((w) => `<span class="mq-item">${w}${starSvg}</span>`).join(''); el.innerHTML = chunk.repeat(4); });
  const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  /* ---------------- Vídeos (carregam quando aparecem) ---------------- */
  const playSafe = (v) => { const p = v.play(); if (p) p.catch(() => {}); };
  function embeddedVideo(v) {
    const holder = document.getElementById('b64-' + v.dataset.video);
    if (!holder) return null;
    const bin = atob(holder.textContent.replace(/\s+/g, ''));
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return URL.createObjectURL(new Blob([bytes], { type: 'video/mp4' }));
  }
  function loadVideo(v) {
    const embedded = embeddedVideo(v);
    if (embedded) { v.src = embedded; return; }
    const base = v.dataset.src.replace(/\.mp4$/, '');
    const list = [];
    if (v.canPlayType('video/webm; codecs="vp9"') === 'probably') list.push(base + '.webm');
    list.push(base + '.mp4');
    let i = 0, viaBlob = false;
    v.addEventListener('error', () => {
      if (++i < list.length) { v.src = list[i]; playSafe(v); return; }
      if (viaBlob) return;
      viaBlob = true;
      fetch(list[0]).then((r) => r.blob()).then((b) => { v.src = URL.createObjectURL(b); playSafe(v); }).catch(() => {});
    });
    v.src = list[0];
  }
  if (!reduceMotion) {
    const vio = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const v = e.target;
        if (e.isIntersecting) {
          if (!v.dataset.ready) {
            v.dataset.ready = '1';
            v.addEventListener('playing', () => { const p = v.previousElementSibling; if (p && p.tagName === 'IMG') p.style.opacity = 0; }, { once: true });
            loadVideo(v);
          }
          v.muted = true;
          playSafe(v);
        } else if (v.dataset.ready) v.pause();
      });
    }, { rootMargin: '200px 0px' });
    $$('video[data-video]').forEach((v) => vio.observe(v));
  }

  /* ---------------- Brilhos dourados no topo ---------------- */
  (function sparkles(canvas) {
    if (reduceMotion || !canvas) return;
    const ctx = canvas.getContext('2d');
    let w = 0, h = 0, running = false;
    const count = innerWidth < 760 ? 26 : 54;
    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const spawn = (initial) => ({ x: Math.random() * w, y: initial ? Math.random() * h : h + 10, r: Math.random() * 1.6 + 0.4, vy: -(Math.random() * 0.32 + 0.1), vx: (Math.random() - 0.5) * 0.14, t: Math.random() * 6.28, ts: Math.random() * 0.035 + 0.01, star: Math.random() < 0.18 });
    resize();
    const parts = Array.from({ length: count }, () => spawn(true));
    addEventListener('resize', resize);
    new IntersectionObserver(([e]) => { const was = running; running = e.isIntersecting; if (running && !was) { resize(); requestAnimationFrame(tick); } }).observe(canvas);
    function tick() {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.x += p.vx; p.y += p.vy; p.t += p.ts;
        if (p.y < -10) Object.assign(p, spawn(false));
        const a = 0.25 + 0.75 * Math.abs(Math.sin(p.t));
        ctx.fillStyle = `rgba(240,216,170,${a * 0.85})`;
        if (p.star) {
          const s = p.r * 3.2 * a;
          ctx.beginPath(); ctx.moveTo(p.x, p.y - s); ctx.quadraticCurveTo(p.x, p.y, p.x + s, p.y); ctx.quadraticCurveTo(p.x, p.y, p.x, p.y + s);
          ctx.quadraticCurveTo(p.x, p.y, p.x - s, p.y); ctx.quadraticCurveTo(p.x, p.y, p.x, p.y - s); ctx.fill();
        } else { ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill(); }
      }
      requestAnimationFrame(tick);
    }
  })($('.sparkles'));

  /* ---------------- Cabeçalho e menu ---------------- */
  const header = $('#siteHeader');
  const menu = $('#menu');
  const burger = $('#burger');
  const waFloat = $('.wa-float');
  let lenis = null;
  let current = null;
  function setMenu(open) {
    menu.classList.toggle('open', open);
    header.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    if (lenis) open ? lenis.stop() : lenis.start();
  }
  burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menu.classList.contains('open')) setMenu(false); });
  function updateHeader() {
    const y = window.scrollY;
    header.classList.toggle('is-solid', current !== 'inicio' || y > innerHeight * 0.55);
    waFloat.classList.toggle('show', current === 'inicio' ? y > innerHeight * 0.7 : y > 240);
  }
  addEventListener('scroll', updateHeader, { passive: true });

  /* ---------------- Lightbox ---------------- */
  const lb = $('#lb'), lbImg = $('#lbImg'), lbCap = $('#lbCap'), lbCount = $('#lbCount');
  let lbList = [], lbPos = 0, lastFocus = null;
  function showLb(pos) {
    lbPos = (pos + lbList.length) % lbList.length;
    const [key, alt] = WORKS[lbList[lbPos]];
    lbImg.src = IMG[key]; lbImg.alt = alt; lbCap.textContent = alt;
    lbCount.textContent = `${String(lbPos + 1).padStart(2, '0')} / ${String(lbList.length).padStart(2, '0')}`;
    if (animate) gsap.fromTo(lbImg, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' });
  }
  function openLb(list, pos) {
    lastFocus = document.activeElement;
    lbList = list; showLb(pos);
    $('#lbUse').hidden = false;
    lb.classList.add('open');
    if (lenis) lenis.stop();
    $('#lbClose').focus();
  }
  function closeLb() { lb.classList.remove('open'); if (lenis) lenis.start(); if (lastFocus) lastFocus.focus(); }
  $('#lbClose').addEventListener('click', closeLb);
  // usar a foto aberta como referência no Monte sua unha (vai para lá se estiver em outra página)
  $('#lbUse').addEventListener('click', () => {
    const key = WORKS[lbList[lbPos]][0];
    closeLb();
    navigate('monte-sua-unha', { then: () => studio.useWork(key) });
  });
  $('#lbPrev').addEventListener('click', () => showLb(lbPos - 1));
  $('#lbNext').addEventListener('click', () => showLb(lbPos + 1));
  lb.addEventListener('click', (e) => { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowRight') showLb(lbPos + 1);
    if (e.key === 'ArrowLeft') showLb(lbPos - 1);
  });
  let lbTouch = null;
  lb.addEventListener('touchstart', (e) => { lbTouch = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', (e) => { if (lbTouch === null) return; const dx = e.changedTouches[0].clientX - lbTouch; if (Math.abs(dx) > 40) showLb(lbPos + (dx < 0 ? 1 : -1)); lbTouch = null; });
  const workIndex = (key) => WORKS.findIndex((w) => w[0] === key);

  /* ---------------- Início: carrossel de destaques ---------------- */
  (() => {
    const track = $('#ftTrack'), vp = $('#ftViewport'), bar = $('#ftBar');
    const list = FEATURED.map(workIndex);
    list.forEach((idx, pos) => {
      const [key, alt] = WORKS[idx];
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'ft-card'; b.dataset.cursor = 'Ver';
      b.setAttribute('aria-label', 'Ampliar: ' + alt);
      b.innerHTML = `<img src="${IMG[key]}" alt="${alt}" loading="lazy" draggable="false"><span class="ft-cap">${alt}</span>`;
      b.addEventListener('click', (e) => { if (vp.dataset.moved === '1') { e.preventDefault(); return; } openLb(list, pos); });
      track.appendChild(b);
    });
    const upd = () => { const max = vp.scrollWidth - vp.clientWidth; const p = max > 0 ? vp.scrollLeft / max : 0; bar.style.transform = `scaleX(${0.1 + p * 0.9})`; };
    vp.addEventListener('scroll', upd, { passive: true }); upd();
    const step = () => (track.firstElementChild ? track.firstElementChild.getBoundingClientRect().width + 20 : 300) * 2;
    $('#ftPrev').addEventListener('click', () => vp.scrollBy({ left: -step(), behavior: 'smooth' }));
    $('#ftNext').addEventListener('click', () => vp.scrollBy({ left: step(), behavior: 'smooth' }));
    // arrastar com o mouse (no toque, a rolagem nativa já funciona)
    let down = false, sx = 0, sl = 0;
    vp.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') return; down = true; sx = e.clientX; sl = vp.scrollLeft; vp.dataset.moved = '0'; });
    addEventListener('pointermove', (e) => { if (!down) return; const dx = e.clientX - sx; if (Math.abs(dx) > 5) { vp.dataset.moved = '1'; vp.classList.add('dragging'); } vp.scrollLeft = sl - dx; });
    addEventListener('pointerup', () => { if (!down) return; down = false; vp.classList.remove('dragging'); setTimeout(() => { vp.dataset.moved = '0'; }, 50); });
  })();

  /* ---------------- Portfólio: filtros e grade ---------------- */
  (() => {
    const grid = $('#pfGrid'), bar = $('#pfFilters');
    WORKS.forEach(([key, alt, tags], idx) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'pf-item'; b.dataset.tags = tags.join(' '); b.dataset.idx = idx; b.dataset.cursor = 'Ver';
      b.setAttribute('aria-label', 'Ampliar: ' + alt);
      const [w, h] = SIZE[key] || [562, 1000];
      b.innerHTML = `<img src="${IMG[key]}" alt="${alt}" width="${w}" height="${h}" loading="lazy"><span class="pf-cap">${alt}</span>`;
      grid.appendChild(b);
    });
    FILTERS.forEach(([id, label], i) => {
      const count = id === 'todos' ? WORKS.length : WORKS.filter((w) => w[2].includes(id)).length;
      const b = document.createElement('button');
      b.type = 'button'; b.dataset.filter = id; b.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
      b.innerHTML = `${label}<span>${count}</span>`;
      bar.appendChild(b);
    });
    const visible = () => $$('.pf-item:not(.is-out)', grid).map((el) => +el.dataset.idx);
    grid.addEventListener('click', (e) => { const it = e.target.closest('.pf-item'); if (!it) return; const vis = visible(); openLb(vis, vis.indexOf(+it.dataset.idx)); });
    bar.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b) return;
      $$('button', bar).forEach((x) => x.setAttribute('aria-pressed', x === b ? 'true' : 'false'));
      const f = b.dataset.filter;
      const items = $$('.pf-item', grid);
      items.forEach((it) => it.classList.toggle('is-out', f !== 'todos' && !it.dataset.tags.split(' ').includes(f)));
      if (animate) gsap.fromTo(items.filter((it) => !it.classList.contains('is-out')), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.04, overwrite: true });
      if (hasGSAP) ScrollTrigger.refresh();
    });
  })();

  /* ---------------- Depoimentos ---------------- */
  (() => {
    const items = $$('.depo-item'), segs = $$('#depoSeg button'), section = $('.depo');
    let cur = 0;
    function go(i) {
      cur = (i + items.length) % items.length;
      items.forEach((it, n) => it.classList.toggle('is-active', n === cur));
      segs.forEach((s, n) => { s.classList.toggle('done', n < cur); s.classList.remove('is-active'); void s.offsetWidth; s.classList.toggle('is-active', n === cur); });
    }
    segs.forEach((s, n) => { s.addEventListener('click', () => go(n)); s.querySelector('i').addEventListener('animationend', () => { if (n === cur && !reduceMotion) go(cur + 1); }); });
    $('#depoPrev').addEventListener('click', () => go(cur - 1));
    $('#depoNext').addEventListener('click', () => go(cur + 1));
    let hover = false, seen = false;
    const sync = () => section.classList.toggle('paused', hover || !seen);
    section.addEventListener('mouseenter', () => { hover = true; sync(); });
    section.addEventListener('mouseleave', () => { hover = false; sync(); });
    new IntersectionObserver(([e]) => { seen = e.isIntersecting; sync(); }).observe(section);
    let tx = null;
    section.addEventListener('touchstart', (e) => { tx = e.touches[0].clientX; }, { passive: true });
    section.addEventListener('touchend', (e) => { if (tx === null) return; const dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 50) go(cur + (dx < 0 ? 1 : -1)); tx = null; });
    if (reduceMotion) segs.forEach((s) => { s.querySelector('i').style.animation = 'none'; });
    go(0);
  })();

  /* ---------------- Aberto agora ---------------- */
  (() => {
    const badge = $('#openBadge');
    const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Sao_Paulo', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
    const get = (t) => parts.find((p) => p.type === t).value;
    const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
    const mins = (+get('hour')) * 60 + (+get('minute'));
    const openDay = day !== 6;
    let state = 'closed', text;
    if (openDay && mins >= 480 && mins < 1080) {
      if (mins >= 720 && mins < 750) { state = 'pause'; text = 'Em intervalo · volta às 12h30'; } else { state = 'open'; text = 'Aberto agora · até 18h'; }
    } else if (openDay && mins < 480) text = 'Fechado agora · abre hoje às 08h';
    else if (day === 6) text = 'Fechado aos sábados · abre amanhã às 08h';
    else text = (day + 1) % 7 === 6 ? 'Fechado agora · abre domingo às 08h' : 'Fechado agora · abre amanhã às 08h';
    badge.className = 'open-badge' + (state === 'open' ? '' : ' ' + state);
    badge.querySelector('span').textContent = text;
    $$('#hours li[data-days]').forEach((li) => { if (li.dataset.days.split(',').includes(String(day))) li.classList.add('today'); });
  })();

  /* ---------------- Formulário de contato ---------------- */
  (() => {
    const form = $('#contactForm'), send = $('#fSend'), hint = $('#fHint');
    const update = () => {
      const nome = $('#fNome').value.trim(), serv = $('#fServ').value, msg = $('#fMsg').value.trim();
      const periodo = ($('input[name="periodo"]:checked') || {}).value || '';
      let text = nome ? `Olá! Meu nome é ${nome}.` : 'Olá!';
      text += serv ? ` Tenho interesse em: ${serv}.` : ' Gostaria de ajuda para escolher o serviço.';
      if (periodo) text += ` Prefiro atendimento de ${periodo}.`;
      if (msg) text += ` ${msg}`;
      send.href = waLink(text);
      if (nome) hint.textContent = '';
    };
    form.addEventListener('input', update);
    form.addEventListener('change', update);
    form.addEventListener('submit', (e) => { e.preventDefault(); send.focus(); });
    send.addEventListener('click', (e) => {
      if (!$('#fNome').value.trim()) { e.preventDefault(); hint.textContent = 'Escreva seu nome para a Anna saber com quem está falando.'; $('#fNome').focus(); }
    });
    update();
  })();

  /* ---------------- Monte sua unha ---------------- */
  const studio = (() => {
    const COLORS = [
      { id: 'vinho', name: 'Vinho Salure', c: '#6B1832' },
      { id: 'nude', name: 'Nude rosé', c: '#D9A595' },
      { id: 'leitoso', name: 'Branco leitoso', c: '#F6F1EA' },
      { id: 'vermelho', name: 'Vermelho clássico', c: '#C3122F' },
      { id: 'rosa', name: 'Rosa chiclete', c: '#EE6A93' },
      { id: 'caramelo', name: 'Caramelo', c: '#A5603A' },
      { id: 'lilas', name: 'Lilás', c: '#B7A0E0' },
      { id: 'azul', name: 'Azul royal', c: '#1F3FB0' },
      { id: 'preto', name: 'Preto', c: '#1B1416' },
    ];
    const SHAPE_NAMES = { quadrado: 'Quadrado', amendoa: 'Amêndoa', stiletto: 'Stiletto', ballerina: 'Ballerina' };
    const LEN_NAMES = { curta: 'Curta', media: 'Média', longa: 'Longa' };
    const LEN_MSG = { curta: 'curto', media: 'médio', longa: 'longo' };
    const FINISHES = { liso: 'Liso com brilho', francesinha: 'Francesinha', boomer: 'Baby boomer', glitter: 'Glitter', cromado: 'Cromado' };
    const sel = { shape: 'amendoa', len: 'media', color: 'vinho', hex: '#6B1832', colorName: 'Vinho Salure', finish: 'liso', gems: false };
    let engine = null, mini = null, refFile = null, refUrl = null, refImg = null, refWork = null;

    // cores
    const sw = $('#colorSwatches');
    sw.innerHTML = COLORS.map((c) => `<label class="swatch" style="--c:${c.c}" title="${c.name}"><input type="radio" name="color" value="${c.id}" ${c.id === sel.color ? 'checked' : ''}><span></span><em class="sr-only">${c.name}</em></label>`).join('') +
      '<label class="swatch swatch-photo" id="photoSwatch" hidden title="Cor da sua foto"><input type="radio" name="color" value="photo"><span></span><em class="sr-only">Cor da sua foto</em></label>' +
      '<label class="swatch swatch-custom" title="Escolher outra cor"><input type="radio" name="color" value="custom"><span></span><em class="sr-only">Escolher outra cor</em><input type="color" id="customColor" value="#9B3D5A" aria-label="Escolher outra cor"></label>';
    const customInput = $('#customColor');
    customInput.addEventListener('input', () => {
      const r = $('input[name="color"][value="custom"]');
      r.closest('.swatch').style.setProperty('--c', customInput.value);
      r.checked = true;
      setColor('custom', customInput.value, 'Cor personalizada');
    });

    function setColor(id, hex, name) {
      sel.color = id; sel.hex = hex; sel.colorName = name;
      if (engine) engine.set({ color: hex });
      updateText();
    }

    function suggestion() {
      const fancy = sel.gems || sel.finish === 'boomer';
      if (sel.len !== 'curta') return { svc: 'Alongamento de unhas', price: fancy ? 'R$ 200' : 'R$ 170 – 200' };
      if (sel.finish === 'liso' && !sel.gems) return { svc: 'Esmaltação em gel', price: 'R$ 70' };
      return { svc: 'Banho de gel', price: fancy ? 'R$ 150' : 'R$ 120 – 150' };
    }
    function message() {
      const s = suggestion();
      return [
        'Olá! Montei minha unha no site da Salure ✨',
        `• Formato: ${SHAPE_NAMES[sel.shape]}`,
        `• Comprimento: ${LEN_MSG[sel.len]}`,
        sel.color === 'photo' ? `• Cor: a mesma da minha foto de referência (${sel.hex.toUpperCase()})`
          : sel.color === 'custom' ? `• Cor: personalizada (${sel.hex.toUpperCase()})` : `• Cor: ${sel.colorName}`,
        `• Acabamento: ${FINISHES[sel.finish]}`,
        sel.gems ? '• Detalhe: pedrarias no anelar' : '',
        refWork ? `• Referência: um trabalho do portfólio do site (${WORKS.find((w) => w[0] === refWork)[1].toLowerCase()})` : '',
        `• Vou mandar em seguida a imagem com a unha montada${refFile ? ' e a minha referência' : ''}.`,
        `Gostaria de agendar (serviço indicado: ${s.svc.toLowerCase()}).`,
      ].filter(Boolean).join('\n');
    }
    // cores em Lab, para comparar a cor escolhida com as cores de cada trabalho
    function hexLab(hex) {
      const n = parseInt(hex.slice(1), 16);
      const lin = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
      const X = (0.4124 * lin[0] + 0.3576 * lin[1] + 0.1805 * lin[2]) / 0.95047, Y = 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2], Z = (0.0193 * lin[0] + 0.1192 * lin[1] + 0.9505 * lin[2]) / 1.08883;
      const f = (t) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
      return [116 * f(Y) - 16, 500 * (f(X) - f(Y)), 200 * (f(Y) - f(Z))];
    }
    const deltaE = (a, b) => { const p = hexLab(a), q = hexLab(b); return Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]); };
    const SHAPE_NEAR = { quadrado: ['ballerina'], ballerina: ['quadrado'], amendoa: ['stiletto'], stiletto: ['amendoa'] };
    const LEN_I = { curta: 0, media: 1, longa: 2 };
    function matchScore(w) {
      const t = TRAITS[w[0]];
      let sc = 0;
      if (t.shapes[0] === sel.shape) sc += 5;
      else if (t.shapes.includes(sel.shape)) sc += 3.5;
      else if (t.shapes.some((x) => SHAPE_NEAR[sel.shape].includes(x))) sc += 1.5;
      const dl = Math.abs(LEN_I[t.len] - LEN_I[sel.len]);
      sc += dl === 0 ? 2.5 : dl === 1 ? 1 : 0;
      if (w[2].includes(sel.finish)) sc += 4;
      else if ((sel.finish === 'francesinha' && w[2].includes('boomer')) || (sel.finish === 'boomer' && w[2].includes('francesinha'))) sc += 1.5;
      if (sel.gems && w[2].includes('pedrarias')) sc += 2.5;
      const dE = Math.min(...t.colors.map((c) => deltaE(sel.hex, c)));
      sc += 4 * Math.max(0, 1 - dE / 55);
      return sc;
    }
    let lastInspo = '';
    function inspirations() {
      const scored = WORKS.map((w, idx) => ({ idx, sc: matchScore(w) }))
        .sort((a, b) => b.sc - a.sc || a.idx - b.idx).slice(0, 4).map((o) => o.idx);
      $('#inspoNote').textContent = `${SHAPE_NAMES[sel.shape]} · ${LEN_NAMES[sel.len].toLowerCase()} · ${sel.colorName.toLowerCase()} · ${FINISHES[sel.finish].toLowerCase()}`;
      const sig = scored.join(',');
      if (sig === lastInspo) return;
      lastInspo = sig;
      const grid = $('#inspoGrid');
      grid.innerHTML = scored.map((idx, pos) => {
        const [key, alt, tags] = WORKS[idx];
        const t = TRAITS[key];
        const fin = FINISHES[tags.find((x) => FINISHES[x])] || 'Nail art';
        return `<div class="inspo-card"><button type="button" class="inspo-open" data-pos="${pos}" data-cursor="Ver" aria-label="Ampliar: ${alt}"><img src="${IMG[key]}" alt="${alt}" loading="lazy"><em>${SHAPE_NAMES[t.shapes[0]]} · ${fin}</em></button>` +
          `<button type="button" class="inspo-ref" data-key="${key}" aria-label="Usar como referência: ${alt}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 4l6 6-9 9H5v-6z"/></svg>Usar como referência</button></div>`;
      }).join('');
      grid.onclick = (e) => {
        const r = e.target.closest('.inspo-ref');
        if (r) { useWork(r.dataset.key); return; }
        const b = e.target.closest('.inspo-open');
        if (b) openLb(scored, +b.dataset.pos);
      };
      if (animate && engine) gsap.fromTo($$('.inspo-card', grid), { opacity: 0, y: 18, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out', stagger: 0.05 });
    }
    function updateText() {
      $('#lgShape').textContent = SHAPE_NAMES[sel.shape];
      $('#lgLen').textContent = LEN_NAMES[sel.len];
      $('#lgColor').textContent = sel.colorName;
      $('#lgFinish').textContent = FINISHES[sel.finish];
      $('#stageName').textContent = `${SHAPE_NAMES[sel.shape]} · ${sel.colorName}${sel.finish !== 'liso' ? ' · ' + FINISHES[sel.finish] : ''}`;
      const s = suggestion();
      $('#simSvc').textContent = s.svc;
      $('#simPrice').textContent = s.price;
      const chips = [SHAPE_NAMES[sel.shape], LEN_NAMES[sel.len], sel.colorName, FINISHES[sel.finish]];
      if (sel.gems) chips.push('Pedrarias');
      if (refFile) chips.push('Com foto de referência');
      $('#sumList').innerHTML = chips.map((c) => `<span>${c}</span>`).join('');
      $('#simSend').href = waLink(message());
      $('#sumNote').textContent = refFile
        ? 'Ao enviar, o site monta uma imagem com a unha, as suas escolhas e a sua foto de referência para você mandar junto.'
        : 'Ao enviar, o site monta uma imagem com a unha e as suas escolhas para você mandar junto. A prévia é ilustrativa; formato e valor final são combinados no atendimento.';
      inspirations();
    }

    // controles
    $('#panel').addEventListener('change', (e) => {
      const t = e.target;
      if (t.name === 'shape') { sel.shape = t.value; engine && engine.set({ shape: t.value }, animate); }
      if (t.name === 'len') { sel.len = t.value; engine && engine.set({ len: t.value }, animate); }
      if (t.name === 'finish') { sel.finish = t.value; engine && engine.set({ finish: t.value }); }
      if (t.id === 'gems') { sel.gems = t.checked; engine && engine.set({ gems: t.checked }); }
      if (t.name === 'color') {
        if (t.value === 'custom') { setColor('custom', customInput.value, 'Cor personalizada'); return; }
        if (t.value === 'photo') { const c = $('#photoSwatch').style.getPropertyValue('--c').trim(); setColor('photo', c, 'Cor da sua foto'); return; }
        const c = COLORS.find((x) => x.id === t.value);
        setColor(c.id, c.c, c.name);
        return;
      }
      updateText();
    });
    // abas (celular)
    $$('.tabs button').forEach((b) => b.addEventListener('click', () => {
      $$('.tabs button').forEach((x) => x.setAttribute('aria-selected', x === b ? 'true' : 'false'));
      $$('.opt[data-tab]').forEach((f) => f.classList.toggle('is-current', f.dataset.tab === b.dataset.tab));
    }));

    // aviso rápido sobre a prévia
    const toast = $('#toast');
    let toastT = null;
    function showToast(text, color) {
      toast.querySelector('span').textContent = text;
      toast.querySelector('i').style.setProperty('--c', color || 'transparent');
      toast.querySelector('i').style.display = color ? '' : 'none';
      toast.classList.add('show');
      clearTimeout(toastT); toastT = setTimeout(() => toast.classList.remove('show'), 2400);
    }

    // foto de referência
    const input = $('#refInput'), picker = $('#picker'), pArea = $('#pickerArea'), pCanvas = $('#pickerCanvas'), loupe = $('#loupe');
    const sample = document.createElement('canvas');
    const sctx = sample.getContext('2d', { willReadFrequently: true });
    let fit = null;
    // leva a prévia para o centro da tela (com a rolagem suave do site, quando ela está ligada)
    function showStage() {
      const st = $('#stage');
      const off = -Math.max(70, (innerHeight - st.offsetHeight) / 2);
      if (lenis) lenis.scrollTo(st, { offset: off, duration: 1.1 });
      else st.scrollIntoView({ behavior: animate ? 'smooth' : 'auto', block: 'center' });
    }
    function loadReference(f, workKey) {
      if (!f || !f.type.startsWith('image/')) return;
      if (refUrl) URL.revokeObjectURL(refUrl);
      refFile = f; refUrl = URL.createObjectURL(f); refWork = workKey || null;
      refImg = new Image();
      refImg.onload = () => {
        const max = 1200, k = Math.min(1, max / Math.max(refImg.naturalWidth, refImg.naturalHeight));
        sample.width = Math.round(refImg.naturalWidth * k); sample.height = Math.round(refImg.naturalHeight * k);
        sctx.drawImage(refImg, 0, 0, sample.width, sample.height);
        $('#refThumb').innerHTML = `<img src="${refUrl}" alt="Sua foto de referência">`;
        $('#refPipImg').src = refUrl;
        $('#refPip').hidden = false;
        $('#refCard').classList.add('has-photo');
        $('#refTitle').textContent = refWork ? 'Referência do portfólio' : 'Sua foto de referência';
        $('#refText').textContent = 'Toque em “Copiar cor” e depois na unha da foto para levar a cor para a prévia.';
        $('#refBtnText').textContent = 'Trocar foto';
        $('#refPick').hidden = false; $('#refRemove').hidden = false;
        updateText();
        openPicker();
        showStage();
        if (refWork) showToast('Referência escolhida');
      };
      refImg.src = refUrl;
    }
    input.addEventListener('change', () => {
      loadReference(input.files && input.files[0]);
      input.value = '';
    });
    // um trabalho do próprio portfólio como referência (sem precisar baixar a foto)
    function useWork(key) {
      fetch(IMG[key]).then((r) => r.blob()).then((b) => loadReference(new File([b], key + '.jpg', { type: b.type || 'image/jpeg' }), key)).catch(() => {});
    }
    function drawPicker() {
      const r = pArea.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio || 1, 2);
      pCanvas.width = r.width * dpr; pCanvas.height = r.height * dpr;
      const c = pCanvas.getContext('2d');
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      c.fillStyle = '#1C0E12'; c.fillRect(0, 0, r.width, r.height);
      const k = Math.min(r.width / sample.width, r.height / sample.height);
      const w = sample.width * k, h = sample.height * k;
      fit = { x: (r.width - w) / 2, y: (r.height - h) / 2, k };
      c.drawImage(sample, fit.x, fit.y, w, h);
    }
    function openPicker() { if (!refImg) return; picker.hidden = false; requestAnimationFrame(drawPicker); }
    function closePicker() { picker.hidden = true; loupe.style.display = 'none'; }
    function colorAt(clientX, clientY) {
      const r = pArea.getBoundingClientRect();
      const x = (clientX - r.left - fit.x) / fit.k, y = (clientY - r.top - fit.y) / fit.k;
      if (x < 0 || y < 0 || x >= sample.width || y >= sample.height) return null;
      const d = sctx.getImageData(Math.max(0, Math.round(x) - 3), Math.max(0, Math.round(y) - 3), 7, 7).data;
      let rr = 0, gg = 0, bb = 0, n = 0;
      for (let i = 0; i < d.length; i += 4) { rr += d[i]; gg += d[i + 1]; bb += d[i + 2]; n++; }
      const hx = (v) => Math.round(v / n).toString(16).padStart(2, '0');
      return { hex: '#' + hx(rr) + hx(gg) + hx(bb), x: clientX - r.left, y: clientY - r.top };
    }
    let picking = false;
    pArea.addEventListener('pointerdown', (e) => { picking = true; pArea.setPointerCapture(e.pointerId); moveLoupe(e); });
    pArea.addEventListener('pointermove', (e) => { if (picking || e.pointerType === 'mouse') moveLoupe(e); });
    pArea.addEventListener('pointerleave', () => { if (!picking) loupe.style.display = 'none'; });
    pArea.addEventListener('pointerup', (e) => {
      if (!picking) return; picking = false;
      const c = colorAt(e.clientX, e.clientY);
      if (!c) return;
      const ps = $('#photoSwatch');
      ps.hidden = false; ps.style.setProperty('--c', c.hex);
      ps.querySelector('input').checked = true;
      setColor('photo', c.hex, 'Cor da sua foto');
      closePicker();
      showToast('Cor copiada da sua foto', c.hex);
    });
    function moveLoupe(e) {
      const c = colorAt(e.clientX, e.clientY);
      if (!c) { loupe.style.display = 'none'; return; }
      loupe.style.display = 'block'; loupe.style.left = c.x + 'px'; loupe.style.top = (c.y - (e.pointerType === 'mouse' ? 0 : 46)) + 'px'; loupe.style.background = c.hex;
    }
    $('#pickerClose').addEventListener('click', closePicker);
    $('#refPip').addEventListener('click', openPicker);
    $('#refPick').addEventListener('click', () => { openPicker(); showStage(); });
    $('#refRemove').addEventListener('click', () => {
      if (refUrl) URL.revokeObjectURL(refUrl);
      refFile = refUrl = refImg = refWork = null;
      closePicker();
      $('#refPip').hidden = true;
      $('#refCard').classList.remove('has-photo');
      $('#refThumb').innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="M21 16l-5-5-8 8"/></svg>';
      $('#refTitle').textContent = 'Tem uma foto de referência?';
      $('#refText').textContent = 'Envie a foto de uma unha que você ama. Dá para tocar nela e copiar a cor para a prévia.';
      $('#refBtnText').textContent = 'Escolher foto';
      $('#refPick').hidden = true; $('#refRemove').hidden = true;
      if (sel.color === 'photo') { $('input[name="color"][value="vinho"]').checked = true; setColor('vinho', '#6B1832', 'Vinho Salure'); }
      $('#photoSwatch').hidden = true;
      updateText();
    });
    addEventListener('resize', () => { if (!picker.hidden) drawPicker(); });

    // ---------- Pedido: uma imagem com a unha montada, as escolhas e a foto de referência.
    // É feita aqui no aparelho (canvas), sem servidor. No celular vai pelo "compartilhar";
    // no computador, a cliente baixa e anexa na conversa.
    const logoImg = new Image();
    logoImg.src = 'img/logo.png';
    const LEN_CARD = { curta: 'Curto', media: 'Médio', longa: 'Longo' };
    function rr(c, x, y, w, h, r) {
      c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r);
      c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath();
    }
    function cover(c, img, iw, ih, x, y, w, h) {
      const k = Math.max(w / iw, h / ih), sw = w / k, sh = h / k;
      c.drawImage(img, (iw - sw) / 2, (ih - sh) / 2, sw, sh, x, y, w, h);
    }
    async function buildCard() {
      const fonts = ['300 46px Fraunces', 'italic 300 46px Fraunces', '400 30px Outfit', '500 30px Outfit'].map((f) => document.fonts.load(f).catch(() => null));
      await Promise.race([Promise.all(fonts), new Promise((r) => setTimeout(r, 1500))]);
      if (!logoImg.complete) await new Promise((r) => { logoImg.onload = logoImg.onerror = r; });
      if (engine) engine.settle();
      const W = 1080, H = 1600, P = 48;
      const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
      const c = cv.getContext('2d');
      const spaced = (v) => { if ('letterSpacing' in c) c.letterSpacing = v; };
      c.fillStyle = '#FBF7F4'; c.fillRect(0, 0, W, H);
      // topo vinho com o logo
      c.fillStyle = '#6B1832'; c.fillRect(0, 0, W, 170);
      if (logoImg.naturalWidth) { const lw = 240, lh = (lw * logoImg.naturalHeight) / logoImg.naturalWidth; c.drawImage(logoImg, P, (170 - lh) / 2, lw, lh); }
      c.textAlign = 'right'; c.textBaseline = 'alphabetic';
      c.fillStyle = '#E9D2A6'; c.font = '500 22px Outfit, sans-serif'; spaced('4px');
      c.fillText('MINHA UNHA', W - P, 80);
      spaced('0px'); c.fillStyle = '#FBF7F4'; c.font = '300 26px Outfit, sans-serif';
      c.fillText(`Montada no site · ${new Date().toLocaleDateString('pt-BR')}`, W - P, 118);
      // a unha montada
      const pv = { x: P, y: 206, w: W - 2 * P, h: 780 };
      c.save(); rr(c, pv.x, pv.y, pv.w, pv.h, 28); c.clip();
      const sc = $('#studioCanvas');
      cover(c, sc, sc.width, sc.height, pv.x, pv.y, pv.w, pv.h);
      c.restore();
      c.font = '400 20px Outfit, sans-serif'; spaced('2px');
      const tag = 'PRÉVIA NA MÃO REAL', tw = c.measureText(tag).width + 32;
      c.fillStyle = 'rgba(251,247,244,0.9)'; rr(c, pv.x + 20, pv.y + 20, tw, 40, 20); c.fill();
      c.fillStyle = '#6B5A60'; c.textAlign = 'left'; c.fillText(tag, pv.x + 36, pv.y + 47);
      spaced('0px');
      // escolhas
      const colX = P, top = 1036;
      c.fillStyle = '#1C0E12'; c.font = '300 46px Fraunces, Georgia, serif'; c.fillText('Minha ', colX, top + 44);
      const mw = c.measureText('Minha ').width;
      c.fillStyle = '#6B1832'; c.font = 'italic 300 46px Fraunces, Georgia, serif'; c.fillText('escolha', colX + mw, top + 44);
      const colorLabel = sel.color === 'photo' ? `Cor da minha foto · ${sel.hex.toUpperCase()}` : sel.color === 'custom' ? `Personalizada · ${sel.hex.toUpperCase()}` : sel.colorName;
      const rows = [['FORMATO', SHAPE_NAMES[sel.shape]], ['COMPRIMENTO', LEN_CARD[sel.len]], ['COR', colorLabel, true], ['ACABAMENTO', FINISHES[sel.finish]]];
      if (sel.gems) rows.push(['DETALHE', 'Pedrarias no anelar']);
      let y = top + 96;
      const rowH = rows.length > 4 ? 60 : 68;
      rows.forEach(([k, v, sw]) => {
        c.fillStyle = '#8A7268'; c.font = '500 17px Outfit, sans-serif'; spaced('3px'); c.fillText(k, colX, y);
        spaced('0px'); c.fillStyle = '#1C0E12'; c.font = '400 29px Outfit, sans-serif';
        let vx = colX;
        if (sw) { c.fillStyle = sel.hex; c.beginPath(); c.arc(colX + 13, y + 23, 13, 0, Math.PI * 2); c.fill(); c.strokeStyle = 'rgba(0,0,0,0.15)'; c.lineWidth = 1.5; c.stroke(); vx += 36; c.fillStyle = '#1C0E12'; }
        c.fillText(v, vx, y + 34);
        y += rowH;
      });
      const s = suggestion();
      c.fillStyle = '#6B1832'; c.font = '500 25px Outfit, sans-serif';
      c.fillText(`${s.svc} · ${s.price}`, colX, y + 18);
      // foto de referência (ou a cor em destaque, se não houver foto)
      const bx = W - P - 300, by = top + 12, bw = 300, bh = 380;
      if (refImg) {
        c.save(); c.shadowColor = 'rgba(74,15,34,0.22)'; c.shadowBlur = 24; c.shadowOffsetY = 10;
        c.fillStyle = '#FFFFFF'; rr(c, bx - 10, by - 10, bw + 20, bh + 20, 22); c.fill(); c.restore();
        c.save(); rr(c, bx, by, bw, bh, 14); c.clip();
        cover(c, sample, sample.width, sample.height, bx, by, bw, bh); c.restore();
        c.fillStyle = '#8A7268'; c.font = '500 17px Outfit, sans-serif'; spaced('3px'); c.textAlign = 'center';
        c.fillText(refWork ? 'REFERÊNCIA DO PORTFÓLIO' : 'MINHA REFERÊNCIA', bx + bw / 2, by + bh + 44); spaced('0px'); c.textAlign = 'left';
      } else {
        c.fillStyle = sel.hex; c.beginPath(); c.arc(bx + bw / 2, by + 150, 120, 0, Math.PI * 2); c.fill();
        c.strokeStyle = 'rgba(0,0,0,0.12)'; c.lineWidth = 2; c.stroke();
        c.fillStyle = '#8A7268'; c.font = '500 17px Outfit, sans-serif'; spaced('3px'); c.textAlign = 'center';
        c.fillText('COR ESCOLHIDA', bx + bw / 2, by + 320); spaced('0px');
        c.fillStyle = '#1C0E12'; c.font = '400 26px Outfit, sans-serif'; c.fillText(sel.hex.toUpperCase(), bx + bw / 2, by + 356);
        c.textAlign = 'left';
      }
      // rodapé
      c.fillStyle = '#E4D5CC'; c.fillRect(P, H - 118, W - 2 * P, 1.5);
      c.textAlign = 'center'; c.fillStyle = '#8A7268'; c.font = '400 21px Outfit, sans-serif';
      c.fillText('Prévia ilustrativa: formato e valor final são combinados no atendimento.', W / 2, H - 76);
      c.fillStyle = '#6B1832'; c.font = '500 23px Outfit, sans-serif';
      c.fillText('salurenail.com.br · (11) 95369-1565 · @salurenail', W / 2, H - 40);
      return new Promise((res) => cv.toBlob(res, 'image/jpeg', 0.9));
    }

    // janela de envio em dois passos
    const sheet = $('#sendSheet'), ssImg = $('#ssImg'), ss1 = $('#ss1Btn'), ss2 = $('#ss2Btn');
    let cardFile = null, cardUrl = null, sheetMode = 'download', sheetFocus = null, sheetToken = 0;
    function setStep(n) {
      $('#ssStep1').classList.toggle('is-done', n > 1); $('#ssStep1').classList.toggle('is-next', n === 1);
      $('#ssStep2').classList.toggle('is-done', n > 2); $('#ssStep2').classList.toggle('is-next', n === 2);
    }
    function setBtn(b, text, href, opts = {}) {
      b.textContent = text; b.href = href;
      if (opts.download) b.setAttribute('download', opts.download); else b.removeAttribute('download');
      if (opts.blank) { b.target = '_blank'; b.rel = 'noopener'; } else { b.removeAttribute('target'); b.removeAttribute('rel'); }
      b.setAttribute('aria-disabled', 'false');
    }
    async function openSheet() {
      const token = ++sheetToken;
      sheetFocus = document.activeElement;
      sheet.hidden = false;
      if (lenis) lenis.stop();
      ssImg.hidden = true; $('#ssWait').hidden = false;
      [ss1, ss2].forEach((b) => b.setAttribute('aria-disabled', 'true'));
      setStep(1);
      $('.ss-close', sheet).focus();
      const blob = await buildCard();
      if (token !== sheetToken || !blob) return;
      if (cardUrl) URL.revokeObjectURL(cardUrl);
      cardUrl = URL.createObjectURL(blob);
      cardFile = new File([blob], 'salure-minha-unha.jpg', { type: 'image/jpeg' });
      ssImg.src = cardUrl; ssImg.hidden = false; $('#ssWait').hidden = true;
      let canShare = false;
      try { canShare = matchMedia('(pointer: coarse)').matches && !!navigator.canShare && navigator.canShare({ files: [cardFile] }); } catch (_) { canShare = false; }
      sheetMode = canShare ? 'share' : 'download';
      const msg = message();
      const extra = refFile ? ', as suas escolhas e a sua foto de referência' : ' e as suas escolhas';
      if (canShare) {
        $('#ss1Title').textContent = 'Abra a conversa com a Anna';
        $('#ss1Text').textContent = 'O WhatsApp abre com o seu pedido já escrito. É só enviar.';
        setBtn(ss1, 'Abrir o WhatsApp', waLink(msg), { blank: true });
        $('#ss2Title').textContent = 'Volte aqui e envie a imagem';
        $('#ss2Text').textContent = `Ela tem a unha montada${extra}. Escolha o WhatsApp e a conversa da Salure.`;
        setBtn(ss2, 'Enviar a imagem', '#');
      } else {
        $('#ss1Title').textContent = 'Baixe a imagem';
        $('#ss1Text').textContent = `Ela tem a unha montada${extra}.`;
        setBtn(ss1, 'Baixar a imagem', cardUrl, { download: 'salure-minha-unha.jpg' });
        $('#ss2Title').textContent = 'Abra o WhatsApp e anexe a imagem';
        $('#ss2Text').textContent = 'O pedido já vai escrito. Arraste a imagem baixada para a conversa ou anexe pelo clipe.';
        setBtn(ss2, 'Abrir o WhatsApp', waLink(msg), { blank: true });
      }
    }
    function closeSheet() {
      sheetToken++;
      sheet.hidden = true;
      if (lenis) lenis.start();
      if (sheetFocus) sheetFocus.focus();
    }
    $('#simSend').addEventListener('click', (e) => { e.preventDefault(); openSheet(); });
    $$('[data-ss-close]', sheet).forEach((b) => b.addEventListener('click', closeSheet));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !sheet.hidden) closeSheet(); });
    ss1.addEventListener('click', () => setStep(2));
    ss2.addEventListener('click', (e) => {
      if (sheetMode !== 'share') { setStep(3); return; }
      e.preventDefault();
      navigator.share({ files: [cardFile], text: 'Minha unha montada no site da Salure ✨' }).then(() => setStep(3)).catch((err) => {
        if (err && err.name === 'AbortError') return;
        // sem o compartilhar: baixa a imagem para anexar na conversa
        sheetMode = 'download';
        $('#ss2Text').textContent = 'Não deu para abrir o compartilhar. Baixe a imagem e anexe na conversa pelo clipe.';
        setBtn(ss2, 'Baixar a imagem', cardUrl, { download: 'salure-minha-unha.jpg' });
      });
    });

    // motor de desenho: a foto da mão (sem as unhas) e o mapa de luz das unhas reais
    const base = new Image(), atlas = new Image();
    let loaded = 0;
    const ready = () => {
      if (++loaded < 2) return;
      try {
        engine = window.NailStudio($('#studioCanvas'), { base, atlas });
        engine.set({ shape: sel.shape, len: sel.len, color: sel.hex, finish: sel.finish, gems: sel.gems }, false);
        mini = window.NailStudio($('#miniStudio'), { base, atlas });
        mini.set({ shape: 'amendoa', len: 'media', color: '#6B1832', finish: 'liso' }, false);
        startMini();
      } catch (err) { console.error(err); }
    };
    base.onload = ready; atlas.onload = ready;
    base.src = IMG.hand; atlas.src = IMG.atlas;

    // prévia animada no cartão da página inicial
    const MINI = [
      { shape: 'stiletto', len: 'longa', color: '#1B1416', finish: 'cromado', gems: false },
      { shape: 'quadrado', len: 'curta', color: '#F6F1EA', finish: 'francesinha', gems: false },
      { shape: 'ballerina', len: 'media', color: '#EE6A93', finish: 'glitter', gems: true },
      { shape: 'amendoa', len: 'longa', color: '#D9A595', finish: 'boomer', gems: false },
      { shape: 'amendoa', len: 'media', color: '#6B1832', finish: 'liso', gems: false },
    ];
    function startMini() {
      if (reduceMotion) return;
      let k = 0, visible = false;
      new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe($('#miniStudio'));
      setInterval(() => { if (!visible || current !== 'inicio') return; mini.set(MINI[k++ % MINI.length], true); }, 2600);
    }
    updateText();
    return { sel, useWork };
  })();

  /* ---------------- Cursor e botões magnéticos ---------------- */
  function cursor() {
    if (!finePointer || !animate) return;
    document.body.classList.add('has-cursor');
    const dot = $('.cursor'), ring = $('.cursor-ring'), label = ring.querySelector('span');
    const dx = gsap.quickTo(dot, 'x', { duration: 0.12 }), dy = gsap.quickTo(dot, 'y', { duration: 0.12 });
    const rx = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' }), ry = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' });
    addEventListener('mousemove', (e) => { dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY); });
    document.addEventListener('mouseover', (e) => {
      const t = e.target.closest('a, button, label, [data-cursor]');
      ring.classList.toggle('is-hover', !!t && !t.dataset.cursor);
      ring.classList.toggle('is-label', !!(t && t.dataset.cursor));
      label.textContent = t && t.dataset.cursor ? t.dataset.cursor : '';
    });
    document.addEventListener('mouseleave', () => { dot.style.opacity = ring.style.opacity = 0; });
    document.addEventListener('mouseenter', () => { dot.style.opacity = ring.style.opacity = ''; });
    $$('.magnetic').forEach((b) => {
      const xTo = gsap.quickTo(b, 'x', { duration: 0.6, ease: 'elastic.out(1,0.4)' }), yTo = gsap.quickTo(b, 'y', { duration: 0.6, ease: 'elastic.out(1,0.4)' });
      b.addEventListener('mousemove', (e) => { const r = b.getBoundingClientRect(); xTo((e.clientX - r.left - r.width / 2) * 0.3); yTo((e.clientY - r.top - r.height / 2) * 0.35); });
      b.addEventListener('mouseleave', () => { xTo(0); yTo(0); });
    });
  }

  /* =====================================================================
     PÁGINAS (rotas por âncora) E ANIMAÇÕES SEM TRAVAR A ROLAGEM
     ===================================================================== */
  const ROUTES = ['inicio', 'sobre', 'servicos', 'portfolio', 'monte-sua-unha', 'contato'];
  const views = Object.fromEntries(ROUTES.map((r) => [r, $(`.view[data-view="${r}"]`)]));
  const curtain = $('#curtain');
  let pending = null, disposers = [], firstLoad = true;
  const enterDelay = () => (firstLoad ? 0.6 : 0.35);

  if (hasGSAP) {
    gsap.registerPlugin(ScrollTrigger);
    if (window.SplitText) gsap.registerPlugin(SplitText);
    ScrollTrigger.config({ ignoreMobileResize: true });
  }
  if (animate && window.Lenis) {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  if (animate) gsap.to('.scroll-progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });

  function splitAndReveal(v) {
    $$('[data-split], .page-title', v).forEach((el) => {
      if (!window.SplitText) return;
      const split = SplitText.create(el, { type: 'lines', mask: 'lines' });
      const inHero = !!el.closest('.page-hero');
      gsap.from(split.lines, inHero
        ? { yPercent: 110, duration: 1.2, ease: 'power4.out', stagger: 0.1, delay: enterDelay() }
        : { yPercent: 110, duration: 1.15, ease: 'power4.out', stagger: 0.09, scrollTrigger: { trigger: el, start: 'top 88%' } });
    });
    $$('[data-reveal]', v).forEach((el) => {
      const inHero = !!el.closest('.page-hero');
      gsap.from(el, inHero
        ? { y: 30, opacity: 0, duration: 1, ease: 'power3.out', delay: enterDelay() + 0.25 }
        : { y: 46, opacity: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
    });
  }

  const VIEW_ANIM = {
    inicio(v) {
      const mobile = isMobile();
      // entrada do topo
      gsap.from($$('.hero-title .line > span', v), { yPercent: 115, duration: 1.3, ease: 'power4.out', stagger: 0.11, delay: enterDelay() - 0.2 });
      gsap.from($$('.hero .eyebrow, .hero-lead, .hero-ctas > *, .hero-foot', v), { y: 26, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.08, delay: enterDelay() + 0.15 });
      gsap.from($('.hero-zoom', v), { scale: 1.2, duration: 2.2, ease: 'power3.out', delay: Math.max(0, enterDelay() - 0.6) });
      // topo encolhe enquanto a página desce (sem fixar a tela)
      gsap.timeline({ scrollTrigger: { trigger: $('.hero', v), start: 'top top', end: 'bottom top', scrub: 0.6 } })
        .to($('.hero-content', v), { yPercent: -22, opacity: 0, ease: 'power1.in', duration: 0.5 }, 0)
        .to($('.hero-foot', v), { opacity: 0, duration: 0.2 }, 0)
        .fromTo($('.hero-media', v), { clipPath: 'inset(0% 0% 0% 0% round 0px)' }, { clipPath: mobile ? 'inset(5% 4% 16% 4% round 22px)' : 'inset(6% 5% 14% 5% round 30px)', ease: 'none', duration: 1 }, 0)
        .fromTo($$('.hero-video, .hero-poster', v), { scale: 1.1 }, { scale: 1, ease: 'none', duration: 1 }, 0);
      // faixa de palavras acelera com a rolagem
      const mq = $$('.mq-inner', v).map((el, i) => gsap.fromTo(el, { xPercent: i ? -50 : 0 }, { xPercent: i ? 0 : -50, ease: 'none', duration: 34, repeat: -1 }));
      if (lenis) {
        let dir = 1, t = null;
        const onScroll = ({ velocity, direction }) => {
          if (direction) dir = direction;
          const boost = 1 + Math.min(Math.abs(velocity) * 0.35, 6);
          mq.forEach((tw) => gsap.to(tw, { timeScale: boost * dir, duration: 0.25, overwrite: true }));
          clearTimeout(t); t = setTimeout(() => mq.forEach((tw) => gsap.to(tw, { timeScale: dir, duration: 0.8 })), 120);
        };
        const off = lenis.on('scroll', onScroll);
        disposers.push(() => (typeof off === 'function' ? off() : lenis.off && lenis.off('scroll', onScroll)));
      }
      // manifesto: as palavras acendem conforme a frase passa pela tela
      const text = $('.manifesto-text', v);
      const words = window.SplitText ? SplitText.create(text, { type: 'words' }).words : [text];
      gsap.fromTo(words, { opacity: 0.12 }, { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: text, start: 'top 82%', end: 'bottom 42%', scrub: 0.5 } });
      $$('.fi', v).forEach((f) => {
        const sp = parseFloat(f.dataset.speed);
        gsap.fromTo(f, { y: 110 * sp }, { y: -110 * sp, ease: 'none', scrollTrigger: { trigger: $('.manifesto', v), start: 'top bottom', end: 'bottom top', scrub: 0.8 } });
      });
      gsap.from($$('.fi img', v), { scale: 1.4, opacity: 0, duration: 1.3, ease: 'power3.out', stagger: 0.08, scrollTrigger: { trigger: $('.manifesto', v), start: 'top 75%' } });
      // cartões das páginas
      $$('.dc', v).forEach((c, i) => {
        gsap.from(c, { y: 70, opacity: 0, duration: 1.1, ease: 'power3.out', delay: (i % 2) * 0.08, scrollTrigger: { trigger: c, start: 'top 90%' } });
        gsap.fromTo($('.dc-media', c), { yPercent: -5 }, { yPercent: 5, ease: 'none', scrollTrigger: { trigger: c, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
      gsap.from($$('.ft-card', v), { x: 80, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.06, scrollTrigger: { trigger: $('.featured', v), start: 'top 70%' } });
      gsap.from($('.depo-mark', v), { yPercent: 40, opacity: 0, duration: 1.4, ease: 'power3.out', scrollTrigger: { trigger: $('.depo', v), start: 'top 70%' } });
      gsap.fromTo($('.phone', v), { rotate: -9, y: 100 }, { rotate: 3, y: -30, ease: 'none', scrollTrigger: { trigger: $('.insta', v), start: 'top bottom', end: 'bottom top', scrub: 1 } });
      $$('.ic', v).forEach((c) => { const sp = parseFloat(c.dataset.speed); gsap.fromTo(c, { y: 120 * sp }, { y: -120 * sp, ease: 'none', scrollTrigger: { trigger: $('.insta', v), start: 'top bottom', end: 'bottom top', scrub: 1 } }); });
      gsap.from($$('.cta-big .line > span', v), { yPercent: 110, duration: 1.3, ease: 'power4.out', stagger: 0.12, scrollTrigger: { trigger: $('.cta-big', v), start: 'top 85%' } });
    },
    sobre(v) {
      const mobile = isMobile();
      gsap.fromTo($('.arch', v), { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'power4.inOut', delay: enterDelay() });
      gsap.fromTo($('.arch img', v), { scale: 1.3 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: $('.arch-wrap', v), start: 'top bottom', end: 'bottom top', scrub: true } });
      gsap.to($('.ring-rot', v), { rotate: 360, ease: 'none', scrollTrigger: { trigger: $('.historia', v), start: 'top bottom', end: 'bottom top', scrub: 1 } });
      gsap.from($('.arch-badge', v), { x: -30, opacity: 0, duration: 1, ease: 'power3.out', delay: enterDelay() + 0.8 });
      gsap.fromTo($('.tl-fill', v), { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: $('.timeline', v), start: 'top 80%', end: 'bottom 60%', scrub: true } });
      $$('.timeline li', v).forEach((li) => ScrollTrigger.create({ trigger: li, start: 'top 78%', onEnter: () => li.classList.add('is-on'), onLeaveBack: () => li.classList.remove('is-on') }));
      $$('[data-count]', v).forEach((el) => {
        const to = +el.dataset.count, from = +(el.dataset.from || 0), suf = el.dataset.suffix || '';
        const o = { val: from };
        gsap.to(o, { val: to, duration: 2.2, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' }, onStart: () => (el.textContent = from + suf), onUpdate: () => (el.textContent = Math.round(o.val) + suf) });
      });
      // espaço: o arco abre conforme a seção sobe
      const esp = $('.espaco', v);
      gsap.timeline({ scrollTrigger: { trigger: esp, start: 'top 90%', end: 'top top', scrub: 0.6 } })
        .fromTo($('.esp-frame', esp), { clipPath: mobile ? 'inset(22% 12% 22% 12% round 200px 200px 18px 18px)' : 'inset(18% 34% 18% 34% round 300px 300px 22px 22px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px 0px 0px 0px)', ease: 'power1.inOut', duration: 1 }, 0)
        .fromTo($('.esp-frame img', esp), mobile ? { scale: 1.3, objectPosition: '84% 45%', yPercent: 14 } : { scale: 1.3, xPercent: -27, yPercent: 18 },
          mobile ? { scale: 1, objectPosition: '62% 50%', yPercent: 0, ease: 'none', duration: 1 } : { scale: 1, xPercent: 0, yPercent: 0, ease: 'none', duration: 1 }, 0)
        .to($('.esp-l', esp), mobile ? { yPercent: -80, opacity: 0, duration: 0.6 } : { xPercent: -70, opacity: 0, duration: 0.6 }, 0.25)
        .to($('.esp-r', esp), mobile ? { yPercent: 80, opacity: 0, duration: 0.6 } : { xPercent: 70, opacity: 0, duration: 0.6 }, 0.25);
      gsap.timeline({ scrollTrigger: { trigger: esp, start: 'top 15%', end: 'top -12%', scrub: 0.6 } })
        .to($('.esp-shade', esp), { opacity: 1, duration: 1 }, 0)
        .fromTo($('.esp-caption', esp), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, 0);
    },
    servicos(v) {
      const cards = $$('.svc-card', v);
      cards.forEach((card) => gsap.fromTo($('.svc-media img', card), { scale: 1.2 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'top 30%', scrub: true } }));
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px) and (min-height: 720px)', () => {
        cards.forEach((card, i) => {
          const next = cards[i + 1]; if (!next) return;
          const st = { trigger: next, start: 'top bottom', end: () => 'top ' + (parseFloat(getComputedStyle(next).top) || 90) + 'px', scrub: true, invalidateOnRefresh: true };
          gsap.to(card, { scale: 0.92 + i * 0.012, ease: 'none', scrollTrigger: st });
          gsap.to($('.svc-dim', card), { opacity: 0.38, ease: 'none', scrollTrigger: { ...st } });
        });
      });
      mm.add('(max-width: 1023px), (max-height: 719px)', () => {
        cards.forEach((card) => gsap.from(card, { y: 60, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 88%' } }));
      });
      disposers.push(() => mm.revert());
    },
    portfolio(v) {
      ScrollTrigger.batch($$('.pf-item', v), { start: 'top 92%', onEnter: (els) => gsap.fromTo(els, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.06, overwrite: true }) });
      gsap.set($$('.pf-item', v), { opacity: 0 });
      gsap.from($$('#pfFilters button', v), { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.04, delay: enterDelay() + 0.2 });
    },
    'monte-sua-unha'(v) {
      gsap.from($('.stage', v), { y: 50, opacity: 0, duration: 1.2, ease: 'power3.out', delay: enterDelay() + 0.1 });
      gsap.from($$('.panel > *', v), { y: 30, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.06, delay: enterDelay() + 0.25 });
      gsap.from($$('#inspoGrid .inspo-card', v), { y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.07, scrollTrigger: { trigger: $('#inspoGrid', v), start: 'top 88%' } });
    },
    contato(v) {
      gsap.from($('#openBadge', v), { y: 20, opacity: 0, duration: 0.9, ease: 'power3.out', delay: enterDelay() + 0.3 });
      gsap.from($$('#hours li', v), { x: -30, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08, scrollTrigger: { trigger: $('#hours', v), start: 'top 90%' } });
    },
  };

  function setActiveNav(route) {
    $$('.nav-links a, .menu a.menu-link').forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + route));
  }
  function activateView(route) {
    disposers.forEach((fn) => { try { fn(); } catch (_) {} });
    disposers = [];
    ROUTES.forEach((r) => { views[r].hidden = r !== route; });
    current = route;
    setActiveNav(route);
    window.scrollTo(0, 0);
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    updateHeader();
    if (animate) {
      const ctx = gsap.context(() => { splitAndReveal(views[route]); VIEW_ANIM[route](views[route]); });
      disposers.push(() => ctx.revert());
      ScrollTrigger.refresh();
    }
  }
  function navigate(route, opts = {}) {
    if (!ROUTES.includes(route)) route = 'inicio';
    if (route === pending) return;
    if (route === current) {
      if (opts.then) { opts.then(); return; }
      if (lenis) lenis.scrollTo(0, { duration: 1.2 }); else window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (opts.push !== false) { try { history.pushState(null, '', '#' + route); } catch (_) {} }
    if (!animate || opts.instant) { activateView(route); if (opts.then) opts.then(); return; }
    pending = route;
    $('#curtainName').textContent = views[route].dataset.title;
    gsap.timeline({ onComplete: () => { pending = null; if (opts.then) opts.then(); } })
      .set(curtain, { yPercent: 100, y: 0 })
      .to(curtain, { yPercent: 0, duration: 0.55, ease: 'power3.inOut' })
      .add(() => activateView(route))
      .to(curtain, { yPercent: -100, duration: 0.7, ease: 'power3.inOut', delay: 0.15 });
  }
  const routeFromHash = () => { const h = (location.hash || '').slice(1); return ROUTES.includes(h) ? h : 'inicio'; };

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const jump = a.dataset.jump;
    if (jump) {
      e.preventDefault();
      const el = document.getElementById(jump);
      if (el) { if (lenis) lenis.scrollTo(el, { offset: -90, duration: 1.3 }); else el.scrollIntoView({ behavior: 'smooth' }); }
      return;
    }
    const r = a.getAttribute('href').slice(1);
    if (!ROUTES.includes(r)) return;
    e.preventDefault();
    const wasOpen = menu.classList.contains('open');
    setMenu(false);
    if (wasOpen) setTimeout(() => navigate(r), 250); else navigate(r);
  });
  addEventListener('popstate', () => navigate(routeFromHash(), { push: false }));

  /* ---------------- Abertura ---------------- */
  const loader = $('#loader');
  const hideLoader = () => { loader.remove(); document.documentElement.classList.remove('is-loading'); };
  if (!animate) { activateView(routeFromHash()); hideLoader(); return; }
  document.documentElement.classList.add('is-loading');
  ROUTES.forEach((r) => { views[r].hidden = r !== routeFromHash(); });
  if (lenis) lenis.stop();
  cursor();
  const ready = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
  Promise.all([Promise.race([ready, new Promise((r) => setTimeout(r, 2500))]), new Promise((r) => setTimeout(r, 1400))]).then(() => {
    activateView(routeFromHash());
    gsap.timeline({ onComplete: () => { firstLoad = false; if (lenis) lenis.start(); ScrollTrigger.refresh(); } })
      .to(loader, { yPercent: -100, duration: 1, ease: 'power4.inOut', onComplete: hideLoader })
      .from('.site-header', { yPercent: -100, opacity: 0, duration: 1, ease: 'power3.out' }, 0.6);
  });
  addEventListener('load', () => ScrollTrigger.refresh());
  let refreshT = null;
  document.addEventListener('load', (e) => {
    if (e.target.tagName !== 'IMG') return;
    clearTimeout(refreshT); refreshT = setTimeout(() => ScrollTrigger.refresh(), 200);
  }, true);
})();
