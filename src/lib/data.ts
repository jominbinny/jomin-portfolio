export const personalInfo = {
  name: "Jomin Binny",
  firstName: "Jomin",
  role: "Full Stack Developer",
  tagline: "Backend-focused developer building scalable systems and real-world solutions",
  heroDescription:
    "I architect robust backend systems with Node.js and Python, craft seamless user experiences with React, and bring ideas to production — from hackathon prototypes to client-facing products.",
  email: "jominbinny21@gmail.com",
  phone: "+91-8156831156",
  location: "Ernakulam, India",
  github: "https://github.com/jominbinny",
  linkedin: "https://linkedin.com/in/jominbinny",
  resumeUrl: "/Jomin_Binny_Resume.pdf",
  status: "Available for opportunities",
};

export const aboutText = [
  "I'm a Computer Science undergraduate at the College of Engineering Vadakara with a strong academic foundation (CGPA 8.20) and a sharper focus on shipping real software.",
  "My core strength lies in backend architecture — building APIs, designing database schemas, and automating workflows using Node.js, Express, Flask, and MongoDB. I've delivered production websites for international clients as a freelance developer.",
  "Beyond code, I lead two of my college's largest technical communities — TinkerHub and IEDC — organizing hackathons, startup collaborations, and events that have reached thousands of students across Kerala.",
];

export const quickFacts = [
  { label: "Education", value: "B.Tech CSE — CGPA 8.20" },
  { label: "Focus", value: "Backend Systems & APIs" },
  { label: "Location", value: "Ernakulam, India" },
  { label: "Communities", value: "TinkerHub & IEDC Lead" },
];

export const skills = {
  Languages: ["C", "Java", "JavaScript", "Python"],
  Backend: ["Node.js", "Express", "Flask"],
  Databases: ["MongoDB", "MySQL"],
  Frontend: ["React", "HTML/CSS", "Tailwind CSS"],
  Tools: ["Git", "Firebase", "REST APIs"],
};

export interface Project {
  title: string;
  description: string;
  tech: string[];
  impact: string;
  problem: string;
  approach: string;
  implementation: string;
  challenges: string;
  result: string;
  links?: { label: string; url: string }[];
}

export const projects: Project[] = [
  {
    title: "AI Virtual Assistant",
    description:
      "An intelligent voice-controlled assistant built with Python that leverages speech recognition and natural language processing to understand and execute system-level tasks through voice commands.",
    tech: ["Python", "NLP", "Speech Recognition"],
    impact: "Automated repetitive system operations through natural voice interaction",
    problem:
      "Manual system operations require repeated keyboard and mouse interactions, slowing down workflows. The goal was to create a hands-free alternative that could understand natural speech and execute commands.",
    approach:
      "Designed a modular pipeline: voice input → speech-to-text → NLP intent parsing → command execution. Used Python's speech recognition libraries and custom NLP logic to map natural language to system actions.",
    implementation:
      "Built with Python using speech recognition for audio capture, NLP for intent classification, and system APIs for command execution. The architecture separates input processing, intent parsing, and execution for maintainability.",
    challenges:
      "Handling noisy environments and ambiguous voice commands required implementing confidence thresholds and fallback confirmation prompts. Speech recognition accuracy in Indian English accents was a significant challenge.",
    result:
      "A working voice-controlled assistant that can execute system-level tasks, demonstrating the practical application of NLP in everyday automation.",
    links: [],
  },
  {
    title: "Travel Guide App",
    description:
      "A location-aware web application built during a hackathon that helps travelers discover destinations, find parking, and navigate Kozhikode using integrated mapping and location APIs.",
    tech: ["React", "Location APIs", "Maps Integration"],
    impact: "Built and shipped in 24 hours during a competitive hackathon",
    problem:
      "Travelers in Kozhikode lack a centralized platform to discover local destinations, find parking, and navigate efficiently. Existing map apps don't cater to local tourism needs.",
    approach:
      "Built a location-aware React application that integrates mapping APIs to show nearby attractions, parking spots, and navigation routes. Prioritized real-time location data and a clean, mobile-first interface.",
    implementation:
      "Developed using React with integrated mapping and location APIs. Implemented geolocation services for real-time positioning, custom markers for points of interest, and a responsive UI designed for on-the-go usage.",
    challenges:
      "Working within 24 hours required ruthless prioritization. API rate limits and mapping service integration under time pressure forced creative solutions for caching and fallback data.",
    result:
      "A functional travel companion app that helps users explore Kozhikode with real-time location features, built and deployed within a hackathon timeframe.",
    links: [],
  },
  {
    title: "College Enquiry IVR System",
    description:
      "An automated phone-based enquiry system that uses speech-to-text and NLP to handle student queries, integrated with Firebase for real-time verification and instant response delivery.",
    tech: ["NLP", "Firebase", "Speech-to-Text"],
    impact: "Automated query handling for an entire college department",
    problem:
      "College departments spend significant time answering repetitive phone inquiries about admissions, schedules, and results. This manual process creates bottlenecks and long wait times for students.",
    approach:
      "Designed an Interactive Voice Response system that converts speech to text, classifies the query type using NLP, and retrieves answers from a Firebase database. The system handles common queries automatically and escalates complex ones.",
    implementation:
      "Built using speech-to-text for voice input processing, NLP for query classification, and Firebase for real-time data storage and retrieval. The system provides instant responses for pre-configured query categories.",
    challenges:
      "Speech-to-text accuracy for phone-quality audio required custom preprocessing. Designed a fallback system for queries the NLP couldn't classify with sufficient confidence.",
    result:
      "An automated phone enquiry system that handles the majority of student queries without human intervention, reducing department workload and improving response times.",
    links: [],
  },
];

