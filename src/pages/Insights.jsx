import { useAppContext } from '../context/AppContext';
import { Card, EmptyState } from '../components/shared';
import { categories } from '../data/mockData';
import { format, parse, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';

const InsightCard = ({ title, value, subtitle, icon, color }) => (
  <Card className="text-left">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        <p className={`text-2xl font-bold mt-2 ${color}`}>{value}</p>
        {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
      </div>
      <div className="text-4xl">{icon}</div>
    </div>
  </Card>
);

export const Insights = () => {
  const { transactions } = useAppContext();

  if (transactions.length === 0) {
    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Insights</h2>
        <EmptyState
          title="No Data Yet"
          description="Add transactions to see insights about your spending patterns."
        />
      </div>
    );
  }

  // Calculate insights
  const expenses = transactions.filter(t => t.type === 'expense');
  const income = transactions.filter(t => t.type === 'income');

  // Highest spending category
  const spendingByCategory = {};
  expenses.forEach(t => {
    spendingByCategory[t.category] = (spendingByCategory[t.category] || 0) + t.amount;
  });

  const highestSpendingCategory = Object.entries(spendingByCategory).sort((a, b) => b[1] - a[1])[0];

  // Monthly comparison
  const expensesByMonth = {};
  const incomeByMonth = {};

  transactions.forEach(t => {
    const monthKey = format(parse(t.date, 'yyyy-MM-dd', new Date()), 'MMM yyyy');
    if (t.type === 'expense') {
      expensesByMonth[monthKey] = (expensesByMonth[monthKey] || 0) + t.amount;
    } else {
      incomeByMonth[monthKey] = (incomeByMonth[monthKey] || 0) + t.amount;
    }
  });

  const months = Object.keys(expensesByMonth).sort();
  const currentMonthExpenses = months.length > 0 ? expensesByMonth[months[months.length - 1]] : 0;
  const previousMonthExpenses = months.length > 1 ? expensesByMonth[months[months.length - 2]] : currentMonthExpenses;
  const monthlyTrend = previousMonthExpenses === 0 ? 0 : ((currentMonthExpenses - previousMonthExpenses) / previousMonthExpenses * 100).toFixed(1);

  // Average daily spending
  const totalDays = new Set(transactions.map(t => t.date)).size;
  const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);
  const avgDailySpending = (totalExpenses / (totalDays || 1)).toFixed(2);

  // Total income and expenses
  const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);
  const savingsRate = totalIncome === 0 ? 0 : ((1 - totalExpenses / totalIncome) * 100).toFixed(1);

  // Most profitable day
  const transactionsByDay = {};
  transactions.forEach(t => {
    transactionsByDay[t.date] = (transactionsByDay[t.date] || 0) + (t.type === 'income' ? t.amount : -t.amount);
  });
  const mostProfitableDay = Object.entries(transactionsByDay).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Financial Insights</h2>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <InsightCard
          title="Total Income"
          value={`$${totalIncome.toFixed(2)}`}
          subtitle={`${income.length} income transactions`}
          icon="💵"
          color="text-green-600"
        />
        <InsightCard
          title="Total Spending"
          value={`$${totalExpenses.toFixed(2)}`}
          subtitle={`${expenses.length} expense transactions`}
          icon="💸"
          color="text-red-600"
        />
        <InsightCard
          title="Savings Rate"
          value={`${savingsRate}%`}
          subtitle="Percentage of income saved"
          icon="🎯"
          color="text-blue-600"
        />
        <InsightCard
          title="Avg Daily Spending"
          value={`$${avgDailySpending}`}
          subtitle="Based on transaction days"
          icon="📊"
          color="text-purple-600"
        />
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending by Category */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">Top Spending Categories</h3>
          <div className="space-y-3">
            {Object.entries(spendingByCategory)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 5)
              .map(([category, amount]) => (
                <div key={category} className="flex items-center justify-between">
                  <span className="text-gray-700">
                    {categories[category]?.label || category}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600"
                        style={{ width: `${(amount / totalExpenses) * 100}%` }}
                      />
                    </div>
                    <span className="text-right font-semibold min-w-fit">
                      ${amount.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </Card>

        {/* Monthly Trends */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">Recent Monthly Activity</h3>
          <div className="space-y-3">
            {months.slice(-3).reverse().map(month => (
              <div key={month} className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">{month}</span>
                <div className="text-right">
                  <div>
                    <span className="text-green-600 font-semibold">
                      +${(incomeByMonth[month] || 0).toFixed(2)}
                    </span>
                  </div>
                  <div>
                    <span className="text-red-600 font-semibold">
                      -${(expensesByMonth[month] || 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="text-gray-600 text-sm">
                    Net: ${((incomeByMonth[month] || 0) - (expensesByMonth[month] || 0)).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Additional Insights */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">Highlights</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Highest Spending Category</p>
              <p className="font-semibold text-lg">
                {highestSpendingCategory ? `${categories[highestSpendingCategory[0]]?.label || highestSpendingCategory[0]} ($${highestSpendingCategory[1].toFixed(2)})` : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Monthly Spending Trend</p>
              <p className={`font-semibold text-lg ${monthlyTrend >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                {monthlyTrend > 0 ? '↑' : '↓'} {Math.abs(monthlyTrend)}% {monthlyTrend >= 0 ? 'increase' : 'decrease'}
              </p>
            </div>
            {mostProfitableDay && (
              <div>
                <p className="text-sm text-gray-600">Best Financial Day</p>
                <p className="font-semibold text-lg">
                  {format(parse(mostProfitableDay[0], 'yyyy-MM-dd', new Date()), 'MMM dd, yyyy')}
                  <span className={mostProfitableDay[1] >= 0 ? 'text-green-600' : 'text-red-600'}> ${mostProfitableDay[1].toFixed(2)}</span>
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Recommendations */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
          <div className="space-y-3 text-sm">
            {savingsRate < 20 && (
              <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                <p className="font-medium text-orange-900">💡 Increase Savings</p>
                <p className="text-orange-800 text-xs mt-1">Your savings rate is below 20%. Consider reducing spending or increasing income.</p>
              </div>
            )}
            {highestSpendingCategory && (spendingByCategory[highestSpendingCategory[0]] / totalExpenses) > 0.4 && (
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="font-medium text-blue-900">🎯 Category Alert</p>
                <p className="text-blue-800 text-xs mt-1">{categories[highestSpendingCategory[0]]?.label || 'One category'} accounts for over 40% of spending.</p>
              </div>
            )}
            {monthlyTrend > 10 && (
              <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                <p className="font-medium text-red-900">⚠️ Spending Increase</p>
                <p className="text-red-800 text-xs mt-1">Your spending increased significantly this month. Review your transactions.</p>
              </div>
            )}
            {savingsRate >= 20 && monthlyTrend <= 10 && !(highestSpendingCategory && (spendingByCategory[highestSpendingCategory[0]] / totalExpenses) > 0.4) && (
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="font-medium text-green-900">✅ Great Job!</p>
                <p className="text-green-800 text-xs mt-1">Your finances are in good shape. Keep up your current spending habits.</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
