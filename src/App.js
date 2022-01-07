import React, {useState, Fragment} from 'react';
import {nanoid} from 'nanoid';
import './App.css';
import data from './data.json';
import ReadOnlyRow from './components/ReadOnlyRow';
import EditableRow from './components/EditableRow';

const App = () => {

    const [contacts, setContacts] = useState(data);
    const [addFormData, setAddFormData] = useState({
        fullName:'',
        address:'',
        phone:'',
        email:''
    });

    const [editFormData, setEditFormData] = useState({
        fullName:'',
        address:'',
        phone:'',
        email:''
    });

    const [editContactId, setEditContactId] = useState(null);

    const handleAddFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = {...addFormData};
        newFormData[fieldName] = fieldValue;
        
        setAddFormData(newFormData);
    };

    const handleEditFormChange = (event) => {
      event.preventDefault();

      const fieldName = event.target.getAttribute("name");
      const fieldValue = event.target.value;

      const newFormData = { ...editFormData};
      newFormData[fieldName] = fieldValue;
      setEditFormData(newFormData);
    }

    const handleAddFormSubmit = (event) => {
        event.preventDefault();

        const newContact = {
            id:nanoid(),
            fullName: addFormData.fullName,
            address: addFormData.address,
            phone: addFormData.phone,
            email: addFormData.email,
        };

        let newContacts = [...contacts, newContact];
        setContacts(newContacts);
    };


    const handleEditFormSubmit = (event) => {
      event.preventDefault();

      const editedContact = {
        fullName: editFormData.fullName,
        address: editFormData.address,
        phone: editFormData.phone,
        email: editFormData.email,
      }






       const newContacts = contacts?.map((contact) => (
        contact.id === editContactId ? editedContact : contact
      ))
      console.log(newContacts);
      setContacts(newContacts);
      setEditContactId(null);
    }

    const handleEditClick = (event, contact) => {
      event.preventDefault();
      setEditContactId(contact.id);

      const formValues = {
        fullName: contact.fullName,
        address:contact.address,
        phone:contact.phone,
        email:contact.email,
      }
      setEditFormData(formValues);
    };


    const handleCancelClick = () => {
      setEditContactId(null);
    };

    const handleDeleteClick = (contactId) => {
      // const newContacts = [...contacts];
//filter
      // const index = contacts.findIndex((contact) => contact.id === contactId);

      // newContacts.splice(index, 1);
//till here
console.log(contacts);

const newContacts = contacts?.filter((contact) => (
  contact.id === contactId ? false : true
))

console.log(newContacts);

      setContacts(newContacts);
    }

    return (
        <div className="app-container">
            <h1>Hello</h1>
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
                        {editContactId === contact.id ? ( <EditableRow editFormData={editFormData} handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick}/>) : (<ReadOnlyRow contact={contact} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick}/>)}

                      </Fragment>
                        
                    ))}
                </tbody>
            </table>
            </form>
            <h2>Add more details</h2>
            <form onSubmit={handleAddFormSubmit}>
                <input type="text" name="fullName" required placeholder='Enter a name ' onChange={handleAddFormChange}/>
                <input type="text" name="address" required placeholder='Enter an address' onChange={handleAddFormChange}/>
                <input type="text" name="phone" required placeholder='Enter phone number ' onChange={handleAddFormChange}/>
                <input type="email" name="email" required placeholder='Enter email id' onChange={handleAddFormChange}/>
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default App;
