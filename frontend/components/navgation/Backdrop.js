import React from 'react';


const backdrop = ({clicked, show} ) => {
  return (
    show ? <div onClick={clicked} className='backdrop'></div> : null
  )
}

export default backdrop;