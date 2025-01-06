'use client';

import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Form from './form';
import { deleteFact } from '../api/facts';

function FactCard({ fact, deleteFunc }) {
  // when we call fact card in response page, we pass in the fact object as a prop. in response page, we map through the facts object and pass each fact object to the fact card component. that is why we can access fact.text in the fact card component and why we can pass fact as a prop to the form component.
  const [localFact, setLocalFact] = useState(fact); // localFact is the state that we are going to use to update the fact. setLocalFact is the function that we are going to use to update the state. We have to do this because when we edit the fact, it changes in firebase but not in the UI (although, the UI does change after refreshing!). We need to update the UI with the new fact. it doesn't update the UI because the fact object is passed as a prop and is not stored in the state.
  const [editMode, setEditMode] = useState(false); // if it's in edit mode, the state will be true. if not, it's false.

  const deleteIndFact = () => {
    deleteFact(fact.firebaseKey, 'Yes').then(() => deleteFunc()); // just doing yes for now, but can dyanmically assign val later
    // deleteFunc reloads the facts after deleting
  };
  return (
    <Card>
      <Card.Body>
        {editMode ? ( // If edit mode is true, display 'EDIT MODE'.
          <>
            <p>EDIT MODE</p>
            <Form obj={localFact} func={setLocalFact} />
            {/* By passing fact as a prop from the parent component (FactCard) to the child component (Form), you have access to fact in the child component and can use it to initialize the state.  */}
            <div>
              <button type="button" className="btn btn-success" onClick={() => setEditMode(false)}>
                EXIT EDIT MODE
              </button>
            </div>
          </>
        ) : (
          // If edit mode is false, display the regular card.
          <>
            {localFact.text}
            <div>
              <button type="button" className="btn btn-secondary" onClick={() => setEditMode(true)}>
                EDIT FACT
              </button>
              <button type="button" className="btn btn-danger" onClick={deleteIndFact}>
                DELETE FACT
              </button>
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );
}
FactCard.propTypes = {
  fact: PropTypes.string.isRequired,
  deleteFunc: PropTypes.func.isRequired,
};

export default FactCard;
