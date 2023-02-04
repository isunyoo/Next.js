import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
// import styles from '@/styles/Home.module.css'
import styles from '@/styles/Coin.module.css'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function CoinPage() {
    const router = useRouter();
    const {coin} = router.query;
  return (
    <div>
        <div className='global-coin'>{coin}</div>
        <div>{coin}</div>
        <div className={styles.localCoin}>{coin}</div>
    </div> 
  )
}
