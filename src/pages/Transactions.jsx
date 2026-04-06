import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Card, Button, Modal, EmptyState } from '../components/shared';
import { categories } from '../data/mockData';
import { format } from 'date-fns';

const TransactionForm = ({ onSubmit, onClose, initialData = null }) => {
  const [formData, setFormData] = useState(
    initialData || {
      date: format(new Date(), 'yyyy-MM-dd'),
      amount: '',
      category: 'groceries',
      type: 'expense',
      description: '',
    }
  );
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.amount || parseFloat(formData.amount) <= 0) newErrors.amount = 'Amount must be greater than 0';
    if (!formData.description.trim()) newErrors.description = 'Description is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      ...formData,
      amount: parseFloat(formData.amount),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
        />
        {errors.date && <p className="text-red-600 text-sm mt-1">{errors.date}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
        <input
          type="number"
          step="0.01"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          placeholder="0.00"
        />
        {errors.amount && <p className="text-red-600 text-sm mt-1">{errors.amount}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          >
            {Object.entries(categories).map(([key, value]) => (
              <option key={key} value={key}>{value.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <input
          type="text"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          placeholder="Enter description"
        />
        {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
      </div>

      <div className="flex gap-3 justify-end">
        <Button variant="secondary" onClick={onClose} type="button">
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          {initialData ? 'Update' : 'Add'} Transaction
        </Button>
      </div>
    </form>
  );
};

const TransactionFilters = ({ filters, onFilterChange }) => {
  return (
    <Card className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            placeholder="Search transactions"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select
            value={filters.type}
            onChange={(e) => onFilterChange({ type: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={filters.category}
            onChange={(e) => onFilterChange({ category: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="">All Categories</option>
            {Object.entries(categories).map(([key, value]) => (
              <option key={key} value={key}>{value.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">&nbsp;</label>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onFilterChange({ search: '', type: '', category: '' })}
            className="w-full"
          >
            Clear Filters
          </Button>
        </div>
      </div>
    </Card>
  );
};

export const Transactions = () => {
  const { role, transactions, filters, updateFilters, addTransaction, updateTransaction, deleteTransaction, getFilteredTransactions } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [sortBy, setSortBy] = useState('date-desc');

  const filteredTransactions = getFilteredTransactions();

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    switch (sortBy) {
      case 'date-asc':
        return new Date(a.date) - new Date(b.date);
      case 'date-desc':
        return new Date(b.date) - new Date(a.date);
      case 'amount-asc':
        return a.amount - b.amount;
      case 'amount-desc':
        return b.amount - a.amount;
      default:
        return 0;
    }
  });

  const handleAddTransaction = (data) => {
    if (editingId) {
      updateTransaction(editingId, data);
      setEditingId(null);
    } else {
      addTransaction(data);
    }
    setShowForm(false);
  };

  const editingTransaction = editingId
    ? transactions.find(t => t.id === editingId)
    : null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Transactions</h2>
        {role === 'admin' && (
          <Button
            variant="primary"
            onClick={() => {
              setEditingId(null);
              setShowForm(true);
            }}
          >
            + Add Transaction
          </Button>
        )}
      </div>

      <TransactionFilters filters={filters} onFilterChange={updateFilters} />

      {sortedTransactions.length === 0 ? (
        <EmptyState
          title="No Transactions Found"
          description="Try adjusting your filters to find transactions."
          action={
            role === 'admin' ? (
              <Button variant="primary" onClick={() => setShowForm(true)}>
                Add First Transaction
              </Button>
            ) : null
          }
        />
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">{sortedTransactions.length} transaction(s)</p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="date-desc">Latest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="amount-desc">Highest Amount</option>
              <option value="amount-asc">Lowest Amount</option>
            </select>
          </div>

          {/* Transaction List */}
          <div className="space-y-3">
            {sortedTransactions.map(transaction => (
              <Card key={transaction.id} className="flex items-center justify-between hover:shadow-lg transition-shadow">
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-semibold text-gray-900">{transaction.description}</p>
                      <p className="text-sm text-gray-600">
                        {format(new Date(transaction.date + 'T00:00:00'), 'MMM dd, yyyy')} • {categories[transaction.category]?.label || transaction.category}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className={`font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-600 capitalize">{transaction.type}</p>
                  </div>
                  {role === 'admin' && (
                    <div className="flex gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setEditingId(transaction.id);
                          setShowForm(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this transaction?')) {
                            deleteTransaction(transaction.id);
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      <Modal
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingId(null);
        }}
        title={editingId ? 'Edit Transaction' : 'Add New Transaction'}
      >
        <TransactionForm
          onSubmit={handleAddTransaction}
          onClose={() => {
            setShowForm(false);
            setEditingId(null);
          }}
          initialData={editingTransaction}
        />
      </Modal>
    </div>
  );
};
