import AuthService from "./auth.service.js";

const authService = new AuthService()

// Teste de login bem-sucedido
const response1 = authService.login('admin', 'admin123')
console.log('Login bem-sucedido:', response1)

// Teste de login com nome de usuário inválido
const response2 = authService.login('invalidUser', 'admin123')
console.log('Login com nome de usuário inválido:', response2)

// Teste de login com senha inválida
const response3 = authService.login('admin', 'wrongPassword')
console.log('Login com senha inválida:', response3)