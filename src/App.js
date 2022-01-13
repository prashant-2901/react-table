import React, { useState, Fragment, useEffect } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import data from "./data.json";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";
// import { increment, decrement, reset } from "./Actions/counter";
import { useSelector, useDispatch } from "react-redux";
import { addContact, updateContact, deleteContact } from "./context";
//react-redux

const App = () => {
  const counter = useSelector((state) => state.counter);
  const contacts = useSelector((state) => state.contacts);
  const dispatch = useDispatch();

  const [addFormData, setAddFormData] = useState({
    fullName: "",
    address: "",
    phone: "",
    email: "",
  });

  const [editFormData, setEditFormData] = useState({
    fullName: "",
    address: "",
    phone: "",
    email: "",
  });
  const [editContactId, setEditContactId] = useState(null);
  const handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
  };
  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;
    setEditFormData(newFormData);
  };
  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    const newContact = {
      id: nanoid(),
      fullName: addFormData.fullName,
      address: addFormData.address,
      phone: addFormData.phone,
      email: addFormData.email,
    };
    dispatch(addContact(newContact));
  };
  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    console.log(editContactId);
    const editedContact = {
      id: editContactId,
      fullName: editFormData.fullName,
      address: editFormData.address,
      phone: editFormData.phone,
      email: editFormData.email,
    };

    dispatch(updateContact(editedContact));
    setEditContactId(null);
  };
  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);
    const formValues = {
      fullName: contact.fullName,
      address: contact.address,
      phone: contact.phone,
      email: contact.email,
    };
    setEditFormData(formValues);
  };
  const handleCancelClick = () => {
    setEditContactId(null);
  };
  const handleDeleteClick = (contactId) => {
    dispatch(deleteContact({ id: contactId }));
  };

  useEffect(() => {
    fetch("/src/data.json")
      .then((response) => response.json())

      .then((data) => console.log({ data }));
  }, []);

  return (
    <>
      <div className="app-container">
        <h1>Table</h1>
        <form onSubmit={handleEditFormSubmit}>
          <table>
            <thead>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Action</th>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <Fragment>
                  {editContactId === contact.id ? (
                    <EditableRow
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                    />
                  ) : (
                    <ReadOnlyRow
                      contact={contact}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
                    />
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </form>
        <h2>Add more details</h2>
        <form onSubmit={handleAddFormSubmit}>
          <input
            type="text"
            name="fullName"
            required
            placeholder="Enter a name "
            onChange={handleAddFormChange}
          />
          <input
            type="text"
            name="address"
            required
            placeholder="Enter an address"
            onChange={handleAddFormChange}
          />
          <input
            type="text"
            name="phone"
            required
            placeholder="Enter phone number "
            onChange={handleAddFormChange}
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Enter email id"
            onChange={handleAddFormChange}
          />
          <button type="submit">Add</button>
        </form>
      </div>
    </>
  );
};
export default App;
