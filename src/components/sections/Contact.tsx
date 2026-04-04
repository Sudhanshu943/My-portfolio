'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');

    try {
      // Using Formspree service (free tier available)
      // You can also use web3forms or your own backend
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _replyto: formData.email,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setStatusMessage('Message sent successfully! I\'ll get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setStatusMessage('Failed to send message. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setStatusMessage('An error occurred. Please try again or contact me directly at sudhanshuthapa8@gmail.com');
    }

    setLoading(false);
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <section className="py-[120px] bg-surface/40 px-6 backdrop-blur-sm" id="contact">
      <div className="max-w-2xl mx-auto">
        <div className="mb-16">
          <p className="font-mono-tactical text-xs tracking-[0.3em] text-secondary mb-2">[ SYSTEM: CONTACT_PROTOCOL ]</p>
          <h2 className="text-4xl font-headline font-bold uppercase tracking-tight mb-2">Get In Touch</h2>
          <p className="text-on-surface-variant">Have a project or inquiry? Send me a message and I'll respond as soon as possible.</p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="space-y-6 bg-surface-container p-8 border border-outline-variant/20"
        >
          {/* Name */}
          <div className="space-y-2">
            <label className="font-mono-tactical text-[10px] text-on-surface-variant uppercase tracking-widest">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b-2 border-outline-variant focus:border-primary focus:ring-0 font-body text-sm py-3 transition-all outline-none"
              placeholder="Your name"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="font-mono-tactical text-[10px] text-on-surface-variant uppercase tracking-widest">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b-2 border-outline-variant focus:border-primary focus:ring-0 font-body text-sm py-3 transition-all outline-none"
              placeholder="your.email@example.com"
            />
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <label className="font-mono-tactical text-[10px] text-on-surface-variant uppercase tracking-widest">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b-2 border-outline-variant focus:border-primary focus:ring-0 font-body text-sm py-3 transition-all outline-none"
              placeholder="Message subject"
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label className="font-mono-tactical text-[10px] text-on-surface-variant uppercase tracking-widest">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full bg-surface-container-low border border-outline-variant/30 focus:border-primary focus:ring-1 focus:ring-primary/20 font-body text-sm p-4 transition-all outline-none resize-none"
              placeholder="Your message here..."
            />
          </div>

          {/* Status Messages */}
          {status === 'success' && (
            <div className="p-4 bg-primary/10 border border-primary/30 text-primary font-mono-tactical text-sm">
              ✓ {statusMessage}
            </div>
          )}
          {status === 'error' && (
            <div className="p-4 bg-error/10 border border-error/30 text-error font-mono-tactical text-sm">
              ✗ {statusMessage}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-primary text-on-primary font-mono-tactical font-bold py-3 uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all hover:shadow-[0_0_20px_rgba(160,255,196,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '[ SENDING... ]' : '_ [SEND_MESSAGE]'}
            </button>
            <button
              type="reset"
              onClick={() => setFormData({ name: '', email: '', subject: '', message: '' })}
              className="px-6 border border-outline-variant text-on-surface-variant font-mono-tactical font-bold py-3 uppercase tracking-widest hover:bg-surface-bright transition-all"
            >
              _ [RESET]
            </button>
          </div>
        </motion.form>

        {/* Direct Contact Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-surface-container p-6 border-l-4 border-primary">
            <p className="font-mono-tactical text-[10px] text-on-surface-variant uppercase mb-2">Email</p>
            <a href="mailto:sudhanshuthapa8@gmail.com" className="text-primary hover:underline break-all">
              sudhanshuthapa8@gmail.com
            </a>
          </div>
          <div className="bg-surface-container p-6 border-l-4 border-secondary">
            <p className="font-mono-tactical text-[10px] text-on-surface-variant uppercase mb-2">LinkedIn</p>
            <a href="https://www.linkedin.com/in/sudhanshu-thapa-1827a6272" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">
              sudhanshu-thapa-1827a6272
            </a>
          </div>
          <div className="bg-surface-container p-6 border-l-4 border-tertiary">
            <p className="font-mono-tactical text-[10px] text-on-surface-variant uppercase mb-2">GitHub</p>
            <a href="https://github.com/Sudhanshu943" target="_blank" rel="noopener noreferrer" className="text-tertiary hover:underline">
              Sudhanshu943
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
