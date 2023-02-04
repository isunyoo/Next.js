import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
// import styles from '@/styles/Home.module.css'
import styles from '@/styles/Coin.module.css'
import { useRouter } from 'next/router'
import { GetServerSideProps, GetStaticPathsResult, GetStaticProps, GetStaticPropsContext, GetStaticPropsResult } from 'next'
import { type } from 'os'
import { ParsedUrlQuery } from 'querystring'
import useSWR from 'swr'

const inter = Inter({ subsets: ['latin'] })
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function BitcoinPricePage() {
    const {data} = useSWR("https://data.messari.io/api/v1/assets/bitcoin/metrics", fetcher, {refreshInterval: 1000});
    if(!data){
        return <></>
    }
    return (
        <div>
            <div>{data.data.name}</div>
            <div>{data.data.symbol}</div>
            <div>{data.data.market_data.price_usd}</div>
        </div> 
    )
}

