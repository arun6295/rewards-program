export function calculatePoints(amount) {
  let points = 0;

  if (amount > 100) {
    points += 2 * (amount - 100);
    points += 1 * 50;
  } else if (amount > 50) {
    points += 1 * (amount - 50);
  }

  return points;
}

export function groupByCustomerAndMonth(transactions) {
  const summary = {};

  transactions.forEach(txn => {
    const { customerId, name, amount, date } = txn;
    const month = new Date(date).toLocaleString('default', { month: 'short', year: 'numeric' });
    const points = calculatePoints(amount);

    if (!summary[customerId]) {
      summary[customerId] = {
        name,
        months: {},
        total: 0
      };
    }

    if (!summary[customerId].months[month]) {
      summary[customerId].months[month] = 0;
    }

    summary[customerId].months[month] += points;
    summary[customerId].total += points;
  });

  return summary;
}
