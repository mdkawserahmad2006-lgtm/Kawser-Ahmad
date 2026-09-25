import React, { useState } from 'react';
import { MessageCircle, Mail, Phone, MapPin, Send, CheckCircle, Sparkles, Copy, Check, ExternalLink, ArrowRight } from 'lucide-react';
import { ProfileData } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ContactSectionProps {
  profile: ProfileData;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile }) => {
  const { t } = useLanguage();
  const targetEmail = profile.email || 'mdkawserahmad2006@gmail.com';
  const [hoveredContact, setHoveredContact] = useState<'email' | 'whatsapp' | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Video Editing & Motion Graphics',
    budget: '$100 - $350',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submittedMode, setSubmittedMode] = useState<'email' | 'whatsapp'>('email');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(targetEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const getEmailContent = () => {
    const subject = `Project Inquiry: ${formData.service} from ${formData.name || 'Client'}`;
    const body = `Hello Md Kawser Ahmad,

I would like to discuss and hire you for a project:

• Client Name: ${formData.name || 'Not specified'}
• Client Email: ${formData.email || 'Not specified'}
• Selected Service: ${formData.service}
• Estimated Budget: ${formData.budget}

Project Brief / Message:
${formData.message || 'I would like to learn more about your services.'}

---
Sent via Kawser Theory Portfolio`;
    return { subject, body };
  };

  const handleSendViaEmail = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    const { subject, body } = getEmailContent();
    const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    setSubmittedMode('email');
    setSubmitted(true);

    // Trigger user mail client
    window.location.href = mailtoUrl;
  };

  const handleOpenGmailWeb = () => {
    const { subject, body } = getEmailContent();
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${targetEmail}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank');
  };

  const handleSendViaWhatsApp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    const cleanPhone = (profile.whatsappNumber || '+8801953941415').replace(/[^0-9]/g, '');
    const text = encodeURIComponent(
      `*New Project Inquiry (Portfolio)*\n` +
      `👤 Client: ${formData.name}\n` +
      `📧 Email: ${formData.email}\n` +
      `🎯 Service: ${formData.service}\n` +
      `💰 Budget: ${formData.budget}\n` +
      `💬 Message: ${formData.message}`
    );

    setSubmittedMode('whatsapp');
    setSubmitted(true);
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
  };

  return (
    <section
      id="contact"
      className="relative py-20 lg:py-28 bg-transparent border-t border-cyan-500/15"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-2">
            <MessageCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.contactBadge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            <span className="text-white">{t.contactTitle}</span>
          </h2>
          <p className="text-navy-mist text-xs sm:text-sm mt-1">
            {t.contactSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Contact Details & Quick Links (Left Column) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Email Card (Connected to mdkawserahmad2006@gmail.com) */}
            <div
              onMouseEnter={() => setHoveredContact('email')}
              onMouseLeave={() => setHoveredContact(null)}
              onTouchStart={() => setHoveredContact('email')}
              className="relative group navy-glass-card rounded-2xl p-6 border border-sky-500/30 hover:border-cyan-300 hover:shadow-[0_16px_50px_rgba(56,189,248,0.4)] hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              {/* Internal overflow-clipped laser light sweep */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_12px_#00e5ff]" />
                <div className="pointer-events-none absolute inset-0 -translate-x-[160%] group-hover:translate-x-[260%] transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-cyan-300/15 to-transparent skew-x-12 z-20" />
              </div>

              <div className="flex items-center gap-4 mb-4 relative z-10">
                {/* 
                  USER REQUESTED: MAIL APP LAUNCHER & INTERACTIVE VISUAL NOTIFICATION
                  "মেইল এবং হোয়াটসঅ্যাপের মধ্যে যখন কার্সর নিয়ে যাওয়া হবে, তখন এই অ্যাপগুলো মেইল উপরে গিয়ে সেকশন দেখাবে যে আপনি মেইল পাঠান, এরকম একটা কিছু একটা ভিজ্যুয়াল নড়াচড়া করবে সে।"
                */}
                <div className="relative flex-shrink-0">
                  {/* Vertical Energy Laser Trail beneath floating mail */}
                  <div
                    className={`pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-t from-cyan-400/80 via-sky-300 to-transparent transition-all duration-500 ease-out z-25 ${
                      hoveredContact === 'email' ? 'h-14 sm:h-16 opacity-100 -translate-y-8' : 'h-0 opacity-0'
                    }`}
                  />

                  {/* Floating Pill Banner when Mail Flies Above Card */}
                  <div
                    className={`pointer-events-none absolute -top-20 sm:-top-22 left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-400 ease-out z-40 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/95 border border-sky-400/80 shadow-[0_0_25px_rgba(56,189,248,0.8)] text-[10px] font-extrabold text-white ${
                      hoveredContact === 'email'
                        ? 'opacity-100 scale-100 -translate-y-1'
                        : 'opacity-0 scale-75 translate-y-3 pointer-events-none'
                    }`}
                  >
                    <Send className="w-3 h-3 text-cyan-300 animate-bounce" />
                    <span>সরাসরি মেইল পাঠান • Send Mail Now</span>
                  </div>

                  {/* The Flying Mail Box */}
                  <div
                    className={`relative z-30 w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] bg-[#001c3d] border-sky-400 ${
                      hoveredContact === 'email'
                        ? '-translate-y-12 sm:-translate-y-14 scale-125 sm:scale-130 shadow-[0_0_35px_rgba(56,189,248,0.85)] ring-2 ring-white/60'
                        : 'translate-y-0 scale-100 shadow-md'
                    }`}
                    title="Send Email Directly"
                  >
                    <Mail
                      className={`w-6 h-6 transition-all duration-300 ${
                        hoveredContact === 'email'
                          ? 'text-cyan-200 animate-pulse stroke-[2.5] drop-shadow-[0_0_8px_#00e5ff]'
                          : 'text-sky-400'
                      }`}
                    />
                  </div>

                  {/* Base Holographic Landing Pad */}
                  <div className="absolute inset-0 rounded-xl border border-sky-500/25 bg-[#020d1c]/80 pointer-events-none z-10 flex items-center justify-center">
                    <span className="text-[9px] font-bold text-sky-500/40 uppercase">MAIL</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-200 transition-colors">Official Direct Email</h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30">
                      Primary
                    </span>
                  </div>
                  <p className="text-xs text-navy-mist">Direct hiring, briefs & contract inquiries</p>
                </div>
              </div>

              <div className="pt-3 border-t border-cyan-500/20 space-y-3 relative z-10">
                <div className="flex items-center justify-between bg-[#020e1c] p-2.5 rounded-xl border border-sky-500/20">
                  <span className="text-xs sm:text-sm font-semibold text-sky-300 truncate mr-2 select-all">
                    {targetEmail}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-lg bg-[#062238] hover:bg-[#0a3150] text-navy-mist hover:text-white text-xs flex items-center gap-1 transition-colors border border-sky-500/30 cursor-pointer"
                    title="Copy Email Address"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`mailto:${targetEmail}?subject=${encodeURIComponent('Project Inquiry & Hiring - Md Kawser Ahmad')}&body=${encodeURIComponent('Hello Md Kawser Ahmad,\n\nI visited your portfolio and would like to hire you for a project.')}`}
                    className="px-3 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-400 hover:to-cyan-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-sky-500/20 transition-all text-center"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send Email</span>
                  </a>

                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${targetEmail}&su=${encodeURIComponent('Project Inquiry & Hiring - Md Kawser Ahmad')}&body=${encodeURIComponent('Hello Md Kawser Ahmad,\n\nI visited your portfolio and would like to hire you for a project.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-xl bg-[#041d38] hover:bg-[#072a50] text-sky-300 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-sky-400/30 transition-all text-center"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open in Gmail</span>
                  </a>
                </div>
              </div>
            </div>

            {/* WhatsApp Quick Card */}
            <div
              onMouseEnter={() => setHoveredContact('whatsapp')}
              onMouseLeave={() => setHoveredContact(null)}
              onTouchStart={() => setHoveredContact('whatsapp')}
              className="relative group navy-glass-card rounded-2xl p-6 border border-emerald-500/30 hover:border-emerald-300 hover:shadow-[0_16px_50px_rgba(16,185,129,0.4)] hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              {/* Internal overflow-clipped laser light sweep */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_12px_#10b981]" />
                <div className="pointer-events-none absolute inset-0 -translate-x-[160%] group-hover:translate-x-[260%] transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-emerald-300/15 to-transparent skew-x-12 z-20" />
              </div>

              <div className="flex items-center gap-4 mb-4 relative z-10">
                {/* 
                  USER REQUESTED: WHATSAPP APP LAUNCHER & NOTIFICATION MOVEMENT
                */}
                <div className="relative flex-shrink-0">
                  {/* Vertical Emerald Energy Laser Trail beneath floating WhatsApp */}
                  <div
                    className={`pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-t from-emerald-400/80 via-teal-300 to-transparent transition-all duration-500 ease-out z-25 ${
                      hoveredContact === 'whatsapp' ? 'h-14 sm:h-16 opacity-100 -translate-y-8' : 'h-0 opacity-0'
                    }`}
                  />

                  {/* Floating Pill Banner when WhatsApp Flies Above Card */}
                  <div
                    className={`pointer-events-none absolute -top-20 sm:-top-22 left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-400 ease-out z-40 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/95 border border-emerald-400/80 shadow-[0_0_25px_rgba(16,185,129,0.8)] text-[10px] font-extrabold text-white ${
                      hoveredContact === 'whatsapp'
                        ? 'opacity-100 scale-100 -translate-y-1'
                        : 'opacity-0 scale-75 translate-y-3 pointer-events-none'
                    }`}
                  >
                    <MessageCircle className="w-3 h-3 text-emerald-300 animate-ping" />
                    <span>হোয়াটসঅ্যাপে নক দিন • Instant Chat Ready</span>
                  </div>

                  {/* The Flying WhatsApp Box */}
                  <div
                    className={`relative z-30 w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] bg-[#012616] border-emerald-400 ${
                      hoveredContact === 'whatsapp'
                        ? '-translate-y-12 sm:-translate-y-14 scale-125 sm:scale-130 shadow-[0_0_35px_rgba(16,185,129,0.85)] ring-2 ring-white/60'
                        : 'translate-y-0 scale-100 shadow-md'
                    }`}
                    title="Start WhatsApp Chat"
                  >
                    <MessageCircle
                      className={`w-6 h-6 transition-all duration-300 ${
                        hoveredContact === 'whatsapp'
                          ? 'text-emerald-100 animate-bounce stroke-[2.5] drop-shadow-[0_0_8px_#10b981]'
                          : 'text-emerald-400'
                      }`}
                    />
                  </div>

                  {/* Base Holographic Landing Pad */}
                  <div className="absolute inset-0 rounded-xl border border-emerald-500/25 bg-[#020d1c]/80 pointer-events-none z-10 flex items-center justify-center">
                    <span className="text-[9px] font-bold text-emerald-500/40 uppercase">CHAT</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-200 transition-colors">Direct WhatsApp</h3>
                  <p className="text-xs text-navy-mist">Fastest response for urgent projects & quotes</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-cyan-500/20 relative z-10">
                <span className="text-sm font-semibold text-emerald-300">{profile.whatsappNumber}</span>
                <a
                  href={`https://wa.me/${profile.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(profile.name)},%20I%20want%20to%20discuss%20a%20project.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/30 transition-all hover:scale-105"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Start Chat</span>
                </a>
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
            <div className="navy-glass-card rounded-3xl p-6 sm:p-8 border border-cyan-500/30 relative overflow-hidden">
              
              {/* Header inside form */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-navy-ice">Send a Direct Inquiry</h3>
                  <p className="text-xs text-navy-mist mt-0.5">
                    Connects directly to <span className="text-sky-300 font-semibold">{targetEmail}</span> or WhatsApp
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-[11px] font-semibold self-start sm:self-auto">
                  <Mail className="w-3 h-3 text-sky-400" />
                  <span>Email & WhatsApp Linked</span>
                </div>
              </div>

              {submitted ? (
                <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#041f38] to-[#021020] border border-sky-500/40 text-center space-y-4 animate-in fade-in shadow-xl">
                  <div className="w-14 h-14 rounded-2xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400 mx-auto shadow-[0_0_20px_rgba(56,189,248,0.4)]">
                    <CheckCircle className="w-8 h-8 text-sky-300" />
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-bold text-white">
                      {submittedMode === 'email' ? 'Inquiry Formatted for Email!' : 'Inquiry Sent to WhatsApp!'}
                    </h4>
                    <p className="text-xs text-slate-300 max-w-md mx-auto mt-1">
                      {submittedMode === 'email'
                        ? `Your inquiry is addressed to ${targetEmail}. Click below to open directly in Gmail or your default email client.`
                        : `Your WhatsApp chat has opened with your project inquiry details pre-filled.`}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleOpenGmailWeb}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-400 to-cyan-300 hover:from-sky-300 hover:to-cyan-200 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-sky-500/20 cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Open in Gmail Web</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSendViaEmail()}
                      className="px-4 py-2.5 rounded-xl bg-[#062442] hover:bg-[#09325c] text-sky-200 text-xs font-semibold border border-sky-500/30 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Mail className="w-4 h-4 text-sky-400" />
                      <span>Re-open Email App</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSendViaWhatsApp()}
                      className="px-4 py-2.5 rounded-xl bg-[#042d20] hover:bg-[#073d2c] text-emerald-300 text-xs font-semibold border border-emerald-500/30 flex items-center gap-1.5 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-400" />
                      <span>Also Send via WhatsApp</span>
                    </button>
                  </div>

                  <div className="pt-3 border-t border-cyan-500/20">
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="text-xs text-navy-mist hover:text-white underline cursor-pointer"
                    >
                      Edit details & send another inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-navy-mist mb-1.5">{t.contactNameLabel} *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={t.contactNamePlaceholder}
                        className="w-full px-4 py-3 rounded-xl bg-[#03111e] border border-cyan-500/20 text-navy-ice text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-navy-mist mb-1.5">{t.contactEmailLabel} *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={t.contactEmailPlaceholder}
                        className="w-full px-4 py-3 rounded-xl bg-[#03111e] border border-cyan-500/20 text-navy-ice text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-navy-mist mb-1.5">{t.contactServiceLabel} *</label>
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
                      <label className="block text-xs font-semibold text-navy-mist mb-1.5">{t.contactBudgetLabel} *</label>
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
                    <label className="block text-xs font-semibold text-navy-mist mb-1.5">{t.contactMessageLabel} *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t.contactMessagePlaceholder}
                      className="w-full px-4 py-3 rounded-xl bg-[#03111e] border border-cyan-500/20 text-navy-ice text-sm focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                    />
                  </div>

                  {/* Submission Action Buttons (Email + WhatsApp) */}
                  <div className="pt-2 space-y-2.5">
                    {/* Primary Button: Send via Email directly to user's address */}
                    <button
                      type="button"
                      onClick={(e) => handleSendViaEmail(e)}
                      disabled={!formData.name || !formData.email || !formData.message}
                      className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
                    >
                      <Mail className="w-4 h-4" />
                      <span>{t.contactSendEmailBtn} ({targetEmail})</span>
                    </button>

                    {/* Secondary Row: WhatsApp & Gmail Web */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={(e) => handleSendViaWhatsApp(e)}
                        disabled={!formData.name || !formData.email || !formData.message}
                        className="py-3 px-4 rounded-xl font-semibold text-xs text-emerald-300 hover:text-white bg-[#04281e]/80 hover:bg-[#073a2c] disabled:opacity-50 disabled:cursor-not-allowed border border-emerald-500/30 hover:border-emerald-400/50 flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4 text-emerald-400" />
                        <span>{t.contactSendWhatsAppBtn}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOpenGmailWeb()}
                        disabled={!formData.name || !formData.email || !formData.message}
                        className="py-3 px-4 rounded-xl font-semibold text-xs text-sky-300 hover:text-white bg-[#041f38]/80 hover:bg-[#072c50] disabled:opacity-50 disabled:cursor-not-allowed border border-sky-500/30 hover:border-sky-400/50 flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
                      >
                        <ExternalLink className="w-4 h-4 text-sky-400" />
                        <span>{t.contactSendGmailBtn}</span>
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
