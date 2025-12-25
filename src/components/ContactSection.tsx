import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import GalaxyBackground from './GalaxyBackground';
import { toast } from 'sonner';

const contactInfo = [
  { label: 'Email', value: 'your.email@example.com', href: 'mailto:your.email@example.com' },
  { label: 'GitHub', value: 'github.com/yourusername', href: 'https://github.com' },
  { label: 'LinkedIn', value: 'linkedin.com/in/yourprofile', href: 'https://linkedin.com' },
];

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitted(true);
    setIsSubmitting(false);
    toast.success('Message sent successfully!');

    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="relative py-24 bg-background overflow-hidden">
      {/* Background */}
      <GalaxyBackground className="z-0 opacity-60" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-title"
        >
          <span className="section-title-number font-display">05.</span>
          <h2 className="font-display">Get In Touch</h2>
          <div className="section-title-line"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-3xl font-bold gradient-text">Let's Connect!</h3>
            <p className="text-foreground-secondary leading-relaxed text-lg">
              I'm currently looking for opportunities in AI and Machine Learning. Whether you have a question or just want to say hi, feel free to reach out!
            </p>

            <div className="space-y-6">
              {contactInfo.map((item) => (
                <div key={item.label} className="space-y-1">
                  <h4 className="text-primary font-medium">{item.label}</h4>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground-secondary hover:text-primary transition-colors"
                  >
                    {item.value}
                  </a>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-background-card p-8 rounded-2xl border border-primary/10"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="floating-label-group">
                <input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  className="floating-input"
                  placeholder=" "
                  required
                  autoComplete="off"
                />
                <label className="floating-label">Your Name</label>
              </div>

              {/* Email */}
              <div className="floating-label-group">
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  className="floating-input"
                  placeholder=" "
                  required
                  autoComplete="off"
                />
                <label className="floating-label">Your Email</label>
              </div>

              {/* Subject */}
              <div className="floating-label-group">
                <input
                  type="text"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  className="floating-input"
                  placeholder=" "
                  required
                  autoComplete="off"
                />
                <label className="floating-label">Subject</label>
              </div>

              {/* Message */}
              <div className="floating-label-group">
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  className="floating-input min-h-[120px] resize-y"
                  placeholder=" "
                  rows={5}
                  required
                  autoComplete="off"
                />
                <label className="floating-label">Your Message</label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`w-full py-4 px-8 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                  isSubmitted
                    ? 'bg-gradient-to-r from-green-400 to-primary text-background'
                    : 'btn-primary'
                }`}
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle size={20} />
                    Message Sent! ✓
                  </>
                ) : isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
