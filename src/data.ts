// All portfolio content lives here — edit this file to update the site.

export const profile = {
  name: 'Gopinesh V',
  role: 'Full Stack Developer',
  tagline: 'I build reliable, end-to-end web and mobile products — from pixel-perfect React interfaces to tested Node.js APIs and cloud deployments.',
  location: 'Tamil Nadu, India',
  email: 'gopinesh21@gmail.com',
  phone: '+91 93449 77110',
  linkedin: 'https://linkedin.com/in/gopinesh-v',
  github: 'https://github.com/Gopi-creater',
  resume: '/Gopinesh_V_Resume.pdf',
}

export const stats = [
  { value: '1+', label: 'Year in production' },
  { value: '335', label: 'Automated tests written' },
  { value: '40', label: 'Markets ingested daily' },
  { value: '3', label: 'Platforms shipped' },
]

export const about = [
  'I am a Full Stack Developer with a B.Tech in Information Technology and over a year of hands-on industry experience building enterprise web applications. I enjoy owning features end to end — designing the UI, shaping the API, modelling the data and shipping it to the cloud.',
  'My day-to-day stack is JavaScript and TypeScript with React, Redux, Node.js, Express and MongoDB, and I also build APIs in C# with .NET and ASP.NET Core Web API. I care about clean state management, predictable APIs, automated tests and fixing problems at their root rather than at their symptoms.',
  'I work AI-natively — using tools like Claude Code and ChatGPT to design, build, test and debug faster — while keeping the engineering judgement, reviews and quality bar firmly human.',
]

export const focus = [
  { title: 'Frontend', text: 'Responsive, accessible React interfaces with Redux state, dynamic forms and data-rich dashboards.' },
  { title: 'Backend & APIs', text: 'RESTful Node.js / Express and ASP.NET Core Web API (C#) services with validation, role-based access and well-tested business rules.' },
  { title: 'Data', text: 'MongoDB schema design, aggregation pipelines, Percona and PostgreSQL — modelled for real workflows.' },
  { title: 'Cloud & DevOps', text: 'Docker, AWS (EC2, S3), CI/CD with GitHub Actions, and deployments on Render and Vercel.' },
]

export const experience = [
  {
    role: 'Full Stack Developer',
    company: 'Daacoworks Technologies',
    location: 'Bengaluru, Karnataka',
    context: 'Enterprise CMMS (Computerized Maintenance Management System) product',
    start: '2025-10-01', // the length shown ("1 yr 1 mo") is worked out from this
    period: 'Oct 2025 — Present',
    points: [
      'Develop and maintain an enterprise maintenance-management web application used to run maintenance operations, assets and approvals.',
      'Built responsive UI components, modals, dynamic forms and task-management workflows in React.js with Redux state management.',
      'Integrated RESTful APIs for real-time task status, approvals and asset operations, owning the frontend–backend data flow.',
      'Implemented backend features and API enhancements in Node.js with MongoDB for efficient data handling and workflow processing.',
      'Containerised services with Docker, integrated Twilio for communication workflows, worked with Percona-based databases and AWS S3 file storage.',
      'Performed root cause analysis on production issues — UI rendering defects, API inconsistencies and workflow bugs — and shipped stable fixes in Agile sprints using Git and Jira.',
    ],
    tech: ['React.js', 'Redux', 'Node.js', 'Express.js', 'MongoDB', 'Percona', 'Docker', 'Twilio', 'AWS S3', 'REST APIs', 'Git', 'Jira'],
  },
]

