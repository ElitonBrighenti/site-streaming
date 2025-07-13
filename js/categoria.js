if (sessionStorage.getItem("logado") !== "true") {
  alert("Você precisa estar logado para acessar a plataforma.");
  window.location.href = "login.html";
}

const db = new PouchDB("filmes");
const params = new URLSearchParams(window.location.search);
const categoria = params.get("nome");

const titulo = document.getElementById("titulo-categoria");
const lista = document.getElementById("lista-filmes");

if (!categoria) {
  titulo.textContent = "Categoria não encontrada.";
} else {
  titulo.textContent = `Filmes de ${categoria}`;

  db.allDocs({ include_docs: true }).then(res => {
    const filmes = res.rows.map(r => r.doc);
function normalizar(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

const filtrados = filmes.filter(f =>
  normalizar(f.genero || "") === normalizar(categoria)
);

    if (filtrados.length === 0) {
      lista.innerHTML = `<p class="text-muted">Nenhum filme encontrado nesta categoria.</p>`;
    } else {
      filtrados.forEach(filme => {
        const card = document.createElement("div");
        card.className = "card bg-secondary text-white";
        card.style.width = "200px";
        card.style.cursor = "pointer";
        card.innerHTML = `
          <img src="${filme.capa}" class="card-img-top" style="height:280px; object-fit:cover;">
          <div class="card-body text-center">
            <h6 class="card-title mb-0">${filme.titulo}</h6>
          </div>
        `;
        card.addEventListener("click", () => {
          window.location.href = `filme.html?id=${filme._id}`;
        });
        lista.appendChild(card);
      });
    }
  });
}
