import { Project, Experiment } from './types';

export const SOCIALS = {
  linkedin: 'https://www.linkedin.com/in/nithinkandula45',
  twitter: 'https://x.com/Kand72964V',
  email: 'nithin.v.kandula@gmail.com',
  calendar: 'https://calendly.com/nithin-v-kandula/30min', 
};

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'AI Programmatic SEO',
    category: 'Acquisition',
    description: "Architected a specialized LLM agent pipeline to generate 5,000+ high-quality, fact-checked landing pages. Automated interlinking and schema markup.",
    metrics: [
      { label: 'Organic Traffic', value: '+450%' },
      { label: 'Content Cost', value: '-90%' },
    ],
    tags: ['LLMs', 'Python', 'Next.js', 'SEO'],
    status: 'Live',
  },
  {
    id: '2',
    title: 'Predictive PLG Onboarding',
    category: 'Activation',
    description: 'Deployed a propensity-to-buy model that personalizes the onboarding path in real-time using intent signals and firmographic data.',
    metrics: [
      { label: 'Activation Rate', value: '18% -> 32%' },
      { label: 'PQL Velocity', value: '+3x' },
    ],
    tags: ['Machine Learning', 'Segment', 'Personalization'],
    status: 'Live',
  },
  {
    id: '3',
    title: 'Generative Viral Loops',
    category: 'Referral',
    description: 'Engineered a referral system where users generate custom AI assets to share with colleagues, driving organic invites through value creation.',
    metrics: [
      { label: 'K-Factor', value: '1.4' },
      { label: 'Pipeline Gen', value: '$2.5M' },
    ],
    tags: ['GenAI', 'Viral Mechanics', 'API Integration'],
    status: 'Live',
  },
  {
    id: '4',
    title: 'Autonomous Retention',
    category: 'Retention',
    description: 'Orchestrated an AI agent that monitors usage drops and autonomously sends hyper-personalized win-back video messages via Avatar AI.',
    metrics: [
      { label: 'LTV Increase', value: '+25%' },
      { label: 'Churn', value: '-15%' },
    ],
    tags: ['HeyGen API', 'Customer.io', 'SQL'],
    status: 'Live',
  }
];

export const EXPERIMENTS: Experiment[] = [
  {
    id: 'ex1',
    title: 'Multi-Agent Social',
    description: 'Deploying a swarm of AI agents to monitor social trends and autonomously draft high-relevance comments and posts for review.',
    status: 'In Progress',
    tags: ['Agents', 'Social Selling', 'Automation'],
  },
  {
    id: 'ex2',
    title: 'Voice AI Sales Qual',
    description: 'Building a real-time voice bot to qualify inbound leads instantly on the website before routing to human sales reps.',
    status: 'In Progress',
    tags: ['Gemini Live', 'Voice AI', 'Sales'],
  }
];

export const EDGE_ITEMS = [
  {
    id: 'velocity',
    title: 'AI Velocity',
    subtitle: '10x Experimentation Rate',
    description: "Leveraging AI to compress the 'Build-Measure-Learn' loop. I generate copy, code landing pages, and analyze data 10x faster than traditional teams."
  },
  {
    id: 'technical',
    title: 'Technical',
    subtitle: 'Code + Content',
    description: "I don't just write copy. I write Python scripts to scrape data, fine-tune models for brand voice, and build custom internal marketing tools."
  },
  {
    id: 'system',
    title: 'Systems',
    subtitle: 'Scalable Growth Engines',
    description: "Eliminating manual grunt work. I architect self-healing growth systems that run on autopilot using modern AI stacks."
  }
];