import { Provider } from '@/context/provider'
import { queryClient } from '@/lib/query-client'
import '@/styles/globals.css'
import { QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </QueryClientProvider>
  )
}
