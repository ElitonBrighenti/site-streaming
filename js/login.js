const form = document.getElementById("form-login");
const erro = document.getElementById("mensagem-erro");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  try {
    const user = await dbUsuarios.get(email);

    if (user.senha === senha) {
      // Armazena login em sessão
      sessionStorage.setItem("logado", "true");
      sessionStorage.setItem("usuario", JSON.stringify(user));
      sessionStorage.setItem("tipo", user.tipo);

      // Redireciona conforme o tipo
      if (user.tipo === "admin") {
        window.location.href = "admin-dashboard.html";
      } else {
        window.location.href = "index.html";
      }
    } else {
      erro.textContent = "Senha incorreta.";
    }
  } catch (err) {
    erro.textContent = "Usuário não encontrado.";
  }
});
