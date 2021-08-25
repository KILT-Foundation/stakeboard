import React from 'react'

import './App.css'
import { StoredStateProvider } from './utils/StoredStateContext'
import { StateProvider } from './utils/StateContext'

import { Page } from './container/Page/Page'
import { useExtension } from './utils/useExtension'

function App() {
  const allAccounts = useExtension()
  return (
    <div className="App">
      <StoredStateProvider>
        <StateProvider>
          <Page allAccounts={allAccounts} />
        </StateProvider>
      </StoredStateProvider>
    </div>
  )
}

export default App
