const productView = document.getElementById('product');

// document.addEventListener('DOMContentLoaded', function() {
//     const productTitle = window.localStorage.getItem('title');
//     const productImg = window.localStorage.getItem('img');
//     const productDescription = window.localStorage.getItem('description');
//     productView.innerHTML += `<div class="product">
//     <h2>${productTitle}</h2>
//     <img src="../assets/images/${productImg}" alt="${productTitle}">
//     <p>${productDescription}</p>
// </div>`; 
// });


document.addEventListener('DOMContentLoaded', function() {
    const productTitle = window.localStorage.getItem('title');
    const productImg = window.localStorage.getItem('img');
    const productDescription = window.localStorage.getItem('description');
    GenerateProductNew(productTitle, productImg, productDescription);
});



function GenerateProductNew(title, img, desc)
{
    const productkDiv = document.createElement('div');
    productkDiv.className = "product-inner";

    // Create and append product image
    const image = document.createElement('img');
    image.src = "../assets/images/".concat(img);
    image.className = "product-img"
    image.alt = title;
    productkDiv.appendChild(image);

    const productkDescDiv = document.createElement('div');
    productkDescDiv.className = "title-and-desc";

     // Create and append product title
     const productTitle = document.createElement('h2');
     productTitle.textContent =  title;
     productTitle.className = "product-title";
     productkDescDiv.appendChild(productTitle);

     const description = document.createElement('p');
     description.textContent = desc;
     description.className = "product-descreption"
     productkDescDiv.appendChild(description);

    // //new div for the description and price f product
    // const ProductDescriptionDiv = document.createElement('div');
    productkDiv.appendChild(productkDescDiv);
    productView.appendChild(productkDiv);

}