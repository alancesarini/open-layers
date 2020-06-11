import React, { useEffect, useContext, useState } from 'react'

import { UsersContext } from '../../context/UsersContext'

import UserItem from './UserItem/UserItem'

import UserModal from '../UserModal/UserModal'

import { getRandomLocation } from '../../utils/utils'

import './UserList.css'

const UserList = ({ mapCenter }) => {
  const [users, setUsers] = useContext(UsersContext)
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState()

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?results=50')
        const data = await response.json()
        setUsers(data.results.map(user => ({
          id: user.login.uuid,
          firstName: user.name.first,
          lastName: user.name.last,
          phone: user.phone,
          picture: user.picture.large,
          location: getRandomLocation(mapCenter.lat, mapCenter.lng, 100000)
        })))
      } catch (err) {
        console.log(err)
        return false
      }
    }

    getUsers()
  }, [])

  const handleSubmit = user => {
    const updatedUsers = [...users]
    const index = updatedUsers.findIndex(u => u.id === user.id)
    updatedUsers[index] = { ...user }
    setUsers(updatedUsers)
  }

  const handleShowModal = currentUserId => {
    const u = users.find(user => user.id === currentUserId)
    setEditingUser(u)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setEditingUser(null)
    setShowModal(false)
  }

  const handleDeleteUser = currentUserId => {
    const updatedUsers = [...users].filter(user => user.id !== currentUserId)
    setUsers(updatedUsers)
  }

  return (
    <div className='user-list'>
      {!users.length && 'Loading...'}

      {showModal && <UserModal closeModal={handleCloseModal} currentUser={editingUser} submit={handleSubmit} />}

      {users.length && users.map(user => (<UserItem key={user.id} id={user.id} showModal={() => handleShowModal(user.id)} deleteUser={() => handleDeleteUser(user.id)} />))}
    </div>
  )
}

export default UserList
