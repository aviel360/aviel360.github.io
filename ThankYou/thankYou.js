const productView = document.getElementById('product');

document.addEventListener('DOMContentLoaded', function() {
    const productTitle = window.localStorage.getItem('title');
    const productImg = window.localStorage.getItem('img');
    const productDescription = window.localStorage.getItem('description');
    productView.innerHTML += `<div class="product">
    <h2>${productTitle}</h2>
    <img src="../Assets/images/${productImg}" alt="${productTitle}">
    <p>${productDescription}</p>
</div>`; 
});