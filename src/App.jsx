export default function App() {
  const appleMapsUrl = "https://maps.apple.com/place?address=484%20Union%20St,%20San%20Francisco,%20CA%20%2094133,%20United%20States&coordinate=37.800784,-122.407413&name=Frenzy%20Faire&place-id=I2A466D0813820E2D&map=explore"

  const placeholders = [
    { label: "Photo 1", from: "#c4a882", to: "#a88b6a" },
    { label: "Photo 2", from: "#b89f7e", to: "#9a7f5e" },
    { label: "Photo 3", from: "#c9b08e", to: "#a8916e" },
    { label: "Photo 4", from: "#bfa47c", to: "#a0865c" },
    { label: "Photo 5", from: "#c2a07a", to: "#a3815a" },
    { label: "Photo 6", from: "#cbb494", to: "#ac9574" },
  ]

  return (
    <div>
      {/* Hero */}
      <section
        className="relative flex items-center justify-center"
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #c4a47a 0%, #a88860 40%, #8b6f4e 100%)',
        }}
      >
        <div className="text-center px-6">
          <h1
            className="text-white font-normal tracking-wider"
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              lineHeight: 1.15,
              letterSpacing: '0.08em',
            }}
          >
            Frenzy Faire
          </h1>
          <p
            className="text-white/80 mt-4"
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: 'clamp(0.875rem, 2vw, 1.25rem)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            Handcrafted & Vintage Goods
          </p>
          <p
            className="text-white/60 mt-3"
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: 'clamp(0.8rem, 1.5vw, 1rem)',
              letterSpacing: '0.05em',
            }}
          >
            North Beach, San Francisco
          </p>
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
            An eclectic collection of handcrafted ceramics, vintage home goods,
            jewelry, and clothing — curated by artist{' '}
            <a href="https://alyssaguerrero.com" target="_blank" rel="noopener noreferrer">
              Alyssa Guerrero
            </a>
            . Born of a love for texture, color, and the tactile process of
            creating by hand.
          </p>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {placeholders.map((ph, i) => (
              <div
                key={i}
                className="relative overflow-hidden"
                style={{
                  aspectRatio: '4 / 3',
                  background: `linear-gradient(135deg, ${ph.from}, ${ph.to})`,
                }}
              >
                <span
                  className="absolute inset-0 flex items-center justify-center text-white/30"
                  style={{
                    fontFamily: "'Georgia', serif",
                    fontSize: '0.875rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  {ph.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Us */}
      <section className="py-20 md:py-28 bg-neutral-50">
        <div className="max-w-2xl mx-auto px-6 md:px-8 text-center">
          <h2
            className="mb-10"
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: '1.75em',
              lineHeight: 1.25,
              fontWeight: 400,
              letterSpacing: '0.05rem',
            }}
          >
            Visit Us
          </h2>
          <div
            className="space-y-4"
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: '1em',
              lineHeight: 1.7,
            }}
          >
            <p>Thursday – Sunday, 12 – 6pm</p>
            <p>
              <a href={appleMapsUrl} target="_blank" rel="noopener noreferrer">
                484 Union Street, San Francisco
              </a>
            </p>
            <p>
              <a href="mailto:alyssa@frenzyfaire.com">
                alyssa@frenzyfaire.com
              </a>
            </p>
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
