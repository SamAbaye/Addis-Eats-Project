import React from 'react'
import RevenueChart from './RevenueChart'

function AdminDashBoard() {
const data = [
    {
        area: "Addis Ababa",
        revenue: 2000,
        order: 10
    },
    {
        area: "Gondar",
        revenue: 500,
        order: 5
    },
    {
        area: "Adama",
        revenue: 16000,
        order: 10
    },
    {
        area: "Bahir Dar",
        revenue: 5600,
        order: 10
    }
]
  return (
    <div>
        
        <RevenueChart data={data} />
    </div>
  )
}

export default AdminDashBoard