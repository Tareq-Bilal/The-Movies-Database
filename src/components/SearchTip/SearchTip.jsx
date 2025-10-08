import React from 'react'
import { BsFillInfoCircleFill } from "react-icons/bs";
import styles from './SearchTip.module.css'
const SearchTip = () => {
  return (
    <div className={styles.searchTip}>
        
      <p><BsFillInfoCircleFill className={styles.icon} />Tip: You can use the 'y:' filter to narrow your results by year. Example: 'star wars y:1977'.</p>
    </div>
  )
}

export default SearchTip
