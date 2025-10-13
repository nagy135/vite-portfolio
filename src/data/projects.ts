export const projectsData = [
  {
    name: "Britestage",
    description: "A live event organization and runtime platform",
    url: "https://app.britestage.com",
    video: "/videos/britestage.mp4",
    videoDescription: "Video shows 4 browser windows, one (top left) controls bouncing via web server websockets to next 3 and shows content, my face and screen sharing. It looks to be slow but i was on very slow connection and streamed 3 browsers so it is actually quite surprising how good it works with such limited bandwidth. Bottom left: records screen (connected speaker), Bottom right: stage player, records user via webcam, Top right: main presentation player, shows content and miniature of speaker."
  },
  {
    name: "Market Rull World",
    description: "Real-time marketplace using Node.js (gRPC, sockets) and Next.js",
    url: "https://market.rull.world",
    video: "/videos/rull.mp4",
    videoDescription: "Online NFT marketplace, with socket auction and direct transfers (with minting on demand). It is pretty much dead now with NFT not being popular now, but when i developed it, it was getting quite serious traffic since client was owner of MMA fights and played ad each match. So it was getting batches of thousands of requests at once and had a lot of query optimization and caching"
  },
  {
    name: "Drezydokuchyne",
    description: "Complex solution to ecommerce built with Django, VueJS and elasticsearch",
    url: "https://www.drezydokuchyne.sk/"
  },
  {
    name: "Vocabulary Trainer",
    description: "Personal German vocabulary app built in Next.js",
    url: "https://word.infiniter.tech",
    video: "/videos/vocabulary.mp4",
    videoDescription: "Small app for my personal use to learn German vocabulary, contains multiple animations that i had fun making"
  },
  {
    name: "Fitness Tracker",
    description: "Personal fitness tracker built with Next.js, TailwindCSS, and postgres",
    url: "https://fit.infiniter.tech"
  },
  {
    name: "Reminder App",
    description: "Next.js + shadcn/ui app for scheduled email reminders",
    url: "https://reminder.infiniter.tech"
  }
]
