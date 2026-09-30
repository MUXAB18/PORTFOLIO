"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Send, Mail, User, MessageSquare, Phone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("submitting");
    
    const formData = new FormData(e.currentTarget);
    
    // Replace this with your Web3Forms Access Key
    formData.append("access_key", "8f7af2cb-40d1-4386-906a-3b9c28dd8728");
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      
      const data = await response.json();
      
      if (data.success) {
        setFormState("success");
      } else {
        console.error("Form submission failed:", data);
        setFormState("idle");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormState("idle");
    }
  };

  return (
    <main className="min-h-screen bg-[#1A1D29] relative overflow-hidden flex flex-col justify-center pt-32 pb-12 px-6">
      {/* Background Effects */}
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none "></div>
      <div className="absolute top-0 right-0 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-teal/10 rounded-full blur-[100px] md:blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative z-10">
        
        {/* Left Side: Copy */}
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-teal transition-colors mb-8 md:mb-12 group text-xs md:text-sm font-sans font-bold tracking-widest uppercase">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>

            <h1 className="flex flex-col font-sans font-black text-7xl md:text-8xl lg:text-9xl text-white leading-[0.85] tracking-tighter mb-8 uppercase">
              <span>LET'S</span>
              <span className="text-teal">CONNECT.</span>
            </h1>
            <p className="font-sans text-base md:text-xl text-white/60 leading-relaxed max-w-md mb-12">
              Whether you have a specific project in mind, need technical advice, or just want to say hi — I'd love to hear from you.
            </p>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 text-white/80">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-teal">
                  <Mail size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-white/40 font-bold uppercase tracking-widest mb-1">Email</span>
                  <a href="mailto:musabiftikhar44@gmail.com" className="font-sans text-lg hover:text-teal transition-colors">musabiftikhar44@gmail.com</a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
          className="flex items-center"
        >
          <div className="w-full bg-[#1A1D29]/80 border border-white/5 backdrop-blur-3xl rounded-[2.5rem] p-6 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.3)] relative overflow-hidden">
            {/* Form Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
            
            {formState === "success" ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-16 relative z-10"
              >
                <div className="w-20 h-20 bg-teal/10 border border-teal/20 text-teal rounded-full flex items-center justify-center mb-6">
                  <Send size={32} className="ml-1" />
                </div>
                <h3 className="font-sans font-black text-3xl md:text-4xl text-white mb-4">Message Sent!</h3>
                <p className="text-white/60 mb-8 max-w-sm">Thanks for reaching out. I'll get back to you as soon as possible.</p>
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <button onClick={() => setFormState("idle")} className="px-8 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white font-bold text-sm tracking-widest uppercase transition-colors">
                    Send Another
                  </button>
                  <Link href="/" className="px-8 py-3 rounded-full bg-teal text-navy font-bold text-sm tracking-widest uppercase hover:scale-105 hover:shadow-[0_0_20px_rgba(94,201,168,0.3)] transition-all shadow-lg">
                    Back to Home
                  </Link>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/50 pl-1">Name</label>
                    <div className="relative group">
                      <User size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-teal transition-colors" />
                      <input name="name" required type="text" placeholder="John Doe" className="w-full bg-white/[0.03] border border-white/5 focus:border-teal/50 rounded-2xl py-4 pl-14 pr-4 text-white placeholder-white/20 outline-none transition-all focus:bg-white/[0.05] focus:shadow-[0_0_20px_rgba(94,201,168,0.1)]" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/50 pl-1">Email</label>
                    <div className="relative group">
                      <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-teal transition-colors" />
                      <input name="email" required type="email" placeholder="john@example.com" className="w-full bg-white/[0.03] border border-white/5 focus:border-teal/50 rounded-2xl py-4 pl-14 pr-4 text-white placeholder-white/20 outline-none transition-all focus:bg-white/[0.05] focus:shadow-[0_0_20px_rgba(94,201,168,0.1)]" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/50 pl-1">Phone <span className="text-white/30 font-normal lowercase tracking-normal">(optional)</span></label>
                  <div className="relative group">
                    <Phone size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-teal transition-colors" />
                    <input name="phone" type="tel" placeholder="+1 (555) 000-0000" className="w-full bg-white/[0.03] border border-white/5 focus:border-teal/50 rounded-2xl py-4 pl-14 pr-4 text-white placeholder-white/20 outline-none transition-all focus:bg-white/[0.05] focus:shadow-[0_0_20px_rgba(94,201,168,0.1)]" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/50 pl-1">Message</label>
                  <div className="relative group">
                    <MessageSquare size={18} className="absolute left-5 top-5 text-white/30 group-focus-within:text-teal transition-colors" />
                    <textarea name="message" required rows={5} placeholder="Tell me about your project..." className="w-full bg-white/[0.03] border border-white/5 focus:border-teal/50 rounded-2xl py-4 pl-14 pr-4 text-white placeholder-white/20 outline-none transition-all focus:bg-white/[0.05] focus:shadow-[0_0_20px_rgba(94,201,168,0.1)] resize-none"></textarea>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={formState === "submitting"}
                  className="mt-4 relative group overflow-hidden bg-teal text-navy font-sans font-bold text-sm tracking-widest uppercase rounded-full py-4 flex items-center justify-center gap-3 transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(94,201,168,0.2)] hover:shadow-[0_0_40px_rgba(94,201,168,0.4)] disabled:opacity-70 disabled:hover:scale-100"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {formState === "submitting" ? "SENDING..." : "SEND MESSAGE"}
                    <Send size={18} className={`transition-transform ${formState === "idle" ? "group-hover:translate-x-1 group-hover:-translate-y-1" : ""}`} />
                  </span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
