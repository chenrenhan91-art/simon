import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Heart,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";

const asset = (name) => `${import.meta.env.BASE_URL}assets/${name}.jpg`;

const products = [
  { id: 1, name: "Twist Harvest Object", note: "3 SIZES AVAILABLE", image: "0f63bbdacc5b6c1b", badge: "BEST SELLER", slug: "pumpkin-twist" },
  { id: 2, name: "Clear Column Lantern", note: "4 SIZES AVAILABLE", image: "7e30cc2c199ecefe", badge: "BEST SELLER", slug: "nantucket-hurricane" },
  { id: 3, name: "Coupe Set", note: "SET OF 2", image: "fe733b430489c0da", badge: "NEW", slug: "dorset-coupe-in-gift-box-set-of-2" },
  { id: 4, name: "Organic Serving Form", note: "2 FINISHES AVAILABLE", image: "2fd505e4f4d7e989", badge: "NEW", slug: "barre-organic-platter" },
  { id: 5, name: "Autumn Glass Study", note: "HAND-FINISHED", image: "0f63bbdacc5b6c1b", badge: "FEATURED", slug: "crackle-pumpkin" },
  { id: 6, name: "Tall Candlelight", note: "2 SIZES AVAILABLE", image: "7e30cc2c199ecefe", badge: "FEATURED", slug: "cavendish-candlestick" },
];

const productCatalog = {
  "pumpkin-twist": { price: "$140.00", sizes: ["S", "M", "L"], gallery: ["0f63bbdacc5b6c1b", "755670267b45bb05", "92036cfcb284ad1a"], description: "A sculptural glass object with a generous, gathered silhouette. Made to hold a place at the centre of a table or an entryway.", details: ["Hand-finished using traditional glassworking techniques.", "Material: Glass", "Made in: Hong Kong", "Wipe with a soft, dry cloth."] },
  "nantucket-hurricane": { price: "$165.00", sizes: ["S", "M", "L", "XL"], gallery: ["7e30cc2c199ecefe", "2f4154ed7507563f", "18a2cc3f9d7b9e31", "4a3d2f3c0204eb96"], description: "Clear, straight-sided glass designed to keep candlelight in view. Its simple silhouette works on a dining table, mantel, or beside the bed.", details: ["Hand-finished using traditional glassworking techniques.", "Material: Glass", "Includes one pillar candle.", "Clean with a soft cloth and mild soap."] },
  "dorset-coupe-in-gift-box-set-of-2": { price: "$120.00", sizes: ["SET OF 2"], gallery: ["fe733b430489c0da", "2f4154ed7507563f", "18a2cc3f9d7b9e31"], description: "A pair of hand-finished coupes made for shared toasts, celebratory pours, and the everyday ritual of setting the table well.", details: ["Set of two glasses.", "Material: Glass", "Hand wash recommended.", "Presented in a gift box."] },
  "barre-organic-platter": { price: "$185.00", sizes: ["CLEAR", "SMOKE"], gallery: ["2fd505e4f4d7e989", "f0708ec291891aed", "d3947d37a8a9035c"], description: "A generous serving piece with a softly organic profile, made for fruit, shared dishes, and the centre of a well-used table.", details: ["Hand-finished serving form.", "Material: Glass", "Food safe.", "Hand wash recommended."] },
  "crackle-pumpkin": { price: "$95.00", sizes: ["ONE SIZE"], gallery: ["0f63bbdacc5b6c1b", "755670267b45bb05", "1afa6a0dbb1c99c0"], description: "A hand-finished seasonal object that catches the warmth of a table set for gathering and makes a considered gift.", details: ["Hand-finished glass object.", "Material: Glass", "Designed for decorative use.", "Each piece is unique."] },
  "cavendish-candlestick": { price: "$110.00", sizes: ["M", "L"], gallery: ["7e30cc2c199ecefe", "4a3d2f3c0204eb96", "0ed1ba2b25791f04"], description: "A tall, clear glass form designed for candlelight. Its proportions make a quiet focal point on a mantel or dining table.", details: ["Hand-finished using traditional glassworking techniques.", "Material: Glass", "Fits a standard pillar candle.", "Clean with a soft cloth and mild soap."] },
};

