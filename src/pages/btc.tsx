import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
// import styles from '@/styles/Home.module.css'
import styles from '@/styles/Coin.module.css'
import { useRouter } from 'next/router'
import { GetStaticPathsResult, GetStaticProps, GetStaticPropsResult } from 'next'
import { type } from 'os'

const inter = Inter({ subsets: ['latin'] })

type BtcProfileProps = {
    name: string,
    symbol: string,
    background: string
}

export default function BtcProfilePage(data: BtcProfileProps) {
    const router = useRouter();
    const {coin} = router.query;
  return (
    <div>
        <div>{data.name}</div>
        <div>{data.symbol}</div>
        <div>{data.background}</div>
    </div> 
  )
}

export const getStaticProps: GetStaticProps = async (): Promise<GetStaticPropsResult<BtcProfileProps>> => {
    const res = await fetch("https://data.messari.io/api/v2/assets/bitcoin/profile");
    const json = await res.json();
    console.log(json.data.profile.general);

    return {props: {
        name: json.data.name,
        symbol: json.data.symbol,
        background: json.data.profile.general.background.background_details
    }};
}