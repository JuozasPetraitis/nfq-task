import React, { useState } from 'react';
import CheckVisit from './CheckVisit/CheckVisit';
import BookVisit from './BookVisit/BookVisit';
import CancelVisitForm from '../Form/CancelVisitForm';
import Screen from '../Screen/Screen';

const ForCustomer = () => {
  const [activeTab, setActiveTab] = useState('check');

  const renderComponent = () => {
    switch (activeTab) {
      case 'check':
        return <CheckVisit />;
      case 'book':
        return <BookVisit />;
      case 'cancel':
        return <CancelVisitForm />;
      case 'screen':
        return <Screen />;
      default:
        return null;
    }
  };

  const tabs = [
    { key: 'check', label: 'Check visit' },
    { key: 'book', label: 'Book visit' },
    { key: 'cancel', label: 'Cancel visit' },
    { key: 'screen', label: 'Department screen' },
  ];

  return (
    <div className='p-4 bg-white shadow rounded-lg'>
      <div className='flex space-x-4'>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`py-2 px-5 border border-white rounded cursor-pointer transition-color duration-300 ${
              activeTab === tab.key && 'bg-sky-900 text-white'
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className='mt-4'>{renderComponent()}</div>
    </div>
  );
};

export default ForCustomer;
