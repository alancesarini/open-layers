import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const UserModal = ({ currentUser, submit, closeModal }) => {
  const [modal, setModal] = useState(true)
  const [user, setUser] = useState(currentUser)

  const toggle = () => setModal(!modal)

  const handleChange = e => {
    const key = e.target.id
    const value = e.target.value
    setUser(prevUser => ({
      ...prevUser,
      [key]: value
    }))
  }

  const handleCancel = () => {
    setModal(false)
    closeModal()
  }

  const handleSubmit = () => {
    closeModal()
    submit(user)
  }

  return (
    <div>
      <Modal isOpen={modal} toggle={handleCancel} className='user-modal'>
        <ModalHeader toggle={handleCancel}>Modal title</ModalHeader>
        <ModalBody>
          <form>
            <input type='text' id='firstName' value={user.firstName} onChange={handleChange} />
            <input type='text' id='lastName' value={user.lastName} onChange={handleChange} />
            <input type='text' id='phone' value={user.phone} onChange={handleChange} />
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={handleSubmit}>Save</Button>{' '}
          <Button color='secondary' onClick={handleCancel}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default UserModal
