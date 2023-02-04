import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
// import styles from '@/styles/Home.module.css'
import styles from '@/styles/Coin.module.css'
import { useRouter } from 'next/router'
import { GetServerSideProps, GetStaticPathsResult, GetStaticProps, GetStaticPropsContext, GetStaticPropsResult } from 'next'
import { type } from 'os'
import { ParsedUrlQuery } from 'querystring'

const inter = Inter({ subsets: ['latin'] })

type CoinPriceProps = {
    name: string,
    symbol: string,
    price: number
}

interface CoinPricePageParams extends ParsedUrlQuery {
    CoinPrice: string, // must match the url of the page
}

export default function CoinPricePage(data: CoinPriceProps) {
    const router = useRouter();
    const {coin} = router.query;
  return (
    <div>
        <div>{data.name}</div>
        <div>{data.symbol}</div>
        <div>{data.price}</div>
    </div> 
  )
}

export const getServerSideProps: GetServerSideProps<CoinPriceProps, CoinPricePageParams> = async (context: GetServerSidePropsContext<CoinPricePageParams>): Promise<GetServerSidePropsResult<CoinPriceProps>> => {
    const params = context.params;
    const res = await fetch(`https://data.messari.io/api/v1/assets/${params?.CoinPrice}/metrics`);
    const json = await res.json();
    // console.log(json.data.profile.general);
    
    return {props: {
        name: json.data.name,
        symbol: json.data.symbol,
        price: json.data.market_data.price_usd
    }};
 }


 

