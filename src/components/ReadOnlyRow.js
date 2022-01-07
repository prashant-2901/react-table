import React from 'react';

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
    // console.log(contact.id);
    return (
        
            <tr >
                <td>{contact.fullName}</td>
                <td>{contact.address}</td>
                <td>{contact.phone}</td>
                <td>{contact.email}</td>
                <td>    
                    <button type='button' onClick={(event) => handleEditClick(event, contact)}>Edit</button>
                    <button type='button' onClick={() => handleDeleteClick(contact.id)}>Delete</button>
                </td>
            </tr>
        
    );
};

export default ReadOnlyRow;
