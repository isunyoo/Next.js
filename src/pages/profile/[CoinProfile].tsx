import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
// import styles from '@/styles/Home.module.css'
import styles from '@/styles/Coin.module.css'
import { useRouter } from 'next/router'
import { GetStaticPathsResult, GetStaticProps, GetStaticPropsContext, GetStaticPropsResult } from 'next'
import { type } from 'os'
import { ParsedUrlQuery } from 'querystring'

const inter = Inter({ subsets: ['latin'] })

type CoinProfileProps = {
    name: string,
    symbol: string,
    background: string
}

interface CoinProfilePageParams extends ParsedUrlQuery {
    CoinProfile: string, // must match the url of the page
}

export default function CoinProfilePage(data: CoinProfileProps) {
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

export const getStaticProps: GetStaticProps<CoinProfileProps, CoinProfilePageParams> = async (context: GetStaticPropsContext<CoinProfilePageParams>): Promise<GetStaticPropsResult<CoinProfileProps>> => {
    const params = context.params;
    const res = await fetch(`https://data.messari.io/api/v2/assets/${params?.CoinProfile}/profile`);
    const json = await res.json();
    console.log(json.data.profile.general);

    return {props: {
        name: json.data.name,
        symbol: json.data.symbol,
        background: json.data.profile.general.background.background_details
    }};
}

export const getStaticPaths = async (): Promise<GetStaticPathsResult<CoinProfilePageParams>> => {
    const paths: Array<{params: CoinProfilePageParams}> = [
        {params: {CoinProfile: "eth"}},
        {params: {CoinProfile: "btc"}},
        {params: {CoinProfile: "sol"}}
    ];
    return {
        paths, 
        fallback: true
    }
}