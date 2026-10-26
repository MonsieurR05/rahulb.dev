import quantiqueShot from "@/assets/projects/quantique-exchange.png";
import portfolioShot from "@/assets/projects/portfolio.png";
import f1Shot from "@/assets/projects/f1-neural-strategist.png";

export const profile = {
  name: "Rahul Bagga",
  title: "Computer Science student and software developer",
  location: "United Kingdom",
  summary:
    "I build full-stack and data-driven software, from a React and Flask trading simulator on live IoT data to research published at ACM Creativity and Cognition.",
  focusAreas: [
    "Full-stack development",
    "AI and machine learning",
    "Software engineering",
    "Backend systems and APIs",
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
    contribution:
      "I extended the Flask API with summary, latest-reading and per-sensor routes, built the developer CLI, refactored the trading signals into strategy classes, moved the API credentials out of the code, and wrote the project documentation.",
    decisions: [
      {
        title: "Credentials out of the code",
        detail:
          "The API token and server address were hardcoded in the backend. I moved them into environment variables and made the server refuse to start if they're missing, so a misconfiguration fails loudly instead of silently returning no data.",
      },
      {
        title: "Strategies behind one interface",
        detail:
          "Each trading signal is a class that extends a shared TradingStrategy base and implements generateSignal(). The dashboard runs every strategy the same way, so adding one doesn't touch the UI.",
      },
      {
        title: "Fail fast on slow sensors",
        detail:
          "Requests to the sensor API time out after eight seconds, so one unresponsive sensor endpoint can't hang the whole dashboard.",
      },
      {
        title: "Testable without the frontend",
        detail:
          "A small developer CLI calls each backend route from the terminal, which made the API quick to check while the dashboard was still changing.",
      },
    ],
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
    slug: "f1-neural-strategist",
    title: "F1 Neural Race Strategist",
    type: "ML race-strategy simulator",
    role: "Solo project",
    status: "In development",
    timeline: "2026",
    description:
      "An interactive Formula 1 strategy simulator. A neural lap-time model trained on real timing data drives a Monte Carlo race simulator that ranks pit strategies and explains why one beats another.",
    problem:
      "Choosing a pit strategy means predicting how tyre wear, fuel, traffic and safety cars play out over a whole race, and a lap-time model is only useful for 'what if' questions if you can trust its counterfactuals.",
    solution:
      "A structured, probabilistic neural network predicts lap times from tyre compound and age, fuel load, temperature, traffic and pace. A lap-by-lap Monte Carlo simulator combines it with pit-loss, safety-car and overtaking models, and an optimiser ranks legal strategies by expected finishing position and risk. A FastAPI service on Fly.io powers a Next.js app with a race replay, strategy builder and optimiser.",
    tech: ["Python", "PyTorch", "LightGBM", "FastAPI", "Next.js", "TypeScript", "D3", "FastF1"],
    features: [
      "Data pipeline for the 2021–2025 seasons, with a per-race Pirelli compound table",
      "Probabilistic lap-time network benchmarked against three non-neural baselines",
      "Monte Carlo race simulator with pit-loss, safety-car and overtaking models",
      "Strategy optimiser that ranks plans by expected position and risk, with a time breakdown",
      "In-race adaptation: a Gaussian process and a GRU update forecasts from the laps already run",
      "Web app with a race replay, drag-and-drop strategy builder and optimiser",
    ],
    decisions: [
      {
        title: "Physically constrained predictions",
        detail:
          "The network can never predict a tyre getting faster as it ages, or a softer compound being slower when fresh. Those guarantees are what make its strategy counterfactuals trustworthy.",
      },
      {
        title: "A sealed test season",
        detail:
          "All settings were fixed on 2021–2024, and the 2025 season was scored once at the end, so the headline results aren't tuned to the test data.",
      },
      {
        title: "Honest comparisons",
        detail:
          "The network is compared with three non-neural baselines using race-level bootstrap intervals, and the reports say where it doesn't win, such as the one circuit it had never seen.",
      },
      {
        title: "Cheap to run",
        detail:
          "The API runs on one small Fly.io machine that sleeps when idle, so the live app costs close to nothing to keep online.",
      },
    ],
    outcome:
      "On the sealed 2025 season (19,959 laps), the network had the lowest lap-time error of four models: 0.900 s against 0.986 s for LightGBM, and 0.491 s within a race. The weak spots are documented too: its 90% intervals cover 86% of laps, and the simulator's midfield positions are less accurate than a simple lap-1 baseline.",
    links: {
      live: "https://f1-neural-strategist.vercel.app/race/2024_01",
    },
    image: {
      src: f1Shot,
      alt: "F1 Neural Race Strategist showing a 2024 Bahrain Grand Prix replay and the strategy builder",
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

export const publications = [
  {
    title: "Decolonizing Computer Science: The Immersive Elevator Experience",
    authors: [
      "Nishit Joshi",
      "Rahul Bagga",
      "Rhett Clayton",
      "Majeed Adan",
      "Jonathan Kalule",
      "Corey Ford",
    ],
    role: "Co-author",
    contribution:
      "I was involved across the whole project, from the background research to helping build the prototypes and collecting data.",
    venue: "Proceedings of the 2025 Conference on Creativity and Cognition",
    venueShort: "ACM C&C '25",
    publisher: "ACM",
    year: "2025",
    pages: "512–516",
    doi: "10.1145/3698061.3733978",
    summary:
      "A speculative design for an interactive installation inside an elevator. It shows people how the way wealthier countries use and throw away technology is linked to the exploitation of people in poorer regions, refined through an iterative design process with feedback from lecturers and peers.",
    links: {
      paper: "https://doi.org/10.1145/3698061.3733978",
      pdf: "https://dl.acm.org/doi/pdf/10.1145/3698061.3733978",
    },
  },
];

export const skills = [
  {
    category: "Languages",
    items: ["Python", "JavaScript", "TypeScript", "C#", "C++", "SQL", "HTML", "CSS"],
  },
  {
    category: "AI/ML and LLMs",
    items: [
      "Anthropic API",
      "OpenAI API",
      "Prompt engineering",
      "LLM agents",
      "CLI automation",
      "Local models (Ollama)",
      "GitHub Copilot",
      "Structured/JSON outputs",
      "Tool and web-search integration",
    ],
  },
  {
    category: "Frameworks and libraries",
    items: ["React", "Next.js", "FastAPI", "Flask", "Node.js", "Three.js", "Plotly", "Altair", "Tailwind CSS"],
  },
  {
    category: "Tools and platforms",
    items: ["Git", "GitHub", "REST APIs", "SQLite", "MySQL", "MongoDB", "Marimo", "Arduino", "NodeMCU", "Figma"],
  },
  {
    category: "Concepts",
    items: [
      "Software development lifecycle",
      "Testing and validation",
      "Data analysis",
      "Time series analysis",
      "Algorithms",
      "Data structures",
      "OOP",
      "Real-time systems",
      "IoT",
      "Data visualisation",
      "HCI",
    ],
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
    "Open to graduate software engineering roles from 2027, internships and collaborative projects.",
  interests: [
    "Software engineering",
    "Full-stack development",
    "Interactive web experiences",
    "AI-powered systems",
    "Creative computing",
  ],
};