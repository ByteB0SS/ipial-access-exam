import AuthController from "../../../../simulated-backend/controller/auth/auth.controller.js";

const authController = new AuthController()
const SendBtn = document.getElementById('send-button')
const messager = document.getElementById('form-message')
const adminDashLink = document.getElementById('dashboard-admin-link')

function timer (time) {
    setTimeout(()=> {}, time)
}

function handleLogin(event) {
    // alert('handleLogin called')
    event.preventDefault()

    const adminName = document.getElementById('adminName').value
    const password = document.getElementById('pw').value

    const response = authController.login(adminName, password)
    messager.classList.add('success')
    
    if(response.success) {
        localStorage.setItem('admin', JSON.stringify(response.user))
        messager.classList.add('success')
        messager.textContent = response.message
        
        setTimeout(() => {
            adminDashLink.click()
        }, 2000);
        
    }
    else {
        messager.classList.remove('success')
        messager.textContent = response.message
    }

}

SendBtn.addEventListener('click', handleLogin)