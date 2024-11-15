import React, { createContext, useState } from 'react';

export const UserContext = createContext();

/**
 * Return the list of users
 */
export function getUsers()
{
    return [ "John", "Paul", "George", "Ringo" ];
}

export const UserProvider = ({ children }) => 
{
    const [selectedUser, setSelectedUser] = useState( "John" );  
  
    const updateUser = (user) => {
        setSelectedUser(user);
    };
  
    return (
      <UserContext.Provider value={{ selectedUser, updateUser }}>
        {children}
      </UserContext.Provider>
    );
};
