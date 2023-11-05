import React from "react";
import styles from "./index.module.scss";
import Login from "./components/Login/Login";
import Searchbar from "./components/searchbar/Searchbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Teacherinfo from "./components/Teacherinfo/teacherinfo";
import Dashboard from "./components/Dashboard/Dashboard";
import StudentList from "./components/studentList/StudentList";
// import ProfileImage from "./ProfileImage";
import {
  Routes,
  Route,
  Outlet,
  useNavigate,
} from "react-router-dom";
import { DataProvider } from "./DataContext";
import { GroupDataProvider } from "./GroupDataContext";
import GroupData from "./components/GroupData/GroupData";
const App = () => {
  const token = localStorage.getItem("FetchUserToken");
  const navigate = useNavigate();
  return (
    <DataProvider>
      <GroupDataProvider>
      <div className={styles.indexContainer}>
        <Routes>
          <Route
            path="/"
            element={
              <div className={styles.login}>
                <Login />
              </div>
            }
          />
          {
             token && <Route
              path="dashboard"
              element={
                  <div className={styles.indexContainer}>
                    <div className={styles.leftContainer}>
                      <Sidebar />
                    </div>
                    <div className={styles.rightContainer}>
                      <div className={styles.searchbar}>
                        <Searchbar/>
                        <div className={styles.target}>
                          <Outlet />
                        </div>
                      </div>
                    </div>
                  </div>
              }
              
            >
              <Route index element={<Dashboard />
              } />
              <Route path="teacherinfo" element={<Teacherinfo />} />
              <Route path="studentlist" element={<StudentList />} />
              <Route path="groupinfo" element={<GroupData />} />
            </Route>
          }
        </Routes>
      </div>
      </GroupDataProvider>
    </DataProvider>
  );
};
export default App;
