# Finance Dashboard UI

A modern, interactive financial dashboard built with **React**, **Tailwind CSS**, and **Recharts**. Track your income, expenses, and financial insights with an intuitive interface featuring role-based access control.

## Features

### 📊 Dashboard
- **Summary Cards**: View total balance, income, and expenses at a glance
- **Balance Trend Chart**: Line chart showing how your balance changes over time
- **Spending by Category**: Pie chart breaking down expenses by category

### 💳 Transactions
- **View All Transactions**: Browse your complete transaction history
- **Advanced Filtering**: Filter by category, type (income/expense), and search by description
- **Sorting Options**: Sort by date or amount
- **Add/Edit/Delete** (Admin only): Manage your transactions with a clean form interface
- **Form Validation**: Ensures data integrity with client-side validation

### 📈 Insights
- **Key Metrics**: Total income, spending, savings rate, and average daily spending
- **Spending Analysis**: See your top spending categories with visual breakdown
- **Monthly Trends**: Track month-over-month income and expenses
- **Smart Recommendations**: AI-powered insights and alerts based on your spending patterns
- **Financial Highlights**: Best financial day, spending trends, and category analysis

### 👤 Role-Based UI
- **Admin Role**: Full access to add, edit, and delete transactions
- **Viewer Role**: Read-only access to all financial data
- **Easy Role Switching**: Toggle between roles using the dropdown in the header

## Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Date Utilities**: date-fns
- **State Management**: React Context API

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── shared.jsx      # Card, Button, Modal, EmptyState
│   ├── Header.jsx      # App header with role switcher
│   └── MainLayout.jsx  # Main layout wrapper
├── pages/              # Page components
│   ├── Dashboard.jsx   # Dashboard with charts
│   ├── Transactions.jsx # Transaction management
│   └── Insights.jsx    # Financial insights
├── context/            # React Context
│   └── AppContext.jsx  # Global state management
├── data/               # Mock data
│   └── mockData.js     # Sample transactions and categories
├── App.jsx             # Main app component
└── main.jsx            # React root
```

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

1. **Navigate to the project directory**:
   ```bash
   cd finance-dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and go to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

## Usage Guide

### Dashboard
- View your financial summary on the main dashboard
- See balance trends and spending patterns with interactive charts
- All data is automatically calculated from your transactions

### Managing Transactions
1. **With Admin Role**:
   - Click "Add Transaction" to create a new entry
   - Fill in the date, amount, category, type, and description
   - Click "Update" to edit existing transactions
   - Use "Delete" to remove transactions (with confirmation)

2. **With Viewer Role**:
   - Browse transactions in read-only mode
   - Use filters and search to find specific transactions

### Filtering Transactions
- **Category**: Filter by grocery, dining, rent, salary, etc.
- **Type**: Show only income or expense transactions
- **Search**: Find transactions by description text
- **Clear Filters**: Reset all filters with one click

### Sorting Transactions
- **Latest First**: Most recent transactions appear first
- **Oldest First**: Earliest transactions first
- **Highest Amount**: Highest value transactions at the top
- **Lowest Amount**: Lowest value transactions at the top

### Viewing Insights
The Insights page provides:
- **Key Metrics**: High-level financial summary
- **Top Categories**: Your biggest spending areas with percentages
- **Monthly Activity**: Income vs expenses for recent months
- **Smart Alerts**: Warnings and recommendations based on your finances
- **Financial Health**: Overall assessment of your spending habits

### Switching Roles
Use the role dropdown in the header (top-right) to switch between:
- **Admin**: Can add, edit, and delete transactions
- **Viewer**: Can only view data

## Sample Data

The dashboard comes pre-loaded with 30 sample transactions spanning 3 months (January-March 2024) across categories like:
- 💼 Salary & Freelance (income)
- 🍔 Groceries & Dining
- 🏠 Rent & Utilities
- 🎮 Entertainment & Shopping

You can add your own transactions or clear them to start fresh.

## Design & UX

### Responsive Design
- **Mobile** (375px+): Optimized for phones with stacked layouts
- **Tablet** (768px+): Multi-column layouts for better use of space
- **Desktop** (1024px+): Full-featured layout with all features visible

