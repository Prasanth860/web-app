import React from "react";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../SharedComponents/Header";
import SideNavBar from "../SharedComponents/SideNavBar";

const Master = lazy(() => import("./Master/Master"));
const Dashboard = lazy(() => import("./Dashboard"));
const RoutingConfig = () => {
    return (
        <>
            <div>
                <div>
                    <Header />
                </div>
                <div className="d-flex w-100" style={{ marginTop: "65px" }}>
                    <div style={{width:"15%"}} className="border"> <SideNavBar /> </div>
                    <div style={{width:"85%"}}>
                        <Routes>
                            <Route path="master/*" element={<Master />} />
                            <Route path="dashboard" element={<Dashboard />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RoutingConfig