const menuGroups = {
  Gifts: [
    { label: "Occasion gifts", slug: "fall-gathering-and-gifting" },
    { label: "Celebration pieces", slug: "fall-decor" },
    { label: "Seasonal table", slug: "fall-decor" },
    { label: "Corporate orders", slug: "bowls" },
    { label: "Gift presentation", slug: "fall-gathering-and-gifting" },
  ],
  Drinkware: [
    { label: "Stemware", slug: "stemware" },
    { label: "Cocktail glasses", slug: "cocktail-glasses" },
    { label: "Everyday tumblers", slug: "drinkware" },
    { label: "Carafes", slug: "vases" },
    { label: "Bar accessories", slug: "drinkware" },
  ],
  Table: [
    { label: "Serving bowls", slug: "bowls" },
    { label: "Plates & platters", slug: "bowls" },
    { label: "Centerpieces", slug: "vases" },
    { label: "Candlelight", slug: "candlelight" },
    { label: "Decorative objects", slug: "fall-decor" },
  ],
};

const categoryCards = [
  ["Fall Decor", "92036cfcb284ad1a", "fall-decor"], ["Stemware", "2e95cc14fdaa5452", "stemware"], ["Cocktail", "18a2cc3f9d7b9e31", "cocktail-glasses"], ["Vessels", "d3947d37a8a9035c", "vases"],
  ["Candlelight", "4a3d2f3c0204eb96", "candlelight"], ["Seasonal", "321172c50d62fef5", "trees"], ["Barware", "c277079ed4e9e689", "drinkware"], ["Bowls", "f0708ec291891aed", "bowls"],
];

const collectionPages = {
  "new-arrivals": { title: "New Arrivals", description: "Newly selected objects for the table, the bar, and the home.", image: "1afa6a0dbb1c99c0" },
  "fall-gathering-and-gifting": { title: "Fall Gathering & Gifting", description: "Objects selected for tables, thoughtful gifts, and the gatherings that bring people together.", image: "1afa6a0dbb1c99c0" },
  "fall-decor": { title: "Fall Decor", description: "Warm tones, organic forms, and handmade details that set the season before it arrives.", image: "755670267b45bb05" },
  drinkware: { title: "Drinkware", description: "Glasses for everyday pours and seasonal gatherings, including our new vintage-inspired Dorset Collection.", image: "2f4154ed7507563f" },
  stemware: { title: "Stemware", description: "Glassware made for shared meals, toasts, and the details worth lingering over.", image: "2e95cc14fdaa5452" },
  "cocktail-glasses": { title: "Cocktail Glasses", description: "Considered forms for everything poured and passed around the table.", image: "18a2cc3f9d7b9e31" },
  vases: { title: "Vases", description: "Sculptural vessels for branches, blooms, and everyday arrangements.", image: "d3947d37a8a9035c" },
  candlelight: { title: "Candlelight", description: "Illuminate the table with pieces designed for a softer kind of evening.", image: "4a3d2f3c0204eb96" },
  trees: { title: "Seasonal", description: "Seasonal objects made to return to the table year after year.", image: "321172c50d62fef5" },
  bowls: { title: "Bowls", description: "Serving pieces for the centre of the table and the everyday in between.", image: "f0708ec291891aed" },
};

const sitePath = (path = "/") => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

function currentCollectionSlug() {
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
  const path = basePath && window.location.pathname.startsWith(basePath) ? window.location.pathname.slice(basePath.length) : window.location.pathname;
  const [section, slug] = path.replace(/^\/+|\/+$/g, "").split("/");
  return section === "collections" && slug ? slug : null;
}

function currentProductSlug() {
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
  const path = basePath && window.location.pathname.startsWith(basePath) ? window.location.pathname.slice(basePath.length) : window.location.pathname;
  const [section, slug] = path.replace(/^\/+|\/+$/g, "").split("/");
  return section === "products" && slug ? slug : null;
}

function Wordmark() {
  return <span className="wordmark">KEBEDA</span>;
}

