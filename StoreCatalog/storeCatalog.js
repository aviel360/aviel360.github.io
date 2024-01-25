import { productsData } from "../assets/data.js"; 

const productsCatalog = document.getElementById('catalog');

let products = productsData.products.sort(() => Math.random() - 0.5);
products.forEach(product => {
    productsCatalog.innerHTML += generateProduct(product)
})

function generateProduct(product) {
    return `<div class="product">
                <button class="checkout" data-id="${product.id}">
                <h2>${product.title}</h2>
                <img src="../assets/images/${product.image_file_name}" alt="${product.title}">
                <p>${product.description}</p>
                <p><s>${product.price}₪</s></p> 
                <h3>${product.discounted_price}₪</h3>
            </div>`; 
}