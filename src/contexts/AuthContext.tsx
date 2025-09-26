// import { createContext, useState, useEffect, ReactNode } from "react";

// // 1. Context 타입 정의
// interface AuthContextType {
//   isLoggedIn: boolean;
//   setIsLoggedIn: (value: boolean) => void;
// }

// // 2. 초기값 타입 지정
// export const AuthContext = createContext<AuthContextType>({
//   isLoggedIn: false,
//   setIsLoggedIn: () => {},
// });

// // 3. children 타입 지정
// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider = ({ children }: AuthProviderProps) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsLoggedIn(!!token);
//   }, []);

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };