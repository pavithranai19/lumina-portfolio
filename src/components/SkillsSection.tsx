import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import GridScanBackground from './GridScanBackground';

const technologies = [
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
  { name: 'PyTorch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
  { name: 'Scikit-learn', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg' },
  { name: 'Pandas', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
  { name: 'NumPy', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
  { name: 'Jupyter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
];

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="relative py-16 sm:py-20 lg:py-24 bg-background overflow-hidden">
      {/* Grid Scan Background */}
      <GridScanBackground />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-title flex-col sm:flex-row"
        >
          <span className="section-title-number font-display text-lg sm:text-xl lg:text-2xl">03.</span>
          <h2 className="font-display text-xl sm:text-2xl lg:text-3xl">Technologies & Tools</h2>
          <div className="section-title-line hidden sm:block"></div>
        </motion.div>

        {/* Technologies Grid */}
        <div
          ref={ref}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 justify-items-center mt-8 sm:mt-12"
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.5, y: 30 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{ scale: 1.1, y: -10 }}
              className="w-[90px] h-[90px] sm:w-[110px] sm:h-[110px] lg:w-[140px] lg:h-[140px] bg-background-card rounded-xl sm:rounded-2xl border border-primary/10 p-3 sm:p-4 lg:p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:border-primary hover:shadow-[0_10px_30px_hsla(190,100%,50%,0.3)] group relative overflow-hidden"
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Icon */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 mb-2 sm:mb-3 relative z-10">
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className="w-full h-full object-contain drop-shadow-[0_0_10px_hsla(190,100%,50%,0.3)]"
                />
              </div>

              {/* Name */}
              <span className="text-[10px] sm:text-xs lg:text-sm font-semibold text-foreground text-center relative z-10">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
