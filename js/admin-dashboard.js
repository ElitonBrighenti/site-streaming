if (sessionStorage.getItem("tipo") !== "admin") {
  alert("Acesso restrito a administradores.");
  window.location.href = "index.html";
}

// Proteção de acesso
const tipo = sessionStorage.getItem("tipo");
if (tipo !== "admin") {
  alert("Acesso não autorizado!");
  window.location.href = "index.html";
}

// Botão sair
document.getElementById("btn-sair").addEventListener("click", () => {
  sessionStorage.clear();
  window.location.href = "index.html";
});
