export interface EventItem {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

export const events: EventItem[] = [
  {
    title: "React Summit 2025: Building Scalable Web Applications",
    image: "/images/event1.png",
    slug: "react-summit-2025",
    location: "San Francisco, CA",
    date: "2025-02-15",
    time: "9:00 AM",
  },
  {
    title: "TypeScript Deep Dive: Advanced Patterns & Best Practices",
    image: "/images/event2.png",
    slug: "typescript-deep-dive",
    location: "Austin, TX",
    date: "2025-02-22",
    time: "10:00 AM",
  },
  {
    title: "AI & Machine Learning Meetup: Practical Applications",
    image: "/images/event3.png",
    slug: "ai-ml-meetup",
    location: "New York, NY",
    date: "2025-03-05",
    time: "6:00 PM",
  },
  {
    title: "Cloud Native Developer Conference: Kubernetes & Microservices",
    image: "/images/event4.png",
    slug: "cloud-native-dev-conf",
    location: "Seattle, WA",
    date: "2025-03-12",
    time: "8:30 AM",
  },
  {
    title: "Web3 & Blockchain Developer Workshop",
    image: "/images/event5.png",
    slug: "web3-blockchain-workshop",
    location: "Miami, FL",
    date: "2025-03-20",
    time: "1:00 PM",
  },
  {
    title: "Full Stack JavaScript: Next.js, Node.js & Modern Tools",
    image: "/images/event6.png",
    slug: "fullstack-javascript",
    location: "Boston, MA",
    date: "2025-04-03",
    time: "9:00 AM",
  },
];
