import React from 'react';
import FactCard from '../../../../components/card';

// This is the React functional component for the dynamic route
export default async function responseYesPage({ params }) {
  // const cacheBuster = new Date().getTime(); // Generate a unique timestamp
  const response = await fetch(`https://useless-facts-a2df8-default-rtdb.firebaseio.com/responseYes.json?orderBy="userID"&equalTo="${params.userID}"`, { cache: 'no-store' });

  // old: pass cacheBuster as a query parameter to the URL. this will make the URL unique every time the page is loaded, so the browser will not cache the data.
  const facts = await response.json();
  // bc this is a server component, i want to see the data in the console. so i will log it. whoaaaahhh.. it shows up in the terminal in here! that's cool.
  // the opposite of a server component is a client component. a client component is a component that runs in the browser. a server component is a component that runs on the server. cool, thanks copilot.
  console.log(Object.values(facts));
  // console.log(Object.values(facts)); lol we end up moving this to the return statement.
  // Object.values(facts) returns an array of the values of the facts object. without object.values, the facts object would be returned as an object with a bunch of keys. with object.values, the facts object is returned as an array of objects.
  return (
    <div>
      {/* Inititally, we did: Display the userID parameter from the URL. */}
      {/* {params.userID} */}
      {/* Now, we are doing: Display the data from the responseYes.json file. */}

      {Object.values(facts).map((fact) => (
        <FactCard key={fact.firebaseKey} fact={fact.text} />
      ))}
      {/* // this renders the text of each fact in the facts object. */}
    </div>
  );
}

// How It Works (dynamic route):
// Dynamic Segment: When you navigate to a URL like /response-yes/123, the [userID] part of the file path matches 123.
// Params Object: The params object passed to the responseYesPage component will have a property userID with the value 123.
// Rendering: The component renders the value of params.userID, which is 123, inside the <div> element.
// userID in [userID] is a taco. It is a dynamic segment that can match any value in the URL. Next.js will match the URL /response-yes/123 to this page and pass the value 123 as a parameter to the component.

// NavBar Component: The NavBar component uses the useAuth hook to get the authenticated user's ID and includes it in the URL for the "Yes" button.
// Dynamic Route: The dynamic route [userID].js in the response-yes directory uses the userID from the URL to fetch and display data.
// for the api call, for equalTo it is NOT accessing the key userID in firebase (confusing for my understanding because it has the same name); it is fetching by unique user's uid as userID via the url, because of [userID] dynamic route.
// for orderBy it is ordering by the key userID in firebase.
// for equalTo it is filtering by the unique user's uid as userID via the url, because of [userID] dynamic route.
