export default function PlanLoading() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="text-center space-y-4">
        <h2 className="text-xl font-bold text-indigo-600">Planning your trip...</h2>
        <p className="text-gray-600">
          Our AI is crafting a personalized itinerary just for you. This usually takes a few seconds.
        </p>
        <div className="flex items-center justify-center space-x-3">
          <div className="h-4 w-4 border-2 border-indigo-300 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm text-gray-500">Generating itinerary...</span>
        </div>
      </div>
    </div>
  );
}