import React, { useContext, createContext, useState, useEffect } from 'react';

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
    const initialContext = AppHelper()
    return (
        <AppContext.Provider value={initialContext}>
            {children}
        </AppContext.Provider>
    )
}
export const useAppContext = () => useContext(AppContext);

function AppHelper() {
    const message = "got context working"
    const [screenWidth, setScreenWidth] = useState(1)
    const [userData, setUserData] = useState({})
    useEffect(() => {
        // TODO: get localstorage data
        // setUserData()
    }, [])
    const updateUserData = data => {
        // TODO: set localstorage data and state
        // setUserData()
    }

    return {
        message,
        screenWidth,
        setScreenWidth,
        userData,
        setUserData,
        updateUserData
    }
}

export default AppContext;