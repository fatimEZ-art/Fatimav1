// Data for products
const products = [
    {
        id: 0,
        img: "https://kimi-web-img.moonshot.cn/img/cdn.uaeflowers.com/c0f85429eb0c5f5a93591175c95fe102723e9da4.webp",
        name: { en: "Pink Tulip Bouquet", fr: "Bouquet de Tulipes Roses", ar: "باقة التوليب الوردي" },
        desc: { 
            en: "A delicate bouquet of fresh pink tulips, perfect for expressing love and gratitude. Hand-tied with satin ribbon.", 
            fr: "Un bouquet délicat de tulipes roses fraîches, parfait pour exprimer l'amour et la gratitude. Noué à la main avec un ruban de satin.",
            ar: "باقة رقيقة من التوليب الوردي الطازج، مثالية للتعبير عن الحب والامتنان. مربوطة يدوياً بشريط ساتان."
        },
        price: 250
    },
    {
        id: 1,
        img: "https://kimi-web-img.moonshot.cn/img/theflowershopatl.com/c83d8f16a6217b75f576dafa086907fc309985d1.jpg",
        name: { en: "Spring Sentiment", fr: "Sentiment de Printemps", ar: "إحساس الربيع" },
        desc: { 
            en: "A vibrant mix of roses, gerberas, and seasonal greens arranged in a rustic wooden box.", 
            fr: "Un mélange vibrant de roses, de gerberas et de verdure saisonnière arrangé dans une boîte en bois rustique.",
            ar: "مزيج نابض من الورود والجربيرا والخضرة الموسمية مرتّب في صندوق خشبي ريفي."
        },
        price: 350
    },
    {
        id: 2,
        img: "https://kimi-web-img.moonshot.cn/img/dodomarket.mu/2b238902f4fba35b6732113cfd84f2b9f3de8a90.jpg",
        name: { en: "Luxury Rose Box", fr: "Boîte de Roses Luxe", ar: "صندوق الورد الفاخر" },
        desc: { 
            en: "50 premium red and pink roses elegantly placed in a round luxury hat box.", 
            fr: "50 roses rouges et roses de qualité supérieure élégamment placées dans une boîte à chapeau ronde de luxe.",
            ar: "50 وردة حمراء ووردية فاخرة موضوعة بأناقة في صندوق قبعات دائري فاخر."
        },
        price: 450
    },
    {
        id: 3,
        img: "https://kimi-web-img.moonshot.cn/img/www.thedeliciouscrescent.com/ee190dabb02b9cf629dc5a56c17fa3474e0064c6.jpg",
        name: { en: "Rose Ice Cream (Cup)", fr: "Glace à la Rose (Coupe)", ar: "مثلجات الورد (كوب)" },
        desc: { 
            en: "Creamy artisanal ice cream infused with real rose petals and pistachio toppings.", 
            fr: "Glace artisanale crémeuse infusée avec de vrais pétales de rose et garnie de pistaches.",
            ar: "مثلجات كريمية مصنوعة يدوياً مع بتلات ورد حقيقية ومزينة بالفستق."
        },
        price: 35
    },
    {
        id: 4,
        img: "https://kimi-web-img.moonshot.cn/img/jajabakes.com/c2b8a41454b25a7ced2457d019a1a532d3ea10c3.jpg",
        name: { en: "Rose Petal Ice Cream", fr: "Glace Pétales de Rose", ar: "مثلجات بتلات الورد" },
        desc: { 
            en: "Three scoops of our signature rose ice cream served in a vintage glass bowl with edible petals.", 
            fr: "Trois boules de notre glace signature à la rose servies dans un bol en verre vintage avec des pétales comestibles.",
            ar: "ثلاث كرات من مثلجات الورد المميزة لدينا مقدمة في وعاء زجاجي كلاسيكي مع بتلات صالحة للأكل."
        },
        price: 50
    },
    {
        id: 5,
        img: "https://kimi-web-img.moonshot.cn/img/dragonettiflorist.com/64582739a2680b1ea787eafbcdd9ffa2ddc54e2b.jpg",
        name: { en: "Spring Charm", fr: "Charme de Printemps", ar: "سحر الربيع" },
        desc: { 
            en: "An elegant arrangement featuring hydrangeas, orchids, and pink roses in a ceramic vase.", 
            fr: "Un arrangement élégant avec des hortensias, des orchidées et des roses roses dans un vase en céramique.",
            ar: "تنسيق أنيق يضم الهيدرانجيا والأوركيد والورود الوردية في مزهرية خزفية."
        },
        price: 300
    }
];

// Language Logic
let currentLang = localStorage.getItem('lang') || 'en';
const langs = ['en', 'fr', 'ar'];

function toggleLanguage() {
    const currentIndex = langs.indexOf(currentLang);
    const nextIndex = (currentIndex + 1) % langs.length;
    currentLang = langs[nextIndex];
    localStorage.setItem('lang', currentLang);
    document.body.setAttribute('lang', currentLang);
    updateContent();
    // Reload to update content on detail page
    if(document.getElementById('detailTitle')) {
        location.reload();
    }
}

function updateContent() {
    if(currentLang === 'ar') {
        document.body.style.direction = 'rtl';
        document.body.style.textAlign = 'right';
    } else {
        document.body.style.direction = 'ltr';
        document.body.style.textAlign = 'left';
    }
}

// Initialize language
document.addEventListener('DOMContentLoaded', function() {
    document.body.setAttribute('lang', currentLang);
    updateContent();
    updateCartUI();
});

// Cart Logic using localStorage
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(product, qty) {
    let cart = getCart();
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ id: product.id, qty: qty });
    }
    saveCart(cart);
    updateCartUI();
}

function removeFromCart(id) {
    let cart = getCart().filter(item => item.id !== id);
    saveCart(cart);
    updateCartUI();
}

function updateCartUI() {
    const container = document.getElementById('cartContainer');
    const totalEl = document.getElementById('cartTotal');
    if (!container) return;
    
    const cart = getCart();
    
    if (cart.length === 0) {
        container.innerHTML = `
            <p class="lang-en" style="text-align:center; color: #888;">Your cart is empty.</p>
            <p class="lang-fr" style="text-align:center; color: #888;">Votre panier est vide.</p>
            <p class="lang-ar" style="text-align:center; color: #888;">سلة التسوق فارغة.</p>
        `;
        if(totalEl) totalEl.innerText = "0";
        return;
    }

    let html = '';
    let total = 0;

    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if(!product) return;
        const itemTotal = product.price * item.qty;
        total += itemTotal;
        html += `
            <div class="cart-item">
                <div>
                    <strong>${product.name[currentLang]}</strong> x ${item.qty}
                </div>
                <div>
                    ${itemTotal} MAD 
                    <button onclick="removeFromCart(${item.id})">X</button>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
    if(totalEl) totalEl.innerText = total;
}

function submitOrder(e) {
    e.preventDefault();
    const cart = getCart();
    if (cart.length === 0) {
        alert(currentLang === 'en' ? "Please add items to your cart first." : currentLang === 'fr' ? "Veuillez d'abord ajouter des articles." : "يرجى إضافة منتجات إلى السلة أولاً.");
        return;
    }
    alert(currentLang === 'en' ? "Thank you! Your order has been received. We will contact you shortly." : 
         currentLang === 'fr' ? "Merci! Votre commande a été reçue. Nous vous contacterons bientôt." :
         "شكراً! تم استلام طلبك. سنتصل بك قريباً.");
    saveCart([]);
    updateCartUI();
    document.getElementById('orderForm').reset();
}
