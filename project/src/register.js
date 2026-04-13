import { supabase } from './supabase.js'

export function setupRegister() {
  const form = document.getElementById('register-form')
  const nameInput = document.getElementById('name')
  const emailInput = document.getElementById('email-register')
  const passwordInput = document.getElementById('password-register')
  const confirmPasswordInput = document.getElementById('confirm-password')
  const togglePassword = document.getElementById('toggle-password-register')
  const toggleConfirmPassword = document.getElementById('toggle-confirm-password')
  const registerBtn = document.getElementById('register-btn')
  const errorMsg = document.getElementById('error-msg-register')
  const backLink = document.getElementById('back-to-login')

  togglePassword.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password'
    passwordInput.type = isPassword ? 'text' : 'password'
    togglePassword.innerHTML = isPassword ? getEyeOffIcon() : getEyeIcon()
  })

  toggleConfirmPassword.addEventListener('click', () => {
    const isPassword = confirmPasswordInput.type === 'password'
    confirmPasswordInput.type = isPassword ? 'text' : 'password'
    toggleConfirmPassword.innerHTML = isPassword ? getEyeOffIcon() : getEyeIcon()
  })

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    errorMsg.textContent = ''
    errorMsg.style.color = '#dc2626'

    const name = nameInput.value.trim()
    const email = emailInput.value.trim()
    const password = passwordInput.value
    const confirmPassword = confirmPasswordInput.value

    if (!name) {
      errorMsg.textContent = 'Ingrese su nombre completo.'
      return
    }

    if (!email) {
      errorMsg.textContent = 'Ingrese su correo electrónico.'
      return
    }

    if (!password) {
      errorMsg.textContent = 'Ingrese una contraseña.'
      return
    }

    if (password !== confirmPassword) {
      errorMsg.textContent = 'Las contraseñas no coinciden.'
      return
    }

    if (password.length < 6) {
      errorMsg.textContent = 'La contraseña debe tener al menos 6 caracteres.'
      return
    }

    registerBtn.disabled = true
    registerBtn.textContent = 'REGISTRANDO...'

    const { error } = await supabase.auth.signUp({ email, password })

    if (error) {
      errorMsg.textContent = error.message || 'Error al registrarse. Intente nuevamente.'
      registerBtn.disabled = false
      registerBtn.textContent = 'REGISTRARSE'
      return
    }

    errorMsg.style.color = '#2563eb'
    errorMsg.textContent = 'Cuenta creada exitosamente. Redirigiendo al inicio de sesión...'

    setTimeout(() => {
      showLoginPage()
    }, 2000)
  })

  backLink.addEventListener('click', (e) => {
    e.preventDefault()
    showLoginPage()
  })
}

function getEyeIcon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a7fe8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`
}

function getEyeOffIcon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a7fe8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`
}

export function showLoginPage() {
  document.getElementById('register-page').style.display = 'none'
  document.getElementById('login-page').style.display = 'block'
}

export function showRegisterPage() {
  document.getElementById('login-page').style.display = 'none'
  document.getElementById('register-page').style.display = 'block'
}
