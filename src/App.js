import React from 'react';
import styles from './index.module.scss'
import Login from './components/Login/Login'
const App = () => {
  return (
    <div className={styles.main}>
     <Login/>
    </div>
  );
};
export default App;
