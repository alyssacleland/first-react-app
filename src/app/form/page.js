import React from 'react';
import Form from '@/components/form';

// const sampleData = {
//   "firebaseKey": "-OFsMVQdVLfZGFIVJq37",
//         "name": "a",
//         "text": "grass is green",
//         "userID": "hSjPvyVllcQgN5Hm35xVEuUn1UJ3",
// }

export default function FormPage() {
  return (
    <div className="container">
      <h2> CREATE A FACT</h2>
      <Form />

      {/* <h2> UPDATE </h2>
      <Form obj={sampleData} /> */}
    </div>
  );
}
