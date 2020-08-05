import * as Contacts from 'expo-contacts';

const initialState = [];
   


// Reducers, a function that takes an action and produces a new version of state, from a payload and a type.
export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {

  case 'FETCH_CONTACTS':
    console.log('payload from fetch contacts', payload);
    return payload;


  default:
    return state;
  }

  
  

};


// actions are the functions that components can run themselves

export const fetchContacts = () => async (dispatch) => {
  const contactList = await Contacts.getContactsAsync();
  console.log('contact list in fetch contacts action:', contactList);
  dispatch({
    type: 'FETCH_CONTACTS',
    payload: contactList.data,
  });
};