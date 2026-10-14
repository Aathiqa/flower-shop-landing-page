// THE JAVASCRIPT IN THIS PAGE IS AI-GENERATED

const STORAGE_KEY = "flowerShopCart";
const WHATSAPP_NUMBER = "947757679664";

const hamMenu = document.querySelector(".ham-menu");
const offScreenMenu = document.querySelector(".off-screen-menu");

if (hamMenu && offScreenMenu) {
  hamMenu.addEventListener("click", () => {
    hamMenu.classList.toggle("active");
    offScreenMenu.classList.toggle("active");
  });
}

const cartIcon = document.querySelector("#cart_icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart_close");

// if (cartIcon && cart) {
//   cartIcon.addEventListener("click", () => {
//     if (hamMenu && hamMenu.classList.contains("active")) {
//       hamMenu.classList.remove("active");
//     }

//     if (offScreenMenu && offScreenMenu.classList.contains("active")) {
//       offScreenMenu.classList.remove("active");
//     }

//     cart.classList.add("active");
//   });
// }

if (cartIcon && cart) {
  cartIcon.addEventListener("click", () => cart.classList.add("active"));
}

if (cartClose && cart) {
  cartClose.addEventListener("click", () => cart.classList.remove("active"));
}

const addCartButtons = document.querySelectorAll(".buy-btn");
const cartContent = document.querySelector(".cart-content");

// reads the cart
const getStoredCart = () => {
  try {
		// getItem reads
		// what is 'STORAGE_KEY' here?
    const savedCart = localStorage.getItem(STORAGE_KEY);
		// JSON.parse converts a JSON string into a JavaScript
		// localStorage only stores strings not js
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.warn("Unable to read cart from localStorage:", error);
    return [];
  }
};

const saveCartToStorage = () => {
  if (!cartContent) return;

  const items = [...cartContent.querySelectorAll(".cart-box")].map(cartBox => ({
    title: cartBox.querySelector(".product-title").textContent,
    price: cartBox.querySelector(".price").textContent,
    image: cartBox.querySelector("img").src,
		// 'Number' is built-in JavaScript constructor function that converts a value to a numeric type
    quantity: Number(cartBox.querySelector(".actual-amount").textContent),
  }));

	// error handling typically done when localStorage is used
	//--> what are the other kinds of error handling methods?
  try {
		// 'setItem' used for writing
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.warn("Unable to save cart to localStorage:", error);
  }
};

// calculates the total number of products in the cart by reading the quantity from every '.cart-box'
// reads the quantity from the current cart item and adds it to the total (?)
const syncCartCount = () => {
  const cartItemCountBadge = document.querySelector(".cart-item-count");
	// ternary (also an error handling technique)
	// '||' for 'or'
  if (!cartItemCountBadge || !cartContent) return;

  let totalItems = 0;
  cartContent.querySelectorAll(".cart-box").forEach(cartBox => {
		// if the text content is empty or otherwise falsy, it uses 0 instead
    totalItems += Number(cartBox.querySelector(".actual-amount").textContent || 0);
  });

  cartItemCount = totalItems;

  if (cartItemCount > 0) {
    cartItemCountBadge.style.visibility = "visible";
    cartItemCountBadge.textContent = cartItemCount;
  } else {
    cartItemCountBadge.style.visibility = "hidden";
    cartItemCountBadge.textContent = "";
  }
};

const updateCartTotal = () => {
  if (!cartContent) return;

  const totalPrice = document.querySelector(".total-price");
  if (!totalPrice) return;

  const cartBoxes = cartContent.querySelectorAll(".cart-box");
  let total = 0;

  cartBoxes.forEach(cartBox => {
    const quantityElement = cartBox.querySelector(".actual-amount");
    const priceElement = cartBox.querySelector(".price");
    const price = Number(priceElement.textContent.replace("$", ""));
    const quantity = Number(quantityElement.textContent);
    total += price * quantity;
  });

  totalPrice.textContent = `$${total.toFixed(2)}`;
};

