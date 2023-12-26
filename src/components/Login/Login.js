import React, { useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import styles from "./Login.module.scss";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [isLoginUnsucessfull, setLoginStatus] = useState(false);
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
 
  const redirectToExternalUrl = () => {
    window.location.href =
      `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/admin.directory.user https://www.googleapis.com/auth/admin.directory.group.readonly https://www.googleapis.com/auth/admin.directory.group.member https://www.googleapis.com/auth/admin.directory.group.member.readonly https://www.googleapis.com/auth/admin.directory.user.readonly https://www.googleapis.com/auth/classroom.courseworkmaterials https://www.googleapis.com/auth/classroom.topics.readonly https://www.googleapis.com/auth/cloud-platform https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.rosters https://www.googleapis.com/auth/classroom.coursework.students.readonly https://www.googleapis.com/auth/classroom.coursework.students https://www.googleapis.com/auth/classroom.profile.emails https://www.googleapis.com/auth/classroom.profile.photos https://www.googleapis.com/auth/classroom.courses&access_type=offline&redirect_uri=${REDIRECT_URI}&response_type=code&client_id=${CLIENT_ID}`;
  };
  const generateToken = (code) => {
    if (!code) return "NAN";
    const url = `${SERVER_BASE_URL}/authorization?code=${code}`;
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
        navigate("/dashboard");
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
      if (localStorage.getItem("FetchUserToken")) {
        navigate("/dashboard");
      }
    }
  }, [code,navigate]);
  return (
        <div className={styles.GoogleLogin}>
          <GoogleLogin
            color="primary"
            fullWidth="true"
            shape="pill"
            variant="contained"
            size="large"
            onSuccess={(credentialResponse) => {
              var decoded = jwt_decode(credentialResponse.credential);
              const result = {
                result: decoded,
                token: credentialResponse.credential,
              };
              localStorage.setItem("profile", JSON.stringify(result));
              if (result) {
                redirectToExternalUrl();
              }
            }}
            cookiePolicy="single_host_origin"
            onError={() => {
              setLoginStatus(true);
              console.log("Login Failed");
            }}
          />
        {isLoginUnsucessfull && (
          <p className={styles.loginUnsucess}>Login unsucessful!! Try Again.</p>
        )}
      </div>
  );
};
export default Login;
