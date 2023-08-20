import React from 'react';
import BookVisitForm from '../../Form/BookVisitForm';

const BookVisit = () => {
  return (
    <div>
      <p className='cursor-default text-center text-4xl font-thin tracking-tight'>
        Book your visit
      </p>

      <BookVisitForm />
    </div>
  );
};

export default BookVisit;
