import './globals.css'
import { Unbounded, Plus_Jakarta_Sans } from 'next/font/google'
const display = Unbounded({ subsets: ['latin'], variable: '--font-display' })
const body = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-body' })
export const metadata = { title: 'Halo Rooftop Lounge', description: 'Rooftop lounge, cocktails and live music in Kochi.' }
export const viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#0A0620' }
export default function RootLayout({ children }) {
  return (<html lang="en" className={`${display.variable} ${body.variable}`}><body>{children}</body></html>)
}
