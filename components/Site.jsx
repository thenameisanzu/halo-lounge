'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence, MotionConfig, useMotionValue, useMotionTemplate, useSpring } from 'framer-motion'
import { Minus, Plus, MapPin } from 'lucide-react'

// ---- Edit content here ----
const CO = { whatsapp: '910000000000', address: 'Rooftop, Building name, Marine Drive, Kochi', hours: 'Every day, 5 pm to 2 am' }
const EVENTS = [
  ['Friday', 'Sunset sessions with a live DJ', '7 pm onwards', '#FF2E93', '/events/friday-sunset-dj.jpg'],
  ['Saturday', 'Acoustic nights, local artists', '8 pm onwards', '#7C3AED', '/events/saturday-acoustic.jpg'],
  ['Sunday', 'Rooftop brunch and vinyl', '12 pm to 4 pm', '#22D3EE', '/events/sunday-brunch.jpg']
]
const DRINKS = [
  ['Monsoon Negroni', 'Gin, vermouth, smoked jaggery', '₹650', '#FF2E93', '/drinks/monsoon-negroni.jpg'],
  ['Kerala Sour', 'Rum, tender coconut, lime', '₹590', '#22D3EE', '/drinks/kerala-sour.jpg'],
  ['Malabar Mule', 'Vodka, ginger, curry leaf', '₹620', '#FFB020', '/drinks/malabar-mule.jpg'],
  ['Midnight Chai', 'Whisky, masala chai, cardamom foam', '₹680', '#7C3AED', '/drinks/midnight-chai.jpg']
]
const LINKS = [['events', 'Events'], ['menu', 'Menu'], ['reserve', 'Reserve']]
const wa = (t) => `https://wa.me/${CO.whatsapp}?text=${encodeURIComponent(t)}`
const glass = 'rounded-3xl bg-white/[.07] ring-1 ring-white/15 backdrop-blur-xl'
const to = (id) => document.getElementById(id).scrollIntoView({ behavior: 'smooth' })

function Aurora() {
  const b = [['#FF2E93', '-10%', '-5%', 22], ['#7C3AED', '55%', '20%', 26], ['#22D3EE', '10%', '60%', 30]]
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-night" aria-hidden>
      {b.map(([c, l, t, d], i) => (
        <motion.div key={i} className="absolute h-[55vmax] w-[55vmax] rounded-full opacity-45 blur-[100px]" style={{ background: c, left: l, top: t }} animate={{ x: ['0vw', i % 2 ? '-18vw' : '18vw', '0vw'], y: ['0vh', '14vh', '0vh'] }} transition={{ duration: d, repeat: Infinity, ease: 'easeInOut' }} />))}
    </div>
  )
}

function Island() {
  const [open, setOpen] = useState(false)
  return (
    <div className="fixed inset-x-0 top-3 z-50 flex justify-center pt-[env(safe-area-inset-top)]">
      <motion.div layout style={{ borderRadius: 28 }} transition={{ type: 'spring', stiffness: 380, damping: 32 }} className={`overflow-hidden bg-black/80 text-white ring-1 ring-white/20 backdrop-blur-xl ${open ? 'w-[min(92vw,380px)] p-5' : ''}`}>
        <motion.button layout="position" onClick={() => setOpen(!open)} className="flex w-full items-center justify-between gap-6 px-5 py-2.5" aria-expanded={open}>
          <span className="font-display text-sm tracking-wide">HALO</span>
          <span className="flex h-4 items-end gap-[3px]">{[0, 1, 2, 3].map((i) => <motion.span key={i} className="h-4 w-[3px] origin-bottom rounded-full bg-aqua" animate={{ scaleY: [.3, 1, .5, .9, .3] }} transition={{ duration: 1.1 + i * .17, repeat: Infinity }} />)}</span>
        </motion.button>
        {open && (
          <div className="mt-2">
            {LINKS.map(([id, l], i) => (
              <motion.button key={id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .12 + i * .06 }} onClick={() => { setOpen(false); to(id) }} className="block w-full border-t border-white/15 py-4 text-left font-display text-2xl">{l}</motion.button>))}
          </div>)}
      </motion.div>
    </div>
  )
}

