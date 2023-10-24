import React, { useEffect, useState } from "react";
import { fetchDataFromAPI } from './FetchAllData';
import { GoogleLogin } from "@react-oauth/google";
import styles from './Login.module.scss';
import logo from '../../assets/logo2.svg'
const Login = () => {
  const [code, setCode] = useState("");
  const [isLoginUnsucessfull, setLoginStatus] = useState(false);
  const redirectToExternalUrl = () => {
    window.location.href =
      "https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/admin.directory.user https://www.googleapis.com/auth/admin.directory.user.readonly https://www.googleapis.com/auth/cloud-platform https://www.googleapis.com/auth/classroom.courses.readonly&access_type=offline&redirect_uri=http://localhost:3000&response_type=code&client_id=891307349200-9khqe8cua5pvifevggim1mg6eg6a1cct.apps.googleusercontent.com";
  };
  const generateToken = (code) => {
    if (!code) return;
    const url = `http://localhost:3001/authorization?code=${code}`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data here
        localStorage.setItem("FetchUserToken", JSON.stringify(data));
        console.log(data);
        fetchDataFromAPI();
      })
      .catch((error) => {
        setLoginStatus(true);
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const codeValue = url.searchParams.get("code");
    const decodedCodeValue = decodeURIComponent(codeValue);
    if (decodedCodeValue) {
      setCode(decodedCodeValue);
      generateToken(decodedCodeValue);
    }
  }, [code]);
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginText}>LOGIN</div>
      <div className={styles.loginContent}>
        <img src={logo} alt="IET-DAVV Logo" />
        <p>IET-DAVV</p>
        <div className={styles.GoogleLogin}>
        <GoogleLogin
        color="primary"
        fullWidth="true"
        shape="pill"
        variant="contained"
        size="large"
        onSuccess={() => {
          redirectToExternalUrl();
          
        }}
        cookiePolicy="single_host_origin"
        onError={() => {
          setLoginStatus(true);
          console.log("Login Failed");
        }}
      />
        </div>
      {isLoginUnsucessfull && <p className={styles.loginUnsucess}>Login unsuccessful! Try Again.</p>}
      </div>
    </div>
  );
};
export default Login;





