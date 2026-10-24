import quantiqueShot from "@/assets/projects/quantique-exchange.png";
import portfolioShot from "@/assets/projects/portfolio.png";

export const profile = {
  name: "Rahul Bagga",
  title: "Computer Science student and software developer",
  location: "United Kingdom",
  summary:
    "I build full-stack software, interactive web experiences, and systems that combine technical functionality with clear user experience.",
  focusAreas: [
    "Full-stack web development",
    "Interactive portfolio systems",
    "Backend APIs",
    "Creative computing",
  ],
};

export const projects = [
  {
    slug: "quantique-exchange",
    title: "Quantique Exchange",
    type: "IoT trading simulation",
    role: "Backend and architecture developer, team of two",
    status: "Completed",
    timeline: "2026",
    description:
      "A university team project that turns live IoT sensor data from around UAL into a stock-market-style trading simulator, with live charts, strategy signals and simulated buy and sell actions.",
    problem:
      "Raw readings from door, motion, soil moisture, temperature and leak sensors are hard to engage with as plain numbers, and the UAL sensor API needs a token that can't be exposed in the browser.",
    solution:
      "A Flask backend fetches readings from the UAL IoT API, keeps the token server-side and groups data by sensor. A React dashboard maps each sensor to a company-style asset, charts it live with Recharts, and runs pluggable trading strategies that suggest BUY, SELL or HOLD.",
    tech: ["React", "Vite", "JavaScript", "Recharts", "Python", "Flask"],
    features: [
      "Flask API with health, summary, latest-reading and per-sensor routes",
      "Developer CLI for testing backend routes from the terminal",
      "Momentum, moving-average and order-flow strategies built on a shared base class",
      "Live chart with refresh status and last-updated time",
      "Company-style asset names that keep the real sensor ID visible",
      "Beginner tutorial overlay and simulated portfolio",
    ],
    outcome:
      "A working prototype shaped by user feedback, with documented architecture, testing and design decisions. I built the backend routes and CLI, the strategy architecture and the project documentation; my teammate led the Bloomberg-style dashboard design and trading interactions.",
    links: {
      github: "https://github.com/MonsieurR05/quantique-exchange",
      live: "https://monsieurr05.github.io/quantique-exchange/",
    },
    image: {
      src: quantiqueShot,
      alt: "Quantique Exchange in demo mode: the market watchlist, a live NVIDIA chart and the trading panel",
    },
  },
  {
    slug: "portfolio",
    title: "rahulb.dev",
    type: "Personal portfolio",
    role: "Designer / Developer",
    status: "In development",
    timeline: "2026",
    description:
      "This website: a fast, minimal portfolio with project case studies, a command menu and a fully responsive layout.",
    problem:
      "Many personal portfolios are hard to scan, so recruiters have to dig for the details they care about.",
    solution:
      "This site presents my work as a single dark, minimal page built with Next.js and Tailwind CSS, with project case studies in dialogs, a ⌘K command menu for quick navigation, and all content driven from one data file.",
    tech: ["Next.js", "React", "JavaScript", "Tailwind CSS"],
    features: [
      "Project case studies in accessible dialogs",
      "Command menu (⌘K) navigation",
      "Portfolio content stored as reusable data",
      "Scroll-reveal motion that respects reduced-motion settings",
      "Responsive layout from phone to desktop",
    ],
    outcome:
      "A portfolio that is quick to scan and easy to navigate, and a showcase of front-end craft and attention to detail.",
    links: {
      github: "https://github.com/MonsieurR05/rahulb.dev",
    },
    image: {
      src: portfolioShot,
      alt: "The rahulb.dev hero: Rahul Bagga's name, a short intro and a profile.json code card",
    },
  },
];

export const skills = [
  {
    category: "Frontend",
    items: ["JavaScript", "React", "Next.js", "Astro", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    category: "Backend",
    items: ["Rust", "Python", "Flask", "Node.js", "REST APIs", "SQLite", "SQL"],
  },
  {
    category: "Tools",
    items: ["Git", "GitHub", "VS Code", "Vite", "Agile workflows"],
  },
  {
    category: "Creative / UX",
    items: ["UI design", "HCI", "Accessibility", "Interactive systems", "Creative computing"],
  },
];

export const experience = [
  {
    id: "ual",
    role: "BSc Computer Science Student",
    organisation: "University of the Arts London",
    date: "2024 – 2027",
    type: "Education",
    location: "London, UK",
    description:
      "Studying Computer Science with a focus on software development, creative computing, web technologies, algorithms, databases, operating systems, computer networks, and human-computer interaction.",
    highlights: [
      "Building full-stack and interactive software projects",
      "Developing portfolio-ready work across web, backend, and creative computing",
      "Practising professional software engineering workflows including Git branching, commits, and documentation",
    ],
  },
  {
    id: "medhurst",
    role: "IT / Technical Support Experience",
    organisation: "Medhurst Communications",
    date: "2022",
    type: "Work Experience",
    location: "UK",
    description:
      "Built and configured PCs and laptops, installed operating systems and drivers, troubleshot hardware/software issues, and supported client deployments.",
    highlights: [
      "Configured devices for schools and business clients",
      "Installed operating systems, drivers, and software packages",
      "Gained early experience with hardware setup, troubleshooting, and technical support",
    ],
  },
];

export const contact = {
  email: "MonsieurR9@proton.me",
  github: "https://github.com/MonsieurR05",
  website: "https://www.rahulb.dev/",
  availability:
    "Open to software engineering internships, placement opportunities, and collaborative projects.",
  interests: [
    "Software engineering",
    "Full-stack development",
    "Interactive web experiences",
    "AI-powered systems",
    "Creative computing",
  ],
};