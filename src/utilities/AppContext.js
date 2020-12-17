import React, { useContext, createContext } from 'react';

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

    return {
        message
    }
}

export default AppContext;