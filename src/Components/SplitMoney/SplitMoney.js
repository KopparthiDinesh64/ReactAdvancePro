import React, { useState } from 'react';
import { Button, TextField, Card, CardContent, IconButton, MenuItem, Select, Checkbox, Toolbar, Typography, InputLabel, FormControl, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './UserList.css';

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const UserCard = ({ name, onRemove, color, theme }) => {
  const profileLogo = name.slice(0, 2).toUpperCase();

  return (
    <Card className="user-card" style={{ background: theme.background, color: theme.color }}>
      <CardContent className="card-content">
        <div className="profile-logo" style={{ backgroundColor: color }}>
          {profileLogo}
        </div>
        <div className="user-name">{name}</div>
        <IconButton onClick={() => onRemove(name)} className="remove-button">
          <DeleteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};

const UserList = ({ theme }) => {
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);
  const [view, setView] = useState('add-user');
  const [expenseName, setExpenseName] = useState('');
  const [expensePrice, setExpensePrice] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const handleAddUser = () => {
    if (username.trim()) {
      const name = username.trim();
      const userIndex = users.findIndex(user => user.name === name);

      if (userIndex !== -1) {
        const count = users.filter(user => user.name === name).length + 1;
        const newName = `${name} (${count})`;
        setUsers([...users, { name: newName, color: getRandomColor() }]);
      } else {
        setUsers([...users, { name, color: getRandomColor() }]);
      }

      setUsername('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddUser();
    }
  };

  const handleRemoveUser = (name) => {
    setUsers(users.filter(user => user.name !== name));
  };

  const handleAddExpense = () => {
    if (expenseName.trim() && !isNaN(expensePrice) && expensePrice > 0) {
      setExpenses([...expenses, { name: expenseName, price: parseFloat(expensePrice), users: selectedUsers }]);
      setExpenseName('');
      setExpensePrice('');
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (user, isChecked) => {
    setSelectedUsers(prevState =>
      isChecked ? [...prevState, user] : prevState.filter(u => u !== user)
    );
  };

  const calculateSplits = () => {
    const userShares = {};

    users.forEach(user => {
      userShares[user.name] = {
        total: 0,
        details: []
      };
    });

    expenses.forEach(expense => {
      const share = expense.price / expense.users.length;
      expense.users.forEach(user => {
        userShares[user].total += share;
        userShares[user].details.push({
          expenseName: expense.name,
          expenseShare: share
        });
      });
    });

    return userShares;
  };

  const renderView = () => {
    switch (view) {
      case 'add-user':
        return (
          <div>
            <Card className="input-container" style={{ padding: "20px", background: theme.background, color: theme.color }}>
              <TextField
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter username"
                variant="outlined"
                className="input"
                fullWidth
                sx={{ backgroundColor: "white" }}
              />
              <Button onClick={handleAddUser} variant="contained" color="primary" className="button">
                Add User
              </Button>
              <Button onClick={() => setView('add-expenses')} variant="contained" color="secondary" className="split-button">
                Add Expenses
              </Button>
            </Card>
            <div className="user-list">
              {users.map((user, index) => (
                <UserCard
                  key={index}
                  name={user.name}
                  onRemove={handleRemoveUser}
                  color={user.color}
                  theme={theme}
                />
              ))}
            </div>
          </div>
        );
      case 'add-expenses':
        return (
          <div className="add-expenses-container">
            <Card style={{ padding: "30px", background: theme.background, color: theme.color }}>
              <TextField
                value={expenseName}
                onChange={(e) => setExpenseName(e.target.value)}
                placeholder="Expense name"
                variant="outlined"
                className="input-field"
                sx={{ marginBottom: "20px", backgroundColor: "white" }}
              />
              <TextField
                value={expensePrice}
                onChange={(e) => setExpensePrice(e.target.value)}
                placeholder="Expense price"
                variant="outlined"
                type="number"
                className="input-field"
                sx={{ marginBottom: "20px", backgroundColor: "white" }}
              />
              <FormControl className="dropdown-container" variant="outlined">
                <InputLabel>Split Among</InputLabel>
                <Select
                  multiple
                  value={selectedUsers}
                  onChange={(e) => setSelectedUsers(e.target.value)}
                  renderValue={(selected) => (
                    <div>
                      {selected.map((user) => (
                        <span key={user}>{user}, </span>
                      ))}
                    </div>
                  )}
                  label="Split Among"
                  sx={{ marginBottom: "20px", backgroundColor: "white" }}
                >
                  {users.map((user, index) => (
                    <MenuItem key={index} value={user.name}>
                      <Checkbox
                        checked={selectedUsers.indexOf(user.name) > -1}
                      />
                      <ListItemText primary={user.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button onClick={handleAddExpense} variant="contained" color="primary" className="add-expense-button">
                Add Expense
              </Button>
            </Card>
            <div className="expenses">
              {expenses.map((expense, index) => (
                <Card key={index} className="expense-card" style={{ background: theme.background, color: theme.color }}>
                  <CardContent>
                    <Typography variant="h6">{expense.name}</Typography>
                    <Typography variant="body1">Amount: {expense.price.toFixed(2)}</Typography>
                    <Typography variant="body2">Split among:</Typography>
                    {expense.users.map((user, i) => (
                      <div key={i}>{user}</div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      case 'budget-splitting':
        const splits = calculateSplits();
        return (
          <div className="budget-splitting">
            {Object.keys(splits).map((user, index) => (
              <Card key={index} className="split-card" style={{ background: theme.background, color: theme.color }}>
                <CardContent>
                  <Typography variant="h6">{user}</Typography>
                
                  {splits[user].details.map((detail, i) => (
                    <div key={i}>
                      <Typography variant="body2">
                        {detail.expenseName}: {detail.expenseShare.toFixed(2)}
                      </Typography>
                    </div>
                  ))}
                    <Typography variant="body1">Total: {splits[user].total.toFixed(2)}</Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        );
      default:
        return <div>Select a view from the Navbar</div>;
    }
  };

  return (
    <div>
      <Toolbar>
        <Button onClick={() => setView('add-user')} color="inherit">
          Add User
        </Button>
        <Button onClick={() => setView('add-expenses')} color="inherit">
          Add Expenses
        </Button>
        <Button onClick={() => setView('budget-splitting')} color="inherit">
          Budget Splitting
        </Button>
      </Toolbar>
      <hr style={{ borderStyle: "solid", color: "#bab7ad" }} />
      <div className="content">
        {renderView()}
      </div>
    </div>
  );
};

export default UserList;
