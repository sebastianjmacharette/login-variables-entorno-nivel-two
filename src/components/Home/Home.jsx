import React, { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';

function Home() {
  const [token, setToken] = useState("");
  const [userType, setUserType] = useState("");
  const [roles, setRoles] = useState([]);

   // Clave secreta para la desencriptación desde las variables de entorno
   const secretKey = import.meta.env.VITE_SECRET_KEY;

   // Claves utilizadas para almacenar los datos en localStorage
  const tokenKey = "lkijdn";
  const userTypeKey = "mnoqrs";
  const rolesKey = "tuvwxy";

  useEffect(() => {
    // Recuperar los datos encriptados de localStorage
    const encryptedToken = localStorage.getItem(tokenKey);
    const encryptedUserType = localStorage.getItem(userTypeKey);
    const encryptedRoles = localStorage.getItem(rolesKey);

    if (encryptedToken && encryptedUserType && encryptedRoles) {
      // Desencriptar los datos
      const decryptedToken = CryptoJS.AES.decrypt(encryptedToken, secretKey).toString(CryptoJS.enc.Utf8);
      const decryptedUserType = CryptoJS.AES.decrypt(encryptedUserType, secretKey).toString(CryptoJS.enc.Utf8);
      const decryptedRoles = JSON.parse(CryptoJS.AES.decrypt(encryptedRoles, secretKey).toString(CryptoJS.enc.Utf8));

      // Actualizar el estado con los datos desencriptados
      setToken(decryptedToken);
      setUserType(decryptedUserType);
      setRoles(decryptedRoles);
    }
  }, [secretKey]);
  return (
    <div className='bg-gray-800 h-screen flex justify-center m-10 items-center flex-col'>
    <h1 className='text-4xl text-white p-20'>Home Page</h1>
    <div className='text-white text-xs m-10 p-20'>
      <p>Token: {token}</p>
      <p>User Type: {userType}</p>
      <p>Roles: {roles.join(", ")}</p>
    </div>
  </div>
  );
}

export default Home;
