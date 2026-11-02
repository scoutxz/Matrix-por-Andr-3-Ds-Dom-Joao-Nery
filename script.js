// MATRIX: chuva de caracteres no fundo
const canvas = document.getElementById('rain');
const ctx = canvas.getContext('2d');
const chars = 'アァカサタナハマヤラワ012345789ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%';
const fontSize = 16;
let drops = [];
let rainEnabled = true;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drops = Array(Math.ceil(canvas.width / fontSize)).fill(1);
}
function drawRain() {
  if (!rainEnabled) return;
  ctx.fillStyle = 'rgba(2, 5, 3, 0.075)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#00ff66';
  ctx.font = fontSize + 'px monospace';
  drops.forEach((y, i) => {
    const char = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(char, i * fontSize, y * fontSize);
    if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  });
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
const rainTimer = setInterval(drawRain, 38);

document.getElementById('rainToggle').addEventListener('click', function () {
  rainEnabled = !rainEnabled;
  this.querySelector('span').textContent = rainEnabled ? 'ON' : 'OFF';
  if (rainEnabled) ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Arquivos secretos
const records = {
  neo: ['NEO // THOMAS ANDERSON', 'Programador durante o dia e hacker durante a noite. Neo começa a desconfiar da realidade em que vive. Sua jornada o leva a descobrir que o mundo é uma simulação criada por máquinas.'],
  morpheus: ['MORPHEUS // CAPITÃO', 'Líder da resistência humana. Morpheus acredita que Neo é o Escolhido e arrisca tudo para libertá-lo da simulação.'],
  trinity: ['TRINITY // OPERADORA', 'Uma das principais integrantes da resistência. Especialista em combate e infiltração, Trinity ajuda Neo a compreender seu papel na luta pela liberdade.'],
  agents: ['AGENTES // PROTOCOLO DE SEGURANÇA', 'Programas da Matrix que assumem aparência humana. Sua função é impedir que pessoas descubram a verdade e ameacem o funcionamento da simulação.']
};
const modal = document.getElementById('fileModal');
document.querySelectorAll('.file-card').forEach(card => {
  card.addEventListener('click', () => {
    const record = records[card.dataset.file];
    document.getElementById('modalTitle').textContent = record[0];
    document.getElementById('modalText').textContent = record[1];
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
  });
});
function closeModal() {
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
}
document.getElementById('closeModal').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// Escolha das pílulas
const choiceMessage = document.getElementById('choiceMessage');
document.getElementById('bluePill').addEventListener('click', () => {
  choiceMessage.textContent = 'PÍLULA AZUL: A SIMULAÇÃO CONTINUA. VOCÊ ESCOLHEU NÃO SABER.';
  choiceMessage.style.color = '#78aaff';
  document.body.style.setProperty('--green', '#70aaff');
});
document.getElementById('redPill').addEventListener('click', () => {
  choiceMessage.textContent = 'PÍLULA VERMELHA: SEUS OLHOS FORAM ABERTOS. BEM-VINDO AO MUNDO REAL.';
  choiceMessage.style.color = '#ff626a';
  document.body.style.setProperty('--green', '#ff454f');
});

// Terminal interativo
const terminal = document.getElementById('terminalText');
const input = document.getElementById('commandInput');
function runCommand() {
  const command = input.value.trim().toLowerCase();
  if (!command) return;
  const line = document.createElement('p');
  line.innerHTML = '<span style="color:#00ff66">&gt; </span>' + command.replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  terminal.insertBefore(line, terminal.querySelector('.terminal-input-line'));
  const response = document.createElement('p');
  const answers = {
    help: 'COMANDOS: help | status | whoami | matrix | clear',
    status: 'SISTEMA: ONLINE // FIREWALL: ATIVO // SIMULAÇÃO: ESTÁVEL',
    whoami: 'IDENTIDADE: HUMANO // LOCALIZAÇÃO: DESCONHECIDA // STATUS: OBSERVADO',
    matrix: 'A Matrix está em toda parte. Ela está ao nosso redor...',
    clear: ''
  };
  response.textContent = answers[command] ?? 'COMANDO NÃO RECONHECIDO. DIGITE "help" PARA VER AS OPÇÕES.';
  if (command === 'clear') {
    [...terminal.querySelectorAll('p')].forEach(p => p.remove());
  } else {
    terminal.insertBefore(response, terminal.querySelector('.terminal-input-line'));
  }
  input.value = '';
  terminal.scrollTop = terminal.scrollHeight;
}
document.getElementById('sendCommand').addEventListener('click', runCommand);
input.addEventListener('keydown', e => { if (e.key === 'Enter') runCommand(); });
