import React, { useState } from 'react'
import Logo from './Assets/code.svg'
import background from './Assets/background.jpg'

import './App.css'
import MainComponent from './MainComponent'
import ResponsiveTable from './Components/ResonsiveTable'
import DataTable from './Components/DataTable'

const App: React.FC = () => {
  const [width] = useState(window.innerWidth)
  return (
    <>
      <div>
        <div className="body1">
          <img
            alt={'Coding Logo'}
            style={{
              width: width * 0.15,
              height: 'auto',
              borderRadius: 20,
              justifyContent: 'flex-end'
            }}
            src={Logo}
          />
          <MainComponent />
          <ResponsiveTable />
        </div>
      </div>
    </>
  )
}

export default App
