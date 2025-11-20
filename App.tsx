
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TermIcon, ArrowRight, Box, Cpu, Activity, Code2, Zap, ExternalLink, TrendingUp, MousePointer2, Database, Crosshair, Calendar, FileText, Briefcase, UserCheck, MapPin } from 'lucide-react';
import { PROJECTS, EXPERIMENTS, EDGE_ITEMS, SOCIALS } from './constants';
import BootSequence from './components/BootSequence';
import Terminal from './components/Terminal';
import ProjectCard from './components/ProjectCard';
import ScrambleText from './components/ScrambleText';
import BackgroundEffect from './components/BackgroundEffect';

function App() {
  const [booted, setBooted] = useState(false);
  const [activeEdge, setActiveEdge] = useState<string | null>('velocity');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorText, setCursorText] = useState('');

  // Scroll progress for the timeline
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = totalScroll / windowHeight;
      setScrollProgress(scroll);
    };

    const handleMouseMove = (e: MouseEvent) => {
        setMousePos({ x: e.clientX, y: e.clientY });
        
        // Hover logic for cursor text
        const target = e.target as HTMLElement;
        if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
            setCursorText('INTERACT');
        } else {
            setCursorText('');
        }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (!booted) {
    return <BootSequence onComplete={() => setBooted(true)} />;
  }

  return (
    <div className="min-h-screen relative selection:bg-green-500/30 selection:text-green-200 overflow-hidden cursor-none">
      
      <BackgroundEffect />

      {/* CUSTOM TACTICAL CURSOR */}
      <div 
        className="fixed z-[100] pointer-events-none hidden md:block"
        style={{
            left: mousePos.x,
            top: mousePos.y,
            transform: 'translate(-50%, -50%)'
        }}
      >
         <div className="relative w-8 h-8 border border-green-500/50 rounded-full flex items-center justify-center">
            <div className="w-1 h-1 bg-green-500 rounded-full"></div>
            {cursorText && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-[8px] font-mono text-green-500 whitespace-nowrap bg-black/80 px-1 border border-green-500/30">
                    {cursorText}
                </div>
            )}
         </div>
         <div className="absolute top-0 left-full ml-2 text-[8px] font-mono text-green-500/50 flex flex-col">
             <span>X: {mousePos.x}</span>
             <span>Y: {mousePos.y}</span>
         </div>
      </div>

      {/* Header / Nav */}
      <header className="fixed top-0 left-0 w-full z-40 border-b border-white/10 bg-black/80 backdrop-blur-md h-16 flex items-center justify-between px-6 md:px-12">
        <a href={SOCIALS.calendar} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-500 font-mono text-sm font-bold tracking-widest group cursor-pointer">
            <TermIcon size={16} className="group-hover:rotate-12 transition-transform"/>
            <div className="flex flex-col leading-none">
                <ScrambleText text="NITHIN.RESUME" delay={1000} className="group-hover:text-white transition-colors" />
                <span className="text-[8px] opacity-50">PERSONNEL_FILE_LOADED</span>
            </div>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono text-zinc-400">
            {['WORK', 'EXPERIENCE', 'SKILLS'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="relative group py-2">
                    <span className="group-hover:text-white transition-colors">{item}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-green-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
            ))}
            
            {/* Resume Button */}
            <a 
              href={SOCIALS.linkedin} // Using LinkedIn as Resume proxy if no direct link
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white transition-all rounded border border-zinc-700"
            >
              <FileText size={12} />
              <span>ACCESS_CV</span>
            </a>

            {/* Book Button in Nav */}
            <a 
              href={SOCIALS.calendar}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/50 text-green-500 hover:bg-green-500 hover:text-black transition-all rounded animate-pulse"
            >
              <Briefcase size={12} />
              <span>HIRE_ME</span>
            </a>
        </nav>
        <div className="text-[10px] text-green-500 font-mono hidden md:flex items-center gap-2 border border-green-900/50 px-3 py-1 rounded bg-green-900/10">
             <span className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
             </span>
             STATUS: OPEN_TO_WORK
        </div>
      </header>

      <main className="relative pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto z-10">
        
        {/* Hero Section */}
        <section id="hero" className="min-h-[80vh] flex flex-col justify-center relative mb-20">
            
            {/* Floating Background Elements */}
            <div className="absolute right-0 top-20 w-64 h-64 bg-green-500/10 blur-[80px] rounded-full pointer-events-none animate-pulse"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/5 text-green-500 text-xs font-mono mb-6 animate-bounce-slow">
                        <UserCheck size={12} />
                        <span>CANDIDATE_PROFILE: ACTIVE</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-8 font-[Space_Grotesk] relative">
                        <span className="block glitch-wrapper text-white mb-2">
                           <span className="glitch" data-text="AI_NATIVE">AI_NATIVE</span>
                        </span>
                        <span className="block text-green-500">
                            <ScrambleText text="MARKETER" delay={500} />
                        </span>
                    </h1>
                    
                    <div className="p-6 border-l-4 border-green-500 bg-gradient-to-r from-green-900/20 to-transparent mb-10 max-w-lg backdrop-blur-md relative overflow-hidden group">
                        <div className="absolute inset-0 bg-green-500/5 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12"></div>
                        <div className="flex items-center gap-2 text-green-400 font-mono text-sm mb-3 font-bold">
                            <Briefcase size={16} className="animate-pulse" />
                            OPEN FOR ROLES: HEAD OF GROWTH / AI ENGINEER
                        </div>
                        <p className="text-zinc-200 text-lg font-light italic border-b border-white/10 pb-4 mb-4">
                            "Stop hiring manual marketers."
                        </p>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            I am an <b>AI Growth Architect</b> ready to deploy autonomous acquisition systems into your company. I don't just run ads; I build engines that scale themselves.
                        </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-4">
                         <a 
                            href={SOCIALS.calendar} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 bg-white text-black font-bold font-mono hover:bg-green-500 transition-all skew-x-[-10deg] inline-block shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)]"
                        >
                             <span className="skew-x-[10deg] inline-flex items-center gap-2">
                                <Calendar size={16} /> SCHEDULE INTERVIEW
                             </span>
                         </a>
                         <a 
                            href={SOCIALS.linkedin} // Resume Proxy
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 border border-zinc-600 text-white font-bold font-mono hover:border-green-500 hover:text-green-500 transition-all skew-x-[-10deg] inline-block"
                        >
                             <span className="skew-x-[10deg] inline-flex items-center gap-2">
                                <FileText size={16} /> DOWNLOAD CV
                             </span>
                         </a>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.9, rotateY: 30 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative perspective-1000"
                >
                    {/* HOLOGRAPHIC ID CARD */}
                    <a href={SOCIALS.calendar} target="_blank" rel="noopener noreferrer" className="block cursor-pointer">
                        <div className="relative z-10 w-full max-w-md ml-auto bg-zinc-900/80 border border-zinc-700/50 rounded-xl p-1 backdrop-blur-xl shadow-2xl hover:shadow-green-500/20 transition-shadow duration-500 group">
                            
                            <div className="bg-black/90 rounded-lg p-8 relative overflow-hidden border border-white/5">
                                {/* Scanning Line */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-green-500/50 blur-sm animate-scan opacity-50"></div>
                                <div className="absolute top-4 right-4">
                                    <div className="w-16 h-16 border-2 border-green-500/30 rounded flex items-center justify-center bg-green-500/10">
                                        <UserCheck size={32} className="text-green-500 opacity-80" />
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <div className="text-[10px] text-zinc-500 font-mono mb-1 tracking-widest">CANDIDATE NAME</div>
                                    <h2 className="text-3xl font-bold text-white tracking-tight">NITHIN</h2>
                                    <div className="text-green-500 font-mono text-xs mt-1">AI GROWTH ARCHITECT</div>
                                </div>

                                <div className="space-y-4 font-mono text-xs border-t border-zinc-800 pt-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-zinc-500">EXPERIENCE</span>
                                        <span className="text-white">SENIOR LEVEL</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-zinc-500">NOTICE PERIOD</span>
                                        <span className="text-green-400 font-bold animate-pulse">IMMEDIATE</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-zinc-500">RELOCATION</span>
                                        <span className="text-white">OPEN / REMOTE</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-zinc-500">LOCATION</span>
                                        <span className="text-white flex items-center gap-1"><MapPin size={10}/> BANGALORE, IN</span>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-zinc-800">
                                    <div className="text-[10px] text-zinc-500 mb-2">TOP SKILLS</div>
                                    <div className="flex flex-wrap gap-2">
                                        {['Growth Eng', 'LLMs', 'Python', 'Auto-CRM'].map(skill => (
                                            <span key={skill} className="bg-zinc-800 text-zinc-300 px-2 py-1 rounded border border-zinc-700 text-[10px]">{skill}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-6 bg-green-500/10 border border-green-500/30 p-3 rounded text-center group-hover:bg-green-500/20 transition-colors">
                                    <div className="text-[10px] text-green-400 mb-1">RECRUITER ACTION REQUIRED</div>
                                    <div className="text-white font-bold text-sm">AVAILABLE FOR INTERVIEW</div>
                                </div>
                            </div>
                        </div>
                    </a>
                </motion.div>
            </div>
        </section>

        {/* Stats ticker */}
        <a href={SOCIALS.calendar} target="_blank" rel="noopener noreferrer" className="block relative border-y border-zinc-800 bg-black/50 backdrop-blur-sm py-6 overflow-hidden mb-32 transform -skew-y-2 hover:border-green-500/50 transition-colors cursor-pointer group">
            <div className="absolute inset-0 bg-green-500/5 group-hover:bg-green-500/10 transition-colors"></div>
            <div className="flex whitespace-nowrap animate-marquee gap-16 font-mono text-zinc-500 text-sm items-center">
                 {[...Array(8)].map((_, i) => (
                    <React.Fragment key={i}>
                        <span className="text-white font-bold text-xl flex items-center gap-2">
                            <Zap size={16} className="text-green-500" /> HIRE VELOCITY
                        </span>
                        <span className="text-xl">DEPLOY GROWTH</span>
                        <span className="text-green-500 font-bold text-xl border border-green-500 px-2 rounded">IMMEDIATE IMPACT</span>
                        <span className="text-zinc-700">////////////////</span>
                    </React.Fragment>
                 ))}
            </div>
        </a>

        {/* Projects Section */}
        <section id="work" className="mb-40">
            <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 font-[Space_Grotesk] tracking-tighter">
                        PROVEN <span className="text-green-500">TRACK RECORD</span>
                    </h2>
                    <p className="text-zinc-500 max-w-xl border-l-2 border-zinc-800 pl-4">
                        Evidence of ability to deliver revenue. Previous deployments and success metrics.
                    </p>
                </div>
                <div className="text-right hidden md:block">
                    <a href={SOCIALS.linkedin} target="_blank" className="text-green-500 font-mono text-sm hover:underline flex items-center gap-2 justify-end">
                        VIEW FULL HISTORY <ExternalLink size={14}/>
                    </a>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {PROJECTS.map((p, i) => (
                    <ProjectCard key={p.id} project={p} index={i} />
                ))}
            </div>
        </section>

        {/* The Lab / Skills */}
        <section id="experience" className="mb-40 relative">
             <div className="flex flex-col md:flex-row gap-16 items-start">
                 <div className="md:w-1/3 sticky top-24">
                     <div className="text-green-500 font-mono text-xs mb-4 flex items-center gap-2 px-2 py-1 border border-green-500/30 rounded w-fit bg-green-500/5">
                        <Code2 size={12} />
                        TECHNICAL CAPABILITIES
                     </div>
                     <h2 className="text-5xl font-bold text-white mb-8 font-[Space_Grotesk]">Beyond <br/>Marketing</h2>
                     <p className="text-zinc-400 leading-relaxed mb-8">
                         Most marketers need developers to execute their ideas. <b>I build them myself.</b> <br/><br/>
                         Currently experimenting with agentic workflows to replace entire SDR teams.
                     </p>
                     
                     <div className="space-y-4">
                         <a href={SOCIALS.calendar} target="_blank" rel="noopener noreferrer" className="block p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg hover:border-green-500 transition-colors cursor-pointer group">
                             <div className="text-xs text-zinc-500 mb-1 group-hover:text-green-500">CURRENTLY BUILDING</div>
                             <div className="font-mono text-green-400">Multi-Agent Social Swarms</div>
                         </a>
                     </div>
                 </div>

                 <div className="md:w-2/3 grid gap-8">
                     {EXPERIMENTS.map((ex, i) => (
                         <a 
                            key={ex.id}
                            href={SOCIALS.calendar}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block"
                         >
                             <motion.div 
                                initial={{ x: 50, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="border border-zinc-800 p-8 bg-black hover:border-green-500 transition-all group relative overflow-hidden rounded-xl cursor-pointer"
                             >
                                 <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                                 <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={`w-2 h-2 rounded-full ${ex.status === 'In Progress' ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`} />
                                        <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">{ex.status}</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors flex items-center gap-2">
                                        {ex.title} <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </h3>
                                    <p className="text-zinc-400 mb-6 max-w-lg">{ex.description}</p>
                                    <div className="flex gap-2">
                                        {ex.tags.map(tag => (
                                            <span key={tag} className="text-[10px] text-zinc-400 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800 group-hover:border-green-500/30 transition-colors">{tag}</span>
                                        ))}
                                    </div>
                                 </div>
                             </motion.div>
                         </a>
                     ))}
                 </div>
             </div>
        </section>

        {/* My Edge / Why Hire Me */}
        <section id="skills" className="mb-40">
             <div className="text-center mb-20">
                 <h2 className="text-4xl md:text-5xl font-bold text-white font-[Space_Grotesk] mb-6">WHY <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-700">HIRE ME?</span></h2>
                 <div className="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
                 <p className="mt-6 text-zinc-500">Click a node to analyze value prop.</p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {EDGE_ITEMS.map((item, idx) => (
                     <motion.div 
                        key={item.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`p-8 border rounded-2xl transition-all duration-500 relative overflow-hidden group cursor-pointer ${activeEdge === item.id ? 'border-green-500 bg-zinc-900/40 shadow-[0_0_30px_rgba(16,185,129,0.1)]' : 'border-zinc-800 bg-black hover:border-zinc-600'}`}
                        onClick={() => setActiveEdge(item.id)}
                     >
                         {/* Background Glow */}
                         <div className={`absolute -right-10 -bottom-10 w-40 h-40 bg-green-500/20 blur-[50px] rounded-full transition-opacity duration-500 ${activeEdge === item.id ? 'opacity-100' : 'opacity-0'}`}></div>

                         <div className="flex justify-between items-start mb-8 relative z-10">
                             <div className={`p-4 rounded-xl transition-all duration-300 ${activeEdge === item.id ? 'bg-green-500 text-black shadow-lg shadow-green-500/50' : 'bg-zinc-900 text-zinc-600 group-hover:text-white'}`}>
                                 {item.id === 'velocity' && <Zap size={28} />}
                                 {item.id === 'system' && <Box size={28} />}
                                 {item.id === 'technical' && <Code2 size={28} />}
                             </div>
                             <div className="text-4xl font-black text-zinc-800 select-none">0{idx + 1}</div>
                         </div>
                         
                         <h3 className="text-2xl font-bold text-white mb-2 relative z-10 font-[Space_Grotesk]">{item.title}</h3>
                         <h4 className="text-sm text-zinc-500 font-mono mb-6 relative z-10">{item.subtitle}</h4>
                         
                         <div className={`text-zinc-300 text-sm leading-relaxed relative z-10 transition-all duration-500 overflow-hidden ${activeEdge === item.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                             {item.description}
                             <div className="mt-4">
                                 <a 
                                    href={SOCIALS.calendar} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-green-400 text-xs font-bold border-b border-green-500 hover:text-white transition-colors"
                                >
                                    HIRE ME &rarr;
                                </a>
                             </div>
                         </div>

                         {activeEdge !== item.id && (
                             <div className="absolute bottom-8 left-8 text-[10px] text-green-500 font-mono flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                 [ READ_MORE ] <ArrowRight size={10} />
                             </div>
                         )}
                     </motion.div>
                 ))}
             </div>
        </section>

        {/* Process Timeline / Impact */}
        <section id="process" className="mb-40 flex flex-col items-center relative">
             <h2 className="text-4xl font-bold text-white mb-20 font-[Space_Grotesk] text-center">MY IMPACT <span className="text-green-500">ON DAY 1</span></h2>

             <div className="absolute left-1/2 top-32 bottom-0 w-px bg-zinc-900 -translate-x-1/2 hidden md:block">
                  <motion.div 
                    style={{ height: `${Math.min(scrollProgress * 150, 100)}%`, maxHeight: '100%' }}
                    className="w-full bg-gradient-to-b from-green-500 via-green-400 to-transparent shadow-[0_0_15px_#10b981]"
                  />
             </div>

             <div className="w-full max-w-5xl space-y-24 relative">
                 {[
                     { title: 'Analyze & Identify', desc: 'I immediately audit your funnel to find "leaky buckets" and manual processes that are slowing you down.', id: 'WEEK_01', icon: <Crosshair /> },
                     { title: 'Deploy Autopilot', desc: 'I ship Python scripts and AI agents to automate your outbound and content generation.', id: 'WEEK_02', icon: <Code2 /> },
                     { title: 'Scale Revenue', desc: 'I optimize the successful channels using predictive models to lower CAC and increase LTV.', id: 'MONTH_01', icon: <TrendingUp /> },
                     { title: 'System Handover', desc: 'I document the entire engine so your team can run it without me (though you\'ll want me to stay).', id: 'ONGOING', icon: <Database /> }
                 ].map((step, i) => (
                     <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ margin: "-100px" }}
                        key={i} 
                        className={`flex items-center ${i % 2 === 0 ? 'md:justify-end' : 'md:justify-start'} relative group`}
                     >
                         
                         {/* Center Node */}
                         <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-black border border-zinc-800 rounded-full z-10 items-center justify-center group-hover:border-green-500 transition-colors shadow-xl">
                             <div className="text-zinc-600 group-hover:text-green-500 transition-colors">
                                 {step.icon}
                             </div>
                         </div>

                         <a 
                             href={SOCIALS.calendar} 
                             target="_blank" 
                             rel="noopener noreferrer"
                             className={`w-full md:w-[42%] p-8 border border-zinc-800 bg-black/50 hover:bg-zinc-900/50 hover:border-green-500/30 transition-all backdrop-blur-sm rounded-xl relative overflow-hidden cursor-pointer ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}
                        >
                             <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                             
                             <div className="text-[10px] text-green-500 font-mono mb-2 tracking-widest">{step.id}</div>
                             <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                             <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
                         </a>
                     </motion.div>
                 ))}
             </div>
        </section>

        {/* Contact / Terminal */}
        <section id="contact" className="mb-32 pt-12 relative">
            <div className="absolute inset-0 bg-green-500/5 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="text-center mb-12 relative z-10">
                <div className="inline-block px-4 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-mono mb-6 border border-green-500/20">
                    INTERVIEW MODE: ENABLED
                </div>
                <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 font-[Space_Grotesk] tracking-tighter">
                    EVALUATE <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-600">CANDIDATE</span>
                </h2>
                <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                    Ask the AI about my experience, salary expectations, or technical skills. Or just book an interview.
                </p>
            </div>
            
            <div className="relative z-10">
                <Terminal />
            </div>
            
            <div className="mt-16 flex justify-center gap-6 relative z-10 flex-wrap">
                <a href={SOCIALS.calendar} target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-black transition-all duration-200 bg-green-500 font-mono hover:bg-green-400 hover:scale-105 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] clip-path-button">
                    <Briefcase className="mr-3 w-5 h-5" />
                    SCHEDULE INTERVIEW
                </a>
                 <a href={`mailto:${SOCIALS.email}`} className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white transition-all duration-200 bg-zinc-900 border border-zinc-700 font-mono hover:border-green-500 hover:text-green-500">
                    EMAIL ME DIRECTLY
                </a>
            </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-zinc-900 pt-24 pb-12 text-center relative overflow-hidden bg-black">
             
             <div className="relative z-10">
                 <a href={SOCIALS.calendar} target="_blank" rel="noopener noreferrer" className="inline-block text-[10vw] font-black text-zinc-900 mb-8 uppercase tracking-tighter leading-none hover:text-zinc-800 transition-colors duration-500 cursor-pointer select-none">
                     NITHIN.AI
                 </a>
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-8 md:px-20 text-left max-w-6xl mx-auto mb-20">
                    <div>
                        <h4 className="text-white font-bold mb-4 font-mono">DOCUMENTS</h4>
                        <ul className="space-y-2 text-sm text-zinc-500 font-mono">
                            <li><a href={SOCIALS.linkedin} className="hover:text-green-500 transition-colors">Download Resume</a></li>
                            <li><a href="#work" className="hover:text-green-500 transition-colors">Case Studies</a></li>
                            <li><a href="#skills" className="hover:text-green-500 transition-colors">Technical Skills</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4 font-mono">CONTACT</h4>
                        <ul className="space-y-2 text-sm text-zinc-500 font-mono">
                            <li><a href={SOCIALS.linkedin} className="hover:text-green-500 transition-colors">LinkedIn</a></li>
                            <li><a href={SOCIALS.twitter} className="hover:text-green-500 transition-colors">X / Twitter</a></li>
                            <li><a href={`mailto:${SOCIALS.email}`} className="hover:text-green-500 transition-colors">nithin.v.kandula@gmail.com</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4 font-mono">CURRENT STATUS</h4>
                        <div className="flex items-center gap-2 text-green-500 text-sm font-mono mb-2">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            OPEN FOR FULL-TIME ROLES
                        </div>
                        <p className="text-zinc-600 text-xs">
                            Notice Period: Immediate<br/>
                            Relocation: Yes
                        </p>
                    </div>
                 </div>

                 <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center px-8 md:px-20 text-[10px] font-mono text-zinc-600">
                     <div>
                         &copy; {new Date().getFullYear()} NITHIN. READY FOR DEPLOYMENT.
                     </div>
                     <div className="mt-4 md:mt-0">
                         CANDIDATE_ID: 8293_X
                     </div>
                 </div>
             </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
