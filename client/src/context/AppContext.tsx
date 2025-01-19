import { ReactNode, useState, useLayoutEffect, createContext, Dispatch, SetStateAction } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface AppProviderProps {
  children: ReactNode;
}

//Defing the type of all its export items
interface AppContextType {
  isAppLoading: boolean;
  setisAppLoading: Dispatch<SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {

  //State to track app status 
  const [isAppLoading, setisAppLoading] = useState(true);
  const navigate = useNavigate()

  //Function to fetch user profile on each page refreash
  const fetchProfile = async () => {
    axios
      .get("/auth/me")
      .then((res) => {
        setisAppLoading(false);
        navigate('/home')
      })
      .catch((_err) => {
        setisAppLoading(false);
        navigate("/");
      });
  }

  useLayoutEffect(() => {
    fetchProfile()
  }, [])

  return (
    <AppContext.Provider
      value={{
        isAppLoading, setisAppLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
