const db = new PouchDB("filmes");
const id = new URLSearchParams(window.location.search).get("id");
const container = document.getElementById("detalhes-filme");

// Converte URLs do YouTube para embed
function transformarEmEmbed(url) {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname.includes("youtube.com") && urlObj.searchParams.get("v")) {
      return `https://www.youtube.com/embed/${urlObj.searchParams.get("v")}`;
    }
    if (urlObj.hostname === "youtu.be") {
      return `https://www.youtube.com/embed/${urlObj.pathname.slice(1)}`;
    }
  } catch (err) {
    return null;
  }
  return null;
}

if (!id) {
  container.innerHTML = "<p class='text-danger'>ID do filme não fornecido.</p>";
} else {
  db.get(id).then(filme => {
    const titulo = filme.titulo || "Sem título";
    const genero = filme.genero || "Não informado";
    const descricao = filme.sinopse || "Descrição não disponível.";
    const capa = filme.capa || "";
    const trailer = filme.trailer ? transformarEmEmbed(filme.trailer) : null;

    container.innerHTML = `
      <div class="row g-4 mb-4">
        <div class="col-md-4 text-center">
          <img src="${capa}" class="img-fluid rounded shadow" alt="${titulo}">
        </div>
        <div class="col-md-8">
          <h2 class="text-danger mb-3">${titulo}</h2>
          <p><strong>Gênero:</strong> ${genero}</p>
          <p><strong>Descrição:</strong><br>${descricao}</p>
        </div>
      </div>
      ${trailer ? `
        <div class="ratio ratio-16x9 mb-5">
          <iframe src="${trailer}" frameborder="0" allowfullscreen class="rounded"></iframe>
        </div>
      ` : `
        <p class="text-muted"><em>Trailer não disponível ou link inválido.</em></p>
      `}
    `;
  }).catch(err => {
    container.innerHTML = "<p class='text-danger'>Filme não encontrado.</p>";
  });
}
