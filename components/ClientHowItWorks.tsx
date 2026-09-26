'use client';

import { motion } from "framer-motion";

export default function ClientHowItWorks() {
  return (
    <motion.section
      className="py-12 bg-background-dark/50"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold tracking-tighter text-text mb-10">
        How it works
      </h2>
      <div className="grid gap-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <motion.div
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: 20, opacity: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">01</span>
              </div>
              <h3 className="text-xl font-semibold text-text">Pick destination & budget</h3>
              <p className="text-center text-text-light max-w-md">
                Tell us where you want to go and your budget for the trip.
              </p>
            </div>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: 20, opacity: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">02</span>
              </div>
              <h3 className="text-xl font-semibold text-text">AI generates itinerary</h3>
              <p className="text-center text-text-light max-w-md">
                Get a complete day-by-day plan with attractions, restaurants, and activities tailored to your preferences.
              </p>
            </div>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: 20, opacity: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">03</span>
              </div>
              <h3 className="text-xl font-semibold text-text">Save and revisit</h3>
              <p className="text-center text-text-light max-w-md">
                Sign in with Google to save your trips and come back to them anytime.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}