export const experience = [
  {
    company: "MadeWebs",
    role: "Freelance Web Developer",
    period: "Present",
    description:
      "Delivering end-to-end web solutions for clients across India and internationally — from initial design through deployment. Managing full project lifecycles independently.",
    highlights: ["International clients", "Full-cycle delivery", "Independent management"],
  },
  {
    company: "Geo Browser",
    role: "Content & Knowledge Intern",
    period: "May 2025 – Jul 2025",
    description:
      "Contributed to structured knowledge development for a decentralized platform, creating content around Web3, blockchain, and cryptocurrency ecosystems.",
    highlights: ["Web3 ecosystem", "Decentralized platforms", "Content architecture"],
  },
  {
    company: "Revertech IT Solutions",
    role: "Student Intern",
    period: "Feb 2024 – Apr 2024",
    description:
      "Completed intensive backend training building applications with Python, Flask, and MongoDB. Gained hands-on experience in API development and database design.",
    highlights: ["Backend development", "API design", "Database architecture"],
  },
  {
    company: "Prodigy Infotech",
    role: "Web Developer Intern",
    period: "Aug 2024",
    description:
      "Built production-quality frontend projects including responsive landing pages and interactive web applications, strengthening core web development fundamentals.",
    highlights: ["Frontend engineering", "Responsive design", "Interactive UIs"],
  },
];

export const leadership = [
  {
    title: "TinkerHub CEV — Student Lead",
    period: "May 2025 – May 2026",
    description:
      "Spearheaded 35+ activities including 5 hackathons and technical workshops. Built cross-college collaborations across Kerala, growing the community's reach significantly.",
    stats: ["35+ events organized", "5 hackathons", "Multi-college network"],
  },
  {
    title: "IEDC CEV — Community Lead",
    period: "Mar 2025 – Mar 2026",
    description:
      "Led collaborations with 10+ startups, connecting students directly with founders and CEOs. Organized 'Evolvia' — a techno-entrepreneurship fest featuring startup sessions and industry visits.",
    stats: ["10+ startup collaborations", "Evolvia fest organizer", "Industry connections"],
  },
  {
    title: "QL XII — Publicity Lead",
    period: "Feb 2026",
    description:
      "Drove participation of 700+ external students for the college tech fest through multi-channel outreach including social media campaigns and institutional partnerships, reaching 2000+ audience.",
    stats: ["700+ external participants", "2000+ audience reach", "Multi-channel campaign"],
  },
];

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Stack", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
