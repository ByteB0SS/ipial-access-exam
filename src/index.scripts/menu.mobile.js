const menuMobileBtn = document.getElementById('menu-mobile-button')
const menuMobile = document.getElementById('nav-mobile')

function toggleMenuMobile () {
    menuMobile.classList.toggle('active')
}

menuMobileBtn.addEventListener('click', toggleMenuMobile)
menuMobile.addEventListener('click', toggleMenuMobile)
