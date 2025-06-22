/* 3.3.7 – copiar endereço ----------------------------------------- */
document.getElementById('mesmo').addEventListener('change', e => {
  const dest = document.getElementById('endereco-envio');
  dest.value = e.target.checked ? document.getElementById('endereco').value : '';
});

document.getElementById('form-contato').addEventListener('submit', e => {
  e.preventDefault();
  alert('Dados de contato salvos! Marque a opção no passo 2 para reutilizá-los.');
});

/* 3.3.8 – mostrar/ocultar senha + link mágico ---------------------- */
const btnToggle = document.getElementById('toggle-min');
btnToggle.addEventListener('click', () => {
  const pwd = document.getElementById('pass-min');
  const vis = pwd.type === 'password' ? 'text' : 'password';
  pwd.type = vis;
  btnToggle.textContent = vis === 'password' ? 'Mostrar' : 'Ocultar';
});

document.getElementById('link-min').addEventListener('click', () => {
  alert('Um “link mágico” foi enviado ao seu e-mail (demonstração).');
});

/* 3.3.9 – reconhecimento visual ------------------------------------ */
(() => {
  const correto     = 'gato';            /* ícone cadastrado originalmente */
  const avatars     = document.querySelectorAll('.avatar');
  const previewEl   = document.getElementById('preview');
  const testarBtn   = document.getElementById('testar-aaa');
  let   tentativa   = null;              /* guarda a escolha do usuário */

  /* 1 – Escolher ícone ------------------------------------------------ */
  avatars.forEach(btn => {
    btn.addEventListener('click', () => {
      avatars.forEach(b => { b.classList.remove('sel'); b.setAttribute('aria-pressed', 'false'); });
      btn.classList.add('sel');
      btn.setAttribute('aria-pressed', 'true');
      tentativa = btn.dataset.id;
      testarBtn.disabled = false;
      previewEl.textContent = `Ícone selecionado: ${btn.textContent}`;
    });
  });

  /* 2 – Testar seleção (pré-verificação) ----------------------------- */
  testarBtn.addEventListener('click', () => {
    if (!tentativa) return;
    const ok = tentativa === correto;
    previewEl.textContent = ok
      ? '✅ Seleção correta! Agora clique em “Entrar”.'
      : '❌ Seleção incorreta — tente outro ícone.';
  });

  /* 3 – Submit final -------------------------------------------------- */
  document.getElementById('form-login-max').addEventListener('submit', e => {
    e.preventDefault();
    if (tentativa === correto) {
      alert('Acesso concedido!');
    } else {
      alert('Objeto incorreto, tente novamente.');
    }
  });
})();
