import { supabase } from './supabase.js'
import { showRegisterPage } from './register.js'

export function setupLogin() {
  const form = document.getElementById('login-form')
  const emailInput = document.getElementById('email')
  const passwordInput = document.getElementById('password')
  const togglePassword = document.getElementById('toggle-password')
  const rememberMe = document.getElementById('remember-me')
  const loginBtn = document.getElementById('login-btn')
  const errorMsg = document.getElementById('error-msg')

  togglePassword.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password'
    passwordInput.type = isPassword ? 'text' : 'password'
    togglePassword.innerHTML = isPassword ? getEyeOffIcon() : getEyeIcon()
  })

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    errorMsg.textContent = ''
    loginBtn.disabled = true
    loginBtn.textContent = 'INGRESANDO...'

    const email = emailInput.value.trim()
    const password = passwordInput.value

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      errorMsg.textContent = 'Correo o contraseña incorrectos. Intente nuevamente.'
      loginBtn.disabled = false
      loginBtn.textContent = 'INICIAR SESIÓN'
      return
    }

    if (rememberMe.checked) {
      localStorage.setItem('remember_session', 'true')
    }

    loginBtn.textContent = 'BIENVENIDO!'
  })

  document.getElementById('forgot-password').addEventListener('click', async (e) => {
    e.preventDefault()
    const email = emailInput.value.trim()
    if (!email) {
      errorMsg.textContent = 'Ingrese su correo electrónico para recuperar la contraseña.'
      return
    }
    await supabase.auth.resetPasswordForEmail(email)
    errorMsg.style.color = '#2563eb'
    errorMsg.textContent = 'Se envió un enlace de recuperación a su correo.'
  })

  document.getElementById('register-link').addEventListener('click', (e) => {
    e.preventDefault()
    showRegisterPage()
  })
}

function getEyeIcon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a7fe8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`
}

function getEyeOffIcon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a7fe8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`
}
