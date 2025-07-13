// Inicializa o banco de usuários
const dbUsuarios = new PouchDB('usuarios');

// Usuários de teste (apenas na primeira execução)
async function criarUsuariosTeste() {
  const existeAdmin = await dbUsuarios.get('admin@admin.com').catch(() => null);
  const existeUser = await dbUsuarios.get('user@user.com').catch(() => null);

  if (!existeAdmin) {
    await dbUsuarios.put({
      _id: 'admin@admin.com',
      nome: 'Administrador',
      email: 'admin@admin.com',
      senha: '123456',
      tipo: 'admin'
    });
  }

  if (!existeUser) {
    await dbUsuarios.put({
      _id: 'user@user.com',
      nome: 'Usuário',
      email: 'user@user.com',
      senha: '123456',
      tipo: 'comum'
    });
  }
}
criarUsuariosTeste();
