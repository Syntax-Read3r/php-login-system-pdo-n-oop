import { createContext, useContext, useState } from "react";

let defaultValue = {
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {}

};

const StateContext = createContext(defaultValue);

export const ContextProvider = ({children}) => {
    
    const [user, setUser] = useState({
        name: 'Munya'
    });
    const [token, _setToken] = useState(null);

    const setToken = (token) => {
        _setToken(token)
        if(token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }


    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)