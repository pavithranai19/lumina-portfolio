import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import GridScanBackground from './GridScanBackground';

const certifications = [
  {
    icon: '🎓',
    title: 'Deep Learning Specialization',
    issuer: 'DeepLearning.AI',
    date: '2024',
    badge: 'Verified',
  },
  {
    icon: '🏆',
    title: 'Machine Learning',
    issuer: 'Stanford University',
    date: '2024',
    badge: 'Verified',
  },
  {
    icon: '🌟',
    title: 'TensorFlow Developer',
    issuer: 'Google',
    date: '2024',
    badge: 'Verified',
  },
];

export default function CertificationsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section id="certifications" className="relative min-h-screen bg-background-dark overflow-hidden">
      {/* GridScan Background */}
      <GridScanBackground 
        linesColor="#00d4ff"
        scanColor="#FF9FFC"
        gridScale={0.12}
        lineThickness={1.2}
        scanOpacity={0.5}
        scanGlow={0.6}
        scanSoftness={2.5}
        scanDuration={2.5}
        scanDelay={1.5}
        noiseIntensity={0.015}
        bloomIntensity={0.3}
        scanOnClick={true}
      />

      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-title flex-col sm:flex-row"
        >
          <span className="section-title-number font-display text-lg sm:text-xl lg:text-2xl">04.</span>
          <h2 className="font-display text-xl sm:text-2xl lg:text-3xl">Certifications</h2>
          <div className="section-title-line hidden sm:block"></div>
        </motion.div>

        {/* Cards Container */}
        <div ref={containerRef} className="relative mt-8 sm:mt-12">
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            {certifications.map((cert, index) => (
              <CertCard
                key={cert.title}
                cert={cert}
                index={index}
                scrollYProgress={scrollYProgress}
                totalCards={certifications.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface CertCardProps {
  cert: typeof certifications[0];
  index: number;
  scrollYProgress: any;
  totalCards: number;
}

function CertCard({ cert, index, scrollYProgress, totalCards }: CertCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const yRange = [index / totalCards, (index + 1) / totalCards];
  const scale = useTransform(scrollYProgress, yRange, [1, 0.95]);
  const opacity = useTransform(scrollYProgress, yRange, [1, 0.8]);
  
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true }}
      style={{
        scale: smoothScale,
        opacity: smoothOpacity,
      }}
      className="cert-card h-auto min-h-[180px] sm:min-h-[220px] lg:h-80 w-full p-4 sm:p-6 lg:p-8 bg-background-card rounded-2xl sm:rounded-[30px] lg:rounded-[40px] border border-primary/10 shadow-lg backdrop-blur-sm"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        {/* Icon */}
        <span className="text-4xl sm:text-5xl">{cert.icon}</span>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-foreground mb-1 sm:mb-2">
            {cert.title}
          </h3>
          <p className="text-primary font-semibold text-sm sm:text-base mb-0.5 sm:mb-1">{cert.issuer}</p>
          <p className="text-foreground-muted text-xs sm:text-sm mb-3 sm:mb-4">{cert.date}</p>
          <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/20 text-primary text-xs sm:text-sm font-semibold rounded-full border border-primary">
            {cert.badge}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
