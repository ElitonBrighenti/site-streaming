// Verificar se usuário logado é admin
if (sessionStorage.getItem("tipo") !== "admin") {
  alert("Acesso restrito a administradores.");
  window.location.href = "index.html";
}

const dbUsuarios = new PouchDB("usuarios");

const form = document.getElementById("form-usuario");
const tbody = document.getElementById("usuarios-body");

// Cadastrar novo usuário
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();
  const tipo = document.getElementById("tipo").value;

  try {
    const existente = await dbUsuarios.get(email);
    alert("Usuário já cadastrado.");
  } catch {
    await dbUsuarios.put({ _id: email, senha, tipo });
    form.reset();
    carregarUsuarios();
  }
});

// Listar usuários
async function carregarUsuarios() {
  const result = await dbUsuarios.allDocs({ include_docs: true });
  tbody.innerHTML = "";

  result.rows.forEach(row => {
    const user = row.doc;
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${user._id}</td>
      <td>${user.tipo}</td>
      <td>
        <button class="btn btn-sm btn-outline-light" onclick="excluirUsuario('${user._id}', '${user._rev}')">Excluir</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Excluir usuário
async function excluirUsuario(id, rev) {
  await dbUsuarios.remove(id, rev);
  carregarUsuarios();
}

// Inicial
carregarUsuarios();
