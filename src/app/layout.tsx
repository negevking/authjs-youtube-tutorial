// app/layout.tsx
import '@/src/styles/globals.css' // or your global styles
import '@/src/sass/globals.scss' // or your global styles
import { Providers } from './providers'
import LayoutWrapper from '@/src/components/LayoutWrapper'

export const metadata = {
  title: 'ESAT Revision',
  description: 'Your description',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script 
          id="MathJax-script"
          async
          src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
        ></script>
      </head>
      <body>
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
      </body>
    </html>
  )
}