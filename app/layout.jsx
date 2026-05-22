import './globals.css'

export const metadata = {
  title: 'Taskmetry - Digital Outsourcing & Remote Workforce',
  description: 'Connect with expert remote professionals for data services, web development, SEO, video editing, virtual assistance, and remote staffing.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
