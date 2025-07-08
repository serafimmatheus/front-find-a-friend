import { Toaster } from '@/components/ui/sonner'
import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='pt-BR'>
      <Head />
      <body className='bg-background'>
        <Toaster />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
