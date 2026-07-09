/**
 * chat-widget.js — Widget de chat Leo (Asistente Proemote)
 * Autocontenido: inyecta CSS + HTML + lógica en cualquier página.
 * Uso: <script src="/chat-widget.js" defer></script>
 */
(function () {
  'use strict';

  // No cargar dos veces
  if (document.getElementById('proemote-chat-btn')) return;

  const CHAT_ENDPOINT = '/chat.php';
  const MAX_HISTORY = 20;

  const TOOLTIP_MSGS = [
    '¿Podemos ayudarte?',
    '¿Tienes alguna duda?',
    '¿Te ayudamos?',
    '¿Necesitas ayuda?',
    '¡Pregúntame lo que sea!',
    '¿En qué puedo ayudarte?',
  ];

  // ── Inyectar CSS ──────────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    #proemote-chat-btn {
      position: fixed; bottom: 28px; right: 28px; z-index: 9998;
      width: 60px; height: 60px; border-radius: 50%;
      background: linear-gradient(135deg, #7B61FF 0%, #9F7AEA 100%);
      border: none; cursor: pointer; display: flex; align-items: center; justify-content: center;
      box-shadow: 0 8px 32px rgba(123,97,255,0.45), 0 2px 8px rgba(0,0,0,0.3);
      transition: box-shadow 0.3s ease; outline: none; padding: 0;
    }
    #proemote-chat-btn:hover {
      box-shadow: 0 12px 40px rgba(123,97,255,0.6), 0 4px 12px rgba(0,0,0,0.3);
    }
    #proemote-chat-btn:active { transform: scale(0.97); }
    #proemote-chat-btn:hover #chat-robot-icon {
      animation: proemoteRobotWiggle 0.5s ease-in-out;
    }
    @keyframes proemoteRobotWiggle {
      0%   { transform: rotate(0deg) scale(1); }
      20%  { transform: rotate(-12deg) scale(1.08); }
      40%  { transform: rotate(12deg) scale(1.1); }
      60%  { transform: rotate(-8deg) scale(1.06); }
      80%  { transform: rotate(6deg) scale(1.04); }
      100% { transform: rotate(0deg) scale(1); }
    }
    #proemote-chat-badge {
      position: absolute; top: -3px; right: -3px;
      width: 18px; height: 18px; background: #22c55e;
      border-radius: 50%; border: 2px solid #05020a;
      animation: proemoteBadgePulse 2.2s ease-in-out infinite;
    }
    @keyframes proemoteBadgePulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
      50%       { box-shadow: 0 0 0 6px rgba(34,197,94,0); }
    }
    #proemote-chat-tooltip {
      position: absolute; right: 72px; bottom: 50%;
      transform: translateY(50%);
      background: rgba(11,6,26,0.95); border: 1px solid rgba(123,97,255,0.3);
      color: #e2e8f0; font-size: 13px; font-family: 'Inter', system-ui, sans-serif;
      white-space: nowrap; padding: 8px 14px; border-radius: 10px;
      pointer-events: none; opacity: 0; transition: opacity 0.5s ease;
      backdrop-filter: blur(10px);
    }
    #proemote-chat-tooltip.pct-visible { opacity: 1; }
    #proemote-chat-panel {
      position: fixed; bottom: 100px; right: 28px; z-index: 9999;
      width: 360px; max-width: calc(100vw - 32px);
      height: 520px; max-height: calc(100dvh - 130px);
      background: #0B061A; border: 1px solid rgba(123,97,255,0.2); border-radius: 20px;
      box-shadow: 0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(123,97,255,0.08), inset 0 1px 0 rgba(255,255,255,0.04);
      display: flex; flex-direction: column; overflow: hidden;
      transform: translateY(20px) scale(0.95); opacity: 0; pointer-events: none;
      transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease;
      font-family: 'Inter', system-ui, sans-serif;
    }
    #proemote-chat-panel.pct-open { transform: translateY(0) scale(1); opacity: 1; pointer-events: all; }
    #proemote-chat-header {
      background: linear-gradient(135deg, rgba(123,97,255,0.18) 0%, rgba(159,122,234,0.1) 100%);
      border-bottom: 1px solid rgba(123,97,255,0.15);
      padding: 14px 16px; display: flex; align-items: center; gap: 11px; flex-shrink: 0;
    }
    .pct-avatar {
      width: 38px; height: 38px; border-radius: 50%;
      background: linear-gradient(135deg, #7B61FF, #9F7AEA);
      display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 18px;
    }
    .pct-header-info { flex: 1; min-width: 0; }
    .pct-header-name { font-size: 14px; font-weight: 600; color: #f1f5f9; line-height: 1.2; }
    .pct-header-status {
      font-size: 11px; color: #22c55e;
      display: flex; align-items: center; gap: 4px; margin-top: 1px;
    }
    .pct-status-dot {
      width: 6px; height: 6px; background: #22c55e; border-radius: 50%;
      animation: proemoteBadgePulse 2.2s ease-in-out infinite;
    }
    #proemote-chat-close {
      width: 28px; height: 28px; background: rgba(255,255,255,0.06);
      border: none; border-radius: 8px; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      color: rgba(255,255,255,0.5); transition: background 0.2s, color 0.2s; flex-shrink: 0;
    }
    #proemote-chat-close:hover { background: rgba(255,255,255,0.12); color: #fff; }
    #proemote-chat-messages {
      flex: 1; overflow-y: auto; padding: 16px 14px;
      display: flex; flex-direction: column; gap: 10px; scroll-behavior: smooth;
    }
    #proemote-chat-messages::-webkit-scrollbar { width: 4px; }
    #proemote-chat-messages::-webkit-scrollbar-track { background: transparent; }
    #proemote-chat-messages::-webkit-scrollbar-thumb { background: rgba(123,97,255,0.25); border-radius: 4px; }
    .pct-msg { display: flex; gap: 8px; animation: pctMsgIn 0.3s cubic-bezier(0.16,1,0.3,1) both; }
    @keyframes pctMsgIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .pct-msg.pct-user { flex-direction: row-reverse; }
    .pct-bubble {
      max-width: 80%; padding: 10px 14px; border-radius: 14px;
      font-size: 13.5px; line-height: 1.55; word-break: break-word;
    }
    .pct-msg.pct-bot .pct-bubble {
      background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.08);
      color: #e2e8f0; border-bottom-left-radius: 4px;
    }
    .pct-msg.pct-user .pct-bubble {
      background: linear-gradient(135deg, #7B61FF, #9F7AEA); color: #fff; border-bottom-right-radius: 4px;
    }
    .pct-msg-avatar {
      width: 28px; height: 28px; border-radius: 50%;
      background: linear-gradient(135deg, #7B61FF, #9F7AEA);
      display: flex; align-items: center; justify-content: center;
      font-size: 13px; flex-shrink: 0; align-self: flex-end;
    }
    .pct-typing { display: flex; gap: 4px; padding: 12px 14px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; border-bottom-left-radius: 4px; width: fit-content; }
    .pct-typing span { width: 6px; height: 6px; background: rgba(255,255,255,0.4); border-radius: 50%; animation: pctTypingDot 1.2s ease-in-out infinite; }
    .pct-typing span:nth-child(2) { animation-delay: 0.2s; }
    .pct-typing span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes pctTypingDot { 0%,60%,100% { transform: translateY(0); opacity: 0.4; } 30% { transform: translateY(-5px); opacity: 1; } }
    #proemote-welcome-card {
      background: rgba(123,97,255,0.08); border: 1px solid rgba(123,97,255,0.2);
      border-radius: 14px; padding: 14px; text-align: center;
      color: #c4b5fd; font-size: 13px; line-height: 1.5;
    }
    #proemote-welcome-card strong { color: #e2e8f0; display: block; margin-bottom: 4px; font-size: 14px; }
    .pct-chips { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
    .pct-chip {
      background: rgba(123,97,255,0.12); border: 1px solid rgba(123,97,255,0.25);
      color: #a78bfa; font-size: 11.5px; padding: 5px 11px; border-radius: 20px;
      cursor: pointer; transition: background 0.2s, border-color 0.2s, color 0.2s;
      font-family: 'Inter', system-ui, sans-serif;
    }
    .pct-chip:hover { background: rgba(123,97,255,0.22); border-color: rgba(123,97,255,0.5); color: #c4b5fd; }
    #proemote-chat-footer {
      border-top: 1px solid rgba(255,255,255,0.06); padding: 12px;
      background: rgba(5,2,10,0.6); display: flex; gap: 8px; align-items: flex-end; flex-shrink: 0;
    }
    #proemote-chat-input {
      flex: 1; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
      border-radius: 12px; padding: 10px 14px; font-size: 13.5px; color: #f1f5f9;
      font-family: 'Inter', system-ui, sans-serif; resize: none; outline: none;
      line-height: 1.4; max-height: 100px; overflow-y: auto; transition: border-color 0.2s;
    }
    #proemote-chat-input::placeholder { color: rgba(255,255,255,0.25); }
    #proemote-chat-input:focus { border-color: rgba(123,97,255,0.5); }
    #proemote-chat-send {
      width: 40px; height: 40px; border-radius: 12px;
      background: linear-gradient(135deg, #7B61FF, #9F7AEA);
      border: none; cursor: pointer; display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; transition: opacity 0.2s, transform 0.2s;
    }
    #proemote-chat-send:disabled { opacity: 0.4; cursor: not-allowed; transform: none !important; }
    #proemote-chat-send:not(:disabled):hover { transform: scale(1.05); }
    .pct-powered {
      text-align: center; font-size: 10px; color: rgba(255,255,255,0.2);
      padding: 4px 0 8px; font-family: 'Inter', system-ui, sans-serif;
    }
    .pct-powered a { color: rgba(123,97,255,0.5); text-decoration: none; }
    @media (max-width: 480px) {
      #proemote-chat-panel { right: 12px; bottom: 90px; width: calc(100vw - 24px); }
      #proemote-chat-btn   { right: 16px; bottom: 20px; }
    }
  `;
  document.head.appendChild(style);

  // ── Inyectar HTML ─────────────────────────────────────────────────
  const html = `
    <button id="proemote-chat-btn" aria-label="Abrir chat con Leo, asistente de Proemote">
      <span id="proemote-chat-badge"></span>
      <span id="proemote-chat-tooltip"></span>
      <svg id="chat-robot-icon" width="28" height="28" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block;">
        <line x1="32" y1="4" x2="32" y2="13" stroke="white" stroke-width="3" stroke-linecap="round"/>
        <circle cx="32" cy="3" r="3" fill="white"/>
        <rect x="12" y="13" width="40" height="28" rx="8" fill="white" fill-opacity="0.95"/>
        <circle cx="23" cy="26" r="4.5" fill="#7B61FF"/>
        <circle cx="41" cy="26" r="4.5" fill="#7B61FF"/>
        <circle cx="24.5" cy="24.5" r="1.5" fill="white"/>
        <circle cx="42.5" cy="24.5" r="1.5" fill="white"/>
        <rect x="21" y="33" width="22" height="4" rx="2" fill="#9F7AEA" fill-opacity="0.6"/>
        <rect x="28" y="41" width="8" height="5" rx="2" fill="white" fill-opacity="0.8"/>
        <rect x="14" y="46" width="36" height="16" rx="6" fill="white" fill-opacity="0.75"/>
        <circle cx="32" cy="54" r="3" fill="#7B61FF" fill-opacity="0.7"/>
      </svg>
    </button>

    <div id="proemote-chat-panel" role="dialog" aria-label="Chat con Leo · Asistente de Proemote" aria-modal="true">
      <div id="proemote-chat-header">
        <div class="pct-avatar">🤖</div>
        <div class="pct-header-info">
          <div class="pct-header-name">Leo · Asistente de Proemote</div>
          <div class="pct-header-status">
            <span class="pct-status-dot"></span>
            En línea · Responde al instante
          </div>
        </div>
        <button id="proemote-chat-close" aria-label="Cerrar chat">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
      <div id="proemote-chat-messages">
        <div id="proemote-welcome-card">
          <strong>👋 ¡Hola! Soy Leo, el asistente de Proemote.</strong>
          Puedo explicarte nuestros servicios, ayudarte a elegir el plan más adecuado para tu negocio o resolver cualquier duda.
        </div>
        <div class="pct-chips" id="proemote-chips">
          <button class="pct-chip" data-msg="¿Qué servicios ofrecéis?">¿Qué servicios ofrecéis?</button>
          <button class="pct-chip" data-msg="¿Cuánto cuesta una web profesional?">Precio de una web</button>
          <button class="pct-chip" data-msg="¿Ayudáis con subvenciones de digitalización?">Subvenciones digitales</button>
          <button class="pct-chip" data-msg="Quiero un diagnóstico gratuito de mi negocio">Diagnóstico gratuito</button>
        </div>
      </div>
      <div id="proemote-chat-footer">
        <textarea id="proemote-chat-input" rows="1" placeholder="Escribe tu pregunta…" aria-label="Escribe tu mensaje" maxlength="800"></textarea>
        <button id="proemote-chat-send" disabled aria-label="Enviar mensaje">
          <svg width="18" height="18" viewBox="0 0 256 256" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M231.87,114l-168-96A16,16,0,0,0,40.92,37l19.58,71H136a8,8,0,0,1,0,16H60.5l-19.58,71a16,16,0,0,0,22.95,18l168-96a16,16,0,0,0,0-28Z"/>
          </svg>
        </button>
      </div>
      <p class="pct-powered">Impulsado por IA · <a href="https://proemote.es" target="_blank" rel="noopener">Proemote®</a></p>
    </div>
  `;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  while (wrapper.firstChild) document.body.appendChild(wrapper.firstChild);

  // ── Lógica ────────────────────────────────────────────────────────
  const btn      = document.getElementById('proemote-chat-btn');
  const panel    = document.getElementById('proemote-chat-panel');
  const closeBtn = document.getElementById('proemote-chat-close');
  const input    = document.getElementById('proemote-chat-input');
  const sendBtn  = document.getElementById('proemote-chat-send');
  const messages = document.getElementById('proemote-chat-messages');
  const tooltip  = document.getElementById('proemote-chat-tooltip');
  const chips    = document.getElementById('proemote-chips');

  let isOpen    = false;
  let isLoading = false;
  let history   = [];

  // Tooltip rotativo
  let tooltipIdx = 0;
  function showTooltipMsg(idx) {
    tooltip.classList.remove('pct-visible');
    setTimeout(function () {
      tooltip.textContent = TOOLTIP_MSGS[idx % TOOLTIP_MSGS.length];
      tooltip.classList.add('pct-visible');
    }, 300);
  }
  (function startCycle() {
    setTimeout(function cycle() {
      if (isOpen) { setTimeout(cycle, 6000); return; }
      showTooltipMsg(tooltipIdx);
      tooltipIdx = (tooltipIdx + 1) % TOOLTIP_MSGS.length;
      setTimeout(function () { tooltip.classList.remove('pct-visible'); }, 4000);
      setTimeout(cycle, 9000);
    }, 3000);
  })();

  // Abrir / cerrar
  function openChat() {
    isOpen = true;
    panel.classList.add('pct-open');
    btn.setAttribute('aria-expanded', 'true');
    tooltip.classList.remove('pct-visible');
    setTimeout(function () { input.focus(); }, 350);
  }
  function closeChat() {
    isOpen = false;
    panel.classList.remove('pct-open');
    btn.setAttribute('aria-expanded', 'false');
  }

  btn.addEventListener('click', function () { isOpen ? closeChat() : openChat(); });
  closeBtn.addEventListener('click', closeChat);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && isOpen) closeChat(); });

  // Chips
  chips.addEventListener('click', function (e) {
    var chip = e.target.closest('.pct-chip');
    if (chip && chip.dataset.msg) sendMessage(chip.dataset.msg);
  });

  // Input
  input.addEventListener('input', function () {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 100) + 'px';
    sendBtn.disabled = !input.value.trim() || isLoading;
  });
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!sendBtn.disabled) sendMessage(input.value.trim());
    }
  });
  sendBtn.addEventListener('click', function () {
    if (!sendBtn.disabled) sendMessage(input.value.trim());
  });

  // Añadir mensaje
  function appendMessage(role, content) {
    if (role === 'user' && chips && chips.parentNode) chips.remove();
    var welcome = document.getElementById('proemote-welcome-card');
    if (welcome && role === 'user') welcome.style.opacity = '0.5';

    var wrap   = document.createElement('div');
    wrap.className = 'pct-msg pct-' + role;

    var avatar = document.createElement('div');
    avatar.className = 'pct-msg-avatar';
    avatar.textContent = role === 'bot' ? '🤖' : '👤';

    var bubble = document.createElement('div');
    bubble.className = 'pct-bubble';
    bubble.textContent = content;

    wrap.appendChild(avatar);
    wrap.appendChild(bubble);
    messages.appendChild(wrap);
    messages.scrollTop = messages.scrollHeight;
  }

  function showTyping() {
    var wrap = document.createElement('div');
    wrap.className = 'pct-msg pct-bot';
    wrap.id = 'pct-typing';
    var avatar = document.createElement('div');
    avatar.className = 'pct-msg-avatar';
    avatar.textContent = '🤖';
    var typing = document.createElement('div');
    typing.className = 'pct-typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    wrap.appendChild(avatar);
    wrap.appendChild(typing);
    messages.appendChild(wrap);
    messages.scrollTop = messages.scrollHeight;
  }
  function hideTyping() {
    var el = document.getElementById('pct-typing');
    if (el) el.remove();
  }

  // Enviar
  async function sendMessage(text) {
    if (!text || isLoading) return;
    input.value = '';
    input.style.height = 'auto';
    sendBtn.disabled = true;
    appendMessage('user', text);
    history.push({ role: 'user', content: text });
    if (history.length > MAX_HISTORY) history = history.slice(-MAX_HISTORY);
    isLoading = true;
    showTyping();

    try {
      var res = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: history.slice(0, -1) }),
      });
      hideTyping();
      if (!res.ok) {
        var errData = await res.json().catch(function() { return {}; });
        throw new Error(errData.error || 'HTTP ' + res.status);
      }
      var data  = await res.json();
      var reply = data.response || data.error || 'No he podido responder. Inténtalo de nuevo.';
      appendMessage('bot', reply);
      history.push({ role: 'assistant', content: reply });
      if (history.length > MAX_HISTORY) history = history.slice(-MAX_HISTORY);
    } catch (err) {
      hideTyping();
      appendMessage('bot', 'Ups, hubo un problema al conectar. ¿Lo intentamos de nuevo? Si el problema persiste, escríbenos a contacto@proemote.es');
      console.error('[Leo · Proemote]', err.message);
    } finally {
      isLoading = false;
      sendBtn.disabled = !input.value.trim();
    }
  }

})();
