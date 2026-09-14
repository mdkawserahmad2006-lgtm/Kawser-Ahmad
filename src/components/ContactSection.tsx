import React, { useState } from 'react';
import { MessageCircle, Mail, Phone, MapPin, Send, CheckCircle, Sparkles, Copy, Check } from 'lucide-react';
import { ProfileData } from '../types';

interface ContactSectionProps {
  profile: ProfileData;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Video Editing & Motion Graphics',
    budget: '$100 - $350',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Format WhatsApp message
    const cleanPhone = profile.whatsappNumber.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(
      `*New Project Inquiry (Portfolio)*\n` +
      `👤 Client: ${formData.name}\n` +
      `📧 Email: ${formData.email}\n` +
      `🎯 Service: ${formData.service}\n` +
      `💰 Budget: ${formData.budget}\n` +
      `💬 Message: ${formData.message}`
    );

    // Open WhatsApp directly
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
  };

  return (
    <section
      id="contact"
      className="relative py-20 lg:py-28 bg-transparent border-t border-cyan-500/15"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-3">
            <MessageCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>Get In Touch • Available Worldwide</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            <span className="text-navy-ice">Let's Discuss Your </span>
            <span className="text-gradient-cyan-teal">Next Creative Project</span>
          </h2>
          <p className="text-navy-mist text-sm sm:text-base mt-2">
            Whether you need high-converting graphic designs, viral video edits, or profitable Meta ad scaling—I'm ready to collaborate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Contact Details & Quick Links (Left Column) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* WhatsApp Quick Card */}
            <div className="navy-glass-card rounded-2xl p-6 border border-emerald-500/30 hover:border-emerald-400/50 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-navy-ice">Direct WhatsApp</h3>
                  <p className="text-xs text-navy-mist">Fastest response for urgent projects & quotes</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-cyan-500/20">
                <span className="text-sm font-semibold text-emerald-300">{profile.whatsappNumber}</span>
                <a
                  href={`https://wa.me/${profile.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(profile.name)},%20I%20want%20to%20discuss%20a%20project.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <span>Start Chat</span>
                </a>
              </div>
            </div>

            {/* Email Card */}
            <div className="navy-glass-card rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-400/40 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-navy-ice">Official Email</h3>
                  <p className="text-xs text-navy-mist">Send detailed project briefs or file attachments</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-cyan-500/20">
                <span className="text-xs sm:text-sm font-medium text-cyan-300 truncate mr-2">{profile.email}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-[#04192b] hover:bg-[#07243c] text-navy-mist text-xs flex items-center gap-1 transition-colors border border-cyan-500/20"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <a
                    href={`mailto:${profile.email}?subject=Project%20Inquiry%20from%20Portfolio`}
                    className="px-3 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 font-bold text-xs transition-colors"
                  >
                    Send Email
                  </a>
                </div>
              </div>
            </div>

            {/* Location & Support */}
            <div className="navy-glass-card rounded-2xl p-5 border border-cyan-500/15 text-xs text-navy-mist space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span className="text-navy-ice">{profile.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span className="text-navy-ice">{profile.phone}</span>
              </div>
              <div className="pt-2 border-t border-cyan-500/20 text-[11px] text-navy-steel">
                * Open for remote client contracts, agency partnerships, and worldwide freelance projects.
              </div>
            </div>

          </div>

          {/* Contact Inquiry Form (Right Column) */}
          <div className="lg:col-span-7">
            <div className="navy-glass-card rounded-3xl p-6 sm:p-8 border border-cyan-500/30">
              <h3 className="text-xl font-bold text-navy-ice mb-2">Send a Direct Inquiry</h3>
              <p className="text-xs text-navy-mist mb-6">Submitting this form connects your inquiry directly to WhatsApp with your details pre-formatted.</p>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-3 animate-in fade-in">
                  <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h4 className="text-lg font-bold text-white">Thank You! Redirecting to WhatsApp...</h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto">
                    Your WhatsApp window is opening now. If it didn't open automatically, click the button below.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-4 py-2 rounded-xl bg-[#062238] hover:bg-[#092e4c] text-xs font-semibold text-navy-ice border border-cyan-500/20"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-navy-mist mb-1.5">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-[#03111e] border border-cyan-500/20 text-navy-ice text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-navy-mist mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="example@mail.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#03111e] border border-cyan-500/20 text-navy-ice text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-navy-mist mb-1.5">Requested Service *</label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#03111e] border border-cyan-500/20 text-navy-ice text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                      >
                        <option value="Video Editing (Reels/Shorts/Commercial)">Video Editing (Reels / Shorts / Commercials)</option>
                        <option value="Graphic Design (Logos/Banners/Branding)">Graphic Design (Logos / Banners / Branding)</option>
                        <option value="Meta Marketing & Ad Scaling">Meta Marketing (Ads Architecture & ROAS Scaling)</option>
                        <option value="Full Creative Suite (Video + Graphics + Ads)">Full Creative Suite (Video + Graphics + Meta)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-navy-mist mb-1.5">Estimated Budget *</label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#03111e] border border-cyan-500/20 text-navy-ice text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                      >
                        <option value="$50 - $150">$50 - $150 (Basic Package)</option>
                        <option value="$150 - $350">$150 - $350 (Standard Project)</option>
                        <option value="$350 - $700+">$350 - $700+ (Premium Campaign)</option>
                        <option value="Monthly Retainer">Monthly Retainer Contract</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-navy-mist mb-1.5">Project Brief or Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your goals, project timeline, reference links or deliverable details..."
                      className="w-full px-4 py-3 rounded-xl bg-[#03111e] border border-cyan-500/20 text-navy-ice text-sm focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message & Chat on WhatsApp</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
