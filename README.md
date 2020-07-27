# next-split-ssr-leak

Playground to surface potential memory leaks when running split.io's react-client with Next.js

Based off of the next.js's "Custom server with TypeScript + Nodemon example" template.

### Usage

Install it and run:

```bash
npm install
npm run dev
```

### Leak #1

At [ssr-leak-1](https://github.com/elhoyos/next-split-ssr-leak/releases/tag/ssr-leak-1) you can see a leak by following these steps:

1. Go to `/`
2. Go to `/a`
3. In another tab, take a snapshot visiting `/___heapdump` (wait for the snapshot to finish)
5. Go to `/a` and refresh the page several times
6. Take a heapdump snapshot
7. Go to `/`
8. Go to `/b`
9. Go to `/`
10. Go to `/a` and refresh the page several times
11. Take a heapdump snapshot

Load the 3 snapsthots in Chrome and filter by objects matching "split". You should see they increased between step 6 to 11.
