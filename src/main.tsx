import React from 'react'
import ReactDOM from 'react-dom/client'
import './main.css'
import { Canvas } from '@react-three/fiber'
import { App } from './App.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Canvas>
        <App />
      </Canvas>
  </React.StrictMode>
)
