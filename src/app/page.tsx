import styles from './page.module.css';
import SearchInput from '@components/search/SearchInput';

export default function Home() {
  return (
    <main>
      <h1>Social Media Explorer</h1>
      <p className={styles.heading_secondary}>Explore and analyze Social Media Accounts</p>
      <div className={styles.container}>
        <SearchInput/>
      </div>
    </main>
  )
}
