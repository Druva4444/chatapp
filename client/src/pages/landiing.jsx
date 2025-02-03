import React from 'react';
import { MessageSquare, Shield, Zap, Globe, ArrowRight, Users, Lock } from 'lucide-react';
import {useNavigate} from 'react-router-dom'
function Landing() {
  const Navigate = useNavigate()
  return (
    <div className=" w-screen min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-800">ChatFlow</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-600 hover:text-indigo-600">Features</a>
            <a href="#security" className="text-gray-600 hover:text-indigo-600">Security</a>
            <a href="#pricing" className="text-gray-600 hover:text-indigo-600">Pricing</a>
          </div>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors" onClick={()=>Navigate('/login')}>
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
          Connect and Chat <br />
          <span className="text-indigo-600">Without Limits</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Experience seamless communication with our modern chat platform. 
          Connect with anyone, anywhere, anytime.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-indigo-600 text-white px-8 py-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2" onClick={()=>Navigate('/login')}>
            <span>Start Chatting Now</span>
            <ArrowRight className="h-5 w-5" />
          </button>
          
        </div>
        <div className="mt-16">
          <img 
            src="https://images.unsplash.com/photo-1600142152539-782c41a41d31?auto=format&fit=crop&w=1200&q=80" 
            alt="Chat App Interface" 
            className="rounded-xl shadow-2xl mx-auto"
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Everything you need in a modern chat app
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <FeatureCard 
              icon={<Globe className="h-8 w-8 text-indigo-600" />}
              title="Global Reach"
              description="Connect with users from anywhere in the world with real-time translation."
            />
            <FeatureCard 
              icon={<Zap className="h-8 w-8 text-indigo-600" />}
              title="Lightning Fast"
              description="Experience instant messaging with our optimized infrastructure."
            />
            <FeatureCard 
              icon={<Shield className="h-8 w-8 text-indigo-600" />}
              title="Secure by Default"
              description="End-to-end encryption ensures your conversations stay private."
            />
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="bg-indigo-50 py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-16">
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-indigo-600">10M+</span>
              <span className="text-gray-600">Active Users</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-indigo-600">150+</span>
              <span className="text-gray-600">Countries</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-indigo-600">99.9%</span>
              <span className="text-gray-600">Uptime</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-indigo-600 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to start chatting?
          </h2>
          <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join millions of users who trust ChatFlow for their communication needs.
            Start for free, no credit card required.
          </p>
          <button className="bg-white text-indigo-600 px-8 py-4 rounded-lg hover:bg-indigo-50 transition-colors">
            Get Started for Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-6 w-6 text-indigo-600" />
              <span className="text-lg font-bold text-gray-800">ChatFlow</span>
            </div>
            <div className="text-gray-500">
              © 2024 ChatFlow. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default Landing;