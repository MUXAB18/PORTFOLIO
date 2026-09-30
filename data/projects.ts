export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  link?: string;
  mobileImages?: string[];
  description: string;
  tags: string;
  bgColor: string;
}

export const projects: Project[] = [
  {
    id: "tradematch",
    title: "Trade Match",
    category: "WEB APP",
    image: "/tradematch.png",
    link: "https://tradematch-pi.vercel.app/en",
    description: "The AI-Assisted Job Copilot for Skilled Trades. Build a professional profile, track certifications, and get matched with real jobs.",
    tags: "NEXT.JS, TAILWINDCSS, AI",
    bgColor: "bg-[#0b5cff]/20"
  },
  {
    id: "tradematch-mobile",
    title: "TradeMatch Mobile App",
    category: "MOBILE APP",
    image: "",
    mobileImages: ["/tradematch-mobile-1.PNG", "/tradematch-mobile-2.PNG"],
    description: "A cross-platform mobile application for skilled trades built with React Native and Firebase, featuring seamless profile management and real-time job matching.",
    tags: "REACT NATIVE, FIREBASE, MOBILE",
    bgColor: "bg-[#0088ff]/20"
  },
  {
    id: "webifypro",
    title: "Webify Pro",
    category: "CORPORATE",
    image: "/webifypro-new.png",
    link: "https://www.webifypro.live/",
    description: "Elevate your brand with high-performance web development and strategic digital marketing.",
    tags: "NEXT.JS, TAILWINDCSS, FRAMER MOTION",
    bgColor: "bg-[#1d4ed8]/20"
  },
  {
    id: "rasheed",
    title: "Rasheed Clothing Intl",
    category: "E-COMMERCE",
    image: "/rasheed-clothing.png",
    link: "https://www.rasheedclothingintl.me/",
    description: "A high-performance modern e-commerce platform built for a premium clothing brand, featuring seamless checkout and dynamic inventory management.",
    tags: "NEXT.JS, TAILWIND, E-COMMERCE",
    bgColor: "bg-[#7c8f9c]/20"
  },
  {
    id: "learnhub",
    title: "LearnHub",
    category: "ED-TECH",
    image: "/learnhub.png",
    link: "https://lms-techub.vercel.app/",
    description: "An interactive online learning platform allowing users to access world-class courses, build real skills, and earn certificates at their own pace.",
    tags: "REACT, ED-TECH",
    bgColor: "bg-[#7161ef]/20"
  },
  {
    id: "medifind",
    title: "MediFind",
    category: "HEALTHCARE",
    image: "/medifind.png",
    description: "A comprehensive healthcare platform connecting patients with top-rated doctors. Built with the MERN stack for seamless appointment booking and symptom-based specialist matching.",
    tags: "MERN STACK, HEALTHCARE",
    bgColor: "bg-[#00a884]/20"
  },
  {
    id: "focusflow",
    title: "FocusFlow",
    category: "MOBILE APP",
    image: "",
    mobileImages: ["/focusflow-1.jpg", "/focusflow-2.jpg"],
    description: "A productivity and habit tracking mobile app built with Flutter and Firebase, helping users stay focused, track tasks, and achieve their daily goals.",
    tags: "FLUTTER, FIREBASE, MOBILE",
    bgColor: "bg-[#ff4f5a]/20"
  }
];
