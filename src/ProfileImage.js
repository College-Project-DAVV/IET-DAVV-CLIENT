import React from "react";
import { useData } from "./GroupDataContext";
import defaultImage from "../src/assets/google.svg";

const ProfileImage = () => {
  const groupdata = useData();

  if (!groupdata || !Array.isArray(groupdata)) {
    return <div>No data available.</div>;
  }

  function customBase64Decode(encodedString) {
    // Replace the custom characters with the standard ones
    const standardBase64 = encodedString
      .replace(/_/g, '/')
      .replace(/-/g, '+')
      .replace(/\*/g, '=')
      .replace(/\./g, '=');

    // Use the atob function to decode the standard base64
    const decodedData = atob(standardBase64);

    return decodedData;
  }
  return (
    <div>
      {groupdata.map((item, index) => (
        <div key={index}>
          {item.members.map((user, userIndex ) => (
            <div key={userIndex}>
              {user.userImage ? (
                <img
                  src={`data:image/png;base64,${customBase64Decode(user.userImage)}`}
                  alt='temp'
                />
              ) : (
                <img src={defaultImage} alt='check' />
              )}
            </div>
          ))}
        </div>
      ))} 
    </div>
  );
};

export default ProfileImage;