function CollectionPage({ slug }) {
  const collection = collectionPages[slug];
  if (!collection) return null;
  return <div className="collection-page-shell">
    <header className="collection-header"><a className="collection-home" href={sitePath("/")}><Wordmark /></a><a className="collection-back" href={sitePath("/")}>BACK TO HOME</a></header>
    <main className="collection-page-main"><section className="collection-intro"><p>COLLECTION</p><h1>{collection.title}</h1><p>{collection.description}</p></section><section className="collection-hero"><img src={asset(collection.image)} alt="" /></section><section className="collection-products" aria-label={`${collection.title} products`}>{products.map((product) => <article className="collection-product" key={product.id}><a href={sitePath(`/products/${product.slug}/`)}><img src={asset(product.image)} alt={product.name} /></a><h2><a href={sitePath(`/products/${product.slug}/`)}>{product.name}</a></h2><p>{product.note}</p><a className="text-button" href={sitePath(`/products/${product.slug}/`)}>VIEW DETAILS</a></article>)}</section></main>
    <footer className="collection-footer"><span>© 2026 KEBEDA TRADING LIMITED</span><a href="tel:+85255096464">+852 55096464</a></footer>
  </div>;
}

function ProductPage({ slug }) {
  const product = products.find((item) => item.slug === slug);
  const catalog = productCatalog[slug];
  const [selectedImage, setSelectedImage] = useState(catalog?.gallery?.[0]);
  const [selectedSize, setSelectedSize] = useState(catalog?.sizes?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [saved, setSaved] = useState(false);
  if (!product) return null;
  return <div className="product-page-shell"><header className="product-header"><a className="product-header-home" href={sitePath("/")}><Wordmark /></a><nav aria-label="Product navigation"><a href={sitePath("/collections/fall-gathering-and-gifting/")}>GIFTS</a><a href={sitePath("/collections/drinkware/")}>DRINKWARE</a><a href={sitePath("/collections/bowls/")}>TABLE</a><a href={sitePath("/collections/new-arrivals/")}>NEW ARRIVALS</a></nav><a className="product-header-contact" href={sitePath("/#contact")}>CONTACT</a></header><main className="product-detail-main"><nav className="product-breadcrumb" aria-label="Breadcrumb"><a href={sitePath("/")}>HOME</a><span>/</span><a href={sitePath("/collections/fall-decor/")}>COLLECTION</a><span>/</span><span>{product.name}</span></nav><div className="product-detail-grid"><section className="product-gallery" aria-label={`${product.name} images`}><div className="product-main-image"><img src={asset(selectedImage)} alt={product.name} /></div><div className="product-thumbnails">{catalog.gallery.map((image, index) => <button className={image === selectedImage ? "selected" : ""} type="button" key={image} onClick={() => setSelectedImage(image)} aria-label={`View image ${index + 1} of ${product.name}`}><img src={asset(image)} alt="" /></button>)}</div></section><section className="product-detail-info"><p className="product-page-badge">{product.badge}</p><h1>{product.name}</h1><p className="product-price">{catalog.price}</p><p className="product-page-description">{catalog.description}</p><div className="product-size-picker"><p>CHOOSE YOUR SIZE: <strong>{selectedSize}</strong></p><div>{catalog.sizes.map((size) => <button className={size === selectedSize ? "selected" : ""} type="button" key={size} onClick={() => setSelectedSize(size)}>{size}</button>)}</div></div><label className="product-engraving"><input type="checkbox" /> <span>ADD PERSONALIZED ENGRAVING</span></label><div className="product-buy-row"><div className="product-quantity"><span>QUANTITY</span><div><button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity"><Minus size={16} /></button><output>{quantity}</output><button type="button" onClick={() => setQuantity((value) => value + 1)} aria-label="Increase quantity"><Plus size={16} /></button></div></div><button className="product-add" type="button" onClick={() => setAdded(true)}>{added ? "ADDED TO BAG" : `ADD TO BAG — ${catalog.price}`}</button></div>{added && <p className="product-added" role="status">Added {quantity} item{quantity > 1 ? "s" : ""} to your bag.</p>}<div className="product-secondary-actions"><button type="button">ADD TO REGISTRY</button><button type="button" onClick={() => setSaved((value) => !value)}><Heart size={17} /> {saved ? "SAVED" : "ADD TO WISHLIST"}</button></div><div className="product-disclosure"><button type="button" onClick={() => setDetailsOpen((value) => !value)} aria-expanded={detailsOpen}><span>DETAILS</span><ChevronDown size={20} /></button>{detailsOpen && <ul>{catalog.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>}</div><div className="product-disclosure"><button type="button"><span>SHIPPING + MORE INFO</span><ChevronDown size={20} /></button></div><a className="product-return" href={sitePath("/collections/fall-decor/")}>CONTINUE EXPLORING</a></section></div></main><footer className="collection-footer"><span>© 2026 KEBEDA TRADING LIMITED</span><a href="tel:+85255096464">+852 55096464</a></footer></div>;
}

function CategoryMenu({ selected, onSelect, mobile = false }) {
  const tabs = Object.keys(menuGroups);
  const items = menuGroups[selected] || menuGroups.Gifts;
  return <div className={mobile ? "mobile-menu-categories" : "mega-menu-categories"}>
    <div className="category-tabs" role="tablist" aria-label="Product categories">
      {tabs.map((tab) => <button className={tab === selected ? "selected" : ""} key={tab} onClick={() => onSelect(tab)} role="tab" aria-selected={tab === selected}>{tab}</button>)}
    </div>
    <div className="category-menu-content">
      <div className="category-links"><h2>{selected}</h2>{items.map((item) => <a href={sitePath(`/collections/${item.slug}/`)} key={item.label}>{item.label}</a>)}</div>
      <div className="menu-previews">{products.slice(0, 3).map((product) => <a href={sitePath(`/products/${product.slug}/`)} className="menu-preview" key={product.id}><img src={asset(product.image)} alt="" /><span>{product.name}</span><small>EXPLORE</small></a>)}</div>
    </div>
  </div>;
}

function Storefront() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Gifts");
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [likes, setLikes] = useState([]);
  const [productIndex, setProductIndex] = useState(0);
  const [newsletterStatus, setNewsletterStatus] = useState("");
  const [query, setQuery] = useState("");
  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const cartItems = useMemo(() => cart.map((item) => ({ ...products.find((product) => product.id === item.id), quantity: item.quantity })), [cart]);

  function addToCart(id) {
    setCart((items) => {
      const found = items.find((item) => item.id === id);
      return found ? items.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item) : [...items, { id, quantity: 1 }];
    });
    setCartOpen(true);
  }
  function updateQuantity(id, delta) {
    setCart((items) => items.flatMap((item) => {
      if (item.id !== id) return [item];
      const quantity = item.quantity + delta;
      return quantity > 0 ? [{ ...item, quantity }] : [];
    }));
  }
  function toggleLike(id) { setLikes((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]); }
  function openDesktopMenu(name) { setActiveCategory(name); setActiveMenu((current) => current === name ? null : name); }
  function scrollToCollection() { document.querySelector("#collection")?.scrollIntoView({ behavior: "smooth" }); }

  return <div className="site-shell">
    <header className="site-header">
      <div className="desktop-header-row">
        <form className="search-box" onSubmit={(event) => { event.preventDefault(); scrollToCollection(); }}><Search size={18} strokeWidth={1.8} /><input value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search our collection" placeholder="SEARCH OUR COLLECTION" /></form>
        <a className="brand-link" href="#top" aria-label="Go to home"><Wordmark /></a>
        <div className="header-utility"><a href="#contact">CONTACT</a><a href="#about">ABOUT</a><a className="icon-link" href="#account" aria-label="Account"><UserRound size={25} strokeWidth={1.45} /></a><button className="icon-link cart-button" onClick={() => setCartOpen(true)} aria-label={`Open shopping bag with ${cartTotal} items`}><ShoppingBag size={26} strokeWidth={1.45} /><b>{cartTotal}</b></button></div>
      </div>
      <div className="mobile-header-row"><button className="icon-link" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={26} strokeWidth={1.6} /></button><a className="brand-link" href="#top"><Wordmark /></a><button className="icon-link cart-button" onClick={() => setCartOpen(true)} aria-label={`Open shopping bag with ${cartTotal} items`}><ShoppingBag size={25} strokeWidth={1.45} /><b>{cartTotal}</b></button></div>
      <nav className="desktop-nav" aria-label="Main navigation">{Object.keys(menuGroups).map((item) => <button key={item} onClick={() => openDesktopMenu(item)}>{item}</button>)}<a href={sitePath("/collections/new-arrivals/")}>NEW ARRIVALS</a><a href="#category">CATEGORIES</a><a href="#contact">CONTACT</a></nav>
      {activeMenu && <div className="mega-menu" aria-label={`${activeMenu} menu`}><button className="close-mega" onClick={() => setActiveMenu(null)} aria-label="Close menu"><X size={27} /></button><CategoryMenu selected={activeCategory} onSelect={setActiveCategory} /></div>}
    </header>

    {menuOpen && <div className="mobile-menu" role="dialog" aria-label="Mobile navigation"><div className="mobile-menu-top"><button className="icon-link" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={27} /></button><Wordmark /><span /></div><form className="mobile-search" onSubmit={(event) => { event.preventDefault(); setMenuOpen(false); scrollToCollection(); }}><Search size={18} /><input aria-label="Search our collection" placeholder="SEARCH OUR COLLECTION" /></form><CategoryMenu selected={activeCategory} onSelect={setActiveCategory} mobile /><div className="mobile-menu-links"><a href={sitePath("/collections/new-arrivals/")}>NEW ARRIVALS</a><a href="#contact" onClick={() => setMenuOpen(false)}>CONTACT</a><a href="#about" onClick={() => setMenuOpen(false)}>ABOUT US</a></div></div>}

    <main id="top">
      <section className="hero"><picture><source media="(max-width: 700px)" srcSet={asset("353f47e500aff43d")} /><img src={asset("1afa6a0dbb1c99c0")} alt="A warmly laid table with hand-finished glass objects" /></picture><div className="hero-copy"><p>Fall Gathering &amp; Gifting</p><h1>A Season Worth<br />Getting Ready For</h1><a className="button button-light" href={sitePath("/collections/fall-gathering-and-gifting/")}>SHOP NOW</a></div></section>
      <section className="collection-section" id="collection"><div className="section-heading"><h2>For the table, the bar, and the home</h2><div className="carousel-arrows"><button disabled={productIndex === 0} onClick={() => setProductIndex((value) => Math.max(0, value - 1))} aria-label="Previous products"><ArrowLeft size={23} /></button><button disabled={productIndex === 2} onClick={() => setProductIndex((value) => Math.min(2, value + 1))} aria-label="Next products"><ArrowRight size={23} /></button></div></div><div className="product-window"><div className="product-track" style={{ "--product-index": productIndex }}>{products.map((product) => <article className="product-card" key={product.id}><div className="product-image"><span className="product-badge">{product.badge}</span><button className="like-button" aria-label={`Save ${product.name}`} onClick={() => toggleLike(product.id)}><Heart size={22} fill={likes.includes(product.id) ? "currentColor" : "none"} /></button><a href={sitePath(`/products/${product.slug}/`)} aria-label={`View ${product.name} details`}><img src={asset(product.image)} alt={product.name} /></a><button className="quick-add" onClick={() => addToCart(product.id)} aria-label={`Add ${product.name} to bag`}><Plus size={23} /></button></div><h3><a href={sitePath(`/products/${product.slug}/`)}>{product.name}</a></h3><p>{product.note}</p><a className="text-button" href={sitePath(`/products/${product.slug}/`)}>VIEW DETAILS</a></article>)}</div></div><a className="underlined-link" href={sitePath("/collections/fall-gathering-and-gifting/")}>VIEW ALL OBJECTS</a></section>
      <section className="story-pairs" id="about"><article><img src={asset("755670267b45bb05")} alt="Hand-finished clear glass object" /><div><h2>Fall Decor</h2><p>Warm tones, organic forms, and handmade details that set the season before it arrives.</p><a className="button button-outline" href={sitePath("/collections/fall-decor/")}>SHOP NOW</a></div></article><article><img src={asset("2f4154ed7507563f")} alt="Cocktail glasses on a serving tray" /><div><h2>Drinkware</h2><p>Glasses for everyday pours and seasonal gatherings, including our new vintage-inspired Dorset Collection.</p><a className="button button-outline" href={sitePath("/collections/drinkware/")}>SHOP NOW</a></div></article></section>
      <section className="category-section" id="category"><h2>Shop by category</h2><div className="category-grid">{categoryCards.map(([title, image, slug]) => <a className="category-card" href={sitePath(`/collections/${slug}/`)} key={title}><img src={asset(image)} alt="" /><span>SHOP NOW</span><strong>{title}</strong></a>)}</div></section>
      <section className="contact-feature" id="contact"><img src={asset("0ed1ba2b25791f04")} alt="Autumn landscape and waterside building" /><div className="contact-overlay"><p>KEBEDA TRADING LIMITED</p><h2>Let's make space for the next good thing.</h2><div className="contact-details"><a href="tel:+85255096464">+852 55096464</a><address>WORKSHOP 251 ON 3RD FLOOR,<br />JOIN-IN HANG SING CENTRE,<br />NOS. 2-16 KWAI FUNG CRESCENT, KWAI CHUNG<br />HONG KONG</address></div></div></section>
    </main>
    <footer className="site-footer"><div className="newsletter"><h2>Stay in the loop</h2><p>Occasional notes on new objects, collections, and company news.</p><form onSubmit={(event) => { event.preventDefault(); setNewsletterStatus("Thank you — you're on the list."); }}><label className="sr-only" htmlFor="newsletter-email">Email address</label><input id="newsletter-email" type="email" required placeholder="EMAIL ADDRESS" /><button type="submit">SIGN UP</button></form>{newsletterStatus && <p className="status-message" role="status">{newsletterStatus}</p>}</div><div className="footer-grid"><div><Wordmark /><p className="footer-company">KEBEDA TRADING LIMITED</p></div><div><h3>COLLECTION</h3><a href={sitePath("/collections/new-arrivals/")}>New arrivals</a><a href={sitePath("/collections/bowls/")}>Table objects</a><a href={sitePath("/collections/drinkware/")}>Drinkware</a><a href="#category">All categories</a></div><div><h3>COMPANY</h3><a href="#about">About us</a><a href="#contact">Contact</a><a href="tel:+85255096464">Call us</a></div><div><h3>ADDRESS</h3><p>WORKSHOP 251 ON 3RD FLOOR,<br />JOIN-IN HANG SING CENTRE,<br />NOS. 2-16 KWAI FUNG CRESCENT, KWAI CHUNG<br />HONG KONG</p></div></div><div className="footer-base"><span>© 2026 KEBEDA TRADING LIMITED</span><span>PRIVACY · TERMS</span></div></footer>
    {cartOpen && <aside className="cart-drawer" aria-label="Shopping bag"><div className="cart-head"><h2>BAG ({cartTotal})</h2><button className="icon-link" onClick={() => setCartOpen(false)} aria-label="Close shopping bag"><X size={25} /></button></div>{cartItems.length === 0 ? <div className="empty-cart"><ShoppingBag size={37} strokeWidth={1.2} /><h3>Your bag is empty.</h3><p>Add an object to begin your collection.</p><button className="button button-dark" onClick={() => setCartOpen(false)}>CONTINUE SHOPPING</button></div> : <><div className="cart-items">{cartItems.map((item) => <div className="cart-item" key={item.id}><img src={asset(item.image)} alt="" /><div><h3>{item.name}</h3><p>{item.note}</p><div className="quantity"><button onClick={() => updateQuantity(item.id, -1)} aria-label={`Remove one ${item.name}`}><Minus size={14} /></button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.id, 1)} aria-label={`Add one ${item.name}`}><Plus size={14} /></button></div></div></div>)}</div><button className="button button-dark checkout-button" onClick={() => setCartOpen(false)}>CONTINUE</button></>}</aside>}
    {(cartOpen || menuOpen) && <button className="screen-dim" aria-label="Close overlay" onClick={() => { setCartOpen(false); setMenuOpen(false); }} />}
  </div>;
}

export function App() {
  const collectionSlug = currentCollectionSlug();
  const productSlug = currentProductSlug();
  if (collectionSlug && collectionPages[collectionSlug]) return <CollectionPage slug={collectionSlug} />;
  if (productSlug && products.some((product) => product.slug === productSlug)) return <ProductPage slug={productSlug} />;
  return <Storefront />;
}
