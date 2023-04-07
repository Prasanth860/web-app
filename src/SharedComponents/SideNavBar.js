import React, { useState } from 'react'
import { TbLayoutDashboard, TbLocationBroken } from "react-icons/tb"
import { FaSitemap, FaLocationArrow } from "react-icons/fa"
import { BiGitBranch } from "react-icons/bi"
import { useNavigate } from 'react-router-dom'

const SideNavBar = () => {
    const navigate = useNavigate()
    const [index, setIndex] = useState(0)

    const sidebar = [
        {
            name: "Dashboard",
            icon: <TbLayoutDashboard size={"1.5rem"} color='#000' />,
            route: "/v1/dashboard"
        },
        {
            name: "Master",
            icon: <FaSitemap size={"1.5rem"} color='#000' />,
            children: [
                {
                    name: "Department",
                    icon: <BiGitBranch size={"1.5rem"} color='#000' />,
                    route: "/v1/master/department/all-department"
                },
                {
                    name: "Location",
                    icon: <FaLocationArrow size={"1.5rem"} color='#000' />,
                    route: "/v1/master/location/all-location"
                },
                {
                    name: "Sub location",
                    icon: <TbLocationBroken size={"1.5rem"} color='#000' />,
                    route: "/v1/master/sublocation/all-sublocation"
                },
            ]
        },
    ]

    return (
        <div className=' bg-secondary p-3 text-white' style={{ height: "90vh" }} >
            {sidebar?.map((e, i) => {
                return (
                    <>
                        <div style={{ cursor: "pointer",scrollBehavior:"smooth" }} className='d-flex px-2 py-2  align-items-center gap-2 fs-6 fw-semibold pe-auto' onClick={() => { e?.route ? navigate(e?.route) : index == i + 1 ? setIndex(0) : setIndex(i + 1) }}>{e?.icon} {e?.name}</div>
                        {(e?.children && index == i + 1) && e?.children?.map((v, j) => {
                            return (
                                <>
                                    <div style={{ cursor: "pointer",scrollBehavior:"smooth" }} className='d-flex ml-2 px-4 py-2  align-items-center gap-2 fs-6 fw-normal' onClick={() => { navigate(v?.route) }}>{v?.icon} {v?.name}</div>
                                </>
                            )
                        })}
                    </>
                )
            })}
        </div>
    )
}

export default SideNavBar