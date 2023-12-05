import { createContext, useEffect, useState } from "react";
import useFetchUser from "../hooks/useFetchUser";

export const AppContext = createContext({
    isOnBoardingComlete: false,
    setIsOnBoardingComlete: (isOnBoardingComlete) => { }
});

export const AppContextProvider = (props) => {

    const [isOnBoardingComlete, setIsOnBoardingComlete] = useState(false);

    return <AppContext.Provider {...props} value={{ isOnBoardingComlete, setIsOnBoardingComlete }} />
}