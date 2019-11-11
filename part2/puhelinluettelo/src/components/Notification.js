import React from 'react'

const Notification = ({ message, type }) => {

    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    const successStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    const style = (type === 'success') ? successStyle : errorStyle

    if (message === null) {
      return null
    }
  
    return (
      <div style={style}>
        {message}
      </div>
    )
  }

  export default Notification