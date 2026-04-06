import { useAppContext } from '../context/AppContext';
import { Card, EmptyState } from '../components/shared';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, parse } from 'date-fns';
import { categories } from '../data/mockData';

const SummaryCard = ({ title, value, icon, color }) => (
  <Card className="text-left">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        <p className={`text-3xl font-bold mt-2 ${color}`}>${value.toFixed(2)}</p>
      </div>
      <div className="text-4xl">{icon}</div>
    </div>
  </Card>
);

export const Dashboard = () => {
  const { transactions } = useAppContext();

  // Calculate totals
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;

  // Prepare balance trend data
  const balanceTrendData = (() => {
    const byMonth = {};
    let runningBalance = 0;

    transactions
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .forEach(transaction => {
        const monthKey = format(parse(transaction.date, 'yyyy-MM-dd', new Date()), 'MMM');
        if (!byMonth[monthKey]) {
          byMonth[monthKey] = 0;
        }
        runningBalance += transaction.type === 'income' ? transaction.amount : -transaction.amount;
        byMonth[monthKey] = runningBalance;
      });

    return Object.entries(byMonth).map(([month, balance]) => ({
      month,
      balance,
    }));
  })();

  // Prepare spending by category data
  const spendingByCategory = (() => {
    const byCategory = {};
    transactions
      .filter(t => t.type === 'expense')
      .forEach(transaction => {
        if (!byCategory[transaction.category]) {
          byCategory[transaction.category] = 0;
        }
        byCategory[transaction.category] += transaction.amount;
      });

    return Object.entries(byCategory).map(([category, amount]) => ({
      name: categories[category]?.label || category,
      value: amount,
      color: categories[category]?.color || '#999',
    }));
  })();

  if (transactions.length === 0) {
    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <EmptyState
          title="No Transactions Yet"
          description="Start by adding some transactions to see your financial overview."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <SummaryCard
          title="Total Balance"
          value={balance}
          icon="💼"
          color={balance >= 0 ? 'text-green-600' : 'text-red-600'}
        />
        <SummaryCard
          title="Total Income"
          value={income}
          icon="📈"
          color="text-green-600"
        />
        <SummaryCard
          title="Total Expenses"
          value={expenses}
          icon="📉"
          color="text-red-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Balance Trend Chart */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">Balance Trend</h3>
          {balanceTrendData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={balanceTrendData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="#3b82f6"
                  dot={{ fill: '#3b82f6', r: 5 }}
                  activeDot={{ r: 7 }}
                  name="Balance"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : null}
        </Card>

        {/* Spending by Category Chart */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">Spending by Category</h3>
          {spendingByCategory.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={spendingByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: $${value.toFixed(0)}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {spendingByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
              </PieChart>
            </ResponsiveContainer>
          ) : null}
        </Card>
      </div>
    </div>
  );
};
