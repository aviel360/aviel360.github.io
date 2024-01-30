import { productsData } from "../assets/data.js"; 

const productsCatalog = document.getElementById('catalog');

let products = productsData.products.sort(() => Math.random() - 0.5);
// products.forEach(product => {
//     productsCatalog.innerHTML += generateProduct(product)
// })

//products.forEach(product => {GenerateProductNew(product)})
document.addEventListener('DOMContentLoaded', function() {
    products.forEach(product => {GenerateProductNew(product)})
});


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
    window.location.href = "../CheckoutForm/checkoutForm.html";
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


function GenerateProductNew(product)
{
    console.log('Generating product:', product);
    const newProductkDiv = document.createElement('div');
    newProductkDiv.className = "product";

    const checkoutButton = document.createElement('button');
    checkoutButton.className = "checkout";
    checkoutButton.dataset.id= product.id;
    checkoutButton.type = "button";

    
    newProductkDiv.appendChild(checkoutButton);

     // Create and append the h2 element
     const productTitle = document.createElement('h2');
     productTitle.textContent = product.title;
     checkoutButton.appendChild(productTitle);

    const image = document.createElement('img');
    image.src = "../assets/images/".concat(product.image_file_name);
    image.className = "product-img"
    image.alt = product.title;
    checkoutButton.appendChild(image);

    const ProductDescriptionDiv = document.createElement('div');

    // Create and append the paragraph
    const description = document.createElement('p');
    description.textContent = product.description;
    description.className = "product-descreption"
    ProductDescriptionDiv.appendChild(description);

    const price = document.createElement('p');
    const reducted = document.createElement('s');
    reducted.textContent = product.price + " ₪";;
    price.appendChild(reducted);
    ProductDescriptionDiv.appendChild(price);

    const discountPrice = document.createElement("h3");
    discountPrice.textContent = product.discounted_price + " ₪";
    ProductDescriptionDiv.appendChild(discountPrice);

    ProductDescriptionDiv.className = 'ProductTextBox';
    checkoutButton.appendChild(ProductDescriptionDiv);

    // Append the new shark to the container
    document.getElementById('catalog').appendChild(newProductkDiv);

}
