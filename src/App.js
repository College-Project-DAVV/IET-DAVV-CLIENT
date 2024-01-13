import React, { useEffect } from "react";
import { useNavigate, Routes, Route, Outlet } from "react-router-dom";
import styles from "./index.module.scss";
import Searchbar from "./components/searchbar/Searchbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Teacherinfo from "./components/Teacherinfo/teacherinfo";
import Dashboard from "./components/Dashboard/Dashboard";
import StudentList from "./components/studentList/StudentList";
import Courseinfo from "./components/Courseinfo/Courseinfo";
import { DataProvider } from "./DataContext";
import { GroupDataProvider } from "./GroupDataContext";
import GroupData from "./components/GroupData/GroupData";
import GroupMembers from "./components/GroupMembers/GroupMembers";
import Landing from "./components/Landing/Landing";
const App = () => {
  const token = localStorage.getItem("FetchUserToken");
  const navigate  = useNavigate();
  useEffect(()=>{
    if(token){
      navigate("/dashboard");
    }
  },[])
  return (
    <DataProvider>
      <GroupDataProvider>
        <div className={styles.indexContainer}>
          <Routes>
            <Route
              path="/"
              element={
                <div className={styles.login}>
                  <Landing/>
                </div>
              }
            />
            {token && (
              <Route
                path="/dashboard"
                element={
                  <div className={styles.indexContainer}>
                 <div className={styles.leftContainer}>
                   <Sidebar />
                 </div>
                 <div className={styles.rightContainer}>
                   <div className={styles.searchbar}>
                     <Searchbar />
                     <div className={styles.target}>
                       <Outlet />
                     </div>
                   </div>
                 </div>
               </div>
               
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="teacherinfo" element={<Teacherinfo />} />
                <Route path="studentlist" element={<StudentList />} />
                <Route path="groupinfo" element={<GroupData />} />
                <Route path="courseinfo" element={<Courseinfo />} />
                <Route path="groupmembers" element={<GroupMembers />} />
              </Route>
            )}
          </Routes>
        </div>
      </GroupDataProvider>
    </DataProvider>
  );
};

export default App;
