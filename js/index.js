// // Proteger o acesso à página inicial
// if (sessionStorage.getItem("logado") !== "true") {
//   alert("Você precisa estar logado para acessar a plataforma.");
//   window.location.href = "login.html";
// }

// // Exibir nome do usuário logado e ativar menu suspenso
// const user = JSON.parse(sessionStorage.getItem("usuario"));
// const menuLogin = document.getElementById("link-login");
// const menuUsuario = document.getElementById("usuario-menu");
// const nomeUsuario = document.getElementById("nome-usuario");

// if (user && menuLogin && menuUsuario && nomeUsuario) {
//   menuLogin.style.display = "none";
//   menuUsuario.style.display = "block";
//   nomeUsuario.textContent = user._id;
// }

// // Botão Sair
// const btnSair = document.getElementById("btn-sair");
// if (btnSair) {
//   btnSair.addEventListener("click", () => {
//     sessionStorage.clear();
//     window.location.href = "login.html";
//   });
// }

// // Carrossel: botões esquerda e direita
// const btnEsq = document.getElementById("btn-esq");
// const btnDir = document.getElementById("btn-dir");
// const carrossel = document.getElementById("destaques");

// if (btnEsq && btnDir && carrossel) {
//   btnEsq.addEventListener("click", () => {
//     carrossel.scrollBy({ left: -carrossel.offsetWidth * 0.8, behavior: "smooth" });
//   });

//   btnDir.addEventListener("click", () => {
//     carrossel.scrollBy({ left: carrossel.offsetWidth * 0.8, behavior: "smooth" });
//   });
// }

// // Menu lateral: abre no hover do ícone, fecha ao sair
// const menuIcon = document.getElementById("menu-icon");
// const menuLateral = document.getElementById("menu-lateral");

// menuIcon.addEventListener("mouseenter", () => {
//   menuLateral.classList.remove("d-none");
// });

// menuLateral.addEventListener("mouseleave", () => {
//   menuLateral.classList.add("d-none");
// });

//---------
// Proteger o acesso à página inicial
if (sessionStorage.getItem("logado") !== "true") {
  alert("Você precisa estar logado para acessar a plataforma.");
  window.location.href = "login.html";
}

// Exibir nome do usuário logado e ativar menu suspenso
const user = JSON.parse(sessionStorage.getItem("usuario"));
const menuLogin = document.getElementById("link-login");
const menuUsuario = document.getElementById("usuario-menu");
const nomeUsuario = document.getElementById("nome-usuario");

if (user && menuLogin && menuUsuario && nomeUsuario) {
  menuLogin.style.display = "none";
  menuUsuario.style.display = "block";
  nomeUsuario.textContent = user._id;
}

// Botão Sair
const btnSair = document.getElementById("btn-sair");
if (btnSair) {
  btnSair.addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "login.html";
  });
}

// Carrossel: botões esquerda e direita
const btnEsq = document.getElementById("btn-esq");
const btnDir = document.getElementById("btn-dir");
const carrossel = document.getElementById("destaques");

if (btnEsq && btnDir && carrossel) {
  btnEsq.addEventListener("click", () => {
    carrossel.scrollBy({ left: -carrossel.offsetWidth * 0.8, behavior: "smooth" });
  });

  btnDir.addEventListener("click", () => {
    carrossel.scrollBy({ left: carrossel.offsetWidth * 0.8, behavior: "smooth" });
  });
}

// Menu lateral: abre no hover do ícone, fecha ao sair
const menuIcon = document.getElementById("menu-icon");
const menuLateral = document.getElementById("menu-lateral");

menuIcon.addEventListener("mouseenter", () => {
  menuLateral.classList.remove("d-none");
});
menuLateral.addEventListener("mouseleave", () => {
  menuLateral.classList.add("d-none");
});

// Banco de dados e renderização dinâmica
const db = new PouchDB("filmes");

async function carregarFilmesDoBanco() {
  const destaques = document.getElementById("destaques");
  const categorias = ["Ação", "Comédia", "Drama", "Terror", "Ficção", "Animação", "Documentário"];

  const resultado = await db.allDocs({ include_docs: true });
  const filmes = resultado.rows.map(r => r.doc);

  // Destaques (5 primeiros)
  filmes.slice(0, 5).forEach(filme => {
    const card = document.createElement("div");
    card.className = "card bg-secondary text-white";
    card.style.minWidth = "300px";
    card.style.maxWidth = "300px";
    card.style.height = "460px";
    card.style.cursor = "pointer";
    card.innerHTML = `
      <img src="${filme.capa}" class="card-img-top" style="height:400px; object-fit:cover;">
      <div class="card-body p-2 d-flex align-items-center justify-content-center">
        <h6 class="card-title text-center mb-0">${filme.titulo}</h6>
      </div>
    `;
    card.addEventListener("click", () => {
      window.location.href = `filme.html?id=${filme._id}`;
    });
    destaques.appendChild(card);
  });

  // Seções por categoria
  categorias.forEach(categoria => {
    const idSecao = `secao-${categoria.toLowerCase()}`;
    const container = document.getElementById(idSecao);
    if (!container) return;

    filmes.filter(f => f.genero === categoria).forEach(filme => {
      const card = document.createElement("div");
      card.className = "card bg-secondary text-white";
      card.style.minWidth = "160px";
      card.style.maxWidth = "160px";
      card.style.height = "260px";
      card.style.cursor = "pointer";
      card.innerHTML = `
        <img src="${filme.capa}" class="card-img-top" style="height:200px; object-fit:cover;">
        <div class="card-body p-2"><p class="small mb-0 text-center">${filme.titulo}</p></div>
      `;
      card.addEventListener("click", () => {
        window.location.href = `filme.html?id=${filme._id}`;
      });
      container.appendChild(card);
    });
  });
}

carregarFilmesDoBanco();
