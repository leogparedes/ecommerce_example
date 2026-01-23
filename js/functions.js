// ====== SELECTORES PRINCIPALES (botones semánticos) ======
const cartToggle = document.querySelector(".cartToggle");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector(".closeCart");

const menuToggle = document.querySelector(".menuToggle");
const menu = document.querySelector(".menu");
const closeMenu = document.querySelector(".closeMenu");

// ====== ABRIR / CERRAR CARRITO (aria) ======
function openCart() {
  cart.classList.add("show");
  cart.setAttribute("aria-hidden", "false");
  cartToggle?.setAttribute("aria-expanded", "true");
}

function closeCartPanel() {
  cart.classList.remove("show");
  cart.setAttribute("aria-hidden", "true");
  cartToggle?.setAttribute("aria-expanded", "false");
}

cartToggle?.addEventListener("click", openCart);
closeCart?.addEventListener("click", closeCartPanel);

// ====== ABRIR / CERRAR MENÚ (aria) ======
function openMenu() {
  menu.classList.add("showMenu");
  menu.setAttribute("aria-hidden", "false");
  menuToggle?.setAttribute("aria-expanded", "true");
}

function closeMenuPanel() {
  menu.classList.remove("showMenu");
  menu.setAttribute("aria-hidden", "true");
  menuToggle?.setAttribute("aria-expanded", "false");
}

menuToggle?.addEventListener("click", openMenu);
closeMenu?.addEventListener("click", closeMenuPanel);

// ====== CARRITO: AGREGAR ITEMS + BORRAR + BADGE ======
const cartItems = document.getElementById("cart-items");
const buyButtons = document.querySelectorAll(".buyButton");

// Badge
const cartLogo = document.querySelector(".cartLogo");
let cartCount = 0;

const cartBadge = document.createElement("span");
cartBadge.classList.add("badge");
cartBadge.textContent = cartCount;
cartLogo?.parentElement?.appendChild(cartBadge);

function updateCartBadge() {
  cartBadge.textContent = cartCount;
}

// Crear item de carrito
function createCartItem(productImage, productName, productPrice) {
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  cartItem.innerHTML = `
    <img src="${productImage}" alt="${productName}">
    <p>${productName}</p>
    <p>${productPrice}</p>
    <button type="button" class="icon-button delete-icon" aria-label="Eliminar ${productName} del carrito">
      <img src="img/remover.png" alt="" aria-hidden="true">
    </button>
  `;

  const deleteBtn = cartItem.querySelector(".delete-icon");
  deleteBtn.addEventListener("click", () => {
    cartItem.remove();
    if (cartCount > 0) {
      cartCount--;
      updateCartBadge();
    }
  });

  return cartItem;
}

// Comprar
buyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const productArticle = button.closest("article");
    if (!productArticle) return;

    const productImage = productArticle.querySelector("img")?.getAttribute("src");
    const productName = productArticle.querySelector("h2")?.innerText || "Producto";
    const productPrice = productArticle.querySelector(".price")?.innerText || productArticle.querySelector("p")?.innerText || "";

    if (!productImage || !cartItems) return;

    cartItems.appendChild(createCartItem(productImage, productName, productPrice));

    cartCount++;
    updateCartBadge();
  });
});
