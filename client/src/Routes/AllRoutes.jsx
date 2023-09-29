import React from "react";
import { Route, Routes } from "react-router-dom";
import Contact from "../Pages/contactus/Contact";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default AllRoutes;
