import React from 'react';
import FactCard from '../../../components/card';

// params: An object provided by Next.js containing the dynamic segments of the URL. the entire URL is the object.
// Dot Notation: Used to access parts of the params object, including userID.
// Yes, for a dynamic route in Next.js, the URL parameters are automatically passed in as the params object to the page component. This params object contains the dynamic segments of the URL.
export default async function responseNoPage({ params }) {
  // fetch the data from the api for responseNo by userID
  // user id is accessible as a parameter in the URL because it is a dynamic route.
  // NavBar Component: The NavBar component uses the useAuth hook to get the authenticated user's ID and includes it in the URL for the "Yes" button.
  // Dynamic Route: The dynamic route [userID].js in the response-yes directory uses the userID from the URL to fetch and display data.
  // orderBy: This parameter is used to specify the key by which the results should be ordered. In this case, orderBy="userID" orders the results by the userID key in the Firebase database.
  // equalTo: This parameter is used to filter the results to only include items where the specified key matches the given value. In this case, equalTo="${params.userID}" filters the results to only include items where the userID key matches the userID from the URL.
  const response = await fetch(`https://useless-facts-a2df8-default-rtdb.firebaseio.com/responseNo.json?orderBy="userID"&equalTo="${params.userID}"`, { cache: 'no-store' });
  // cache: "no-store" is a fetch option that ensures the browser does not cache the response. This can be useful when you want to fetch fresh data from the server every time.
  // convert the response to json and store it in a variable
  const facts = await response.json();
  // test console log to server and deal with caching if needeed
  console.log(Object.values(facts));

  // now let's display the facts data on the page in a card from react bootstrap, which we already have a component for. this component is a parent component to the child card component.
  return (
    <div>
      {Object.values(facts).map((fact) => (
        <FactCard fact={fact.text} />
      ))}
    </div>
  );
}
