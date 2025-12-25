import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedOrb from './AnimatedOrb';

const highlights = [
  { icon: '🎓', title: 'Education', description: 'Computer Science Student' },
  { icon: '💡', title: 'Focus', description: 'AI & Machine Learning' },
  { icon: '🚀', title: 'Goal', description: 'AI Research & Development' },
];

const stats = [
  { value: 2, label: 'Projects' },
  { value: 5, label: 'Certifications' },
  { value: 100, label: 'Hours Coding' },
];

function AnimatedCounter({ value, inView }: { value: number; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    
    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, inView]);

  return <span>{count}</span>;
}

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-16 sm:py-20 lg:py-24 bg-background-dark">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-title flex-col sm:flex-row"
        >
          <span className="section-title-number font-display text-lg sm:text-xl lg:text-2xl">01.</span>
          <h2 className="font-display text-xl sm:text-2xl lg:text-3xl">About Me</h2>
          <div className="section-title-line hidden sm:block"></div>
        </motion.div>

        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-16">
          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4 sm:space-y-6"
          >
            <p className="text-base sm:text-lg lg:text-xl text-primary font-medium leading-relaxed">
              Hello! I'm a passionate AI enthusiast and aspiring Machine Learning Engineer with a strong foundation in artificial intelligence, deep learning, and data science.
            </p>
            
            <p className="text-foreground-secondary leading-relaxed text-sm sm:text-base lg:text-lg">
              My journey in AI began with curiosity about how machines can learn and make decisions. Since then, I've been exploring various aspects of machine learning, from classical algorithms to cutting-edge deep learning architectures.
            </p>
            
            <p className="text-foreground-secondary leading-relaxed text-sm sm:text-base lg:text-lg">
              I specialize in building intelligent systems using Python, TensorFlow, and PyTorch. My areas of interest include Computer Vision, Natural Language Processing, and Reinforcement Learning.
            </p>

            {/* Highlight Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-background-card p-4 sm:p-6 rounded-xl border border-primary/20 text-center card-hover"
                >
                  <span className="text-3xl sm:text-4xl mb-2 sm:mb-3 block">{item.icon}</span>
                  <h3 className="text-primary font-semibold mb-1 sm:mb-2 text-sm sm:text-base">{item.title}</h3>
                  <p className="text-foreground-muted text-xs sm:text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Profile Card */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-background-card p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-primary/20"
          >
            {/* Profile Image with Animated Orb */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 lg:w-52 lg:h-52 mx-auto mb-6 sm:mb-8">
              <AnimatedOrb className="absolute inset-[-15px] sm:inset-[-20px] z-0" />
              <div className="relative z-10 w-full h-full rounded-full bg-background-dark flex items-center justify-center">
                <svg className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-primary" viewBox="0 0 200 200" fill="currentColor">
                  <circle cx="100" cy="80" r="40" />
                  <path d="M100 130 C50 130 30 170 30 200 L170 200 C170 170 150 130 100 130Z" />
                </svg>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-primary">
                    <AnimatedCounter value={stat.value} inView={isInView} />
                    {stat.label === 'Hours Coding' && '+'}
                  </span>
                  <span className="text-foreground-muted text-[10px] sm:text-xs lg:text-sm">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
