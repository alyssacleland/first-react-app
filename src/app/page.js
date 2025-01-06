'use client';

// any component that uses useAuth needs this because if a component directly imports useAuth, it needs to be a client component since useAuth uses React hooks.

import { useAuth } from '@/utils/context/authContext';
import { useEffect, useState } from 'react';
import { postFact, updateFact } from '../api/facts';

// const dbURL = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;

function Home() {
  const [uselessFact, setUselessFact] = useState({});
  const { user } = useAuth();

  const fetchFact = async () => {
    // fetch the data from the api
    const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en');
    // convert the response to json and store it in a variable
    const fact = await response.json();
    // set the state value to the fact
    setUselessFact(fact);
  };

  // this fx will run when the user clicks a button. it creates an object with the user id, the fact permalink, and the response (true or false). then it fetches a new fact. then for now we return obj
  const selectResponse = async (boolean) => {
    // when this fx is called below when the use clicks yes or no buttons, it passes in true or false respectively. then it creates a const val that is 'Yes' if true and 'No' if false.
    const val = boolean ? 'Yes' : 'No';
    // then it creates an object with the user id and the fact text.
    console.log(user.uid);
    const obj = {
      text: uselessFact.text,
      userID: user.uid,
    };
    // then it fetches the response json file with the value of val. (i.e. responseYes.json or responseNo.json- this format is the same as the format of the json files in the firebase database.)
    // this is a POST request to the database. it is sending the obj to the database as a new entry when yes or no (on the page with a fact, not in the navbar) is clicked.
    // normally better practice would be to do this api call in a separate fx and then call that fx here.
    //   await fetch(`${dbURL}/response${val}.json`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(obj),
    //   });
    //   fetchFact();
    //   return obj;
    // };
    // jk instead we're gonna call it from the api file...

    // the api call returns a response, and that response is going to contain the firebase key.
    // we want to duplicate the key into the object
    const response = await postFact(obj, val); // this posts the fact to the database and then it is seen in the responseYes or responseNo pages (in navbar). we also use it below in update to access the firebase key.
    await updateFact({ firebaseKey: response.name }, val); // respose.name is the firebase key which updateFact accepts as an argument.
    // we changed it to firebaseKey: response.name because we changed the format of the api call in facts.js to accept paylaod as an argument. payload is an object that contains the firebase key and the value.
    // this patches the firebase key into the object in the database. see the api file for more info.

    fetchFact();
    return obj;
  };

  // in useEffect, pass a fx as an arg. this fx will run everytime there is a re-render. so once when the page loads, and then again every time the data changes.
  // if you pass an empty array as the second arg, the fx will only run once when the page loads. (dependency array is the second arg.)
  // you could also pass a variable in the dependency array, and the fx will run every time that variable changes. or a state value that will trigger it to run any time that state value changes.
  useEffect(() => {
    fetchFact();
  }, []);

  return (
    <>
      <h2>{uselessFact.text}</h2>
      <h4>Did you know this fact?</h4>
      <button type="button" className="btn btn-success" onClick={() => selectResponse(true)}>
        YES
      </button>
      <button type="button" className="btn btn-danger" onClick={() => selectResponse(false)}>
        NO
      </button>
    </>
  );
  // above, we are using the uselessFact state value to render the fact on the page.
  // then within the butttons, we are calling the selectResponse fx and passing in a boolean value.
}

export default Home;
