import { calculatePoints, groupByCustomerAndMonth } from './utils';

describe('calculatePoints', () => {
  test('returns 0 for $50 or less', () => {
    expect(calculatePoints(30)).toBe(0);
    expect(calculatePoints(50)).toBe(0);
  });

  test('calculates 1 point per dollar over $50 up to $100', () => {
    expect(calculatePoints(80)).toBe(30);
    expect(calculatePoints(100)).toBe(50);
  });

  test('calculates 2 points per dollar over $100 and 1 per dollar between $50-$100', () => {
    expect(calculatePoints(120)).toBe(90);  // 2*20 + 1*50
    expect(calculatePoints(200)).toBe(250); // 2*100 + 1*50
  });
});

describe('groupByCustomerAndMonth', () => {
  const transactions = [
    { customerId: 1, name: 'Alice', amount: 120, date: '2025-04-15' },
    { customerId: 1, name: 'Alice', amount: 80, date: '2025-04-25' },
    { customerId: 1, name: 'Alice', amount: 200, date: '2025-05-10' },
    { customerId: 2, name: 'Bob', amount: 50, date: '2025-04-20' }
  ];

  const result = groupByCustomerAndMonth(transactions);

  test('calculates correct points per customer per month', () => {
    expect(result[1].months['Apr 2025']).toBe(90 + 30); // 120 + 80
    expect(result[1].months['May 2025']).toBe(250);
    expect(result[2].months['Apr 2025']).toBe(0);
  });

  test('calculates correct total points per customer', () => {
    expect(result[1].total).toBe(90 + 30 + 250); // 370
    expect(result[2].total).toBe(0);
  });

  test('preserves customer names', () => {
    expect(result[1].name).toBe('Alice');
    expect(result[2].name).toBe('Bob');
  });
});
