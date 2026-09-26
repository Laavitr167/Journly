'use client';

import { motion } from "framer-motion";

export default function ClientFeatures() {
  return (
    <motion.section
      className="py-12"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold tracking-tighter text-text mb-10">
        Features
      </h2>
      <div className="grid gap-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <motion.div
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: 20, opacity: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white/80 bg-border/20 rounded-2xl p-6 flex flex-col items-center space-y-4 backdrop-blur-sm border border-border/20">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-2">
                <span className="text-xl font-bold text-primary">🗺️</span>
              </div>
              <h3 className="text-lg font-semibold text-text">AI-generated itineraries</h3>
              <p className="text-center text-text-light max-w-sm">
                Get personalized trip plans for any destination based on your budget and interests.
              </p>
            </div>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: 20, opacity: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-white/80 bg-border/20 rounded-2xl p-6 flex flex-col items-center space-y-4 backdrop-blur-sm border border-border/20">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-2">
                <span className="text-xl font-bold text-primary">📅</span>
              </div>
              <h3 className="text-lg font-semibold text-text">Day-by-day schedule</h3>
              <p className="text-center text-text-light max-w-sm">
                Detailed daily plans with timing, locations, and activities for each day of your trip.
              </p>
            </div>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: 20, opacity: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white/80 bg-border/20 rounded-2xl p-6 flex flex-col items-center space-y-4 backdrop-blur-sm border border-border/20">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-2">
                <span className="text-xl font-bold text-primary">📍</span>
              </div>
              <h3 className="text-lg font-semibold text-text">Interactive maps</h3>
              <p className="text-center text-text-light max-w-sm">
                Visualize your entire itinerary on an interactive map powered by OpenStreetMap.
              </p>
            </div>
          </motion.div>

          {/* Feature 4 */}
          <motion.div
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: 20, opacity: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-white/80 bg-border/20 rounded-2xl p-6 flex flex-col items-center space-y-4 backdrop-blur-sm border border-border/20">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-2">
                <span className="text-xl font-bold text-primary">💾</span>
              </div>
              <h3 className="text-lg font-semibold text-text">Save trips</h3>
              <p className="text-center text-text-light max-w-sm">
                Save your favorite trips to your account and access them anytime, anywhere.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}