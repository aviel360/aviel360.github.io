import { productsData } from "../assets/data.js"; 

const productsCatalog = document.getElementById('catalog');

let products = productsData.products.sort(() => Math.random() - 0.5);
products.forEach(product => {
    productsCatalog.innerHTML += generateProduct(product)
})


productsCatalog.addEventListener('click', function(event) 
{
    const targetButton = event.target.closest('.checkout');
    if (targetButton) 
    {
        const product = products.find(p => p.id === parseInt(targetButton.dataset.id, 10));
        if (product) 
        {
            GoToPaymentPage(product);
        }
    }
});

function GoToPaymentPage(product) {
    window.localStorage.setItem('title', product.title);
    window.localStorage.setItem('img', product.image_file_name);
    window.localStorage.setItem('discounted_price', product.discounted_price);
    window.localStorage.setItem('description', product.description);
    window.location.href = "../checkoutForm/checkoutForm.html";
}

function generateProduct(product) {
    return `<div class="product">
                <button class="checkout" data-id="${product.id}" type="button" >
                <h2>${product.title}</h2>
                <img src="../assets/images/${product.image_file_name}" alt="${product.title}">
                <p>${product.description}</p>
                <p><s>${product.price}₪</s></p> 
                <h3>${product.discounted_price}₪</h3>
            </div>`; 
}
