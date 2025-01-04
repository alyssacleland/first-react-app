import React from 'react';
import PropTypes from 'prop-types';
import FactCard from '../../../components/card';
import { readFacts } from '../../../api/facts';

export default async function responsePage({ params, searchParams }) {
  const facts = await readFacts(params.userID, searchParams.value);
  console.log(facts);
  console.log(Object.values(facts));

  return (
    <div>
      {/* {searchParams.value} */}
      {Object.values(facts).map((fact) => (
        <FactCard key={fact.firebaseKey} fact={fact.text} />
      ))}
    </div>
  );
}

responsePage.propTypes = {
  params: PropTypes.string.isRequired,
  searchParams: PropTypes.string.isRequired,
};

// A search param is a key-value pair in the URL query string. For example, in the URL /search?query=hello, the search param is query=hello. The searchParams object provides read-only access to the search params in the URL query string.
// The searchParams object is part of the URLSearchParams interface, which is available in the global scope. It provides methods to work with the query string in a URL.
// for us here, the search param is value=xxx in the URL /response-yes/[userID]?value=xxx. it takes on key value pairs in the URL query string. so key would be value and value would be xxx. lol