function Tilt({ d }) {
  const rx = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 })
  const ry = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 })
  return (
    <motion.div style={{ rotateX: rx, rotateY: ry, transformPerspective: 700 }}
      onPointerMove={(e) => { const b = e.currentTarget.getBoundingClientRect(); ry.set(((e.clientX - b.left) / b.width - .5) * 18); rx.set(-((e.clientY - b.top) / b.height - .5) * 18) }}
      onPointerLeave={() => { rx.set(0); ry.set(0) }} className={`${glass} group relative flex flex-col justify-between overflow-hidden p-5 transition-shadow hover:shadow-2xl hover:shadow-pink/10`}>
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-60 blur-3xl" style={{ background: d[3] }} />
      <div>
        <div className="relative mb-4 h-48 w-full overflow-hidden rounded-2xl bg-white/5">
          <img src={d[4]} alt={d[0]} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
        <p className="relative font-display text-xl leading-tight">{d[0]}</p>
        <p className="relative mt-2 text-sm text-white/70">{d[1]}</p>
      </div>
      <p className="relative mt-6 font-display text-2xl font-bold" style={{ color: d[3] }}>{d[2]}</p>
    </motion.div>
  )
}

export default function Site() {
  const mx = useMotionValue(-500), my = useMotionValue(-500)
  const spot = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, rgba(255,255,255,.09), transparent 60%)`
  const [guests, setGuests] = useState(2)
  const [showCta, setShowCta] = useState(false)
  useEffect(() => {
    const m = (e) => { mx.set(e.clientX); my.set(e.clientY) }
    const s = () => setShowCta(scrollY > 500)
    addEventListener('pointermove', m); addEventListener('scroll', s, { passive: true })
    return () => { removeEventListener('pointermove', m); removeEventListener('scroll', s) }
  }, [])
  const reserve = (e) => {
    e.preventDefault(); const f = new FormData(e.target)
    open(wa(`Hi Halo, table request.\nName: ${f.get('name')}\nGuests: ${guests}\nDate: ${f.get('date')}\nTime: ${f.get('time')}`), '_blank')
  }
  const field = 'w-full rounded-2xl bg-white/10 px-5 py-4 ring-1 ring-white/20 placeholder:text-white/40'

  return (
    <MotionConfig reducedMotion="user">
      <Aurora />
      <motion.div className="pointer-events-none fixed inset-0 z-[5]" style={{ background: spot }} aria-hidden />
      <Island />

      <section className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden pb-10 pt-24">
        <h1 aria-label="Halo" className="flex items-center justify-center whitespace-nowrap px-4 text-center font-display text-[18vw] font-extrabold leading-none tracking-tight sm:text-[20vw] md:text-[18vw] lg:text-[16vw]">
          {'HALO'.split('').map((c, i) => <motion.span key={i} aria-hidden className="inline-block bg-gradient-to-b from-white to-pink bg-clip-text text-transparent" initial={{ y: 80, opacity: 0 }} animate={{ y: [0, -14, 0], opacity: 1 }} transition={{ y: { duration: 3, delay: 1 + i * .2, repeat: Infinity, ease: 'easeInOut' }, opacity: { delay: .2 + i * .12 } }}>{c}</motion.span>)}
        </h1>
        <p className="mx-auto mt-6 max-w-xs text-center text-lg text-white/80 md:max-w-md md:text-2xl">Rooftop lounge in Kochi. Cocktails, live music and the best sunset on the water.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3 px-4">
          <button onClick={() => to('reserve')} className="rounded-full bg-pink px-6 py-3.5 text-sm font-bold sm:px-7 sm:py-4 sm:text-base transition hover:opacity-90 active:scale-95">Reserve a table</button>
          <button onClick={() => to('menu')} className="rounded-full px-6 py-3.5 text-sm font-bold ring-1 ring-white/40 sm:px-7 sm:py-4 sm:text-base transition hover:bg-white/10 active:scale-95">See the menu</button>
        </div>
        <div className="mt-14 space-y-3 font-display text-4xl font-bold sm:text-5xl md:text-7xl">
          {[['outline', ['0%', '-50%']], ['text-aqua', ['-50%', '0%']]].map(([cls, x], r) => (
            <div key={r} className="overflow-hidden whitespace-nowrap"><motion.div className={`flex w-max gap-8 ${cls}`} animate={{ x }} transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}>{Array(8).fill(r ? 'Sunset views • Live DJ •' : 'Signature cocktails • Rooftop •').map((t, i) => <span key={i}>{t}</span>)}</motion.div></div>))}
        </div>
      </section>

      <section id="events" className="mx-auto max-w-3xl scroll-mt-20 px-5 py-24">
        <h2 className="font-display text-4xl font-bold md:text-6xl">This week at Halo</h2>
        <div className="mt-12">
          {EVENTS.map(([day, t, time, c, img], i) => (
            <div key={day} className={`${glass} mb-6 overflow-hidden p-6 md:sticky`} style={{ top: 88 + i * 16 }}>
              <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full opacity-50 blur-3xl" style={{ background: c }} />
              <div className="relative grid gap-5 md:grid-cols-2 md:items-center">
                <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-white/5 sm:h-56 md:h-52">
                  <img src={img} alt={`${day} - ${t}`} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                </div>
                <div>
                  <p className="font-display text-3xl">{day}</p>
                  <p className="mt-3 text-lg text-white/80">{t}</p>
                  <p className="mt-1 text-white/60">{time}</p>
                  <a href={wa(`Hi Halo, I'd like to join ${day}: ${t}.`)} className="mt-6 inline-block rounded-full px-6 py-3 font-bold text-night transition hover:opacity-90 active:scale-95" style={{ background: c }}>Book for {day}</a>
                </div>
              </div>
            </div>))}
        </div>
      </section>

      <section id="menu" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
        <h2 className="font-display text-4xl font-bold md:text-6xl">Signature drinks</h2>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{DRINKS.map((d) => <Tilt key={d[0]} d={d} />)}</div>
      </section>

      <section id="reserve" className="mx-auto max-w-xl scroll-mt-20 px-5 py-24">
        <h2 className="font-display text-4xl font-bold md:text-6xl">Reserve</h2>
        <form onSubmit={reserve} className={`${glass} mt-10 space-y-3 p-5`}>
          <input name="name" required placeholder="Your name" className={field} />
          <div className="flex items-center justify-between rounded-2xl bg-white/10 px-5 py-3 ring-1 ring-white/20"><span>Guests</span>
            <span className="flex items-center gap-4"><button type="button" aria-label="Fewer guests" onClick={() => setGuests(Math.max(1, guests - 1))} className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-white/40"><Minus size={18} /></button><span className="w-6 text-center font-display text-lg">{guests}</span><button type="button" aria-label="More guests" onClick={() => setGuests(guests + 1)} className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-white/40"><Plus size={18} /></button></span></div>
          <div className="grid grid-cols-2 gap-3"><input name="date" type="date" required className={field} /><select name="time" className={field}>{['7:00 pm', '8:00 pm', '9:00 pm', '10:00 pm'].map((t) => <option key={t} className="text-black">{t}</option>)}</select></div>
          <button className="w-full rounded-full bg-aqua py-4 font-bold text-night">Request on WhatsApp</button>
        </form>
        <p className="mt-10 flex items-start gap-2 text-white/80"><MapPin className="mt-1 shrink-0" size={18} />{CO.address}<br />{CO.hours}</p>
        <a href="https://www.google.com/maps/search/?api=1&query=Halo+Rooftop+Lounge+Kochi" target="_blank" rel="noreferrer" className="mt-4 inline-block rounded-full px-6 py-3 font-bold ring-1 ring-white/40">Open in Maps</a>
        <p className="mb-16 mt-16 text-sm text-white/40">Halo Rooftop Lounge. Please drink responsibly.</p>
      </section>

      <AnimatePresence>
        {showCta && <motion.button initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }} onClick={() => to('reserve')} style={{ bottom: 'max(18px, env(safe-area-inset-bottom))' }} className="fixed left-1/2 z-40 -translate-x-1/2 rounded-full bg-pink px-8 py-4 font-bold shadow-2xl">Reserve a table</motion.button>}
      </AnimatePresence>
    </MotionConfig>
  )
}

