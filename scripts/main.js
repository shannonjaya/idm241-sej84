const productData = [
    {
        title: "Replica By the Fireplace",
        image: "assets/replica-by-the-fireplace.webp",
        scent: "Warm & Spicy",
        rating: 4.5,
        reviews: 1154,
        size: "3.4 oz, 100ml",
        price: 170
    },
    {
        title: "Replica Lazy Sunday Morning",
        image: "assets/replica-lazy-sunday-morning.jpg",
        scent: "Fresh & Floral",
        rating: 4.5,
        reviews: 380,
        size: "3.4 oz, 100ml",
        price: 170
    },
    {
        title: "Replica Sailing Day",
        image: "assets/replica-sailing-day.jpg",
        scent: "Fresh",
        rating: 4.6,
        reviews: 260,
        size: "3.4 oz, 100ml",
        price: 170
    },
    {
        title: "Replica Beach Walk",
        image: "assets/replica-beach-walk.jpg",
        scent: "Fresh",
        rating: 4.5,
        reviews: 1148,
        size: "3.4 oz, 100ml",
        price: 170
    },
    {
        title: "Replica Jazz Club",
        image: "assets/replica-jazz-club.jpg",
        scent: "Warm & Spicy",
        rating: 4.6,
        reviews: 804,
        size: "3.4 oz, 100ml",
        price: 170
    }
];

// const visibleProducts = 3; 
// let currentIndex = 0; 

// function renderCarousel() {
//     const container = document.getElementById('microinteraction-container');
//     container.innerHTML = ''; 

//     const productsToShow = productData.slice(currentIndex, currentIndex + visibleProducts);

//     productsToShow.forEach((product, idx) => {
//         let positionClass = '';
//         if (idx === 0) positionClass = 'carousel-left';
//         else if (idx === 1) positionClass = 'carousel-center';
//         else if (idx === 2) positionClass = 'carousel-right';

//         createCard(product, positionClass);
//     });
// }

// function showPrevious() {
//     if (currentIndex > 0) {
//         currentIndex--;
//         renderCarousel();
//     } else {
//         currentIndex = productData.length - visibleProducts;
//     }
//     renderCarousel();
// }

// function showNext() {
//     if (currentIndex < productData.length - visibleProducts) {
//         currentIndex++;
//         renderCarousel();
//     } else {
//         currentIndex = 0;
//     }
//     renderCarousel();
// }

function createCard(product, positionClass) { // Make product cards
    const card = document.createElement('div');
    card.classList.add('product-card');
    if (positionClass) card.classList.add(positionClass);

    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.title;
    img.classList.add('product-image');

    card.appendChild(img);

    if (positionClass === 'carousel-center') {

        const titleElement = document.createElement('h2');
        titleElement.textContent = product.title;
        titleElement.classList.add('product-title');

        const scent = document.createElement('p');
        scent.textContent = product.scent;
        scent.classList.add('product-scent');

        const rating = document.createElement('p');
        rating.textContent = `${product.rating} (${product.reviews})`;
        rating.classList.add('product-rating');

        const size = document.createElement('p');
        size.textContent = product.size;
        size.classList.add('product-size');

        const price = document.createElement('h3');
        price.textContent = '$' + product.price.toFixed(2);
        price.classList.add('product-price');

        const addToCart = document.createElement('button');
        addToCart.textContent = "Add to Cart";
        addToCart.classList.add('add-to-cart-button');

        card.appendChild(titleElement);
        card.appendChild(scent);
        card.appendChild(rating);
        card.appendChild(size);
        card.appendChild(price);
        card.appendChild(addToCart);
    }

    document.getElementById('microinteraction-container').appendChild(card);
}

function initialize() {
    document.getElementById('prev-btn').addEventListener('click', showPrevious);
    document.getElementById('next-btn').addEventListener('click', showNext);
    renderCarousel();
}

window.addEventListener('load', initialize);

console.log("Script loaded.");