export const project = {
  name: 'RoutesTrader',
  subtitle: 'Agricultural Market Price & Trade Platform',
  year: '2026',
  liveUrl: 'https://routestrader.vercel.app/',
  // Opens the app already signed in to its read-only demo (no password).
  demoUrl: 'https://routestrader.vercel.app/login?demo=1',
  // Pinged when the demo dialog opens, to wake the free server early.
  healthUrl: 'https://gopi-trade-restapi.onrender.com/api/health',
  screens: [
    { src: '/screens/dashboard.jpg', title: 'Dashboard', text: 'Orders, goods movement, transport and profit of the trading business at a glance.' },
    { src: '/screens/market-map.jpg', title: 'Market map', text: 'Every market on an interactive Leaflet map, coloured by highest and lowest price.' },
    { src: '/screens/market-intelligence.jpg', title: 'Market Intelligence', text: 'Search buy-low / sell-high opportunities by region, product, radius and travel speed.' },
    { src: '/screens/trade-opportunities.jpg', title: 'Trade Opportunities', text: 'Locked, approved and assigned trades with prices, road distance, arrival and raw profit.' },
    { src: '/screens/price-input.jpg', title: 'Price Input', text: 'Prices entered by field users in every market, with filters and unit conversion to ₹/kg.' },
    { src: '/screens/users.jpg', title: 'User Management', text: 'Role-based accounts with market, region and product access.' },
  ],
  summary: 'A full-stack, multi-tenant platform that helps traders see live farm-produce prices across markets, spot profitable buy-and-sell routes, and run day-to-day trading — on the web and on Android.',
  highlights: [
    { title: 'Three platforms, one API', text: 'React + TypeScript web app, an Android app and a Node.js / Express REST API on MongoDB Atlas.' },
    { title: 'Role-based access', text: 'Token authentication and RBAC for 4 roles — price input staff, traders, seed sellers and commission agents.' },
    { title: 'Automated data pipeline', text: 'A standalone collector ingests daily commodity prices from 40 Tamil Nadu markets with idempotent backfill and per-market retry.' },
    { title: 'Market intelligence', text: 'Finds buy-low / sell-high routes using road distance, travel time, market sessions and price freshness rules.' },
    { title: 'Quality by default', text: '335 automated API tests on isolated databases, so business rules stay correct as the product grows.' },
    { title: 'CI/CD', text: 'Pushing to main auto-deploys the API to Render and the web app to Vercel; Android builds ship as signed APKs.' },
  ],
  tech: ['React.js', 'TypeScript', 'Redux Toolkit', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB Atlas', 'GitHub Actions', 'Render', 'Vercel', 'Leaflet', 'Recharts'],
  flow: [
    { label: 'Web · Android', note: 'React' },
    { label: 'REST API', note: 'Node · Express' },
    { label: 'MongoDB Atlas', note: 'multi-tenant data' },
    { label: 'Price Collector', note: 'scheduled ingestion' },
  ],
}

export const skills = [
  { group: 'Languages', items: ['JavaScript', 'TypeScript', 'C#', 'HTML5', 'CSS3'] },
  { group: 'Frontend', items: ['React.js', 'Redux', 'Redux Toolkit', 'Tailwind CSS', 'Vite'] },
  { group: 'Backend', items: ['Node.js', 'Express.js', '.NET', 'ASP.NET Core Web API', 'RESTful APIs', 'Microservices', 'RBAC', 'Twilio'] },
  { group: 'Databases', items: ['MongoDB', 'Mongoose', 'MongoDB Atlas', 'Percona', 'PostgreSQL'] },
  { group: 'Cloud & DevOps', items: ['Docker', 'AWS EC2', 'AWS S3', 'GitHub Actions', 'CI/CD', 'Linux', 'Render', 'Vercel'] },
  { group: 'Tools & Practices', items: ['Git', 'GitHub', 'Jira', 'Agile / Scrum', 'SDLC', 'Automated Testing', 'Claude Code', 'ChatGPT', 'Prompt Engineering'] },
]

export const education = {
  degree: 'B.Tech in Information Technology',
  school: 'PSNA College of Engineering and Technology',
  place: 'Dindigul, Tamil Nadu',
  period: '2021 — 2025',
  score: 'CGPA 7.7 / 10',
}
