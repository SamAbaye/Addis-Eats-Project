import React from 'react'
import AdminDashBoard from './page'
function layout() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 ">
        <h1 className='text-3xl text-center mb-15'>Admin Dashboard</h1>
        <AdminDashBoard/>
    </div>
  )
}

export default layout