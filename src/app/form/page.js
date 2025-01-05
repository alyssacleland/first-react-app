'use client';

import React, { useState } from 'react';
import { useAuth } from '@/utils/context/authContext';
import { postFact, updateFact } from '@/api/facts';

// our endpoint/api call is expecting this object structure
const initialState = {
  text: '',
  name: '',
};

export default function FormPage() {
  const { user } = useAuth();
  const [factDetails, setFactDetails] = useState(initialState);

  // the event is 'onChange'
  // whenever we are binding our input values to our state values, we want to make sure the names are the same. that's why we're using the 'name' attribute on the input.
  const handleInputUpdate = (e) => {
    console.log(e);
    const { name, value } = e.target;

    // whenever we handle the input, the state is updating, so we call setFactDetails
    // we are just modifying the state item. we use prevState with spread operator to make sure we don't overwrite everything else in the object.
    setFactDetails((prevState) => ({
      // it's going to spread the text and the name (whatever is in there) and then it's going to overwrite whatever name or key matches whatever is inside that object.
      ...prevState,
      // name is in brackets because we're doing it dynamically. we're not looking for the key 'name', we're looking for the key that is the value of the name variable.
      // for Fact, it is 'text' and for Your Name, it is 'name'
      // Brackets for Dynamic Property Names: The brackets allow you to use the value of a variable as the property name in an object.
      // brackets are needed for dynamic keys, but not for the dynamic values ( in key: value pairs)
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFactDetails(initialState);
  };

  // for handleSubmit, we want to 1.) grab the values from the current state, and 2.) send them to the database via api call to firebase, to create.
  const handleSubmit = async (e) => {
    // prevent page from reloading
    e.preventDefault();

    // postFact gives us access to the firebasekey, which we need to update the fact in the database. it accepts an object and a value (yes or no) as args
    const response = await postFact(
      {
        // spread the fact details that we set in handleInputUpdate
        ...factDetails,
        // add the user id to the object
        userID: user.uid,
      },
      'Yes',
    ); // using yes because since they are submitting the fact, we assume yes they knew it

    // updateFact accepts the firebase key and a value (yes or no) as args
    // response.name is the firebase key. it is from response from the postFact api call above. '.name' giving the fireabse key is specific (built in) to firebase.
    await updateFact(response.name, 'Yes'); // using yes because since they are submitting the fact, we assume yes they knew it

    resetForm();
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="text">Fact</label>
        <input onChange={handleInputUpdate} type="text" name="text" id="text" className="form-control" value={factDetails.text} required />
      </div>
      <div>
        <label htmlFor="name">Your Name</label>
        <input onChange={handleInputUpdate} type="text" name="name" id="name" className="form-control" value={factDetails.name} required />
      </div>
      <button className="btn btn-success" type="submit">
        Submit
      </button>
    </form>
  );
}
