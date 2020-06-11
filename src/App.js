import React from 'react'

import { UsersProvider } from './context/UsersContext'

import UsersMap from './components/UsersMap/UsersMap'
import UserList from './components/UserList/UserList'

import './App.css'

const App = () => {
  const mapCenter = {
    lat: 39.4077643,
    lng: -0.4315508
  }
  return (
    <UsersProvider>
      <div className='app'>
        <UserList mapCenter={mapCenter} />
        <UsersMap mapCenter={mapCenter} />
      </div>
    </UsersProvider>
  )
}

export default App
