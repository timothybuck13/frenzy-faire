import { useState, useEffect, useRef, useCallback, useMemo } from 'react'

/* ───────── lightbox component ───────── */
function Lightbox({ allPhotos, currentIndex, onClose, onPrev, onNext }) {
  const photo = allPhotos[currentIndex]

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  const arrowStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: 'rgba(255,255,255,0.7)',
    fontSize: '2.5rem',
    cursor: 'pointer',
    padding: '1rem',
    zIndex: 10000,
    lineHeight: 1,
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(0,0,0,0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {currentIndex > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev() }}
          style={{ ...arrowStyle, left: '0.5rem' }}
          aria-label="Previous photo"
        >
          ‹
        </button>
      )}
      <img
        src={photo.src}
        alt={photo.alt}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '85vw',
          maxHeight: '95vh',
          objectFit: 'contain',
          cursor: 'default',
        }}
      />
      {currentIndex < allPhotos.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext() }}
          style={{ ...arrowStyle, right: '0.5rem' }}
          aria-label="Next photo"
        >
          ›
        </button>
      )}
    </div>
  )
}

/* ───────── photo data ───────── */
const photos = [
  // Row 1: Hero pair — storefront + owners in doorway
  { src: '/photos/storefront.jpg', alt: 'Frenzy Faire storefront on Union Street', w: 2000, h: 1330 },
  // Row 2: Interior atmosphere
  { src: '/photos/interior-1.jpg', alt: 'Vintage clothing rack bathed in afternoon light', w: 1331, h: 2000 },
  { src: '/photos/interior-2.jpg', alt: 'Handcrafted ceramic vase with dried flowers on carved table', w: 1125, h: 2000 },
  { src: '/photos/doorway.jpg', alt: 'View through the Frenzy Faire door into the store', w: 1325, h: 2000 },

  // Row 3: Ceramics detail

  // Row 4: Ceramics detail
  { src: '/photos/ceramics.jpg', alt: 'Handpainted ceramic mugs and candle holders', w: 1500, h: 2000 },
  { src: '/photos/flower-mug.jpg', alt: 'Handcrafted flower mug', w: 1125, h: 2000 },
  { src: '/photos/ahn-lee-cups.jpg', alt: 'Ahn Lee ceramic cups', w: 2000, h: 1600 },

  // Row 5: Candles and vases
  { src: '/photos/candle-holder.jpg', alt: 'North Beach handcrafted candle holder', w: 1500, h: 2000 },
  { src: '/photos/candle-snuffers.jpg', alt: 'Handcrafted ceramic candle snuffers', w: 2000, h: 1500 },
  { src: '/photos/candle-holders.jpg', alt: 'Handcrafted candle holders', w: 1500, h: 2000 },

  // Row 6: Vases and platters
  { src: '/photos/large-green-ceramic-vase.jpg', alt: 'Large green ceramic vase', w: 1500, h: 2000 },
  { src: '/photos/ceramic-flower-vase.jpg', alt: 'Handcrafted ceramic flower vase', w: 1500, h: 2000 },

  // Row 7: Large platter
  { src: '/photos/large-ceramic-platter.jpg', alt: 'Large handcrafted ceramic platter', w: 1500, h: 2000 },

  // Row 8: Moroccan + Berber collection
  { src: '/photos/moroccan-collection.jpg', alt: 'Moroccan collection', w: 1500, h: 2000 },
  { src: '/photos/vintage-berber-pottery.jpg', alt: 'Vintage Berber pottery', w: 1500, h: 2000 },

  // Row 9: Berber necklaces + mid century prints (landscape pair)
  { src: '/photos/berber-necklaces.jpg', alt: 'Berber necklaces', w: 2000, h: 1331 },
  { src: '/photos/mid-century-art-prints.jpg', alt: 'Mid century modern art prints', w: 1125, h: 2000 },

  // Row 10: Vintage clothing
  { src: '/photos/vintage-clothing.jpg', alt: 'Vintage clothing display', w: 2000, h: 1325 },

  // Row 11: Clothing details (landscape strip)
  { src: '/photos/vintage-clothing-details-1.jpg', alt: 'Vintage clothing detail', w: 2000, h: 1331 },
  { src: '/photos/vintage-clothing-details-2.jpg', alt: 'Vintage clothing detail', w: 2000, h: 1331 },
  // Row 12: More clothing details
  { src: '/photos/vintage-clothing-details-5.jpg', alt: 'Vintage clothing detail', w: 1331, h: 2000 },
  { src: '/photos/vintage-clothing-details-6.jpg', alt: 'Vintage clothing detail', w: 2000, h: 1331 },

  // Vintage textile details
  { src: '/photos/vintage-textile-details.jpg', alt: 'Vintage textile details', w: 2000, h: 1331 },
]

