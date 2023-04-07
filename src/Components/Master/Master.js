import React from "react";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Department = lazy(() => import("./Department/Department"));
const Location = lazy(() => import("./Location/Location"));
const SubLocation = lazy(() => import("./SubLocation/SubLocation"));
const Master = () => {
    return (
        <>
            <Routes>
                <Route path="department/*" element={<Department />} />
                <Route path="location/*" element={<Location />} />
                <Route path="sublocation/*" element={<SubLocation />} />
            </Routes>
        </>
    )
}

export default Master