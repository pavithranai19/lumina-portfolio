import { useState, useEffect } from 'react';
import { Github, Linkedin, ExternalLink } from 'lucide-react';
import HomeGalaxyBackground from './HomeGalaxyBackground';
import RotatingCube from './RotatingCube';

export default function HeroSection() {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const fullText = 'Pavithran G';

  useEffect(() => {
    let currentIndex = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setDisplayedText(fullText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsTypingComplete(true);
        }
      }, 100);
      return () => clearInterval(interval);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background - HomeGalaxy */}
      <HomeGalaxyBackground 
        className="z-0" 
        focal={[0.5, 0.5]}
        starSpeed={0.5}
        density={6.0}
        hueShift={200}
        speed={1.0}
        glowIntensity={4.0}
        saturation={3.0}
        mouseRepulsion={true}
        repulsionStrength={4.0}
        twinkleIntensity={1.0}
        rotationSpeed={0.1}
      />
      
      {/* Content */}
      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text */}
          <div className="space-y-8">
            {/* Glitch Title */}
            <h1 className={`font-display text-4xl md:text-5xl lg:text-6xl font-black leading-tight ${isTypingComplete ? 'glitch-text' : ''}`}>
              <span className="gradient-text-tri">
                {displayedText}
                {!isTypingComplete && <span className="typing-cursor"></span>}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-foreground-secondary">
              Building the Future with{' '}
              <span className="gradient-text font-bold">Me..</span>
            </p>

            {/* Description */}
            <p className="text-foreground-muted text-lg">
              Machine Learning • Deep Learning • Computer Vision • NLP
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => scrollToSection('projects')}
                className="btn-primary"
              >
                View Projects
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="btn-outline"
              >
                Get In Touch
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 pt-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon group">
                <Github className="w-5 h-5 text-foreground-secondary group-hover:text-primary transition-colors" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon group">
                <Linkedin className="w-5 h-5 text-foreground-secondary group-hover:text-primary transition-colors" />
              </a>
              <a href="https://leetcode.com" target="_blank" rel="noopener noreferrer" className="social-icon group hover:shadow-[0_5px_20px_rgba(255,161,22,0.3)]">
                <span className="text-foreground-secondary group-hover:text-[#FFA116] font-bold text-xs transition-colors">LC</span>
              </a>
              <a href="https://hackerrank.com" target="_blank" rel="noopener noreferrer" className="social-icon group hover:shadow-[0_5px_20px_rgba(0,234,100,0.3)]">
                <span className="text-foreground-secondary group-hover:text-[#00EA64] font-bold text-xs transition-colors">HR</span>
              </a>
              <a href="https://codility.com" target="_blank" rel="noopener noreferrer" className="social-icon group hover:shadow-[0_5px_20px_rgba(108,99,255,0.3)]">
                <span className="text-foreground-secondary group-hover:text-[#6C63FF] font-bold text-xs transition-colors">CO</span>
              </a>
            </div>
          </div>

          {/* Right Column - 3D Cube */}
          <div className="hidden lg:flex justify-center items-center">
            <RotatingCube />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator">
        <div className="w-8 h-12 border-2 border-primary rounded-full flex justify-center p-2">
          <div className="w-1 h-3 bg-primary rounded-full scroll-dot"></div>
        </div>
      </div>
    </section>
  );
}