/* ───────── opening party photos (separate section) ───────── */
const openingPartyPhotos = [
  { src: '/photos/storefront-opening-party.jpg', alt: 'Storefront during opening party', w: 2000, h: 1330 },
  { src: '/photos/opening-party.jpg', alt: 'Opening party', w: 2000, h: 1325 },
  { src: '/photos/owners.jpg', alt: 'The owners', w: 2000, h: 1325 },
]

/* ───────── lazy image component ───────── */
function LazyImage({ src, alt, className, style }) {
  const [loaded, setLoaded] = useState(false)
  const [inView, setInView] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } },
      { rootMargin: '200px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={className} style={style}>
      {inView && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        />
      )}
    </div>
  )
}

/* ───────── photos used above the gallery (don't repeat) ───────── */
const featuredSrcs = new Set([
  '/photos/storefront.jpg',
  '/photos/flower-mug.jpg',
  '/photos/interior-1.jpg',
  '/photos/mid-century-art-prints.jpg',
])

/* ───────── gallery component (masonry) ───────── */
function Gallery({ photoList, onImageClick }) {
  const COLS = 3
  const GAP = 6

  const columns = Array.from({ length: COLS }, () => ({ photos: [], height: 0 }))
  photoList.forEach((p) => {
    const shortest = columns.reduce((min, col, i) =>
      col.height < columns[min].height ? i : min, 0)
    columns[shortest].photos.push(p)
    columns[shortest].height += p.h / p.w
  })

  return (
    <div style={{ display: 'flex', gap: `${GAP}px`, alignItems: 'stretch' }}>
      {columns.map((col, ci) => (
        <div key={ci} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: `${GAP}px` }}>
          {col.photos.map((p, pi) => (
            <div
              key={pi}
              onClick={() => onImageClick && onImageClick(p)}
              style={{
                cursor: 'pointer',
                flex: `${p.h / p.w} 1 0%`,
                overflow: 'hidden',
                minHeight: 0,
              }}
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="gallery-img"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

/* ───────── main app ───────── */
export default function App() {
  const [lightboxIndex, setLightboxIndex] = useState(-1)
  const appleMapsUrl = "https://maps.apple.com/place?address=484%20Union%20St,%20San%20Francisco,%20CA%20%2094133,%20United%20States&coordinate=37.800784,-122.407413&name=Frenzy%20Faire&place-id=I2A466D0813820E2D&map=explore"

  // Build flat list of all tappable photos in page order
  const featuredTrioPhotos = [
    { src: '/photos/flower-mug.jpg', alt: 'Handcrafted flower mug' },
    { src: '/photos/interior-1.jpg', alt: 'Frenzy Faire interior' },
    { src: '/photos/mid-century-art-prints.jpg', alt: 'Mid century modern art prints' },
  ]
  const galleryPhotos = photos.filter(p => !featuredSrcs.has(p.src))
  const allTappable = useMemo(() => [...featuredTrioPhotos, ...galleryPhotos, ...openingPartyPhotos], [])

  const openLightbox = useCallback((photo) => {
    const idx = allTappable.findIndex(p => p.src === photo.src)
    setLightboxIndex(idx >= 0 ? idx : 0)
  }, [allTappable])

  const closeLightbox = useCallback(() => setLightboxIndex(-1), [])
  const prevPhoto = useCallback(() => setLightboxIndex(i => Math.max(0, i - 1)), [])
  const nextPhoto = useCallback(() => setLightboxIndex(i => Math.min(allTappable.length - 1, i + 1)), [allTappable])

  return (
    <div>
      {lightboxIndex >= 0 && (
        <Lightbox
          allPhotos={allTappable}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}

      {/* Hero — storefront background */}
      <section
        className="relative flex items-center justify-center"
        style={{ minHeight: '100vh' }}
      >
        <div
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url(/photos/storefront.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.45) 100%)',
          }}
        />
        <div className="relative text-center px-6">
          <img
            src="/logo.png"
            alt="Frenzy Faire — Handcrafted & Vintage Goods"
            style={{
              maxWidth: 'clamp(280px, 50vw, 500px)',
              height: 'auto',
              filter: 'invert(1)',
            }}
          />
          <p
            className="text-white mt-3"
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: 'clamp(0.8rem, 1.5vw, 1rem)',
              letterSpacing: '0.05em',
              textShadow: '0 2px 12px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.5)',
            }}
          >
            484 Union Street, North Beach, San Francisco
          </p>
          <p
            className="text-white mt-2"
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: 'clamp(0.8rem, 1.5vw, 1rem)',
              letterSpacing: '0.05em',
              textShadow: '0 2px 12px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.5)',
            }}
          >
            Thursday – Sunday, 12 – 6pm
          </p>
        </div>

        {/* Scroll indicator — positioned at bottom of hero viewport */}
        <div
          className="scroll-indicator"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            opacity: 0.7,
            animation: 'bounce 2s ease infinite',
            cursor: 'pointer',
          }}
        >
          <svg
            width="24" height="24" viewBox="0 0 24 24"
            fill="none" stroke="white" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </section>

      {/* About + Instagram button */}
      <section id="about" className="py-20 md:py-28">
        <div className="max-w-2xl mx-auto px-6 md:px-8">
          <p
            className="leading-relaxed"
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: '1em',
              lineHeight: 1.7,
              letterSpacing: '0.02em',
            }}
          >
            Frenzy Faire offers{' '}
            <a href="https://www.instagram.com/alyssamarieguerrero/" target="_blank" rel="noopener noreferrer" className="text-black underline">
              Alyssa Guerrero
            </a>'s handcrafted ceramics and jewelry, alongside her curated vintage home goods and clothing from around the world. This special North Beach shop is born of Alyssa's love of texture, color, pattern, and the tactile process of creating by hand.
          </p>
          <a
            href="https://www.instagram.com/frenzyfaire/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 mt-8 px-5 py-2.5 border border-black text-black no-underline hover:bg-black hover:text-white transition-colors"
            style={{
              fontFamily: "'Georgia', serif",
              letterSpacing: '0.05em',
              fontSize: '0.8em',
              textDecoration: 'none',
            }}
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            Follow @frenzyfaire
          </a>
        </div>
      </section>

      {/* Featured trio */}
      <section className="pb-0">
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 6px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
            <div className="gallery-img" onClick={() => openLightbox({ src: '/photos/flower-mug.jpg', alt: 'Handcrafted flower mug' })} style={{ width: '100%', aspectRatio: '3/4', overflow: 'hidden', cursor: 'pointer' }}>
              <img src="/photos/flower-mug.jpg" alt="Handcrafted flower mug" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div className="gallery-img" onClick={() => openLightbox({ src: '/photos/interior-1.jpg', alt: 'Frenzy Faire interior' })} style={{ width: '100%', aspectRatio: '3/4', overflow: 'hidden', cursor: 'pointer' }}>
              <img src="/photos/interior-1.jpg" alt="Frenzy Faire interior" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div className="gallery-img" onClick={() => openLightbox({ src: '/photos/mid-century-art-prints.jpg', alt: 'Mid century modern art prints' })} style={{ width: '100%', aspectRatio: '3/4', overflow: 'hidden', cursor: 'pointer' }}>
              <img src="/photos/mid-century-art-prints.jpg" alt="Mid century modern art prints" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Gift Card button */}
      <section className="py-10 md:py-14">
        <div className="max-w-2xl mx-auto px-6 md:px-8 text-center flex items-center justify-center" style={{ minHeight: '8rem' }}>
          <a
            href="https://app.squareup.com/gift/MLJZ93FYMD68M/order"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 border border-black text-black no-underline hover:bg-black hover:text-white transition-colors"
            style={{
              fontFamily: "'Georgia', serif",
              letterSpacing: '0.05em',
              fontSize: '0.875em',
              textDecoration: 'none',
            }}
          >
            Buy a Gift Card
          </a>
        </div>
      </section>

      {/* Main Gallery */}
      <section className="pb-0">
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 6px' }}>
          <Gallery photoList={photos.filter(p => !featuredSrcs.has(p.src))} onImageClick={openLightbox} />
        </div>
      </section>

      {/* Mailing List button */}
      <section className="py-10 md:py-14">
        <div className="max-w-2xl mx-auto px-6 md:px-8 text-center flex items-center justify-center" style={{ minHeight: '8rem' }}>
          <a
            href="https://squareup.com/outreach/rjqyGM/subscribe"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 border border-black text-black no-underline hover:bg-black hover:text-white transition-colors"
            style={{
              fontFamily: "'Georgia', serif",
              letterSpacing: '0.05em',
              fontSize: '0.875em',
              textDecoration: 'none',
            }}
          >
            Join the Mailing List
          </a>
        </div>
      </section>

      {/* Opening Party */}
      <section className="pb-0">
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 6px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
            {openingPartyPhotos.map((p, i) => (
              <div key={i} onClick={() => openLightbox(p)} style={{ cursor: 'pointer', aspectRatio: '3/2', overflow: 'hidden' }}>
                <img src={p.src} alt={p.alt} loading="lazy" className="gallery-img" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24">
        <div className="max-w-2xl mx-auto px-6 md:px-8 text-center">
          <p
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: '0.85em',
              letterSpacing: '0.03em',
              color: '#666',
            }}
          >
            484 Union Street, North Beach, San Francisco
          </p>
        </div>
      </footer>
    </div>
  )
}
