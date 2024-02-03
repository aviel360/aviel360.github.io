const productView = document.getElementById('product');


document.addEventListener('DOMContentLoaded', function() {
    const productTitle = window.localStorage.getItem('title');
    const productImg = window.localStorage.getItem('img');
    const productDescription = window.localStorage.getItem('description');
    GenerateProduct(productTitle, productImg, productDescription);
});



function GenerateProduct(title, img, desc)
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

    productkDiv.appendChild(productkDescDiv);
    productView.appendChild(productkDiv);

}