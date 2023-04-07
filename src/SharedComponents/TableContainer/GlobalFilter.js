import React from 'react'

const GlobalFilter = ({ filter, setfilter }) => {
    return (
        <span>
            <input className='rounded-3' placeholder='Global search' value={filter || ''} onChange={(e) => { setfilter(e.target.value) }} />
        </span>
    )
}

export default GlobalFilter