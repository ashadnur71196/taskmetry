import './globals.css'

export const metadata = {
  title: {
    default: 'Taskmetry | Digital Outsourcing & Remote Workforce',
    template: '%s | Taskmetry',
  },
  description: 'Connect with expert remote professionals for data services, web development, SEO, video editing, virtual assistance, and remote staffing.',
  icons: {
    icon: '/taskmetry-logo.svg',
    shortcut: '/taskmetry-logo.svg',
    apple: '/taskmetry-logo.svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
