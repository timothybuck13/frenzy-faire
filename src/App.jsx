import { useState, useEffect, useRef } from 'react'

/* ───────── photo data ───────── */
const photos = [
  // Row 1: Hero pair — storefront + owners in doorway
  { src: '/photos/storefront.jpg', alt: 'Frenzy Faire storefront on Union Street', w: 2000, h: 1330 },
  { src: '/photos/opening-party-owners.jpg', alt: 'Alyssa and Timothy in the Frenzy Faire doorway', w: 1325, h: 2000 },

  // Row 2: Interior atmosphere
  { src: '/photos/interior-1.jpg', alt: 'Vintage clothing rack bathed in afternoon light', w: 1331, h: 2000 },
  { src: '/photos/interior-2.jpg', alt: 'Handcrafted ceramic vase with dried flowers on carved table', w: 1125, h: 2000 },
  { src: '/photos/doorway.jpg', alt: 'View through the Frenzy Faire door into the store', w: 1325, h: 2000 },

  // Row 3: Ceramics shelf — wide panoramic
  { src: '/photos/ceramic-shelf.jpg', alt: 'Shelf of handcrafted ceramic pieces', w: 2000, h: 530 },

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
  { src: '/photos/ahn-lee-vase.jpg', alt: 'Ahn Lee vase', w: 2000, h: 2000 },
  { src: '/photos/ceramic-flower-vase.jpg', alt: 'Handcrafted ceramic flower vase', w: 1500, h: 2000 },

  // Row 7: Large platter + handcrafted candle holder (landscape)
  { src: '/photos/large-ceramic-platter.jpg', alt: 'Large handcrafted ceramic platter', w: 1500, h: 2000 },
  { src: '/photos/handcrafted-candle-holder.jpg', alt: 'Handcrafted candle holder detail', w: 2000, h: 1500 },

  // Row 8: Moroccan + Berber collection
  { src: '/photos/moroccan-collection.jpg', alt: 'Moroccan collection', w: 1500, h: 2000 },
  { src: '/photos/vintage-berber-pottery.jpg', alt: 'Vintage Berber pottery', w: 1500, h: 2000 },
  { src: '/photos/berber-textiles.jpg', alt: 'Berber textiles', w: 1500, h: 2000 },

  // Row 9: Berber necklaces + mid century prints (landscape pair)
  { src: '/photos/berber-necklaces.jpg', alt: 'Berber necklaces', w: 2000, h: 1331 },
  { src: '/photos/mid-century-art-prints.jpg', alt: 'Mid century modern art prints', w: 1125, h: 2000 },

  // Row 10: Vintage clothing
  { src: '/photos/vintage-clothing.jpg', alt: 'Vintage clothing display', w: 2000, h: 1325 },
  { src: '/photos/vintage-clothing-and-ceramic-mug.jpg', alt: 'Vintage clothing with ceramic mug', w: 1500, h: 2000 },

  // Row 11: Clothing details (landscape strip)
  { src: '/photos/vintage-clothing-details-1.jpg', alt: 'Vintage clothing detail', w: 2000, h: 1331 },
  { src: '/photos/vintage-clothing-details-2.jpg', alt: 'Vintage clothing detail', w: 2000, h: 1331 },
  { src: '/photos/vintage-clothing-details-3.jpg', alt: 'Vintage clothing detail', w: 2000, h: 1331 },

  // Row 12: More clothing details
  { src: '/photos/vintage-clothing-details-4.jpg', alt: 'Vintage clothing detail', w: 2000, h: 1331 },
  { src: '/photos/vintage-clothing-details-5.jpg', alt: 'Vintage clothing detail', w: 1331, h: 2000 },
  { src: '/photos/vintage-clothing-details-6.jpg', alt: 'Vintage clothing detail', w: 2000, h: 1331 },

  // Row 13: Textile details + Alyssa
  { src: '/photos/vintage-textile-details.jpg', alt: 'Vintage textile details', w: 2000, h: 1331 },
  { src: '/photos/alyssa.jpg', alt: 'Alyssa Guerrero in the store', w: 1500, h: 2000 },

  // Row 14: Opening party
  { src: '/photos/storefront-opening-party.jpg', alt: 'Storefront during opening party', w: 2000, h: 1330 },
  { src: '/photos/opening-party.jpg', alt: 'Opening party', w: 2000, h: 1325 },

  // Row 15: Party moments
  { src: '/photos/opening-party-ahn.jpg', alt: 'Ahn at the opening party', w: 1332, h: 2000 },
  { src: '/photos/opening-party-hugs.jpg', alt: 'Opening party hugs', w: 2000, h: 1330 },
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

/* ───────── gallery component (masonry) ───────── */
function Gallery() {
  const COLS = 3
  const GAP = 6

  // Distribute photos into columns, balancing total height
  const columns = Array.from({ length: COLS }, () => ({ photos: [], height: 0 }))
  photos.forEach((p) => {
    // Find shortest column
    const shortest = columns.reduce((min, col, i) =>
      col.height < columns[min].height ? i : min, 0)
    columns[shortest].photos.push(p)
    columns[shortest].height += p.h / p.w // normalized height
  })

  return (
    <div style={{ display: 'flex', gap: `${GAP}px`, alignItems: 'flex-start' }}>
      {columns.map((col, ci) => (
        <div key={ci} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: `${GAP}px` }}>
          {col.photos.map((p, pi) => (
            <LazyImage
              key={pi}
              src={p.src}
              alt={p.alt}
              className="gallery-img"
              style={{ width: '100%', aspectRatio: `${p.w}/${p.h}` }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

/* ───────── main app ───────── */
export default function App() {
  const appleMapsUrl = "https://maps.apple.com/place?address=484%20Union%20St,%20San%20Francisco,%20CA%20%2094133,%20United%20States&coordinate=37.800784,-122.407413&name=Frenzy%20Faire&place-id=I2A466D0813820E2D&map=explore"

  return (
    <div>

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
          <h1
            className="text-white font-normal tracking-wider"
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              lineHeight: 1.15,
              letterSpacing: '0.08em',
              textShadow: '0 2px 20px rgba(0,0,0,0.3)',
            }}
          >
            Frenzy Faire
          </h1>
          <p
            className="text-white/85 mt-4"
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: 'clamp(0.875rem, 2vw, 1.25rem)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textShadow: '0 1px 10px rgba(0,0,0,0.3)',
            }}
          >
            Handcrafted & Vintage Goods
          </p>
          <p
            className="text-white/70 mt-3"
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: 'clamp(0.8rem, 1.5vw, 1rem)',
              letterSpacing: '0.05em',
              textShadow: '0 1px 8px rgba(0,0,0,0.3)',
            }}
          >
            484 Union Street, North Beach, San Francisco
          </p>
          <p
            className="text-white/70 mt-2"
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: 'clamp(0.8rem, 1.5vw, 1rem)',
              letterSpacing: '0.05em',
              textShadow: '0 1px 8px rgba(0,0,0,0.3)',
            }}
          >
            Thursday – Sunday, 12 – 6pm
          </p>
        </div>

        {/* Scroll indicator — positioned at bottom of hero viewport */}
        <div
          className="scroll-indicator"
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

      {/* About */}
      <section className="py-20 md:py-28">
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
            Frenzy Faire is an eclectic collection of handcrafted ceramics, vintage home goods,
            jewelry, and clothing — curated by artist{' '}
            <a href="https://alyssaguerrero.com" target="_blank" rel="noopener noreferrer">
              Alyssa Guerrero
            </a>
            . Born of a love for texture, color, and the tactile process of
            creating by hand.
          </p>
        </div>
      </section>

      {/* Featured trio: pottery, interior, clothing */}
      <section className="pb-8 md:pb-12">
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 6px' }}>
          <div className="gallery-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
            <div className="gallery-img" style={{ width: '100%', aspectRatio: '3/4', overflow: 'hidden' }}>
              <img src="/photos/flower-mug.jpg" alt="Handcrafted flower mug" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div className="gallery-img" style={{ width: '100%', aspectRatio: '3/4', overflow: 'hidden' }}>
              <img src="/photos/interior-1.jpg" alt="Frenzy Faire interior" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div className="gallery-img" style={{ width: '100%', aspectRatio: '3/4', overflow: 'hidden' }}>
              <img src="/photos/vintage-clothing-and-ceramic-mug.jpg" alt="Vintage clothing and ceramic mug" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="py-20 md:py-28">
        <div className="max-w-2xl mx-auto px-6 md:px-8 text-center">
          <a
            href="https://www.instagram.com/frenzyfaire/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 no-underline group"
            style={{ textDecoration: 'none' }}
          >
            <svg
              className="w-7 h-7 transition-transform group-hover:scale-110"
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
            <span
              style={{
                fontFamily: "'Georgia', serif",
                fontSize: '1.5em',
                letterSpacing: '0.03em',
                color: '#000000',
              }}
            >
              Follow along @frenzyfaire
            </span>
          </a>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="pb-20 md:pb-28">
        <div className="gallery-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 6px' }}>
          <Gallery />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 md:py-16 border-t border-neutral-200">
        <div className="max-w-2xl mx-auto px-6 md:px-8 text-center">
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10"
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: '0.875em',
              letterSpacing: '0.05em',
            }}
          >
            <a
              href="https://squareup.com/outreach/rjqyGM/subscribe"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-black text-black no-underline transition-transform hover:scale-[1.025]"
              style={{
                fontFamily: "'Georgia', serif",
                letterSpacing: '0.05em',
                fontSize: '0.875em',
                textDecoration: 'none',
                minWidth: '11.25rem',
              }}
            >
              Join the Mailing List
            </a>
            <a
              href="https://app.squareup.com/gift/MLJZ93FYMD68M/order"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-black text-black no-underline transition-transform hover:scale-[1.025]"
              style={{
                fontFamily: "'Georgia', serif",
                letterSpacing: '0.05em',
                fontSize: '0.875em',
                textDecoration: 'none',
                minWidth: '11.25rem',
              }}
            >
              Buy a Gift Card
            </a>
          </div>
          <p
            className="text-neutral-400"
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: '0.75em',
              letterSpacing: '0.03em',
            }}
          >
            Built by{' '}
            <a
              href="https://timothybuck.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              Timothy Buck
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
