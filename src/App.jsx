import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
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
  { id: 1, name: "Twist Harvest Object", note: "3 SIZES AVAILABLE", image: "0f63bbdacc5b6c1b", badge: "BEST SELLER" },
  { id: 2, name: "Clear Column Lantern", note: "4 SIZES AVAILABLE", image: "7e30cc2c199ecefe", badge: "BEST SELLER" },
  { id: 3, name: "Coupe Set", note: "SET OF 2", image: "fe733b430489c0da", badge: "NEW" },
  { id: 4, name: "Organic Serving Form", note: "2 FINISHES AVAILABLE", image: "2fd505e4f4d7e989", badge: "NEW" },
  { id: 5, name: "Autumn Glass Study", note: "HAND-FINISHED", image: "0f63bbdacc5b6c1b", badge: "FEATURED" },
  { id: 6, name: "Tall Candlelight", note: "2 SIZES AVAILABLE", image: "7e30cc2c199ecefe", badge: "FEATURED" },
];

const menuGroups = {
  Gifts: ["Occasion gifts", "Celebration pieces", "Seasonal table", "Corporate orders", "Gift presentation"],
  Drinkware: ["Stemware", "Cocktail glasses", "Everyday tumblers", "Carafes", "Bar accessories"],
  Table: ["Serving bowls", "Plates & platters", "Centerpieces", "Candlelight", "Decorative objects"],
};

const categoryCards = [
  ["Table Objects", "92036cfcb284ad1a"], ["Stemware", "2e95cc14fdaa5452"], ["Cocktail", "18a2cc3f9d7b9e31"], ["Vessels", "d3947d37a8a9035c"],
  ["Candlelight", "4a3d2f3c0204eb96"], ["Seasonal", "321172c50d62fef5"], ["Barware", "c277079ed4e9e689"], ["Bowls", "f0708ec291891aed"],
];

function Wordmark() {
  return <span className="wordmark">KEBEDA</span>;
}

function CategoryMenu({ selected, onSelect, mobile = false }) {
  const tabs = Object.keys(menuGroups);
  const items = menuGroups[selected] || menuGroups.Gifts;
  return <div className={mobile ? "mobile-menu-categories" : "mega-menu-categories"}>
    <div className="category-tabs" role="tablist" aria-label="Product categories">
      {tabs.map((tab) => <button className={tab === selected ? "selected" : ""} key={tab} onClick={() => onSelect(tab)} role="tab" aria-selected={tab === selected}>{tab}</button>)}
    </div>
    <div className="category-menu-content">
      <div className="category-links"><h2>{selected}</h2>{items.map((item) => <a href="#collection" key={item}>{item}</a>)}</div>
      <div className="menu-previews">{products.slice(0, 3).map((product) => <a href="#collection" className="menu-preview" key={product.id}><img src={asset(product.image)} alt="" /><span>{product.name}</span><small>EXPLORE</small></a>)}</div>
    </div>
  </div>;
}

