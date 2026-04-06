import React, { createContext, useState, useCallback } from 'react';
import { mockTransactions } from '../data/mockData';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [role, setRole] = useState('admin');
  const [filters, setFilters] = useState({
    category: '',
    type: '',
    dateRange: { start: null, end: null },
    search: '',
  });
  const [currentPage, setCurrentPage] = useState('dashboard');

  const addTransaction = useCallback((newTransaction) => {
    const transaction = {
      ...newTransaction,
      id: Math.max(...transactions.map(t => t.id), 0) + 1,
    };
    setTransactions([...transactions, transaction]);
  }, [transactions]);

  const updateTransaction = useCallback((id, updatedData) => {
    setTransactions(transactions.map(t =>
      t.id === id ? { ...t, ...updatedData } : t
    ));
  }, [transactions]);

  const deleteTransaction = useCallback((id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  }, [transactions]);

  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage('transactions');
  }, []);

  const getFilteredTransactions = useCallback(() => {
    return transactions.filter(transaction => {
      if (filters.category && transaction.category !== filters.category) return false;
      if (filters.type && transaction.type !== filters.type) return false;
      if (filters.search && !transaction.description.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.dateRange.start && new Date(transaction.date) < new Date(filters.dateRange.start)) return false;
      if (filters.dateRange.end && new Date(transaction.date) > new Date(filters.dateRange.end)) return false;
      return true;
    });
  }, [transactions, filters]);

  const value = {
    // State
    transactions,
    role,
    filters,
    currentPage,

    // Actions
    setRole,
    setCurrentPage,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    updateFilters,
    getFilteredTransactions,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
