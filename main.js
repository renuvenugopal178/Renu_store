
const languageSelect = document.getElementById('languageSelect');
const mainImage = document.getElementById('mainImage');
const thumbnails = document.querySelectorAll('.thumbnails img');
const colorButtons = document.querySelectorAll('.color-btn');
const sizeButtons = document.querySelectorAll('.size-btn');
const sizeChartBtn = document.querySelector('.size-chart-btn');
const modal = document.getElementById('sizeChartModal');
const closeModal = document.querySelector('.close');
const addToCartBtn = document.querySelector('.add-to-cart');
const wishlistBtn = document.querySelector('.wishlist');


const productImages = [
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600',
    'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600',
    'https://images.unsplash.com/photo-1550639525-c97d455acf70?w=600'
];

const productVariants = {
    'gold': {
        price: '₹689.99',
        originalPrice: '₹1129.99',
        images: productImages
    },
    'pink': {
        price: '₹894.99',
        originalPrice: '₹2134.99',
        images: [
            'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600',
            'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600',
            'https://images.unsplash.com/photo-1550639525-c97d455acf70?w=600'
        ]
    },
    'blue': {
        price: '₹992.99',
        originalPrice: '₹1132.99',
        images: [
            'https://images.unsplash.com/photo-1550639525-c97d455acf70?w=600',
            'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600',
            'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600'
        ]
    }
};

const reviews = [
    {
        name: 'Renu Venugopal',
        rating: 5,
        date: '2024-02-15',
        comment: 'Perfect summer dress.',
        helpful: 24
    },
    {
        name: 'ziyad',
        rating: 4,
        date: '2024-02-10',
        comment: 'Beautiful dress ',
        helpful: 18
    },
    {
        name: 'Maria',
        rating: 5,
        date: '2024-02-05',
        comment: 'Love the floral pattern and the quality of the material.',
        helpful: 15
    }
];


const relatedProducts = [
    {
        name: 'Floral Maxi Dress',
        price: '₹999.99',
        image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=300'
    },
    {
        name: 'Summer Sundress',
        price: '₹879.99',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300'
    },
    {
        name: 'Casual Day Dress',
        price: '₹669.99',
        image: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?w=300'
    }
];


const translations = {
    en: {
        addToCart: 'Add to Cart',
        sizeChart: 'Size Chart'
    },
    ml: {
        addToCart: 'കാർട്ടിലേക്ക് ചേർക്കുക',
        sizeChart: 'വലിപ്പ ചാർട്ട്'
    }
};


function updateLanguage(lang) {
    document.querySelectorAll('[data-en]').forEach(element => {
        const translation = element.getAttribute(`data-${lang}`);
        if (translation) {
            element.textContent = translation;
        }
    });
}

function updateProductImages(images) {
    mainImage.src = images[0];
    thumbnails.forEach((thumb, index) => {
        if (images[index]) {
            thumb.src = images[index];
            thumb.style.display = 'block';
        } else {
            thumb.style.display = 'none';
        }
    });
}

function updatePricing(variant) {
    const priceContainer = document.querySelector('.price-container');
    const currentPrice = priceContainer.querySelector('.current-price');
    const originalPrice = priceContainer.querySelector('.original-price');
    
    currentPrice.textContent = variant.price;
    originalPrice.textContent = variant.originalPrice;
}


languageSelect.addEventListener('change', (e) => {
    updateLanguage(e.target.value);
});

thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
        mainImage.src = thumb.src;
        thumbnails.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
    });
});

colorButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const color = btn.style.backgroundColor;
        const variant = productVariants[Object.keys(productVariants)[Array.from(colorButtons).indexOf(btn)]];
        
        colorButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        updateProductImages(variant.images);
        updatePricing(variant);
    });
});

sizeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        sizeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

sizeChartBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

addToCartBtn.addEventListener('click', () => {

    alert('Product added to cart!');
});

wishlistBtn.addEventListener('click', () => {
    wishlistBtn.classList.toggle('active');
    const icon = wishlistBtn.querySelector('i');
    icon.classList.toggle('far');
    icon.classList.toggle('fas');
});

function createReviewElement(review) {
    const reviewElement = document.createElement('div');
    reviewElement.className = 'review-item';
    reviewElement.innerHTML = `
        <div class="review-header">
            <span class="reviewer-name">${review.name}</span>
            <span class="review-date">${new Date(review.date).toLocaleDateString()}</span>
        </div>
        <div class="review-rating">
            ${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}
        </div>
        <p class="review-comment">${review.comment}</p>
        <div class="review-helpful">
            <button>Helpful (${review.helpful})</button>
        </div>
    `;
    return reviewElement;
}

function initializeReviews() {
    const reviewsList = document.querySelector('.reviews-list');
    reviews.forEach(review => {
        reviewsList.appendChild(createReviewElement(review));
    });
}


function createRelatedProductElement(product) {
    const productElement = document.createElement('div');
    productElement.className = 'related-product';
    productElement.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">${product.price}</p>
    `;
    return productElement;
}

function initializeRelatedProducts() {
    const productsGrid = document.querySelector('.products-grid');
    relatedProducts.forEach(product => {
        productsGrid.appendChild(createRelatedProductElement(product));
    });
}


document.addEventListener('DOMContentLoaded', () => {
    initializeReviews();
    initializeRelatedProducts();
});