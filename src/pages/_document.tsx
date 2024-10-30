import { Html, Head, Main, NextScript } from 'next/document'
import { Toaster } from '@/components/ui/toaster'

export default function Document() {
  return (
    <Html lang='pt-BR'>
      <Head />
      <body>
        <Toaster />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
