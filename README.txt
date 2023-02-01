
https://www.youtube.com/watch?v=FV57K4s_B14&list=PL53JxaGwWUqCr3xm4qvqbgpJ4Xbs4lCs7&index=16&ab_channel=Josh%27sDevBox
30:15

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
$ cat crypto-info/pages/index.tsx (Front Page)

Dynamic Page Routes 
it would allow us to access a dynamic data like post id or user id
- /pages/user/[id].tsx -> /user/1, /user/2
- /pages/post/[post]/[comment].tsx -> /post/1/2, post/100/10
- /[coin] -> /bitcoin, /ethereum (Implement Dynamic Page Route)
$ cat crypto-info/pages/[coin].tsx 
http://localhost:3000/eth
http://localhost:3000/bitcoin 