### Color Scheme
- **Income**: Green (#10b981)
- **Expenses**: Red (#ef4444)
- **Primary**: Blue (#3b82f6)
- **Accents**: Various category colors for visual distinction

### Accessibility
- High contrast colors for readability
- Clear button labels and icons
- Keyboard-friendly navigation
- Semantic HTML structure

## State Management

The app uses **React Context API** for global state management:
- **Transactions**: Array of all transactions
- **Filters**: Current filter state (category, type, search, date range)
- **Role**: Current user role (admin/viewer)
- **Current Page**: Active page (dashboard/transactions/insights)

All state changes automatically trigger UI updates across the app.

## Features in Detail

### Dynamic Calculations
- **Balance**: Calculated as total income minus total expenses
- **Spending by Category**: Aggregated from all expense transactions
- **Savings Rate**: Percentage of income that's not spent
- **Monthly Trends**: Month-over-month comparisons with percentage changes

### Form Validation
- Required fields: date, amount, description
- Amount must be greater than 0
- Real-time error messages
- Clear success feedback

### Charts
- **Line Chart**: Shows balance progression with interactive tooltips
- **Pie Chart**: Distribution of spending by category with labels and values
- Both charts are responsive and resize with the window

## Potential Enhancements

While this dashboard is fully functional, here are some ideas for future improvements:
- Dark mode toggle
- Local storage persistence for transactions
- PDF/CSV export functionality
- Budget planning and tracking
- Recurring transaction templates
- Multi-currency support
- Data import/export
- Analytics and reports

## Troubleshooting

### Port Already in Use
If port 5173 is already in use, Vite will automatically use the next available port.

### Build Errors
- Clear `node_modules` and `package-lock.json`, then reinstall: `npm install`
- Make sure you're using Node.js 16+

### Changes Not Reflecting
- Hard refresh your browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
- Ensure HMR is not disabled in your browser settings

## Project Approach

### Design Philosophy
- **Simplicity**: Clean, intuitive interface with minimal cognitive load
- **Responsiveness**: Works seamlessly on any device size
- **Modularity**: Components are reusable and easy to maintain
- **User Control**: Role-based features with clear permissions
- **Visual Feedback**: Charts, colors, and icons provide immediate insights

### Technical Decisions
- **Context API**: Lightweight state management without additional dependencies
- **Tailwind CSS**: Rapid UI development with utility-first approach
- **Recharts**: Simple but powerful charting library
- **Vite**: Ultra-fast build tool for optimal development experience

## File Manifest

- **src/App.jsx** - Main application wrapper
- **src/main.jsx** - React root and AppProvider setup
- **src/index.css** - Tailwind CSS configuration
- **src/components/shared.jsx** - Reusable UI components (Card, Button, Modal, EmptyState)
- **src/components/Header.jsx** - Navigation and role switcher
- **src/components/MainLayout.jsx** - Layout wrapper
- **src/pages/Dashboard.jsx** - Dashboard with summary cards and charts
- **src/pages/Transactions.jsx** - Transaction list, filters, and forms
- **src/pages/Insights.jsx** - Financial insights and analytics
- **src/context/AppContext.jsx** - Global state management
- **src/data/mockData.js** - Sample transactions and category data
- **tailwind.config.js** - Tailwind CSS configuration
- **postcss.config.js** - PostCSS configuration
- **vite.config.js** - Vite build configuration

## Testing Checklist

When testing the dashboard:
- [ ] Dashboard loads with summary cards
- [ ] Charts render correctly with sample data
- [ ] Can navigate between all three pages
- [ ] Role switcher works (admin/viewer)
- [ ] Admin can add transactions
- [ ] Add transaction form validates inputs
- [ ] Can edit and delete transactions (admin only)
- [ ] Filters work correctly (category, type, search)
- [ ] Sorting changes transaction order
- [ ] Insights page shows correct calculations
- [ ] Mobile layout is responsive
- [ ] All links and buttons are clickable
- [ ] No console errors

