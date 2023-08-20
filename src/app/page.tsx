import styles from './page.module.css';
import Image from 'next/image';

export default function Home() {
  return (
    <main>
      <div className={styles.container}>
        <div className={styles.img_wrapper}>
          <img className={styles.logo} src='/youtube-svgrepo-com.svg' alt='Instgram logo'/>
        </div>
        <div className={styles.img_wrapper}>
          <img className={styles.logo} src='/facebook-1-svgrepo-com.svg' alt='Instgram logo'/>
        </div>
        <div className={styles.img_wrapper}>
          <img className={styles.logo} src='/instagram-svgrepo-com.svg' alt='Instgram logo'/>
        </div>
      </div>
      <p>
        Placeholder page for Social Media Explorer App before development starts.
      </p>
    </main>
  )
}
