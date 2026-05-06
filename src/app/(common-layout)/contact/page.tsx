"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Loader2, Sparkles } from "lucide-react";
// import { FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

import { toast } from "sonner";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      toast.info(
        "This is a demo. No actual message was sent. This Feature will be live in the next update!",
      );
      // toast.success("Message sent! Our team will reach out shortly.");
      setIsSubmitting(false);
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen py-24 relative overflow-hidden">
      {/* Background Decorative Blurs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Side: Info & Socials */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-6 w-6 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
                  <Sparkles size={14} />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-emerald-600">
                  Get in touch
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-slate-900 dark:text-white">
                Let's start a <br />{" "}
                <span className="text-slate-400 italic">Conversation.</span>
              </h1>
              <p className="mt-6 text-slate-500 font-medium max-w-md text-lg">
                Have a question about a project or want to partner with us?
                We're here to help you spark change.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: Mail,
                  label: "Email Us",
                  value: "support@ecospark.hub",
                  color: "text-blue-500",
                },
                {
                  icon: Phone,
                  label: "Call Us",
                  value: "+1 (555) 000-0000",
                  color: "text-emerald-500",
                },
                {
                  icon: MapPin,
                  label: "Visit Us",
                  value: "Green Innovation Hub, San Francisco",
                  color: "text-rose-500",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <div className="h-14 w-14 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <item.icon className={item.color} size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1">
                      {item.label}
                    </p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* <div className="pt-8">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
                Follow our journey
              </p>
              <div className="flex gap-4">
                {[FaLinkedin, FaTwitter, FaInstagram].map((Icon, i) => (
                  <button
                    key={i}
                    className="h-12 w-12 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:bg-emerald-500 transition-colors"
                  >
                    <Icon size={20} />
                  </button>
                ))}
              </div>
            </div> */}
          </motion.div>

          {/* Right Side: The Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-slate-200/50 dark:shadow-none relative"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="John Doe"
                    className="w-full h-14 px-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border-none focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="john@example.com"
                    className="w-full h-14 px-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border-none focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
                  Subject
                </label>
                <select className="w-full h-14 px-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border-none focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium appearance-none text-slate-500">
                  <option>General Inquiry</option>
                  <option>Partnership Proposal</option>
                  <option>Project Support</option>
                  <option>Feedback</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
                  Your Message
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can we help you?"
                  className="w-full p-6 rounded-3xl bg-slate-50 dark:bg-slate-950 border-none focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium resize-none"
                />
              </div>

              <button
                disabled={isSubmitting}
                className="w-full h-16 bg-slate-900 dark:bg-emerald-600 hover:bg-black dark:hover:bg-emerald-700 text-white rounded-2xl font-black text-lg transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70 cursor-pointer"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" />
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
    </div>
  );
}
