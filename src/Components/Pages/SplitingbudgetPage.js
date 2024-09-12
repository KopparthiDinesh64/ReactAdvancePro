import React from 'react';
import UserList from '../SplitMoney/SplitMoney';

const SplittingPage = ({ theme }) => {
  return (
    <div style={{ background: theme.background, color: theme.color, marginTop:"64px",padding:"30px"}}> 
      <UserList theme={theme} />
    </div>
  );
};

export default SplittingPage;
