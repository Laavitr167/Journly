'use client';

import { useState, useEffect } from 'react';
import { Itinerary } from '@/types/itinerary';
import PaywallModal from '@/components/PaywallModal';
import { generateTripPdf } from '@/lib/generateTripPdf';
import dynamic from 'next/dynamic';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

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
  const { user, signInWithGoogle, signOut } = useAuth();
  const router = useRouter();

  // Handle auth state changes to complete pending saves after sign-in
  useEffect(() => {
    if (user && pendingSave) {
      // User just signed in and there's a pending save, execute it
      const savePendingTrip = async () => {
        setIsSaving(true);
        setSaveError(null);

        try {
          // Save trip to Supabase
          const { data, error } = await supabase
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
        } catch (err: any) {
          setIsSaving(false);
          setSaveError(err.message || 'Failed to save trip');
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

  const handleClosePaywall = () => {
    setIsPaywallOpen(false);
    setPaywallAction(null);
    setSaveError(null);
  };

  const handlePaywallConfirm = async () => {
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
        const { data, error } = await supabase
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
        handleClosePaywall();
        alert('Trip saved successfully!');
      } catch (err: any) {
        setIsSaving(false);
        setSaveError(err.message || 'Failed to save trip');
        console.error('Error saving trip:', err);
      }
    } else if (paywallAction === 'pdf') {
      // Generate and download PDF
      generateTripPdf(itinerary);
      handleClosePaywall();
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-2xl font-bold">{itinerary.destination}</h1>
          <a
            href="/plan"
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            ← Plan Another
          </a>
        </div>

        <div className="space-y-8">
          {itinerary.days.map((day) => {
            // Extract activities that have place information
            const places = day.activities
              .filter(activity => activity.place)
              .map(activity => ({
                place: activity.place!,
                title: activity.title,
                time: activity.time,
              }));

            return (
              <div key={day.day} className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold">
                    Day {day.day}: {day.theme}
                  </h2>
                </div>

                <div className="space-y-3">
                  {day.activities.map((activity) => (
                    <div key={activity.title} className="flex space-x-3 py-2 border-t pt-2 first:border-t-0 first:pt-0">
                      <div className="flex-shrink-0">
                        {/* Icon based on activity type */}
                        {activity.type === 'sightseeing' && (
                          <span className="text-blue-600 dark:text-blue-400">🏛️</span>
                        )}
                        {activity.type === 'food' && (
                          <span className="text-green-600 dark:text-green-400">🍽️</span>
                        )}
                        {activity.type === 'activity' && (
                          <span className="text-purple-600 dark:text-purple-400">🎯</span>
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">{activity.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {activity.time}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                          {activity.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Show map if we have places */}
                {places.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Map of Today's Stops</h3>
                    <TripMap places={places} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action buttons */}
        <div className="mt-6 flex flex-col sm:flex-row sm:space-x-3">
          <button
            onClick={() => handleOpenPaywall('save')}
            disabled={isSaving}
            className={`w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center ${
              isSaving ? 'opacity-50' : ''
            }`}
          >
            {isSaving ? 'Saving...' : 'Save this trip'}
          </button>
          <button
            onClick={() => handleOpenPaywall('pdf')}
            className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center justify-center"
          >
            Download PDF
          </button>
        </div>

        {/* Save error message */}
        {saveError && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-md">
            {saveError}
          </div>
        )}
      </div>

      {/* Paywall Modal */}
      <PaywallModal
        isOpen={isPaywallOpen}
        onClose={handleClosePaywall}
        action={paywallAction}
        onConfirm={handlePaywallConfirm}
        isLoading={isSaving}
      />
    </div>
  );
}