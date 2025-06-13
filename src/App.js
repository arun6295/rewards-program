// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from 'react';
import { fetchTransactions } from './api';
import { groupByCustomerAndMonth } from './utils';

function App() {
  const [rewards, setRewards] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions().then(data => {
      const result = groupByCustomerAndMonth(data);
      setRewards(result);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="p-4 text-lg">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Customer Rewards Summary</h1>
      {Object.entries(rewards).map(([customerId, customer]) => (
        <div key={customerId} className="mb-6 p-4 border rounded shadow">
          <h2 className="text-xl font-semibold">{customer.name}</h2>
          <ul className="ml-4 mt-2">
            {Object.entries(customer.months).map(([month, points]) => (
              <li key={month}>
                {month}: {points} points
              </li>
            ))}
          </ul>
          <div className="mt-2 font-bold">Total: {customer.total} points</div>
        </div>
      ))}
    </div>
  );
}

export default App;

