import React from "react";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const AllDepartment = lazy(() => import("./AllDepartment"));
const AddDepartment = lazy(() => import("./AddDepartment"));

const Department = () => {
    return (
        <>
            <Routes>
                <Route path="all-department" element={<AllDepartment />} />
                <Route path="add-department" element={<AddDepartment />} >
                    <Route path=":id" element={<AddDepartment />} />
                </Route>
            </Routes>
        </>
    )
}

export default Department