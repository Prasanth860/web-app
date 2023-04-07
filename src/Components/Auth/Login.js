import React from 'react'
import { BiUser } from "react-icons/bi"
import { RiLockPasswordLine } from "react-icons/ri"

const Login = () => {
    return (
        <div className='d-flex align-items-center justify-content-around' style={{ height: "100vh" }}>
            <div className='border'>Div1</div>
            <div className='border w-25 gap-4 p-4 rounded d-flex flex-column'>
                <div className=''>
                    <div className='fs-3 fw-bold text-primary'>Srilalitha</div>
                    <div className='fs-6 '>Sign in to Continue</div>
                </div>
                <div className='d-flex flex-column gap-2'>
                    <div className='d-flex align-items-center gap-4'>
                        <BiUser size={"1.5rem"} className='' />
                        <input type='text' className='form-control' placeholder='User' />
                    </div>
                    <div className='d-flex align-items-center gap-4'>
                        <RiLockPasswordLine size={"1.5rem"} className='' />
                        <input type='password' className='form-control' placeholder='Password' />
                    </div>
                </div>
                <div>
                    <button ></button>
                </div>
            </div>
        </div>
    )
}

export default Login