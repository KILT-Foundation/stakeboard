import React from 'react'

import './App.css'
import { StoredStateProvider } from './utils/StoredStateContext'
import { StateProvider } from './utils/StateContext'
import { Page } from './container/Page/Page'

function App() {
  return (
    <div className="App">
      <StoredStateProvider>
        <StateProvider>
          <Page />
        </StateProvider>
      </StoredStateProvider>
    </div>
  )
}

export default App