const renderSavedCart = () => {
  if (!cartContent) return;

  const savedCart = getStoredCart();

  savedCart.forEach(item => {
    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");
    cartBox.innerHTML = `
      <img src="${item.image}" alt="Cart image">
      <div class="cart-box-details">
        <h2 class="product-title">${item.title}</h2>
        <div class="price-block">
          <p class="price">${item.price}</p>
          <i class="ri-delete-bin-6-line cart-remove"></i>
        </div>
        <div class="product-quantity">
          <button id="decrement">-</button>
          <button class="actual-amount">${item.quantity}</button>
          <button id="increment">+</button>
        </div>
      </div>
    `;

    const decrementButton = cartBox.querySelector("#decrement");
    if (Number(item.quantity) === 1 && decrementButton) {
      decrementButton.style.color = "#999";
    }

    cartBox.querySelector(".cart-remove").addEventListener("click", () => {
      cartBox.remove();
      updateCartTotal();
      syncCartCount();
      saveCartToStorage();
    });

    cartBox.querySelector(".product-quantity").addEventListener("click", event => {
      const number = cartBox.querySelector(".actual-amount");
      const decrementButton = cartBox.querySelector("#decrement");
      let quantity = Number(number.textContent);

      if (event.target.id === "decrement" && quantity > 1) {
        quantity--;
        if (quantity === 1 && decrementButton) {
          decrementButton.style.color = "#999";
        }
      } else if (event.target.id === "increment") {
        quantity++;
        if (decrementButton) {
          decrementButton.style.color = "#333";
        }
      }

      number.textContent = quantity;
      updateCartTotal();
      syncCartCount();
      saveCartToStorage();
    });

    cartContent.appendChild(cartBox);
  });

  updateCartTotal();
  syncCartCount();
};

const addToCart = productBox => {
  if (!productBox || !cartContent) return;

  const productImgSrc = productBox.querySelector("img").src;
  const productTitle = productBox.querySelector(".product-name").textContent;
  const productPrice = productBox.querySelector(".product-price").textContent;

  const cartItems = cartContent.querySelectorAll(".product-title");
  for (let item of cartItems) {
    if (item.textContent === productTitle) {
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

  const decrementButton = cartBox.querySelector("#decrement");
  if (decrementButton) {
    decrementButton.style.color = "#999";
  }

  cartBox.querySelector(".cart-remove").addEventListener("click", () => {
    cartBox.remove();
    updateCartTotal();
    syncCartCount();
    saveCartToStorage();
  });

  cartBox.querySelector(".product-quantity").addEventListener("click", event => {
    const number = cartBox.querySelector(".actual-amount");
    const decrementButton = cartBox.querySelector("#decrement");
    let quantity = Number(number.textContent);

    if (event.target.id === "decrement" && quantity > 1) {
      quantity--;
      if (quantity === 1 && decrementButton) {
        decrementButton.style.color = "#999";
      }
    } else if (event.target.id === "increment") {
      quantity++;
      if (decrementButton) {
        decrementButton.style.color = "#333";
      }
    }

    number.textContent = quantity;
    updateCartTotal();
    syncCartCount();
    saveCartToStorage();
  });

  updateCartTotal();
  syncCartCount();
  saveCartToStorage();
};

if (addCartButtons.length) {
  addCartButtons.forEach(button => {
    button.addEventListener("click", event => {
      const productBox = event.target.closest(".product");
      addToCart(productBox);
    });
  });
}

let cartItemCount = 0;

const buildWhatsAppOrderMessage = () => {
  const cartBoxes = cartContent.querySelectorAll(".cart-box");
  let total = 0;
  const messageLines = ["Hello! I would like to order the following flowers:"];

  cartBoxes.forEach((cartBox, index) => {
    const title = cartBox.querySelector(".product-title").textContent.trim();
    const price = Number(cartBox.querySelector(".price").textContent.replace("$", ""));
    const quantity = Number(cartBox.querySelector(".actual-amount").textContent);
    const itemTotal = price * quantity;

    total += itemTotal;
    messageLines.push(`${index + 1}. ${title} x${quantity} - $${itemTotal.toFixed(2)}`);
  });

  messageLines.push("");
  messageLines.push(`Total: $${total.toFixed(2)}`);
  return messageLines.join("\n");
};

const buyNowBtn = document.querySelector(".final-order-btn");
if (buyNowBtn && cartContent) {
  buyNowBtn.addEventListener("click", () => {
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    if (cartBoxes.length === 0) {
      alert("Your cart is empty. Please add items to your cart before buying.");
      return;
    }

    const orderMessage = buildWhatsAppOrderMessage();
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(orderMessage)}`;

    window.open(whatsappUrl, "_blank");

    cartBoxes.forEach(cartBox => cartBox.remove());
    cartItemCount = 0;
    updateCartTotal();
    syncCartCount();
    localStorage.removeItem(STORAGE_KEY);
    alert("Your order details have been sent to WhatsApp. Please confirm the order there.");
  });
}

renderSavedCart();


