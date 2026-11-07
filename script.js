document.addEventListener("DOMContentLoaded", () => {
    const cartOverlay = document.querySelector(".cart-overlay");
    const cartButton = document.getElementById("cart-button");
    const closeCartButton = document.getElementById("close-cart");
    const cartItemsContainer = document.querySelector(".cart-items");
    const totalPriceElement = document.getElementById("total-price");
    let cart = []; // تعريف السلة

    // فتح السلة
    cartButton.addEventListener("click", () => {
        cartOverlay.classList.add("show");
        renderCart();
    });

    // إغلاق السلة
    closeCartButton.addEventListener("click", () => {
        cartOverlay.classList.remove("show");
    });

    // إضافة زر "Add to Cart" إلى كل منتج
    document.querySelectorAll(".product").forEach((productElement, index) => {
        const addToCartButton = document.createElement("button");
        addToCartButton.textContent = "Add to Cart";
        addToCartButton.classList.add("add-to-cart");
        productElement.appendChild(addToCartButton);

        // عند النقر على "Add to Cart"
        addToCartButton.addEventListener("click", () => {
            const name = productElement.querySelector("h4")?.textContent || "Unknown";
            const image = productElement.querySelector("img")?.src || "";
            const priceElement = productElement.querySelector(".price");

            if (!priceElement) {
                alert("خطأ! لم يتم العثور على السعر داخل المنتج.");
                return;
            }

            const priceText = priceElement.textContent.trim();
            const price = parseFloat(priceText.replace(/[^\d,]/g, "").replace(",", "."));

            if (isNaN(price)) {
                alert("خطأ! لم يتم العثور على السعر بشكل صحيح.");
                return;
            }

            const product = {
                id: index,
                name: name,
                price: price,
                image: image,
            };

            addToCart(product);
        });
    });

    // إضافة المنتج إلى السلة
    function addToCart(product) {
        const existingProduct = cart.find(item => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        alert(`${product.name} تمت إضافته إلى السلة!`);
        renderCart();
    }

    // تحديث عرض السلة
    function renderCart() {
        cartItemsContainer.innerHTML = ""; // تنظيف السلة
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            const cartItem = document.createElement("li");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <p>${item.name}</p>
                    <p>${item.price.toFixed(2)} DA</p>
                    <div class="quantity-controls">
                        <button class="decrease" data-index="${index}">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase" data-index="${index}">+</button>
                    </div>
                </div>
                <button class="remove" data-index="${index}">❌</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        totalPriceElement.textContent = `Total: ${total.toFixed(2)} DA`;

        // إضافة أحداث الأزرار داخل السلة
        document.querySelectorAll(".increase").forEach(btn => {
            btn.addEventListener("click", event => {
                const index = event.target.dataset.index;
                cart[index].quantity++;
                renderCart();
            });
        });

        document.querySelectorAll(".decrease").forEach(btn => {
            btn.addEventListener("click", event => {
                const index = event.target.dataset.index;
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                } else {
                    cart.splice(index, 1);
                }
                renderCart();
            });
        });

        document.querySelectorAll(".remove").forEach(btn => {
            btn.addEventListener("click", event => {
                const index = event.target.dataset.index;
                cart.splice(index, 1);
                renderCart();
            });
        });
    }
});
//filter
document.addEventListener("DOMContentLoaded", function () {
    const filterBtn = document.getElementById("filterBtn");
    const modal = document.getElementById("filterModal");
    const closeModal = document.querySelector(".close");
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");
    const priceRange = document.querySelector(".price-range");
    const priceValue = document.getElementById("priceValue");

    // فتح النافذة عند الضغط على أيقونة الفلترة
    filterBtn.addEventListener("click", () => {
        modal.style.display = "flex";
    });

    // إغلاق النافذة عند الضغط على زر الإغلاق
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // التبديل بين التبويبات
    tabButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            tabButtons.forEach((b) => b.classList.remove("active"));
            tabContents.forEach((content) => content.classList.remove("active"));

            btn.classList.add("active");
            document.getElementById(btn.dataset.tab).classList.add("active");
        });
    });

    // تحديث قيمة السعر عند تحريك شريط التمرير
    priceRange.addEventListener("input", () => {
        priceValue.textContent = priceRange.value;
    });
// checkout
document.getElementById("checkout-form").addEventListener("submit", function(event) {
    event.preventDefault(); // منع الإرسال الافتراضي

    let name = document.getElementById("name").value.trim();
    let address = document.getElementById("address").value.trim();
    let payment = document.getElementById("payment").value;

    if (name === "" || address === ""||  payment ==="") {
        alert("Please fill in all fields.");
    } else {
        alert("Order placed successfully!");
        this.reset(); // إعادة تعيين النموذج بعد الإرسال
    }
});
});