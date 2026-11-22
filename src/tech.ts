// Logo and brand colour of each technology (logos: Devicon on jsDelivr).
// `color` is tuned to stay readable on both themes.
const DEV = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons'
const icon = (slug: string, file = `${slug}-original`) => `${DEV}/${slug}/${file}.svg`

export interface Tech { color: string; logo?: string }

const T: Record<string, Tech> = {
  'JavaScript (ES6+)': { color: '#f7df1e', logo: icon('javascript') },
  JavaScript: { color: '#f7df1e', logo: icon('javascript') },
  TypeScript: { color: '#3178c6', logo: icon('typescript') },
  'C#': { color: '#a179dc', logo: icon('csharp') },
  Java: { color: '#f89820', logo: icon('java') },
  HTML5: { color: '#e34f26', logo: icon('html5') },
  CSS3: { color: '#1572b6', logo: icon('css3') },
  'React.js': { color: '#61dafb', logo: icon('react') },
  React: { color: '#61dafb', logo: icon('react') },
  'React Native': { color: '#61dafb', logo: icon('react') },
  Redux: { color: '#a77bdb', logo: icon('redux') },
  'Redux Toolkit': { color: '#a77bdb', logo: icon('redux') },
  Expo: { color: '#9ca3af', logo: icon('expo') },
  'Tailwind CSS': { color: '#38bdf8', logo: icon('tailwindcss') },
  Vite: { color: '#a855f7', logo: icon('vitejs') },
  'Node.js': { color: '#68a063', logo: icon('nodejs') },
  'Express.js': { color: '#9ca3af', logo: icon('express') },
  '.NET': { color: '#8b5cf6', logo: icon('dot-net') },
  'ASP.NET Core Web API': { color: '#8b5cf6', logo: icon('dotnetcore') },
  'RESTful APIs': { color: '#14b8a6' },
  JWT: { color: '#d63aff' },
  'REST APIs': { color: '#14b8a6' },
  Microservices: { color: '#f472b6' },
  RBAC: { color: '#f59e0b' },
  Twilio: { color: '#f22f46', logo: icon('twilio') },
  MongoDB: { color: '#47a248', logo: icon('mongodb') },
  Mongoose: { color: '#c0392b', logo: icon('mongoose') },
  'MongoDB Atlas': { color: '#47a248', logo: icon('mongodb') },
  Percona: { color: '#e46f20' },
  PostgreSQL: { color: '#4169e1', logo: icon('postgresql') },
  Docker: { color: '#2496ed', logo: icon('docker') },
  'AWS EC2': { color: '#ff9900', logo: icon('amazonwebservices', 'amazonwebservices-original-wordmark') },
  'AWS S3': { color: '#ff9900', logo: icon('amazonwebservices', 'amazonwebservices-original-wordmark') },
  'GitHub Actions': { color: '#2088ff', logo: icon('githubactions') },
  'CI/CD': { color: '#22d3ee' },
  Linux: { color: '#fcc624', logo: icon('linux') },
  Render: { color: '#46e3b7' },
  Vercel: { color: '#9ca3af', logo: icon('vercel') },
  Git: { color: '#f05032', logo: icon('git') },
  GitHub: { color: '#9ca3af', logo: icon('github') },
  Jira: { color: '#2684ff', logo: icon('jira') },
  'Agile / Scrum': { color: '#10b981' },
  SDLC: { color: '#10b981' },
  'Automated Testing': { color: '#84cc16' },
  'Claude Code': { color: '#d97757' },
  ChatGPT: { color: '#10a37f' },
  'Prompt Engineering': { color: '#e879f9' },
  Leaflet: { color: '#199900' },
  Recharts: { color: '#22b5bf' },
  'GitHub Actions CI': { color: '#2088ff' },
}

export const techOf = (name: string): Tech => T[name] ?? { color: '#34d399' }

// The headline stack, shown in the moving logo strip.
export const CORE = ['React.js', 'TypeScript', 'JavaScript', 'Node.js', 'Express.js', 'C#', '.NET', 'ASP.NET Core Web API', 'Redux', 'MongoDB', 'PostgreSQL', 'Docker', 'AWS EC2', 'Twilio', 'Tailwind CSS', 'Git', 'GitHub Actions', 'Linux']

// A stable, different animation offset per name (so badges don't move in step).
export function motionDelay(name: string, span = 4) {
  let h = 0
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  return { ['--d' as string]: `-${((h % 1000) / 1000 * span).toFixed(2)}s` } as Record<string, string>
}
