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

    const [userData, setUserData] = useState([])
    useEffect(() => {
        const lsData = JSON.parse(window.localStorage.getItem("lightbotdata"))
        if (lsData) {
            setUserData(prev => lsData)
        }
    }, [])

    const updateUserData = completedLevelData => {
        setUserData(prevUserData => {
            let newData = [...prevUserData]
            newData[completedLevelData.id] = {
                level_id: completedLevelData.id,
                section_id: completedLevelData.section_id,
                completed: true
            }
            window.localStorage.setItem("lightbotdata", JSON.stringify(newData))
            return newData
        })
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