// Busca dados específicos do navegador do usuário
let inventory = JSON.parse(localStorage.getItem('myInventory')) || [];
let cart = JSON.parse(localStorage.getItem('myCart')) || [];
let currentTheme = localStorage.getItem('theme') || 'light-theme';

// Aplica o tema salvo ao carregar
document.body.className = currentTheme;

function render() {
    // Salva as listas no LocalStorage do usuário atual
    localStorage.setItem('myInventory', JSON.stringify(inventory));
    localStorage.setItem('myCart', JSON.stringify(cart));

    const pTable = document.getElementById('productTable');
    pTable.innerHTML = '';
    inventory.forEach((p, i) => {
        pTable.innerHTML += `<tr><td><strong>${p.name}</strong><br>R$ ${p.price.toFixed(2)}</td>
        <td style="text-align:right"><button onclick="addToCart(${i})" style="padding:5px 10px; cursor:pointer;">+</button></td></tr>`;
    });

    const cTable = document.getElementById('cartTable');
    cTable.innerHTML = '';
    let total = 0;
    cart.forEach((item, i) => {
        total += item.price;
        cTable.innerHTML += `<tr><td>${item.name}</td><td>R$ ${item.price.toFixed(2)}</td>
        <td><button onclick="removeFromCart(${i})" style="color:red; cursor:pointer;">✕</button></td></tr>`;
    });
    document.getElementById('totalPrice').innerText = total.toFixed(2);
}

function addNewProduct() {
    const n = document.getElementById('newProductName');
    const p = document.getElementById('newProductPrice');
    const price = parseFloat(p.value.replace(',', '.'));
    if (n.value && !isNaN(price)) {
        inventory.push({ name: n.value, price: price });
        n.value = ''; p.value = '';
        render();
    }
}

function addToCart(i) { cart.push(inventory[i]); render(); }
function removeFromCart(i) { cart.splice(i, 1); render(); }

function clearAll() {
    if(confirm("Deseja apagar sua lista e carrinho?")) {
        inventory = []; cart = []; render();
    }
}

function toggleTheme() {
    const body = document.body;
    if (body.classList.contains('light-theme')) {
        body.classList.replace('light-theme', 'dark-theme');
        localStorage.setItem('theme', 'dark-theme');
    } else {
        body.classList.replace('dark-theme', 'light-theme');
        localStorage.setItem('theme', 'light-theme');
    }
}

window.onload = render;
