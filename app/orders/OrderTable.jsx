import React from 'react'

function OrderTable() {
  return (
    <div>
      <h1>OrderTable</h1>
      <table>
        <caption>Your orders, most recent first</caption>
        <thead>
          <tr>
            <th scope="col">Order</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{etb(o.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderTable