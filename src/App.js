import React from 'react';
import styles from './index.module.scss'
import Index from './components/Index/Index'
const App = () => {
  return (
    <div className={styles.main}>
      <Index/>
    </div>
  );
};
export default App;