export function App() {
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
      <nav className="desktop-nav" aria-label="Main navigation">{Object.keys(menuGroups).map((item) => <button key={item} onClick={() => openDesktopMenu(item)}>{item}</button>)}<a href="#collection">NEW ARRIVALS</a><a href="#category">CATEGORIES</a><a href="#contact">CONTACT</a></nav>
      {activeMenu && <div className="mega-menu" aria-label={`${activeMenu} menu`}><button className="close-mega" onClick={() => setActiveMenu(null)} aria-label="Close menu"><X size={27} /></button><CategoryMenu selected={activeCategory} onSelect={setActiveCategory} /></div>}
    </header>

    {menuOpen && <div className="mobile-menu" role="dialog" aria-label="Mobile navigation"><div className="mobile-menu-top"><button className="icon-link" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={27} /></button><Wordmark /><span /></div><form className="mobile-search" onSubmit={(event) => { event.preventDefault(); setMenuOpen(false); scrollToCollection(); }}><Search size={18} /><input aria-label="Search our collection" placeholder="SEARCH OUR COLLECTION" /></form><CategoryMenu selected={activeCategory} onSelect={setActiveCategory} mobile /><div className="mobile-menu-links"><a href="#collection" onClick={() => setMenuOpen(false)}>NEW ARRIVALS</a><a href="#contact" onClick={() => setMenuOpen(false)}>CONTACT</a><a href="#about" onClick={() => setMenuOpen(false)}>ABOUT US</a></div></div>}

    <main id="top">
      <section className="hero"><picture><source media="(max-width: 700px)" srcSet={asset("353f47e500aff43d")} /><img src={asset("1afa6a0dbb1c99c0")} alt="A warmly laid table with hand-finished glass objects" /></picture><div className="hero-copy"><p>Fall Gathering &amp; Gifting</p><h1>A Season Worth<br />Getting Ready For</h1><a className="button button-light" href="#collection">SHOP NOW</a></div></section>
      <section className="collection-section" id="collection"><div className="section-heading"><h2>For the table, the bar, and the home</h2><div className="carousel-arrows"><button disabled={productIndex === 0} onClick={() => setProductIndex((value) => Math.max(0, value - 1))} aria-label="Previous products"><ArrowLeft size={23} /></button><button disabled={productIndex === 2} onClick={() => setProductIndex((value) => Math.min(2, value + 1))} aria-label="Next products"><ArrowRight size={23} /></button></div></div><div className="product-window"><div className="product-track" style={{ "--product-index": productIndex }}>{products.map((product) => <article className="product-card" key={product.id}><div className="product-image"><span className="product-badge">{product.badge}</span><button className="like-button" aria-label={`Save ${product.name}`} onClick={() => toggleLike(product.id)}><Heart size={22} fill={likes.includes(product.id) ? "currentColor" : "none"} /></button><img src={asset(product.image)} alt={product.name} /><button className="quick-add" onClick={() => addToCart(product.id)} aria-label={`Add ${product.name} to bag`}><Plus size={23} /></button></div><h3>{product.name}</h3><p>{product.note}</p><button className="text-button" onClick={() => addToCart(product.id)}>ADD TO BAG</button></article>)}</div></div><a className="underlined-link" href="#category">VIEW ALL OBJECTS</a></section>
      <section className="story-pairs" id="about"><article><img src={asset("755670267b45bb05")} alt="Hand-finished clear glass object" /><div><h2>Fall Decor</h2><p>Warm tones, organic forms, and handmade details that set the season before it arrives.</p><a className="button button-outline" href="#category">SHOP NOW</a></div></article><article><img src={asset("2f4154ed7507563f")} alt="Cocktail glasses on a serving tray" /><div><h2>Drinkware</h2><p>Glasses for everyday pours and seasonal gatherings, including our new vintage-inspired Dorset Collection.</p><a className="button button-outline" href="#category">SHOP NOW</a></div></article></section>
      <section className="category-section" id="category"><h2>Shop by category</h2><div className="category-grid">{categoryCards.map(([title, image]) => <a className="category-card" href="#collection" key={title}><img src={asset(image)} alt="" /><span>SHOP NOW</span><strong>{title}</strong></a>)}</div></section>
      <section className="contact-feature" id="contact"><img src={asset("0ed1ba2b25791f04")} alt="Autumn landscape and waterside building" /><div className="contact-overlay"><p>KEBEDA TRADING LIMITED</p><h2>Let's make space for the next good thing.</h2><div className="contact-details"><a href="tel:+85255096464">+852 55096464</a><address>WORKSHOP 251 ON 3RD FLOOR,<br />JOIN-IN HANG SING CENTRE,<br />NOS. 2-16 KWAI FUNG CRESCENT, KWAI CHUNG<br />HONG KONG</address></div></div></section>
    </main>
    <footer className="site-footer"><div className="newsletter"><h2>Stay in the loop</h2><p>Occasional notes on new objects, collections, and company news.</p><form onSubmit={(event) => { event.preventDefault(); setNewsletterStatus("Thank you — you're on the list."); }}><label className="sr-only" htmlFor="newsletter-email">Email address</label><input id="newsletter-email" type="email" required placeholder="EMAIL ADDRESS" /><button type="submit">SIGN UP</button></form>{newsletterStatus && <p className="status-message" role="status">{newsletterStatus}</p>}</div><div className="footer-grid"><div><Wordmark /><p className="footer-company">KEBEDA TRADING LIMITED</p></div><div><h3>COLLECTION</h3><a href="#collection">New arrivals</a><a href="#collection">Table objects</a><a href="#collection">Drinkware</a><a href="#category">All categories</a></div><div><h3>COMPANY</h3><a href="#about">About us</a><a href="#contact">Contact</a><a href="tel:+85255096464">Call us</a></div><div><h3>ADDRESS</h3><p>WORKSHOP 251 ON 3RD FLOOR,<br />JOIN-IN HANG SING CENTRE,<br />NOS. 2-16 KWAI FUNG CRESCENT, KWAI CHUNG<br />HONG KONG</p></div></div><div className="footer-base"><span>© 2026 KEBEDA TRADING LIMITED</span><span>PRIVACY · TERMS</span></div></footer>
    {cartOpen && <aside className="cart-drawer" aria-label="Shopping bag"><div className="cart-head"><h2>BAG ({cartTotal})</h2><button className="icon-link" onClick={() => setCartOpen(false)} aria-label="Close shopping bag"><X size={25} /></button></div>{cartItems.length === 0 ? <div className="empty-cart"><ShoppingBag size={37} strokeWidth={1.2} /><h3>Your bag is empty.</h3><p>Add an object to begin your collection.</p><button className="button button-dark" onClick={() => setCartOpen(false)}>CONTINUE SHOPPING</button></div> : <><div className="cart-items">{cartItems.map((item) => <div className="cart-item" key={item.id}><img src={asset(item.image)} alt="" /><div><h3>{item.name}</h3><p>{item.note}</p><div className="quantity"><button onClick={() => updateQuantity(item.id, -1)} aria-label={`Remove one ${item.name}`}><Minus size={14} /></button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.id, 1)} aria-label={`Add one ${item.name}`}><Plus size={14} /></button></div></div></div>)}</div><button className="button button-dark checkout-button" onClick={() => setCartOpen(false)}>CONTINUE</button></>}</aside>}
    {(cartOpen || menuOpen) && <button className="screen-dim" aria-label="Close overlay" onClick={() => { setCartOpen(false); setMenuOpen(false); }} />}
  </div>;
}
