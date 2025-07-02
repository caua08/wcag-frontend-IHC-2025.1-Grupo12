/* ==========================================================
   WCAG 3.3.7 ▪ Redundant Entry
   ----------------------------------------------------------
   Se o usuário marcar “Utilizar dados do passo anterior”,
   copiamos automaticamente o endereço já informado no
   primeiro formulário para o campo de envio.
   ========================================================== */
document.getElementById('mesmo').addEventListener('change', e => {
  const dest = document.getElementById('endereco-envio');         // campo destino
  dest.value = e.target.checked                                   // se checkbox marcado
    ? document.getElementById('endereco').value                   // → copia endereço original
    : '';                                                         // se desmarcado → limpa
});

/* Intercepta o submit do 1º formulário apenas para fins de demonstração.
  Na prática, aqui você enviaria os dados ao servidor. */
document.getElementById('form-contato').addEventListener('submit', e => {
  e.preventDefault();                                             // evita recarregar a página
  alert(
    'Dados de contato salvos!\n' +
    'Marque a opção no passo 2 para reutilizá-los.'
  );
});

/* ==========================================================
   WCAG 3.3.8 ▪ Accessible Authentication (AA)
   ----------------------------------------------------------
   1) Botão “Mostrar/Ocultar” alterna a visibilidade da senha
      — reduz erro de digitação e esforço de memória.
   2) Botão “link mágico” oferece login sem senha (alternativa
      cognitiva).
   ========================================================== */
/* 1 – alternância de visibilidade da senha */
const btnToggle = document.getElementById('toggle-min');
btnToggle.addEventListener('click', () => {
  const pwd = document.getElementById('pass-min');
  const isHidden = pwd.type === 'password';
  pwd.type = isHidden ? 'text' : 'password';                      // troca o tipo
  btnToggle.textContent = isHidden ? 'Ocultar' : 'Mostrar';       // atualiza rótulo
});

/* 2 – simulação de envio de “link mágico” por e-mail */
document.getElementById('link-min').addEventListener('click', () => {
  alert('Um “link mágico” foi enviado ao seu e-mail (demonstração).');
});

/* ==========================================================
   WCAG 3.3.9 ▪ Accessible Authentication (AAA)
   ----------------------------------------------------------
   Reconhecimento visual de avatar: o usuário escolhe o ícone
   definido no cadastro. Código dividido em 3 etapas:
   (1) capturar escolha, (2) permitir teste prévio, (3) validar
   no submit. (IIFE usado para isolar variáveis.)
   ========================================================== */
(() => {
  const correto   = 'gato';                       // ícone correto definido no cadastro
  const avatars   = document.querySelectorAll('.avatar');
  const previewEl = document.getElementById('preview');
  const testarBtn = document.getElementById('testar-aaa');
  let   tentativa = null;                         // última escolha do usuário

  /* ---------- (1) Seleção do avatar ---------- */
  avatars.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove seleção anterior em todos
      avatars.forEach(b => {
        b.classList.remove('sel');
        b.setAttribute('aria-pressed', 'false');
      });

      // Marca o botão clicado como ativo
      btn.classList.add('sel');
      btn.setAttribute('aria-pressed', 'true');
      tentativa = btn.dataset.id;                 // grava tentativa
      testarBtn.disabled = false;                 // habilita botão “Testar”
      previewEl.textContent = `Ícone selecionado: ${btn.textContent}`;
    });
  });

  /* ---------- (2) Teste prévio da escolha ---------- */
  testarBtn.addEventListener('click', () => {
    if (!tentativa) return;                       // segurança: nenhuma escolha feita
    const ok = tentativa === correto;
    previewEl.textContent = ok
      ? '✅ Seleção correta! Agora clique em “Entrar”.'
      : '❌ Seleção incorreta — tente outro ícone.';
  });

  /* ---------- (3) Validação no submit ---------- */
  document.getElementById('form-login-max').addEventListener('submit', e => {
    e.preventDefault();                           // evita envio real
    if (tentativa === correto) {
      alert('Acesso concedido!');
    } else {
      alert('Ícone incorreto, tente novamente.');
    }
  });
})();
