import transactions from './data';

export function fetchTransactions() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(transactions);
    }, 1000); // Simulate 1s delay
  });
}
