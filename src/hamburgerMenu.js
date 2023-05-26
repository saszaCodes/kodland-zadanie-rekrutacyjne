const button = document.querySelector(".menu__toggle__button");
const menuItems = document.querySelector(".menu__menu-items--closed");

let isOpen = false;

const toggle = () => {
  if (isOpen) {
    menuItems.classList.remove("menu__menu-items--open");
    menuItems.classList.add("menu__menu-items--closed");
  } else {
    menuItems.classList.remove("menu__menu-items--closed");
    menuItems.classList.add("menu__menu-items--open");
  }

  isOpen = !isOpen;
};

button.addEventListener("click", toggle);
