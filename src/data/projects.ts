interface ProjectData {
  id: string;
  name: string;
  description: string;
  url: string;
  category: "Platforms" | "Personal tools";
  technologies: string[];
  video?: string;
  poster?: string;
  videoDescription?: string;
  images?: string[];
}

export const projectsData: ProjectData[] = [
  {
    id: "metzler",
    name: "Metzler",
    description: "Website redesign for Metzler Bank, a German bank, built with Next.js and Payload CMS.",
    url: "https://www.metzler.com/de",
    category: "Platforms",
    technologies: ["Next.js", "Payload CMS"],
    video: "/videos/metzler.mp4",
    poster: "/images/metzler.jpeg",
  },
  {
    id: "britestage",
    name: "Britestage",
    description:
      "One place to run a live event. Bringing speakers, presentations, and audiences together in real time.",
    url: "https://app.britestage.com",
    category: "Platforms",
    technologies: ["Live events", "WebSockets", "Screen sharing"],
    video: "/videos/britestage.mp4",
    poster: "/images/britestage-preview.jpg",
    videoDescription:
      "This recording follows four connected browser windows: an event controller, a connected speaker, a stage player, and the main presentation. It demonstrates synchronized content, webcam streaming, and screen sharing over a limited-bandwidth connection.",
  },
  {
    id: "rull",
    name: "Market Rull World",
    description:
      "A real-time marketplace built for live auctions, instant transfers, and bursts of traffic during MMA events.",
    url: "https://market.rull.world",
    category: "Platforms",
    technologies: ["Next.js", "Node.js", "gRPC", "WebSockets"],
    video: "/videos/rull.mp4",
    poster: "/images/rull-preview.jpg",
    videoDescription:
      "An NFT marketplace with live socket-based auctions and minting on demand. Promotions during MMA events generated bursts of thousands of requests, making query optimization and caching central to the implementation. This is an archived project; the recording preserves the original experience.",
  },
  {
    id: "edit",
    name: "Edit",
    description:
      "An AI image editor that keeps every possibility open. Explore edits as branches, without losing where you started.",
    url: "https://edit.infiniter.tech",
    category: "Personal tools",
    technologies: ["AI image editing", "Branching history"],
    images: ["/images/ai_edit_demo.jpeg", "/images/ai_edit_timeline.jpeg"],
  },
  {
    id: "vocabulary",
    name: "Vocabulary Trainer",
    description:
      "A small companion for learning German, built around everyday practice and playful interactions.",
    url: "https://word.infiniter.tech",
    category: "Personal tools",
    technologies: ["Next.js", "Animation", "Language learning"],
    video: "/videos/vocabulary.mp4",
    poster: "/images/vocabulary-preview.jpg",
    videoDescription:
      "A personal vocabulary practice app and a place to experiment with animations that make daily learning more enjoyable.",
  },
  {
    id: "fitness",
    name: "Fitness Tracker",
    description:
      "The workout tracker I wanted to use. A focused way to log training and follow total workout volume.",
    url: "https://fit.infiniter.tech",
    category: "Personal tools",
    technologies: ["Next.js", "Tailwind CSS", "Go"],
    video: "/videos/fit.mp4",
    poster: "/images/fit-preview.jpg",
    videoDescription:
      "A personal training tool with a Go backend and Next.js frontend. Also an experiment in AI-assisted development and its practical limits.",
  },
  {
    id: "ecommerce",
    name: "Drezydokuchyne",
    description:
      "An e-commerce solution connecting a Django backend, Vue.js storefront, and Elasticsearch product search.",
    url: "https://www.drezydokuchyne.sk/",
    category: "Platforms",
    technologies: ["Django", "Vue.js", "Elasticsearch"],
  },
  {
    id: "reminder",
    name: "Reminder App",
    description:
      "Set a reminder, get an email. A simple tool for the things you don’t want to keep in your head.",
    url: "https://reminder.infiniter.tech",
    category: "Personal tools",
    technologies: ["Next.js", "shadcn/ui", "Scheduled email"],
  },
];
