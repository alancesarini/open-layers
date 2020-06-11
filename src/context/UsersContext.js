import React, { createContext, useState } from 'react'

const UsersContext = createContext([[], () => {}])

const UsersProvider = (props) => {
  const [state, setState] = useState([])

  return (
    <UsersContext.Provider value={[state, setState]}>
      {props.children}
    </UsersContext.Provider>
  )
}

export { UsersContext, UsersProvider }
