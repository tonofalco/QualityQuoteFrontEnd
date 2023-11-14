// AppContext.js
import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [shouldReloadGoogleMaps, setShouldReloadGoogleMaps] = useState(false);

    return (
        <AppContext.Provider value={{ shouldReloadGoogleMaps, setShouldReloadGoogleMaps }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};
