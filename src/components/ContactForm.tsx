import { useState } from 'react';
import { Send } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Get in Touch</h1>
        <p className="text-gray-400">I'm always open to new opportunities and collaborations</p>
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="bg-dark-800/50 rounded-lg p-6 backdrop-blur-sm border border-white/5 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-200">
            Name
          </label>
          <input
            type="text"
            id="name"
            required
            className="mt-1 block w-full rounded-lg bg-dark-700 border-dark-600 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-200">
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            className="mt-1 block w-full rounded-lg bg-dark-700 border-dark-600 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-200">
            Message
          </label>
          <textarea
            id="message"
            required
            rows={4}
            className="mt-1 block w-full rounded-lg bg-dark-700 border-dark-600 text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              'Sending...'
            ) : (
              <>
                Send Message
                <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </button>
        </div>

        {submitStatus === 'success' && (
          <div className="text-sm text-green-400">
            Thank you for your message! I'll get back to you soon.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="text-sm text-red-400">
            Something went wrong. Please try again later.
          </div>
        )}
      </form>
    </div>
  );
};