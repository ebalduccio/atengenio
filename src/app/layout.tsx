import type { Metadata } from "next"
import { type Viewport } from "next"
import localFont from "next/font/local"
import "./globals.css"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
})

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
})

const APP_NAME = "AtenGenio"
const APP_DEFAULT_TITLE = "AtenGenio"
const APP_TITLE_TEMPLATE = "%s - AtenGenio"
const APP_DESCRIPTION = "Transforme seu atendimento com IA. Automatize agendamentos, gerencie múltiplos canais e optimize seu negócio com insights inteligentes."

export const viewport: Viewport = {
  themeColor: "#0066FF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
}

export const metadata: Metadata = {
  metadataBase: new URL("https://atengenio.vercel.app/"),

  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },

  description: APP_DESCRIPTION,

  applicationName: APP_NAME,

  generator: "Next.js",

  keywords: [
    "agendamento online",
    "ia",
    "inteligência artificial",
    "automação",
    "atendimento",
    "atendimento automatizado",
    "atendimento automatico",
    "chatbot",
    "gestão de negócios",
    "scheduling",
    "saas",
  ],

  referrer: "origin-when-cross-origin",

  creator: "Digicat",
  publisher: "Digicat",

  category: "technology",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: APP_DEFAULT_TITLE,
    description: APP_DESCRIPTION,
    images: [
      {
        url: "/image-og.png", // 1200x630 recomendado
        width: 1200,
        height: 630,
        alt: "IA Scheduler Preview",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
    ],
  },

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  )
}