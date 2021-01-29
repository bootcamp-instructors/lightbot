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
    const [screenWidth, setScreenWidth] = useState(1)

    const [userData, setUserData] = useState({})
    useEffect(() => {
        const lsData = JSON.parse(window.localStorage.getItem("lightbotdata"))
        if (lsData) {
            setUserData(prev => lsData)
        }
    }, [])

    const updateUserData = data => {
        setUserData(prev => { return { ...data } })
        window.localStorage.setItem("lightbotdata", JSON.stringify(data))
    }

    return {
        screenWidth,
        setScreenWidth,
        userData,
        setUserData,
        updateUserData
    }
}

export default AppContext;