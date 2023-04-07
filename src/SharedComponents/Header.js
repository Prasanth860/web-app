import React from 'react'
import { FaUserCircle } from "react-icons/fa"

const Header = () => {
    return (
        <div className='border bg bg-dark text-white p-3 d-flex justify-content-between fixed-top'>
            <div>Admin</div>
            <div> < FaUserCircle size={"2rem"} /> </div>
        </div>
    )
}

export default Header