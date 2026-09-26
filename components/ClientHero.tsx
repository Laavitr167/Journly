'use client';

import Link from 'next/link';
import { motion } from "framer-motion";

export default function ClientHero() {
  return (
    <motion.section
      className="flex-1 flex-col items-center justify-center px-6 py-12 text-center"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto max-w-2xl">
        <motion.h1
          className="text-5xl font-bold tracking-tighter text-text mb-6 drop-shadow-md"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Journly
        </motion.h1>
        <motion.p
          className="text-xl font-light text-text-light mb-8"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Your AI-powered travel journal companion<br />
          Create unforgettable journeys with personalized itineraries
        </motion.p>
        <Link href="/plan">
          <motion.button
            className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-xl
                    transition-all duration-300 transform hover:-translate-y-1 shadow-md
                    border border-primary/50 backdrop-blur-sm"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Plan your trip
          </motion.button>
        </Link>
      </div>
    </motion.section>
  );
}