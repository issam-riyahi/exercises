

const navToggler = document.querySelector(".nav__toggler");
const navBackground = document.querySelector(".background");

navToggler.addEventListener('click' , () => {
  navBackground.classList.toggle('open');
})