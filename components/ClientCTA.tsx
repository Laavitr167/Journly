'use client';

import Link from 'next/link';
import { motion } from "framer-motion";

export default function ClientCTA() {
  return (
    <motion.section
      className="py-12 bg-primary/5"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold tracking-tighter text-text mb-6">
        Ready to plan your next adventure?
      </h2>
      <p className="text-lg text-text-light mb-8 max-w-md">
        Join thousands of travelers who use Journly to create unforgettable trip experiences.
      </p>
      <div className="mx-auto max-w-md">
        <Link href="/plan">
          <motion.button
            className="w-full px-8 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-xl
                    transition-all duration-300 transform hover:-translate-y-1 shadow-md
                    border border-primary/50 backdrop-blur-sm"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Start planning
          </motion.button>
        </Link>
      </div>
    </motion.section>
  );
}