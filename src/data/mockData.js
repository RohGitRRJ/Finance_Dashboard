export const mockTransactions = [
  // January 2024
  { id: 1, date: '2024-01-01', amount: 5000, category: 'salary', type: 'income', description: 'Monthly Salary' },
  { id: 2, date: '2024-01-03', amount: 120, category: 'groceries', type: 'expense', description: 'Weekly groceries' },
  { id: 3, date: '2024-01-05', amount: 80, category: 'dining', type: 'expense', description: 'Restaurant dinner' },
  { id: 4, date: '2024-01-08', amount: 1200, category: 'rent', type: 'expense', description: 'Monthly rent' },
  { id: 5, date: '2024-01-10', amount: 50, category: 'entertainment', type: 'expense', description: 'Movie tickets' },
  { id: 6, date: '2024-01-15', amount: 150, category: 'groceries', type: 'expense', description: 'Grocery shopping' },
  { id: 7, date: '2024-01-18', amount: 2000, category: 'freelance', type: 'income', description: 'Project payment' },
  { id: 8, date: '2024-01-20', amount: 100, category: 'utilities', type: 'expense', description: 'Electricity bill' },
  { id: 9, date: '2024-01-22', amount: 75, category: 'dining', type: 'expense', description: 'Lunch with friends' },
  { id: 10, date: '2024-01-25', amount: 200, category: 'shopping', type: 'expense', description: 'Clothing' },

  // February 2024
  { id: 11, date: '2024-02-01', amount: 5000, category: 'salary', type: 'income', description: 'Monthly Salary' },
  { id: 12, date: '2024-02-02', amount: 100, category: 'groceries', type: 'expense', description: 'Grocery shopping' },
  { id: 13, date: '2024-02-05', amount: 90, category: 'dining', type: 'expense', description: 'Restaurant' },
  { id: 14, date: '2024-02-08', amount: 1200, category: 'rent', type: 'expense', description: 'Monthly rent' },
  { id: 15, date: '2024-02-10', amount: 300, category: 'shopping', type: 'expense', description: 'Electronics' },
  { id: 16, date: '2024-02-12', amount: 500, category: 'entertainment', type: 'expense', description: 'Concert tickets' },
  { id: 17, date: '2024-02-15', amount: 1500, category: 'freelance', type: 'income', description: 'Freelance work' },
  { id: 18, date: '2024-02-18', amount: 110, category: 'utilities', type: 'expense', description: 'Internet bill' },
  { id: 19, date: '2024-02-20', amount: 150, category: 'groceries', type: 'expense', description: 'Grocery shopping' },
  { id: 20, date: '2024-02-25', amount: 200, category: 'dining', type: 'expense', description: 'Special dinner' },

  // March 2024
  { id: 21, date: '2024-03-01', amount: 5000, category: 'salary', type: 'income', description: 'Monthly Salary' },
  { id: 22, date: '2024-03-03', amount: 130, category: 'groceries', type: 'expense', description: 'Grocery shopping' },
  { id: 23, date: '2024-03-06', amount: 85, category: 'dining', type: 'expense', description: 'Lunch' },
  { id: 24, date: '2024-03-08', amount: 1200, category: 'rent', type: 'expense', description: 'Monthly rent' },
  { id: 25, date: '2024-03-10', amount: 60, category: 'entertainment', type: 'expense', description: 'Streaming subscription' },
  { id: 26, date: '2024-03-15', amount: 2500, category: 'freelance', type: 'income', description: 'Major project' },
  { id: 27, date: '2024-03-18', amount: 100, category: 'utilities', type: 'expense', description: 'Water bill' },
  { id: 28, date: '2024-03-20', amount: 175, category: 'shopping', type: 'expense', description: 'Shoes' },
  { id: 29, date: '2024-03-22', amount: 95, category: 'dining', type: 'expense', description: 'Dinner out' },
  { id: 30, date: '2024-03-28', amount: 400, category: 'shopping', type: 'expense', description: 'Home decor' },
];

export const categories = {
  salary: { label: 'Salary', color: '#10b981' },
  freelance: { label: 'Freelance', color: '#3b82f6' },
  groceries: { label: 'Groceries', color: '#f59e0b' },
  dining: { label: 'Dining', color: '#ef4444' },
  rent: { label: 'Rent', color: '#8b5cf6' },
  utilities: { label: 'Utilities', color: '#ec4899' },
  entertainment: { label: 'Entertainment', color: '#06b6d4' },
  shopping: { label: 'Shopping', color: '#f97316' },
};
