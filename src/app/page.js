'use client';

// any component that uses useAuth needs this because if a component directly imports useAuth, it needs to be a client component since useAuth uses React hooks.

import { useAuth } from '@/utils/context/authContext';
import { useEffect, useState } from 'react';

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
  const selectResponse = (boolean) => {
    const obj = {
      userId: user.id,
      permalink: uselessFact.permalink,
      response: boolean,
    };
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
