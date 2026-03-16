import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { WagmiProvider }                      from 'wagmi'
import { RainbowKitProvider, midnightTheme }  from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider }   from '@tanstack/react-query'

import { wagmiConfig } from '@/config/wagmi'
import App             from './App'
import './styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={midnightTheme({
            accentColor:           '#ff6b1a',
            accentColorForeground: '#ffffff',
            borderRadius:          'medium',
            fontStack:             'system',
          })}
          modalSize="compact"
        >
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
)