import { productsData } from "../assets/data.js"; 

const productsCatalog = document.getElementById('catalog');

let products = productsData.products.sort(() => Math.random() - 0.5);


document.addEventListener('DOMContentLoaded', function() {
    products.forEach(product => {GenerateProduct(product)})
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


function GenerateProduct(product)
{
    const newProductkDiv = document.createElement('div');
    newProductkDiv.className = "product";

    const checkoutButton = document.createElement('button');
    checkoutButton.className = "checkout";
    checkoutButton.dataset.id= product.id;
    checkoutButton.type = "button";

    newProductkDiv.appendChild(checkoutButton);

     // Create and append product title
     const productTitle = document.createElement('h2');
     productTitle.textContent = product.title;
     checkoutButton.appendChild(productTitle);

     // Create and append product image
    const image = document.createElement('img');
    image.src = "../assets/images/".concat(product.image_file_name);
    image.className = "product-img"
    image.alt = product.title;
    checkoutButton.appendChild(image);

    //new div for the description and price f product
    const ProductDescriptionDiv = document.createElement('div');

    const description = document.createElement('p');
    description.textContent = product.description;
    description.className = "product-descreption"
    ProductDescriptionDiv.appendChild(description);

    //original price with a line through it
    const price = document.createElement('p');
    const reducted = document.createElement('s');
    reducted.textContent = product.price + " ₪";;
    price.appendChild(reducted);
    ProductDescriptionDiv.appendChild(price);

    //dicounted price
    const discountPrice = document.createElement("h3");
    discountPrice.textContent = product.discounted_price + " ₪";
    ProductDescriptionDiv.appendChild(discountPrice);

    ProductDescriptionDiv.className = 'ProductTextBox';
    checkoutButton.appendChild(ProductDescriptionDiv);

    document.getElementById('catalog').appendChild(newProductkDiv);

}
