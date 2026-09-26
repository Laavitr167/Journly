'use client';

import { useState, useEffect } from 'react';
import { Itinerary } from '@/types/itinerary';
import PaywallModal from '@/components/PaywallModal';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { motion } from "framer-motion";

const TripMap = dynamic(() => import('@/components/TripMap'), { ssr: false });

interface TripPageContentProps {
  itinerary: Itinerary;
}

export default function TripPageContent({ itinerary }: TripPageContentProps) {
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [paywallAction, setPaywallAction] = useState<'save' | 'pdf' | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [pendingSave, setPendingSave] = useState<Itinerary | null>(null);
  const { user, signInWithGoogle } = useAuth();

  const handleClosePaywall = () => {
    setIsPaywallOpen(false);
    setPaywallAction(null);
    setSaveError(null);
  };

  // Handle auth state changes to complete pending saves after sign-in
  useEffect(() => {
    if (user && pendingSave) {
      // User just signed in and there's a pending save, execute it
      const savePendingTrip = async () => {
        setIsSaving(true);
        setSaveError(null);

        try {
          // Save trip to Supabase
          const { error } = await supabase
            .from('trips')
            .insert({
              user_id: user.id,
              destination: pendingSave.destination,
              days: pendingSave.days.length,
              budget: 'mid', // Placeholder - should come from itinerary
              pace: 'relaxed', // Placeholder - should come from itinerary
              interests: [], // Placeholder - should come from itinerary
              itinerary_data: pendingSave,
            });

          if (error) {
            throw error;
          }

          // Save successful
          setIsSaving(false);
          setPendingSave(null);
          handleClosePaywall();
          alert('Trip saved successfully!');
        } catch (err: unknown) {
          setIsSaving(false);
          setSaveError(
            err instanceof Error ? err.message : 'Failed to save trip'
          );
          setPendingSave(null);
          console.error('Error saving trip:', err);
        }
      };

      savePendingTrip();
    }
  }, [user, pendingSave]);

  const handleOpenPaywall = (action: 'save' | 'pdf') => {
    setPaywallAction(action);
    setIsPaywallOpen(true);
  };

  const handlePaywallConfirm = async (): Promise<void> => {
    if (paywallAction === 'save') {
      if (!user) {
        // User is not logged in, save trip data temporarily and initiate sign-in
        setPendingSave(itinerary);
        await signInWithGoogle();
        // The actual save will happen in the useEffect above after sign-in completes
        return;
      }

      setIsSaving(true);
      setSaveError(null);

      try {
        // Save trip to Supabase
        const { error } = await supabase
          .from('trips')
          .insert({
            user_id: user.id,
            destination: itinerary.destination,
            days: itinerary.days.length,
            budget: 'mid', // Placeholder - should come from itinerary
            pace: 'relaxed', // Placeholder - should come from itinerary
            interests: [], // Placeholder - should come from itinerary
            itinerary_data: itinerary,
          });

        if (error) {
          throw error;
        }

        // Save successful
        setIsSaving(false);
        setPendingSave(null);
        handleClosePaywall();
        alert('Trip saved successfully!');
      } catch (err: unknown) {
        setIsSaving(false);
        setSaveError(
          err instanceof Error ? err.message : 'Failed to save trip'
        );
        console.error('Error saving trip:', err);
      }
    } else if (paywallAction === 'pdf') {
      // Generate and download PDF - lazy load jspdf
      const { generateTripPdf } = await import('@/lib/generateTripPdf');
      generateTripPdf(itinerary);
      handleClosePaywall();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-primary/50">
      <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <div className="flex justify-between items-start mb-6">
            <motion.h1
              className="text-4xl font-bold tracking-tighter text-text drop-shadow-md"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {itinerary.destination}
            </motion.h1>
            <Link href="/plan">
              <motion.button
                className="rounded-xl px-4 py-2 font-medium text-text border border-border/30 bg-background/50 hover:bg-primary/10 hover:border-primary/20 transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                ← Plan Another
              </motion.button>
            </Link>
          </div>

          <div className="space-y-6">
            {itinerary.days.map((day, index) => {
              // Extract activities that have place information
              const places = day.activities
                .filter(activity => activity.place)
                .map(activity => ({
                  place: activity.place!,
                  title: activity.title,
                  time: activity.time,
                }));

              return (
                <motion.div
                  key={day.day}
                  className="bg-white/80 bg-border/20 rounded-2xl p-6 backdrop-blur-sm border border-border/20"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.07 }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-semibold tracking-tighter text-text">
                      Day {day.day}: {day.theme}
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {day.activities.map((activity, actIndex) => (
                      <div key={`${activity.title}-${actIndex}`} className="flex space-x-4 py-3 border-t pt-2 first:border-t-0 first:pt-0">
                        <div className="flex-shrink-0">
                          {/* Icon based on activity type */}
                          {activity.type === 'sightseeing' && (
                            <span className="w-8 h-8 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
                              🏛️
                            </span>
                          )}
                          {activity.type === 'food' && (
                            <span className="w-8 h-8 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
                              🍽️
                            </span>
                          )}
                          {activity.type === 'activity' && (
                            <span className="w-8 h-8 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
                              🎯
                            </span>
                          )}
                        </div>
                        <div className="flex-1 space-y-1">
                          <h3 className="font-semibold text-text">{activity.title}</h3>
                          <p className="text-sm text-text-light">{activity.time}</p>
                          <p className="text-text-light/70">{activity.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Show map if we have places */}
                  {places.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-xl font-semibold text-text mb-4">
                        Map of Today&apos;s Stops
                      </h3>
                      <div className="rounded-2xl overflow-hidden border border-border/20">
                        <TripMap places={places} />
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="mt-8 flex flex-col sm:flex-row sm:space-x-4">
            <motion.button
              onClick={() => handleOpenPaywall('save')}
              disabled={isSaving}
              className={`flex-1 rounded-xl px-6 py-4 font-semibold text-white bg-primary hover:bg-primary-dark transition-all duration-300 transform hover:-translate-y-1 shadow-md border border-primary/50 backdrop-blur-sm ${
                isSaving ? 'opacity-50' : ''
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {isSaving ? 'Saving...' : 'Save this trip'}
            </motion.button>
            <motion.button
              onClick={() => handleOpenPaywall('pdf')}
              className="ml-4 sm:ml-0 flex-1 rounded-xl px-6 py-4 font-semibold text-white bg-primary hover:bg-primary-dark transition-all duration-300 transform hover:-translate-y-1 shadow-md border border-primary/50 backdrop-blur-sm"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Download PDF
            </motion.button>
          </div>

          {/* Save error message */}
          {saveError && (
            <div className="mt-6 rounded-xl px-6 py-4 bg-accent/10 border border-accent/20 text-accent-dark">
              {saveError}
            </div>
          )}
        </div>
      </div>

      {/* Paywall Modal */}
      {isPaywallOpen && (
        <PaywallModal
          isOpen={isPaywallOpen}
          onClose={handleClosePaywall}
          onConfirm={handlePaywallConfirm}
          isLoading={isSaving}
        />
      )}
    </div>
  );
}