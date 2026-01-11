import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedOrb from './AnimatedOrb';

// Elegant floating shape component
function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-primary/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate: rotate }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-primary/[0.15]",
            "shadow-[0_8px_32px_0_rgba(0,212,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(0,212,255,0.2),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

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

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: 0.5 + i * 0.2,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
};

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative min-h-screen py-16 sm:py-20 lg:py-24 bg-darker-bg overflow-hidden">
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] via-transparent to-accent/[0.05] blur-3xl" />

      {/* Elegant floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-primary/[0.15]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />
        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-secondary/[0.15]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />
        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-accent/[0.15]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />
        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-primary/[0.15]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />
        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-secondary/[0.15]"
          className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Hero-style Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/[0.1] border border-primary/[0.2] mb-6 sm:mb-8"
          >
            <Circle className="h-2 w-2 fill-primary text-primary" />
            <span className="text-sm text-primary tracking-wide font-display">01. About Me</span>
          </motion.div>

          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 sm:mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Building the Future
              </span>
              <br />
              <span className="text-foreground">with AI & ML</span>
            </h2>
          </motion.div>

          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-sm sm:text-base md:text-lg text-foreground-secondary max-w-xl mx-auto px-4 leading-relaxed">
              Crafting exceptional AI solutions through innovative design and cutting-edge technology.
            </p>
          </motion.div>
        </div>

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
                  className="bg-background-card/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-primary/20 text-center card-hover"
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
            className="bg-background-card/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-primary/20"
          >
            {/* Profile Image with Animated Orb */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 lg:w-52 lg:h-52 mx-auto mb-6 sm:mb-8">
              <AnimatedOrb className="absolute inset-[-15px] sm:inset-[-20px] z-0" />
              <div className="relative z-10 w-full h-full rounded-full bg-darker-bg flex items-center justify-center">
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

      {/* Bottom gradient fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-darker-bg to-transparent pointer-events-none" />
    </section>
  );
}
