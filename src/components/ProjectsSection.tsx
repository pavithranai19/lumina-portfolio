import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code } from 'lucide-react';
import projectAi from '@/assets/project-ai.jpg';
import projectNlp from '@/assets/project-nlp.jpg';
import projectRl from '@/assets/project-rl.jpg';

const projects = [
  {
    title: 'Image Classification',
    description: 'Developed a deep learning model using Convolutional Neural Networks to classify images with 95% accuracy.',
    image: projectAi,
    tags: ['Python', 'TensorFlow', 'CNN'],
    demo: '#',
    code: '#',
  },
  {
    title: 'Sentiment Analysis',
    description: 'Built an NLP-based sentiment analysis system using transformer models to analyze social media data.',
    image: projectNlp,
    tags: ['Python', 'NLP', 'BERT'],
    demo: '#',
    code: '#',
  },
  {
    title: 'AI Game Agent',
    description: 'Created a reinforcement learning agent that learns to play games autonomously using Q-learning.',
    image: projectRl,
    tags: ['Python', 'PyTorch', 'RL'],
    demo: '#',
    code: '#',
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-title"
        >
          <span className="section-title-number font-display">02.</span>
          <h2 className="font-display">Featured Projects</h2>
          <div className="section-title-line"></div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="project-card group relative min-h-[350px] bg-background-card rounded-3xl border-2 border-primary/20 overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-500"
        style={{
          backgroundImage: `radial-gradient(circle at center, rgba(15,15,20,0.5), rgba(15,15,20,0.9)), url(${project.image})`,
        }}
      />

      {/* Tags */}
      <div className={`absolute top-4 right-4 flex flex-wrap gap-2 transition-all duration-300 z-10 ${isHovered ? 'opacity-0 -translate-y-4' : 'opacity-100'}`}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full border border-primary backdrop-blur-sm"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <h3 className={`absolute inset-0 flex items-center justify-center text-xl font-semibold tracking-wider transition-all duration-500 z-10 ${isHovered ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}`}>
        {project.title}
      </h3>

      {/* Interactive Boxes */}
      <a
        href={project.demo}
        className={`absolute w-[60%] h-[60%] bg-foreground/15 backdrop-blur-md border-t-2 border-r border-primary/50 rounded-tr-[75%] flex items-center justify-center gap-2 text-foreground font-semibold transition-all duration-700 hover:bg-gradient-to-br hover:from-primary hover:to-accent hover:opacity-90 z-20
          ${isHovered ? '-bottom-px -left-px' : '-bottom-[60%] -left-[60%]'}`}
        style={{ boxShadow: '0 0 30px hsla(190, 100%, 50%, 0.3)' }}
      >
        <ExternalLink size={20} />
        Demo
      </a>

      <a
        href={project.code}
        className={`absolute w-[40%] h-[40%] bg-foreground/15 backdrop-blur-md border-t-2 border-r border-primary/30 rounded-tr-[75%] flex items-center justify-center gap-2 text-foreground font-semibold transition-all duration-700 delay-100 hover:bg-gradient-to-br hover:from-accent hover:to-secondary hover:opacity-90 z-20
          ${isHovered ? '-bottom-px -left-px' : '-bottom-[40%] -left-[40%]'}`}
        style={{ boxShadow: '0 0 30px hsla(190, 100%, 50%, 0.3)' }}
      >
        <Code size={18} />
        Code
      </a>

      <div
        className={`absolute w-[20%] h-[20%] bg-primary/10 rounded-tr-[75%] transition-all duration-700 delay-200 z-20
          ${isHovered ? '-bottom-px -left-px' : '-bottom-[20%] -left-[20%]'}`}
      />

      {/* Description */}
      <div className={`absolute bottom-0 left-0 right-0 p-6 z-10 transition-all duration-500 delay-200 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <p className="text-foreground-secondary text-sm leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Hover Glow Effect */}
      <div className={`absolute inset-0 transition-all duration-500 pointer-events-none z-0 ${isHovered ? 'shadow-[inset_0_0_60px_hsla(190,100%,50%,0.2)]' : ''}`} />
    </motion.div>
  );
}
