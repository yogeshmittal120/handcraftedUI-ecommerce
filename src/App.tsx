import { useMemo, useState } from 'react'
import './App.css'

type Product = {
  id: number
  name: string
  category: string
  price: number
  oldPrice?: number
  rating: number
  reviews: string
  image: string
  tag?: string
  color: string
}

type AuthMode = 'login' | 'signup' | 'forgot' | null

const products: Product[] = [
  { id: 1, name: 'Handwoven Everyday Tote', category: 'Accessories', price: 899, oldPrice: 1299, rating: 4.8, reviews: '1,204', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=700&q=85', tag: 'BESTSELLER', color: '#e8ded0' },
  { id: 2, name: 'Minimal Ceramic Coffee Set', category: 'Home & Living', price: 1249, oldPrice: 1599, rating: 4.6, reviews: '862', image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=700&q=85', tag: 'HANDMADE', color: '#e9e5df' },
  { id: 3, name: 'Soft Knit Throw Blanket', category: 'Home & Living', price: 1799, rating: 4.7, reviews: '540', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=700&q=85', color: '#d9d2c8' },
  { id: 4, name: 'Natural Wood Desk Lamp', category: 'Home & Living', price: 2199, oldPrice: 2699, rating: 4.5, reviews: '328', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=85', tag: 'DEAL', color: '#e6dfd2' },
  { id: 5, name: 'Botanical Daily Journal', category: 'Stationery', price: 499, rating: 4.9, reviews: '2,010', image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=700&q=85', color: '#dce3d6' },
  { id: 6, name: 'Everyday Crossbody Bag', category: 'Accessories', price: 1499, oldPrice: 1899, rating: 4.6, reviews: '713', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=85', color: '#e6d9ce' },
  { id: 7, name: 'Sculpted Table Vase', category: 'Home & Living', price: 799, rating: 4.4, reviews: '296', image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=700&q=85', color: '#e5ddd4' },
  { id: 8, name: 'Weekend Essential Bottle', category: 'Lifestyle', price: 699, oldPrice: 899, rating: 4.7, reviews: '1,032', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=700&q=85', tag: 'POPULAR', color: '#d8e3e4' },
]

const categories = [
  { name: 'All finds', icon: '✦' },
  { name: 'Home & Living', icon: '⌂' },
  { name: 'Accessories', icon: '◇' },
  { name: 'Stationery', icon: '▤' },
  { name: 'Lifestyle', icon: '☼' },
]

function money(amount: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)
}

export default function App() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All finds')
  const [authMode, setAuthMode] = useState<AuthMode>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState<Record<number, number>>({})
  const [user, setUser] = useState<string | null>(null)
  const [notice, setNotice] = useState('')
  const [mobileMenu, setMobileMenu] = useState(false)

  const filteredProducts = useMemo(() => products.filter((product) => {
    const categoryMatch = category === 'All finds' || product.category === category
    const searchMatch = (product.name + ' ' + product.category).toLowerCase().includes(search.toLowerCase())
    return categoryMatch && searchMatch
  }), [category, search])

  const cartItems = products.filter((product) => cart[product.id])
  const cartCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0)
  const subtotal = cartItems.reduce((sum, product) => sum + product.price * cart[product.id], 0)

  function addToCart(product: Product) {
    setCart((current) => ({ ...current, [product.id]: (current[product.id] || 0) + 1 }))
    setNotice(`${product.name} added to your bag`)
    window.setTimeout(() => setNotice(''), 2200)
  }

  function changeQuantity(id: number, amount: number) {
    setCart((current) => {
      const next = { ...current, [id]: (current[id] || 0) + amount }
      if (next[id] <= 0) delete next[id]
      return next
    })
  }

  function submitAuth(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (authMode === 'forgot') {
      setNotice('If an account exists for that email, reset instructions will be sent.')
      setAuthMode(null)
      window.setTimeout(() => setNotice(''), 3500)
      return
    }
    const data = new FormData(event.currentTarget)
    const email = String(data.get('email') || '')
    setUser(authMode === 'signup' ? String(data.get('name') || email.split('@')[0]) : email.split('@')[0])
    setAuthMode(null)
    setNotice(authMode === 'signup' ? 'Your demo account is ready!' : 'You are now signed in (demo).')
    window.setTimeout(() => setNotice(''), 2600)
  }

  return (
    <div className="app-shell">
      <div className="announcement"><span>✦</span> Little things, thoughtfully made. Free delivery on orders over ₹1,499 <span className="announcement-arrow">→</span></div>
      <header className="site-header">
        <button className="mobile-menu icon-button" aria-label="Open menu" onClick={() => setMobileMenu(!mobileMenu)}>☰</button>
        <button className="brand" onClick={() => { setCategory('All finds'); setSearch(''); }} aria-label="Handcrafted home">
          <span className="brand-mark">h<span>✳</span></span><span className="brand-name">handcrafted<span className="brand-dot">.</span><small>GOOD THINGS, MADE WITH CARE</small></span>
        </button>
        <div className="search-wrap">
          <span className="search-icon">⌕</span>
          <input aria-label="Search products" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search for something lovely..." />
          {search && <button className="clear-search" onClick={() => setSearch('')} aria-label="Clear search">×</button>}
          <kbd>↵</kbd>
        </div>
        <div className="header-actions">
          <button className="header-action account-action" onClick={() => user ? setUser(null) : setAuthMode('login')}>
            <span className="action-icon">♙</span><span><small>{user ? 'Hello,' : 'Welcome'}</small><strong>{user || 'Login / Sign up'}</strong></span>
          </button>
          <button className="header-action bag-action" onClick={() => setCartOpen(true)}>
            <span className="bag-icon">♧<i>{cartCount}</i></span><span><small>Your</small><strong>Bag</strong></span>
          </button>
        </div>
      </header>

      <nav className={`category-nav ${mobileMenu ? 'mobile-visible' : ''}`} aria-label="Product categories">
        {categories.map((item) => <button key={item.name} className={category === item.name ? 'nav-category active' : 'nav-category'} onClick={() => { setCategory(item.name); setMobileMenu(false); }}><span>{item.icon}</span>{item.name}</button>)}
        <span className="nav-spacer" />
        <span className="nav-note">Made for your everyday ✨</span>
      </nav>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span /> THE THOUGHTFUL EDITION</div>
            <h1>Find your kind<br />of <em>everyday</em> magic.</h1>
            <p>Useful things. Beautiful details. Pieces made to be loved a little longer.</p>
            <button className="primary-button" onClick={() => { setCategory('All finds'); document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' }); }}>Explore the collection <span>↗</span></button>
            <div className="hero-proof"><span className="proof-stars">★★★★★</span><span>Loved by 12,000+ happy homes</span></div>
          </div>
          <div className="hero-visual">
            <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=90" alt="Warm, thoughtfully styled living room" />
            <div className="hero-sticker"><span>GOOD</span><strong>things</strong><span>LIVE HERE ✳</span></div>
            <div className="hero-caption"><span className="caption-dot" /> THE SLOW LIVING COLLECTION <span>01 / 04</span></div>
          </div>
          <div className="hero-side-note">DESIGNED TO BE KEPT · MADE TO BE USED</div>
        </section>

        <section className="benefits" aria-label="Store benefits">
          <div><span className="benefit-icon">♧</span><span><strong>Thoughtfully chosen</strong><small>Quality over quantity, always</small></span></div>
          <div><span className="benefit-icon">♧</span><span><strong>Made with care</strong><small>Details that make a difference</small></span></div>
          <div><span className="benefit-icon">↗</span><span><strong>Easy, happy delivery</strong><small>Free over ₹1,499</small></span></div>
          <div><span className="benefit-icon">♡</span><span><strong>Here to help</strong><small>A real human when you need us</small></span></div>
        </section>

        <section className="shop-section" id="shop">
          <div className="section-heading">
            <div><div className="eyebrow">A FEW GOOD FINDS</div><h2>{search ? 'Search results' : category === 'All finds' ? 'Your next favourite thing.' : category + '.'}</h2><p>Everyday essentials, with a little extra something.</p></div>
            <div className="sort-wrap"><span>{filteredProducts.length} items</span><select aria-label="Sort products" onChange={(event) => { if (event.target.value === 'low') setCategory(category); }}><option value="featured">Sort: Featured</option><option value="low">Price: Low to high</option></select></div>
          </div>
          <div className="product-grid">
            {filteredProducts.map((product, index) => <article className="product-card" key={product.id}>
              <div className="product-image" style={{ backgroundColor: product.color }}>
                <img src={product.image} alt={product.name} loading={index > 3 ? 'lazy' : 'eager'} />
                {product.tag && <span className="product-tag">{product.tag}</span>}
                <button className="wishlist" aria-label={`Save ${product.name} to wishlist`} onClick={() => setNotice('Wishlist is coming soon ♡')}>♡</button>
                <button className="quick-add" onClick={() => addToCart(product)}>+ Add to bag</button>
              </div>
              <div className="product-meta"><span>{product.category}</span><span className="rating">★ {product.rating} <small>({product.reviews})</small></span></div>
              <h3>{product.name}</h3>
              <div className="price-line"><strong>{money(product.price)}</strong>{product.oldPrice && <del>{money(product.oldPrice)}</del>}{product.oldPrice && <span className="discount">{Math.round((1 - product.price / product.oldPrice) * 100)}% off</span>}</div>
            </article>)}
          </div>
          {filteredProducts.length === 0 && <div className="empty-results"><span>⌕</span><h3>No finds just yet</h3><p>Try another search or browse all of our thoughtful finds.</p><button className="outline-button" onClick={() => { setSearch(''); setCategory('All finds'); }}>Show all products</button></div>}
          <div className="collection-cta"><span>GOOD THINGS TAKE A LITTLE THOUGHT.</span><p>Find the pieces that feel like you.</p><button className="outline-button" onClick={() => { setCategory('All finds'); setSearch(''); }}>Shop all finds <span>→</span></button></div>
        </section>

        <section className="newsletter">
          <div><div className="eyebrow">A NOTE FROM US</div><h2>A little lovely in your inbox.</h2><p>New finds, thoughtful ideas and the occasional little treat. Never the noise.</p></div>
          <form onSubmit={(event) => { event.preventDefault(); setNotice('Thanks for joining our little corner!'); window.setTimeout(() => setNotice(''), 2800); }}><input type="email" required placeholder="Your email address" aria-label="Email for newsletter" /><button type="submit">Count me in ↗</button></form>
        </section>
      </main>

      <footer className="site-footer"><div className="footer-brand">handcrafted<span>.</span><p>Everyday things, with a little more heart.</p></div><div className="footer-links"><span>SHOP</span><button onClick={() => setCategory('Home & Living')}>Home & Living</button><button onClick={() => setCategory('Accessories')}>Accessories</button><button onClick={() => setCategory('Lifestyle')}>Lifestyle</button></div><div className="footer-links"><span>HERE TO HELP</span><button onClick={() => setNotice('Support details will be added soon.')}>Contact us</button><button onClick={() => setNotice('Shipping details will be added soon.')}>Shipping & returns</button><button onClick={() => setNotice('FAQ page coming soon.')}>FAQs</button></div><div className="footer-bottom">© 2026 Handcrafted Store <span>Made for the everyday moments. ✳</span></div></footer>

      {notice && <div className="toast" role="status"><span>✓</span>{notice}<button onClick={() => setNotice('')} aria-label="Dismiss notification">×</button></div>}

      {authMode && <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setAuthMode(null); }}>
        <section className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-title">
          <button className="modal-close" onClick={() => setAuthMode(null)} aria-label="Close">×</button>
          <div className="auth-brand">h<span>✳</span></div>
          <div className="eyebrow">{authMode === 'signup' ? 'YOUR LITTLE CORNER' : authMode === 'forgot' ? 'NO WORRIES' : 'WELCOME BACK'}</div>
          <h2 id="auth-title">{authMode === 'signup' ? 'Make yourself at home.' : authMode === 'forgot' ? 'Forgot your password?' : 'Lovely to see you.'}</h2>
          <p>{authMode === 'signup' ? 'Create an account to save your favourites and make checkout a breeze.' : authMode === 'forgot' ? 'Enter your email and we’ll help you get back in.' : 'Sign in to pick up right where you left off.'}</p>
          <form className="auth-form" onSubmit={submitAuth}>
            {authMode === 'signup' && <label>Your name<input name="name" autoComplete="name" placeholder="What should we call you?" required /></label>}
            <label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
            {authMode !== 'forgot' && <label>Password<input name="password" type="password" autoComplete={authMode === 'signup' ? 'new-password' : 'current-password'} placeholder={authMode === 'signup' ? 'At least 8 characters' : 'Enter your password'} minLength={authMode === 'signup' ? 8 : 1} required /></label>}
            {authMode === 'login' && <button type="button" className="forgot-link" onClick={() => setAuthMode('forgot')}>Forgot password?</button>}
            <button className="primary-button auth-submit" type="submit">{authMode === 'signup' ? 'Create account' : authMode === 'forgot' ? 'Send reset link' : 'Sign in'} <span>↗</span></button>
          </form>
          <div className="auth-switch">{authMode === 'login' ? 'New around here?' : authMode === 'signup' ? 'Already have an account?' : 'Remembered your password?'} <button onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}>{authMode === 'login' ? 'Create an account' : 'Sign in'}</button></div>
          <small className="demo-note">Frontend demo only. Connect your authentication API before production.</small>
        </section>
      </div>}

      {cartOpen && <div className="drawer-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setCartOpen(false); }}>
        <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
          <div className="drawer-heading"><div><div className="eyebrow">THE GOOD STUFF</div><h2 id="cart-title">Your bag <span>({cartCount})</span></h2></div><button className="modal-close" onClick={() => setCartOpen(false)} aria-label="Close cart">×</button></div>
          {cartItems.length === 0 ? <div className="empty-cart"><span>♧</span><h3>Your bag is taking a little nap.</h3><p>Let's find something lovely to put in it.</p><button className="primary-button" onClick={() => setCartOpen(false)}>Explore finds ↗</button></div> : <>
            <div className="cart-items">{cartItems.map((product) => <div className="cart-item" key={product.id}><img src={product.image} alt={product.name} /><div className="cart-item-info"><span>{product.category}</span><strong>{product.name}</strong><b>{money(product.price)}</b><div className="quantity-control"><button onClick={() => changeQuantity(product.id, -1)} aria-label="Decrease quantity">−</button><span>{cart[product.id]}</span><button onClick={() => changeQuantity(product.id, 1)} aria-label="Increase quantity">+</button></div></div><button className="remove-item" onClick={() => changeQuantity(product.id, -cart[product.id])} aria-label={`Remove ${product.name}`}>×</button></div>)}</div>
            <div className="cart-summary"><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><p>{subtotal >= 1499 ? 'Lovely! Your delivery is on us.' : `You’re ${money(1499 - subtotal)} away from free delivery.`}</p><div className="shipping-progress"><span style={{ width: `${Math.min(100, subtotal / 1499 * 100)}%` }} /></div><button className="primary-button checkout-button" onClick={() => { setCartOpen(false); setNotice('Checkout will be connected when the backend is ready.'); window.setTimeout(() => setNotice(''), 3000); }}>Continue to checkout ↗</button><small>Taxes and delivery calculated at checkout.</small></div>
          </>}
        </aside>
      </div>}
    </div>
  )
}
