import { Github, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-background-dark border-t border-primary/10 py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-foreground-muted text-sm">
            © 2024 AI Portfolio. Built with passion for Artificial Intelligence.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground-secondary hover:text-primary hover:-translate-y-1 transition-all duration-300"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground-secondary hover:text-primary hover:-translate-y-1 transition-all duration-300"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
