import HeaderBox from '@/components/HeaderBox';
import RightsideBar from '@/components/RightsideBar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import React from 'react';

function Home() {
  const loggedIn = {
    firstName: 'Ephrem',
    lastName: 'Mamo',
    email: 'ephremmamo555@gmail.com',
  };
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || 'Guest'}
            subtext="Access and manage your account and transactions efficiently"
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.35}
          />
        </header>
        Transactions
      </div>
      <RightsideBar
        user={loggedIn}
        transactions={[]}
        banks={[
          {
            currentBalance: 123.5,
          },
          {
            currentBalance: 500,
          },
        ]}
      />
    </section>
  );
}

export default Home;
