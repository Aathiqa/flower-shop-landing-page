const hamMenu = document.querySelector(".ham-menu");

const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
});


const cartIcon = document.querySelector("#cart_icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart_close");

cartIcon.addEventListener("click", () => cart.classList.add("active"));
cartClose.addEventListener("click", () => cart.classList.remove("active"));


const addCartButtons = document.querySelectorAll(".buy-btn");

addCartButtons.forEach(button => {
  button.addEventListener("click", event => {
    const productBox = event.target.closest(".product");
    addToCart(productBox);
  });
});


const cartContent = document.querySelector(".cart-content");
const addToCart = productBox => {
  const productImgSrc = productBox.querySelector("img").src;
	const productTitle = productBox.querySelector(".product-name").textContent;
	const productPrice = productBox.querySelector(".product-price").textContent;

  const cartBox = document.createElement("div");
  cartBox.classList.add("cart-box");
  cartBox.innerHTML = `
		<img src="${productImgSrc}" alt="Cart image">
		<div>
			<h2 class="product-title">${productTitle}</h2>
			<div class="price-block">
				<p class="price">${productPrice}</p>
				<i class="ri-delete-bin-6-line cart-remove"></i>
			</div>
			<div class="product-amount">
				<p class="decrement">-</p>
				<p class="actual-amount">1</p>
				<p class="increment">+</p>
			</div>
		</div>
  `;

	cartContent.appendChild(cartBox);

};