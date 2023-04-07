import React from "react";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const AllLocation = lazy(() => import("./AllLocation"));
const AddLocation = lazy(() => import("./AddLocation"));

const Location = () => {
    return (
        <>
            <Routes>
                <Route path="all-location" element={<AllLocation />} />
                <Route path="add-location" element={<AddLocation />} >
                    <Route path=":id" element={<AddLocation />} />
                </Route>
            </Routes>
        </>
    )
}

export default Location