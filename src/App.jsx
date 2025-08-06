import React, { useState, useEffect, useRef } from 'react';

// --- Helper Components & Icons ---

// Icon component for visual consistency
const Icon = ({ name, className }) => {
  const icons = {
    arrowUp: <path d="M12 19V5M5 12l7-7 7 7"/>,
    impressions: <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>,
    calendar: <path d="M8 2v4M16 2v4M3 10h18M21 6H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Z"/>,
    check: <path d="M20 6 9 17l-5-5"/>,
    chevronDown: <path d="m6 9 6 6 6-6"/>,
    arrowRight: <path d="M5 12h14M12 5l7 7-7 7"/>,
    lightbulb: <path d="M15.83 16.33a4 4 0 0 1-5.66 5.66M12 2a7 7 0 0 0-7 7c0 1.85.83 3.53 2.17 4.67l.5.42c.81.7 1.33 1.71 1.33 2.76V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-.15c0-1.05.52-2.06 1.33-2.76l.5-.42A6.97 6.97 0 0 0 19 9a7 7 0 0 0-7-7Z M12 18h.01"/>,
    funnel: <path d="M3 3v1.59a2 2 0 0 0 .59 1.42L9 12v7l6-4v-3l5.41-6.01A2 2 0 0 0 21 4.59V3Z"/>,
    flask: <path d="M10 2v7.31A2 2 0 0 0 9.31 11l-4 4a2 2 0 0 0 2.82 2.82L12 14.12V20a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-5.88l3.88-3.88a2 2 0 0 0-2.82-2.82l-4 4A2 2 0 0 0 14 9.31V2Z"/>,
    link: <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"/>,
    video: <><path d="m22 8-6 4 6 4V8Z"/><path d="M14 22H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v18a2 2 0 0 1-2 2Z"/></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    strategy: <path d="m2.5 14.5 9-9 9 9" />,
    clock: <><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" /><path d="M12 7v5l3 3" /></>,
    script: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6" /><path d="M16 13H8" /><path d="M16 17H8" /><path d="M10 9H8" /></>,
    frequency: <path d="M4 20h16M4 16h16M4 12h16M4 8h16M4 4h16" />,
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {icons[name]}
    </svg>
  );
};


// Custom hook for detecting when an element is in view
const useInView = (options) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return [ref, isInView];
};

// Animated section wrapper
const AnimatedSection = ({ children, className = '' }) => {
  const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <section
      ref={ref}
      className={⁠ min-h-screen w-full flex flex-col justify-center items-center p-4 md:p-8 transition-opacity duration-1000 relative overflow-hidden ${isInView ? 'opacity-100' : 'opacity-0'} ${className} ⁠}
    >
      <div className="w-full max-w-6xl relative z-10">
        {children}
      </div>
    </section>
  );
};

// --- Presentation Sections ---

const HeroSection = () => (
  <section className="h-screen w-full flex flex-col justify-center items-center text-center text-white bg-gray-900 p-4 relative">
    <div className="relative z-10">
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 animate-fade-in-up">
        Fulfillzy Growth Strategy Review
      </h1>
      <p className="text-lg md:text-xl lg:text-2xl text-gray-300 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        90 posts. 3 months. 240K reach. What's next?
      </p>
    </div>
    <div className="absolute bottom-10 text-white animate-bounce z-10">
      <Icon name="chevronDown" className="w-8 h-8"/>
    </div>
  </section>
);

