import { Users, Target, Heart } from "lucide-react";

import { motion } from "framer-motion";
import { SlideRight } from "../utility/animation";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <main className="pt-24 px-4 max-w-5xl mx-auto text-center">
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
          Empowering individuals through quality education and accessible learning resources.
        </p>

        <motion.div
              variants={SlideRight(1.0)}
              initial="hidden"
              animate="visible"
              className="flex gap-8 justify-center md:justify-start !mt-8 items-center"
            >
              <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
          <div className="text-left space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Our Mission</h2>
            <p className="text-gray-600">
              We aim to provide high-quality educational experiences to help individuals 
              gain the skills they need to succeed in their careers.
            </p>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c" 
            alt="Education"
            className="rounded-lg shadow-md"
          />
        </div>
            </motion.div>


        

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: Users, title: "10K+ Students", description: "Growing community of learners." },
            { icon: Target, title: "200+ Courses", description: "Covering essential skills." },
            { icon: Heart, title: "95% Satisfaction", description: "Loved by our students." },
          ].map((stat, index) => (
            <div key={index} className="p-6 border rounded-lg shadow-sm text-center">
              <stat.icon className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold">{stat.title}</h3>
              <p className="text-gray-600">{stat.description}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {["Excellence", "Innovation", "Community"].map((value, index) => (
            <div key={index} className="p-6 border rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold">{value}</h3>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AboutUs;