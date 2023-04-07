import React from "react";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const AllSubLocation = lazy(() => import("./AllSubLocation"));
const AddSubLocation = lazy(() => import("./AddSubLocation"));

const SubLocation = () => {
    return (
        <>
            <Routes>
                <Route path="all-sublocation" element={<AllSubLocation />} />
                <Route path="add-sublocation" element={<AddSubLocation />} >
                    <Route path=":id" element={<AddSubLocation />} />
                </Route>
            </Routes>
        </>
    )
}

export default SubLocation