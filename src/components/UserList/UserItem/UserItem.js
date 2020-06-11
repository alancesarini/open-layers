import React, { useContext } from 'react'

import { UsersContext } from '../../../context/UsersContext'

import './UserItem.css'

const UserItem = ({ id, showModal, deleteUser }) => {
  const [users, setUsers] = useContext(UsersContext)
  const currentUser = users.find(u => u.id === id)

  return (
    <div className='user'>
      <div className='user-pic'>
        <img src={currentUser.picture} alt='pic' />
      </div>
      <div className='user-data'>
        <p><strong>Name: </strong>{`${currentUser.firstName} ${currentUser.lastName}`}</p>
      </div>
      <div className='user-actions'>
        <p><strong>Phone: </strong>{currentUser.phone}</p>
      </div>
      <button onClick={showModal}>EDIT</button>
      <button onClick={deleteUser}>DELETE</button>
    </div>
  )
}

export default UserItem
