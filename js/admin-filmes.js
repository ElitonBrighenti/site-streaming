if (sessionStorage.getItem("tipo") !== "admin") {
  alert("Acesso restrito a administradores.");
  window.location.href = "index.html";
}

// Conectar ao banco PouchDB
const db = new PouchDB("filmes");

// Referências aos elementos
const form = document.getElementById("form-filme");
const lista = document.getElementById("lista-filmes");

// Função para renderizar os filmes
async function carregarFilmes() {
  lista.innerHTML = "";
  const result = await db.allDocs({ include_docs: true, descending: true });

  result.rows.forEach(row => {
    const filme = row.doc;

    const card = document.createElement("div");
    card.className = "col-md-4";

    card.innerHTML = `
      <div class="card bg-secondary text-white h-100">
        <img src="${filme.capa}" class="card-img-top" alt="${filme.titulo}">
        <div class="card-body">
          <h5 class="card-title">${filme.titulo}</h5>
          <p class="small opacity-75">${filme.genero}</p>
          <p class="card-text">${filme.sinopse}</p>
        </div>
        <div class="card-footer text-end border-0 bg-secondary">
          <button class="btn btn-sm btn-outline-light" onclick="removerFilme('${filme._id}', '${filme._rev}')">Excluir</button>
        </div>
      </div>
    `;

    lista.appendChild(card);
  });
}

// Função para salvar novo filme
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const filme = {
    _id: new Date().toISOString(),
    titulo: document.getElementById("titulo").value,
    genero: document.getElementById("genero").value,
    capa: document.getElementById("capa").value,
    trailer: document.getElementById("trailer").value,
    sinopse: document.getElementById("sinopse").value
  };

  await db.put(filme);
  form.reset();
  carregarFilmes();
});

// Função para remover filme
async function removerFilme(id, rev) {
  await db.remove(id, rev);
  carregarFilmes();
}

// Inicializar ao carregar
carregarFilmes();
