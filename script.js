// Seleciona os elementos do DOM
const menu = document.getElementById('menu');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const cartCounter = document.getElementById('cart-count');
const addressInput = document.getElementById('address');
const addressWarn = document.getElementById('address-warn');

// Array que armazena os itens do carrinho
let cart = [];

// Ao clicar no botão do carrinho, exibe o modal com os itens
cartBtn.addEventListener('click', function () {
    updateCartModal();
    cartModal.style.display = 'flex';
});

// Fecha o modal ao clicar fora da área do conteúdo
cartModal.addEventListener('click', function (event) {
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// Fecha o modal ao clicar no botão "Fechar"
closeModalBtn.addEventListener('click', function () {
    cartModal.style.display = 'none';
});

// Adiciona item ao carrinho ao clicar no botão do produto
menu.addEventListener('click', function (event) {
    // Verifica se clicou em algum botão de adicionar ao carrinho
    let parentButton = event.target.closest(".add-to-cart-btn");

    if (parentButton) {
        const name = parentButton.getAttribute("data-name");
        const price = parseFloat(parentButton.getAttribute("data-price"));

        // Adiciona item ao carrinho
        addToCart(name, price);
    }
});

// Função que adiciona ou incrementa item no carrinho
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        // Se já existe, incrementa a quantidade
        existingItem.quanntity += 1;
    } else {
        // Se não existe, adiciona como novo item
        cart.push({
            name,
            price,
            quanntity: 1,
        });
    }

    updateCartModal();
}

// Atualiza os itens do carrinho no modal
function updateCartModal() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col");

        // Cria o HTML de cada item
        cartItemElement.innerHTML = `
        <div class="flex items-center justify-between">
            <div>
                <p class="font-bold">${item.name}</p>
                <p>Qtd: ${item.quanntity}</p>
                <p class="font-medium mt-2">USD${item.price.toFixed(2)}</p>
            </div>
            <button class="remove-from-cart-btn" data-name="${item.name}">
                Remove
            </button>
        </div>
        `;

        total += item.price * item.quanntity;
        cartItemsContainer.appendChild(cartItemElement);
    });

    // Atualiza o total do carrinho
    cartTotal.textContent = total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });

    // Atualiza o contador do carrinho no botão
    cartCounter.innerHTML = cart.length;
}

// Remove item do carrinho ao clicar no botão "Remover"
cartItemsContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-from-cart-btn")) {
        const name = event.target.getAttribute("data-name");
        removeItemCart(name);
    }
});

// Função para remover ou diminuir quantidade de um item
function removeItemCart(name) {
    const index = cart.findIndex(item => item.name === name);

    if (index !== -1) {
        const item = cart[index];
        if (item.quanntity > 1) {
            item.quanntity -= 1;
            updateCartModal();
            return;
        }
        cart.splice(index, 1);
        updateCartModal();
    }
}

// Verifica se o endereço está preenchido e remove aviso
addressInput.addEventListener("input", function (event) {
    let inputValue = event.target.value;
    if (inputValue !== "") {
        addressWarn.classList.add("hidden");
        addressInput.classList.remove("border-red-500");
    }
});

// Finaliza o pedido e envia para o WhatsApp
checkoutBtn.addEventListener("click", function () {
    const isOpen = checkRestaurantOpen();

    // Se restaurante estiver fechado, mostra aviso
    if (!isOpen) {
        Toastify({
            text: "“Oops!!! The restaurant is closed. Come back later!”",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "#ef4444",
            },
        }).showToast();

        return;
    }

    // Verifica se carrinho está vazio
    if (cart.length === 0) return;

    // Verifica se endereço foi preenchido
    if (addressInput.value === "") {
        addressWarn.classList.remove("hidden");
        addressInput.classList.add("border-red-500");
        return;
    }

    // Monta a mensagem do pedido
    const cartItems = cart.map((item) => {
        return (
            `${item.name} Quantity: (${item.quanntity}) Price: USD${item.price} | `
        );
    }).join("");

    const message = encodeURIComponent(cartItems);
    const phone = "+55 71991950348";

    // Abre o WhatsApp com a mensagem formatada
    window.open(`https://wa.me/${phone}?text=${message} Address: ${addressInput.value}`, "_blank");

    // Limpa o carrinho
    cart = [];
    updateCartModal();
});

// Função que verifica se o restaurante está no horário de funcionamento
function checkRestaurantOpen() {
    const data = new Date();
    const hora = data.getHours();
    return hora >= 18 && hora < 22; // das 18h às 22h
}

// Altera a cor do aviso de horário de acordo com o status
const spanItem = document.getElementById("date-span");
const isOpen = checkRestaurantOpen();

if (isOpen) {
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600");
} else {
    spanItem.classList.remove("bg-green-600");
    spanItem.classList.add("bg-red-500");
}
