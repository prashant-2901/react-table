import { createStore } from "redux";
import { combineReducers } from "redux";
import data from "./data.json";

const contactsReducer = (state = data, action) => {
  switch (action.type) {
    case "add":
      console.log(action.payload);
      return [...state, action.payload];
    case "update":
      console.log(action.payload);
      const newContacts = state?.map((contact) =>
        contact.id === action.payload.id ? action.payload : contact
      );
      return newContacts;
    case "delete":
      return state?.filter((contact) => contact.id !== action.payload.id);

    default:
      return state;
  }
};

const addReducer = combineReducers({
  contacts: contactsReducer,
});
const store = createStore(addReducer);
export default store;
