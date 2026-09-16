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


	const cartItems = cartContent.querySelectorAll(".product-title");
	for (let item of cartItems) {
		if (item.textContent === productTitle){
			alert("This item is already in the cart.");
			return;
		}
	}


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
			<div class="product-quantity">
				<button id="decrement">-</button>
				<button class="actual-amount">1</button>
				<button id="increment">+</button>
			</div>
		</div>
  `;

	cartContent.appendChild(cartBox);

	// // ensure the decrement button looks disabled when quantity is 1
	// const decrementButtonInit = cartBox.querySelector("#decrement");
	// if (decrementButtonInit) decrementButtonInit.style.color = "#999";

	cartBox.querySelector(".cart-remove").addEventListener("click", () => {

		cartBox.remove();

		updateCartCount(-1);

		updateCartTotal();
			
	});


	cartBox.querySelector(".product-quantity").addEventListener("click", event => {
		const number = cartBox.querySelector(".actual-amount");
		const decrementButton = cartBox.querySelector("#decrement");
		let quantity = number.textContent;

		if (event.target.id === "decrement" && quantity > 1){
			quantity--;
			if (quantity === 1){
				decrementButton.style.color = "#999";
			}
		} else if (event.target.id === "increment"){
			quantity++;
			decrementButton.style.color = "#333";
		}

		number.textContent = quantity;

		updateCartTotal();
		
	});

	updateCartCount(1);

	updateCartTotal();

};

const updateCartTotal = () => {
	const totalPrice = document.querySelector(".total-price");
	const cartBoxes = cartContent.querySelectorAll(".cart-box");
	let total = 0;

	cartBoxes.forEach(cartBox => {
		const quantityElement = cartBox.querySelector(".actual-amount");
		const priceElement = cartBox.querySelector(".price");
		const price = priceElement.textContent.replace("$", "");
		const quantity = quantityElement.textContent;
		total += price * quantity;
	});
	totalPrice.textContent = `$${total}`;
};

let cartItemCount = 0;
const updateCartCount = change => {
	const cartItemCountBadge = document.querySelector(".cart-item-count");
	cartItemCount += change;
	if (cartItemCount > 0) {
		cartItemCountBadge.style.visibility = "visible";
		cartItemCountBadge.textContent = cartItemCount;
	} else {
		cartItemCountBadge.style.visibility = "hidden";
		cartItemCountBadge.textContent = "";
	}
};