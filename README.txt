
https://www.youtube.com/watch?v=FV57K4s_B14&list=PL53JxaGwWUqCr3xm4qvqbgpJ4Xbs4lCs7&index=16&ab_channel=Josh%27sDevBox

Next.JS
- The React Framework for Production
- Lightweight framework for static and server-rendered applications built with React
- Bulit-in code bundler(Webpack) and code transpiler(Babel)
- React routes for navigating single page applications(SPA)

Create a project
Pre-req: Node 12+ installed
Setup: npx create-next-app --typescript <project name>
Run with: npm install & npm run dev (http://localhost:3000/)

Static Page Routes 
Page file mapping to URL:
- /pages/index.tsx -> / (http://localhost:3000/)
- /pages/about.tsx -> /about (http://localhost:3000/about)
- /pages/random/page.tsx -> /random/page

About _app.tsx
App component that initializes pages. It can override the default behavior by creating a _app.tsx on the root of the page
- Persisting layout between page changes
- Inject additional data into pages(React Context for Phantom Wallet)
- Add global CSS 

$ npx create-next-app --typescript crypto-info
$ cd crypto-info/
$ npm install
$ npm run dev (http://localhost:3000)
$ cat crypto-info/pages/index.tsx (Front Page - Get started by editing src/pages/index.tsx)

Dynamic Page Routes 
it would allow us to access a dynamic data like post id or user id
- /pages/user/[id].tsx -> /user/1, /user/2
- /pages/post/[post]/[comment].tsx -> /post/1/2, post/100/10
- /[coin] -> /bitcoin, /ethereum (Implement Dynamic Page Route)
$ cat crypto-info/pages/[coin].tsx 
http://localhost:3000/eth
http://localhost:3000/bitcoin 

Pre-rendering strategies
Better loading performance and SEO benefits
- Static Site Generation(SSG): Static pages(default) where the contents doesn't change often and cache the generated pages for faster loading time.
- Server-Side Rendering(SSR)
- Incremental Static Regeneration(ISR)
- Client-Side Rendering(CSR)

Using getStaticProps
Next.JS supports fetching data for client side generation by using getStaticProps
- Runs at production build time to generate a static page and for local deployments, it's ran on every request
- Inside getStaticProps, it can fetch external data and send it to a page which only works on Pages!!!
- Implement getStaticProps, Update index page to show information about bitcoin and use Messari(https://messari.io/api) to get the Asset Profile information
$ cat crypto-info/pages/btc.tsx
http://localhost:3000/btc

SSG for Dynamic Routes 
Static Site Generation fetches external data for single pages, but dynamic pages?
To handle dynamic routes, it needs to:
1. Define getStaticProps to specify the pages that want Next.JS to generate on build time for it to cache
2. Use the paths generated in getStaticProps to define the pages
$ cat crypto-info/pages/profile/[CoinProfile].tsx
http://localhost:3000/profile/btc, http://localhost:3000/profile/eth, http://localhost:3000/profile/sol, http://localhost:3000/profile/doge

Dealing with undefined paths
Currently non-defined routes in getStaticPaths will NOT BE RENDERED.
Solution:
1. Set fallback settings
2. Incremental Static Regeneration
3. Server-Side Rendering

Fallbacks for getStaticPaths
3 options that can be set for fallback:
1. fallback: false - Any non-defined path will resuilt in a 404
2. fallback: true - The dynamic route is added to the list of pre-rendered pages
3. fallback: blocking - Similar to fallback: true, the difference is that the browser waits for the request to be completed before the page is loaded

Incremental Static Regeneration(ISR)
ISR allows you to create and update static pages after you built the site without having to re-build and regeneration the pre-rendered pages.
Similar to fallback: blocking, except you can also update existing pre-rendered pages.
Enable this by setting the option revalidate: <seconds> on getStaticProps()

Server Side Rendering(SSR)
SSR is for pre-rendering pages where data is constantly changing. It makes the request every single time
Examples: Social Media apps, Stock apps
Pro: Still have SEO benefits
Con: Slower performance due to having to load the page every request
Using getServersideProps
- Next.JS uses getServersideProps to fetch data only on the server-side
- Doesn't load the page until the request is completed and passed to the client
- Don't use API Routes as SSR is already ran on the server
$ cat crypto-info/pages/price/[CoinPrice].tsx
http://localhost:3000/price/btc, http://localhost:3000/price/eth, http://localhost:3000/price/sol, http://localhost:3000/price/doge

Caching with SSR
For performance benefits, it can cache the responses that we have received.
- s-maxage: the time that the response is fresh and we will re-use the response
- stale-while-revalidate: the time to use stale data while requerying in the background for the next request

Client Side Data Fetching
Render non-important external data after the page loads.
Things to note:
- Can negatively the app loading time
- No SEO benefits

Using SWR for client-side data fetching
Next.JS provides a SWR hook to help fetch and cache data
Implements a stale-while-revalidate strategy:
1. Ruturn data from cache
2. Fetch the newest data
3. Update the UI when you get the latest data (Resource - https://swr.vercel.app/)
Implement SWR 
Goal: 
- Explore automatic revalidation of SWR(https://swr.vercel.app/docs/revalidation)
- Create a similar SSR example, but instead of loading the crypto price on the server side, it will re-fetch the data over an interval of time.
- Use Messari to get price information(https://messari.io/api)
$ cat crypto-info/package.json
 "dependencies": {
     "swr": "1.3.0"
$ npm install
$ cat crypto-info/pages/price/client/bitcoin.tsx
http://localhost:3000/price/client/bitcoin

API Routes
Next.JS comes with the capability to build backend API's
Req - the data that the API caller send to you
Res - the response object that you want to send back to the API caller
Implement Dynamic API Routes
Goal:
- Write a dynamic API routes that takes in the name of the crypto to make a price request to Messari and return the value
 ex: api/price/btc, and api/price/eth
- Create a new page to call this API instead
$ cat crypto-info/pages/api/price/[coin].ts
$ cat crypto-info/pages/price/client/bitcoinGet.tsx
http://localhost:3000/price/client/bitcoinGet

Implement API Routes that accepts payloads
Goal:
- Write a POST request that takes a crypto name in the body to make a price request to Messari and return the value : /api/price
$ cat crypto-info/pages/api/price.ts
$ cat crypto-info/pages/price/client/bitcoinPost.tsx
http://localhost:3000/price/client/bitcoinPost

Conclusion
- Learned what Next.JS is
- Explored alternative frontend framework solutions
- Setup a new Next.JS project
- Page routing
- Next.JS html and css modules
- Different rendering/data fetching strategies
 1. Static Site Generation(SSG)
 2. Incremental Static Regeneration(ISR)
 3. Server Side Rendering(SSR)
 4. Client Side Data Fetching
- API Routes:
 1. Dynamic
 2. POST requests with payload
