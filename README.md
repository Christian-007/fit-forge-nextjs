# Software Architecture Diagram

To achieve separation of concerns, this project incorporates a layered-architecture (router, handlers, and repositories) but only on the server side (Next.js Router Handlers). The Router Handlers only act as Proxy Server as this gives an advantage of masking some secrets like API keys and HTTP Only Cookie.

As for the client-side data fetching, React Query is used to handle the data fetching state as well as out-of-the-box caching mechanism.

![Dexalune's Software Architecture](https://github.com/Christian-007/fit-forge-nextjs/blob/main/docs/frontend-architecture.png?raw=true)

# Cloud Architecture Diagram

This project mainly utilises Google Cloud Platform products to achieve high scalability and availability. Cloudflare Registrar and proxied DNS are also used on top of Google Cloud services to protect the site and APIs from DDoS attacks and to optimize images.

![Dexalune's Cloud Architecture](https://github.com/Christian-007/fit-forge/blob/master/docs/dexalune-cloud-architecture.png?raw=true)

## Related repositories

- Frontend (Next.js): https://github.com/Christian-007/fit-forge-nextjs
- Core API (Go): https://github.com/Christian-007/fit-forge
- Notification API (Go): https://github.com/Christian-007/fit-forge-notification
- Scheduler (Go): https://github.com/Christian-007/fit-forge-scheduler

## Tech Stack

- Language: `TypeScript`
- Frontend framework: `Next.js` (v14 App Router)
- Libraries: `@tanstack/react-query`, `react-hook-form`, `zod`, `react-hot-toast`

# Running on a local machine

1. Clone this project (make sure to use at least Node v22)
2. Install the dependencies using `npm install`
3. Run the project using `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
