import React from 'react'
import { Outlet } from 'react-router-dom';
import Alert from "./components/layout/Alert.jsx";

const SectionLayout = () => {
  return (
    <div>
      <section className="container">
        <Alert />
        <Outlet />
      </section>
    </div>
  )
}

export default SectionLayout
