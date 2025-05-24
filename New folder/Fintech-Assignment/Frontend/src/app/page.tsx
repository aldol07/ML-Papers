"use client";

import Link from "next/link";
import { FaRobot, FaChartLine, FaShieldAlt, FaArrowRight } from "react-icons/fa";
import { AnimatedSection } from "./components/AnimatedSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Hero Section */}
        <AnimatedSection className="text-center max-w-4xl mx-auto mb-24" animation="fade">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 leading-tight">
            Welcome to Financial Multiverse
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Your gateway to personalized financial insights and AI-powered analysis
          </p>
        </AnimatedSection>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Link href="/persona" className="block group">
            <AnimatedSection delay={0.2} animation="slide">
              <div className="bg-white/5 backdrop-blur-lg p-8 rounded-xl border border-white/10 hover:bg-white/10 transition-all h-full">
                <div className="text-4xl mb-6 bg-gradient-to-r from-white to-gray-400 w-16 h-16 rounded-full flex items-center justify-center">
                  <FaRobot className="text-black" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Personalized Financial Models</h3>
                <p className="text-gray-400 mb-6 text-lg">
                  Discover your financial persona and get tailored investment strategies based on your unique style.
                </p>
                <div className="flex items-center text-gray-400 group-hover:text-white">
                  <span className="mr-2">Explore Models</span>
                  <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </AnimatedSection>
          </Link>

          <Link href="/tools" className="block group">
            <AnimatedSection delay={0.4} animation="slide">
              <div className="bg-white/5 backdrop-blur-lg p-8 rounded-xl border border-white/10 hover:bg-white/10 transition-all h-full">
                <div className="text-4xl mb-6 bg-gradient-to-r from-white to-gray-400 w-16 h-16 rounded-full flex items-center justify-center">
                  <FaChartLine className="text-black" />
                </div>
                <h3 className="text-2xl font-bold mb-4">AI-powered Tracking Tools</h3>
                <p className="text-gray-400 mb-6 text-lg">
                  Advanced tools for market analysis, SEC filing parsing, and real-time financial insights.
                </p>
                <div className="flex items-center text-gray-400 group-hover:text-white">
                  <span className="mr-2">Explore Tools</span>
                  <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </AnimatedSection>
          </Link>

          <div className="bg-white/5 backdrop-blur-lg p-8 rounded-xl border border-white/10 h-full opacity-50">
            <AnimatedSection delay={0.6} animation="slide">
              <div className="text-4xl mb-6 bg-gradient-to-r from-white to-gray-400 w-16 h-16 rounded-full flex items-center justify-center">
                <FaShieldAlt className="text-black" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Regulations & Compliance</h3>
              <p className="text-gray-400 mb-6 text-lg">
                Automated compliance verification and regulatory reporting assistance for your investments.
              </p>
              <div className="text-gray-400">
                Coming Soon
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </main>
  );
}
