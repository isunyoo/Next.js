// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  price: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const coin = req.body.coin;
  console.log(coin);
  const response = await fetch(`https://data.messari.io/api/v1/assets/${coin}/metrics`);
  const metric = await response.json();
  console.log(metric);
  res.status(200).json({ price: metric.data.market_data.price_usd })
}