const PerformanceSection = () => {
  const kpis = [
    { value: '6,000', label: 'Followers Gained', icon: 'arrowUp' },
    { value: '240K', label: 'Impressions (30-day)', icon: 'impressions' },
    { value: '90+', label: 'Pieces of Content Created', icon: 'calendar' },
  ];

  return (
    <AnimatedSection>
      <div className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">The Results So Far</h2>
        <div className="grid md:grid-cols-3 gap-8">
            {kpis.map((kpi, index) => (
                <div key={index} className="bg-white/30 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/20 text-center text-white">
                    <div className="mx-auto bg-white/20 p-4 rounded-full w-20 h-20 flex items-center justify-center mb-4">
                        <Icon name={kpi.icon} className="w-8 h-8"/>
                    </div>
                    <p className="text-4xl md:text-5xl font-bold">{kpi.value}</p>
                    <p className="text-lg opacity-80">{kpi.label}</p>
                </div>
            ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

const StrategicShiftsSection = () => {
    const shifts = [
        { title: 'Content Expansion', description: 'From niche logistics to broader startup/business topics, widening our top-of-funnel appeal.', icon: 'strategy' },
        { title: 'Duration Optimization', description: 'Cutting video length from 60s to ~30s significantly boosted watch completion and retention rates.', icon: 'clock' },
        { title: 'Script Simplification', description: 'Adopting a conversational tone cut shooting time by 75% and made the host more relatable.', icon: 'script' },
        { title: 'Posting Frequency', description: 'A/B testing proved alternate-day posts with higher quality were superior for algorithm reach.', icon: 'frequency' },
    ];
    return (
        <AnimatedSection>
            <div className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/20">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">How We Achieved This</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {shifts.map((shift, index) => (
                        <div key={index} className="bg-white/30 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/20 text-white hover:bg-white/40 transition-all duration-300">
                            <Icon name={shift.icon} className="w-8 h-8 mb-3 opacity-90"/>
                            <h3 className="text-xl font-bold mb-2">{shift.title}</h3>
                            <p className="opacity-80">{shift.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};


const AudienceFunnelSection = () => {
    const layers = [
        { name: 'All Audience', color: 'border-blue-200' },
        { name: 'Interested in Entrepreneurship', color: 'border-blue-300' },
        { name: 'Successful Entrepreneurs', color: 'border-blue-400' },
        { name: 'D2C Entrepreneurs', color: 'border-blue-500' },
        { name: 'Looking for Logistics Solution', color: 'bg-blue-600', text: 'text-white' },
    ];

    return (
        <AnimatedSection>
            <div className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/20">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-white">Finding Our Niche</h2>
                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                    <div className="relative w-80 h-80 md:w-96 md:h-96 flex justify-center items-center flex-shrink-0">
                        {layers.map((layer, index) => (
                            <div key={index} className={⁠ absolute rounded-full ${layer.color} ${layer.text || ''} ⁠} style={{
                                width: ⁠ ${90 - index * 18}% ⁠,
                                height: ⁠ ${90 - index * 18}% ⁠,
                                borderWidth: layer.color.startsWith('bg-') ? '0' : '4px',
                                zIndex: 10 - index,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {layer.color.startsWith('bg-') && <span className="font-semibold text-center p-2">{layer.name}</span>}
                            </div>
                        ))}
                    </div>
                    <div className="space-y-3">
                        {layers.map((layer, index) => (
                            <div key={index} className="flex items-center space-x-3 p-3 bg-white/30 backdrop-blur-md rounded-lg shadow-sm border border-white/20">
                                <div className={⁠ w-5 h-5 rounded-full ${layer.color.startsWith('bg-') ? layer.color : ''} border-2 ${layer.color} ⁠} style={{borderWidth: layer.color.startsWith('bg-') ? '0' : '2px'}}></div>
                                <span className="font-semibold text-white">{layer.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
};

const ContentEngineSection = () => {
    const [openPillar, setOpenPillar] = useState(null);
    const [openQuestion, setOpenQuestion] = useState(null);

    const pillars = [
        { title: 'NDD/SDD', questions: ['How to promise NDD without killing margins?', 'Is SDD viable for my small business?', 'Case Study: Brand X NDD scaling.', 'Comparing NDD costs.', 'The tech behind our NDD promise.'] },
        { title: 'COD & Remittance', questions: ['Why is my COD remittance slow?', 'Fulfillzy\'s 24-hour COD cycle.', 'Reducing COD fraud and risk.', 'Financial impact of faster COD.', 'Automating COD reconciliation.'] },
        { title: 'RTO/NDR Management', questions: ['How to reduce my high RTO rate.', 'Our automated NDR/RTO process.', 'Turning returns into a positive CX.', 'Calculating the true cost of returns.', 'Proactive strategies to minimize NDR.'] },
        { title: 'Platform Integrations', questions: ['Seamless Shopify integration.', 'Connecting with WooCommerce.', 'How our WhatsApp integration works.', 'Using our API for custom solutions.', 'Marketplace integrations.'] },
        { title: 'Cost & Inventory', questions: ['Are shipping aggregators cheaper?', 'Finding hidden logistics costs.', 'How we negotiate bulk rates.', 'Guide to inventory automation.', 'Zone-based pricing explained.'] },
        { title: 'Packaging & Unboxing', questions: ['Cost-effective branding on packages.', 'Sustainable packaging options.', 'Creating a memorable unboxing experience.', 'Reducing damage with better packaging.', 'Packaging for fragile items.'] },
        { title: 'Customer Communication', questions: ['Proactive shipping notifications.', 'Branded tracking pages.', 'Handling "Where is my order?" queries.', 'Post-delivery feedback collection.', 'Using SMS for updates.'] },
    ];

    return (
        <AnimatedSection>
            <div className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/20 text-white">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">The 7-35-175 Content Engine</h2>
                <p className="text-lg text-center opacity-80 mb-8">(7 Pillars → 35 Questions → 175+ Pieces of Content)</p>
                <div className="max-w-4xl mx-auto">
                    {pillars.map((pillar, pIndex) => (
                        <div key={pIndex} className="border-b border-white/20">
                            <button onClick={() => setOpenPillar(openPillar === pIndex ? null : pIndex)} className="w-full flex justify-between items-center p-5 text-left">
                                <h3 className="text-xl font-semibold">{pillar.title}</h3>
                                <Icon name="chevronDown" className={⁠ w-6 h-6 opacity-80 transition-transform duration-300 ${openPillar === pIndex ? 'rotate-180' : ''} ⁠}/>
                            </button>
                            <div className={⁠ overflow-hidden transition-all duration-500 ease-in-out ${openPillar === pIndex ? 'max-h-[500px]' : 'max-h-0'} ⁠}>
                                <div className="p-5 pt-0 pl-10">
                                    {pillar.questions.map((question, qIndex) => (
                                        <div key={qIndex} className="border-l-2 border-blue-300/50 pl-4 mb-2">
                                            <button onClick={() => setOpenQuestion(openQuestion === ⁠ ${pIndex}-${qIndex} ⁠ ? null : ⁠ ${pIndex}-${qIndex} ⁠)} className="w-full flex justify-between items-center text-left py-2">
                                                <h4 className="font-medium opacity-90">{question}</h4>
                                                <Icon name="chevronDown" className={⁠ w-5 h-5 opacity-70 transition-transform duration-300 ${openQuestion === `${pIndex}-${qIndex} ⁠ ? 'rotate-180' : ''}`}/>
                                            </button>
                                            <div className={⁠ overflow-hidden transition-all duration-300 ease-in-out ${openQuestion === `${pIndex}-${qIndex} ⁠ ? 'max-h-96' : 'max-h-0'}`}>
                                                <div className="pt-2 pb-4 pl-4 flex flex-wrap gap-2">
                                                    {Array.from({ length: 5 }).map((_, i) => (
                                                        <button key={i} className="bg-white/20 hover:bg-white/30 text-white text-sm font-semibold px-3 py-1 rounded-full transition-colors">Idea {i + 1}</button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};


const FunnelFlowSection = () => {
    const steps = [
        "Instagram Reel", "DM Automation", "Lead Magnet", "Visit Landing Page", "Watch VSL", "Fill Form", "Book Free Consulting Call"
    ];

    return (
        <AnimatedSection>
            <div className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/20">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">The Conversion Funnel</h2>
                <div className="relative w-full max-w-sm mx-auto">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div className="bg-white/30 backdrop-blur-md p-4 rounded-lg shadow-md z-10 text-center font-semibold text-white" style={{ width: ⁠ ${100 - index * 8}% ⁠ }}>
                                {step}
                            </div>
                            {index < steps.length - 1 && (
                                <div className="w-8 h-8 flex items-center justify-center text-blue-200/80 my-2">
                                    <Icon name="chevronDown" className="w-8 h-8" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};

const LandingPageMockupSection = () => {
    const [showForm, setShowForm] = useState(false);

    return (
        <AnimatedSection>
            <div className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/20">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">Landing Page Mockup</h2>
                <div className="w-full max-w-3xl mx-auto bg-gray-900/50 p-8 rounded-xl shadow-2xl border border-white/20">
                    <h3 className="text-2xl font-bold text-white">Fulfillzy.ai</h3>
                    <p className="text-gray-300 mb-6">Your Partner in D2C Growth.</p>
                    
                    <div className="bg-black/50 text-white h-64 rounded-lg flex items-center justify-center text-2xl font-semibold mb-6 border border-white/20">
                        VSL (Video Sales Letter) Here
                    </div>

                    {!showForm ? (
                        <div className="text-center">
                            <button 
                                onClick={() => setShowForm(true)}
                                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105"
                            >
                                Apply Now
                            </button>
                        </div>
                    ) : (
                        <div className="bg-white/20 p-6 rounded-lg border border-white/30 animate-fade-in-up">
                            <h4 className="text-xl font-semibold mb-4 text-white">Tell Us About Your Business</h4>
                            <div className="space-y-4">
                                <input type="text" placeholder="Your Name" className="w-full p-3 bg-white/10 border border-white/20 rounded text-white placeholder-gray-300"/>
                                <input type="email" placeholder="Your Email" className="w-full p-3 bg-white/10 border border-white/20 rounded text-white placeholder-gray-300"/>
                                <input type="text" placeholder="Monthly Order Volume" className="w-full p-3 bg-white/10 border border-white/20 rounded text-white placeholder-gray-300"/>
                                <button className="w-full bg-green-500 hover:bg-green-400 text-white font-bold py-3 rounded-lg transition-colors">Submit</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AnimatedSection>
    );
};

const ContentMixSection = () => {
    const mix = [
        { type: 'Broad Educational', percentage: 45, color: 'bg-blue-500', videos: 5, description: 'Generic startup/ops insights to maximize reach.' },
        { type: 'Niche Sales', percentage: 45, color: 'bg-green-500', videos: 5, description: 'Direct logistics pain-points to attract ICPs.' },
    ];
    
    return (
        <AnimatedSection>
            <div className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/20 text-white">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Next Quarter's Content Plan</h2>
                <div className="max-w-4xl mx-auto">
                    <div className="flex w-full h-12 rounded-full overflow-hidden mb-8 shadow-inner bg-black/20">
                        {mix.map((item, index) => (
                            <div key={index} className={⁠ ${item.color} transition-all duration-500 ⁠} style={{ width: ⁠ ${item.percentage}% ⁠ }}></div>
                        ))}
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 text-center">
                        {mix.map((item, index) => (
                            <div key={index} className="bg-white/30 backdrop-blur-md p-6 rounded-xl border border-white/20">
                                <div className="flex items-center justify-center space-x-2">
                                    <div className={⁠ w-4 h-4 rounded-full ${item.color} ⁠}></div>
                                    <h3 className="text-xl font-semibold">{item.type}</h3>
                                </div>
                                <p className="text-3xl font-bold my-2">{item.videos} videos/mo</p>
                                <p className="opacity-80">{item.description}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 text-center p-4 bg-purple-500/30 border border-purple-300/50 rounded-lg">
                        <p className="font-bold text-purple-100">+2 Optional Controversial/Trend-based Videos per month to spike engagement.</p>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
};

const GrowthExperimentsSection = () => {
    const experiments = [
        { title: 'New Formats', description: 'Test live Q&As and "day in the life of a package" style content.', icon: 'flask' },
        { title: 'Repeat Winners', description: 'Double down on high-performing case study and cost-saving tip formats.', icon: 'check' },
        { title: 'Influencer Collabs', description: 'Partner with D2C founders building in public.', icon: 'users', links: [{name: 'Tia Bhuva', url: 'https://www.instagram.com/pinkvanity.by.tia?igsh=MTMyMndnbzNjbWMxcg=='}, {name: 'KK Groups', url: 'https://www.instagram.com/thekkgroups.in?igsh=MTB0MDBsMXZ2NXhsNQ=='}] },
        { title: 'Testimonial Videos', description: 'Systematically capture and produce high-quality client success stories for ads and content.', icon: 'video' },
    ];

    return (
        <AnimatedSection>
            <div className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/20 text-white">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Long-Term Growth Experiments</h2>
                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {experiments.map((exp, index) => (
                        <div key={index} className="bg-white/30 backdrop-blur-md p-6 rounded-xl border border-white/20 flex flex-col">
                            <div className="flex items-center space-x-4 mb-3">
                                <Icon name={exp.icon} className="w-8 h-8 opacity-90 flex-shrink-0"/>
                                <h3 className="text-xl font-bold">{exp.title}</h3>
                            </div>
                            <p className="opacity-80 flex-grow">{exp.description}</p>
                            {exp.links && (
                                <div className="mt-4 pt-4 border-t border-white/20">
                                    <h4 className="font-semibold text-sm opacity-70 mb-2">Example Profiles:</h4>
                                    <div className="space-y-2">
                                        {exp.links.map(link => (
                                            <a href={link.url} target="_blank" rel="noopener noreferrer" key={link.name} className="flex items-center space-x-2 text-blue-300 hover:text-blue-200">
                                               <Icon name="link" className="w-4 h-4"/>
                                               <span>{link.name}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};

const FinalSection = () => (
    <section className="h-screen w-full flex flex-col justify-center items-center text-center text-white bg-gray-900 p-4 relative">
        <h1 className="text-6xl md:text-8xl font-bold animate-fade-in-up relative z-10">Thank You.</h1>
    </section>
);


// --- Main App Component ---

export default function App() {
  return (
    <main className="bg-[#0B1120]">
      <style>{`
        body {
            background-color: #0B1120;
        }
        section {
            background-color: transparent;
        }
        section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.2), transparent 40%),
                              radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.2), transparent 40%);
            z-index: 0;
        }
        section::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url('data:image/svg+xml,%3Csvg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%" height="100%" filter="url(%23noiseFilter)"/%3E%3C/svg%3E');
            opacity: 0.05;
            z-index: 0;
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(-25%); animation-timing-function: cubic-bezier(0.8, 0, 1, 1); }
          50% { transform: translateY(0); animation-timing-function: cubic-bezier(0, 0, 0.2, 1); }
        }
        .animate-bounce { animation: bounce 1.5s infinite; }
      `}</style>
      <HeroSection />
      <PerformanceSection />
      <StrategicShiftsSection />
      <AudienceFunnelSection />
      <ContentEngineSection />
      <FunnelFlowSection />
      <LandingPageMockupSection />
      <ContentMixSection />
      <GrowthExperimentsSection />
      <FinalSection />
    </main>
  );
}
