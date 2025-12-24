import { getTrips, getActiveTrip } from './actions';
import { StartTripForm, StopTripForm } from './components/TripForms';
import TripList from './components/TripList';
import { Car } from 'lucide-react';

export default async function Home() {
  const activeTrip = await getActiveTrip();
  const trips = await getTrips();

  const lastTrip = trips.length > 0 ? trips[0] : null;
  const lastEndOdo = lastTrip?.endOdo;
  const totalClaim = trips.reduce((sum: number, trip: any) => sum + (trip.claimAmount || 0), 0);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-md mx-auto min-h-screen bg-white shadow-2xl shadow-gray-200/50 overflow-hidden flex flex-col">
        
        {/* Header Section */}
        <header className="bg-white p-6 pb-4 z-10 sticky top-0 border-b border-gray-50/50 backdrop-blur-md bg-white/80">
          <div className="flex justify-between items-center mb-1">
            <h1 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <Car className="w-5 h-5 text-white" />
              </div>
              AnyNet<span className="text-gray-400 font-normal">Log</span>
            </h1>
            <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-2xl text-sm font-bold shadow-sm border border-emerald-100">
              R {totalClaim.toFixed(2)}
            </div>
          </div>
          <p className="text-gray-400 text-xs ml-10">SARS Tax Year 2025/2026</p>
        </header>

        {/* Action Section */}
        <div className="p-6 pb-2">
          {activeTrip ? (
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 text-white shadow-xl shadow-gray-900/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
              
              <div className="flex items-center gap-3 mb-6">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="font-medium text-green-400 text-sm tracking-wide uppercase">Trip in Progress</span>
              </div>

              <div className="mb-6 space-y-1">
                <p className="text-gray-400 text-xs uppercase tracking-wider">Started From</p>
                <p className="text-lg font-medium">{activeTrip.from}</p>
                <p className="text-3xl font-bold font-mono mt-2">{activeTrip.startOdo} <span className="text-sm text-gray-500">km</span></p>
              </div>

              <StopTripForm trip={activeTrip} />
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-1">
              <h2 className="text-gray-900 font-bold mb-4 ml-1">New Trip</h2>
              <StartTripForm lastEndOdo={lastEndOdo} />
            </div>
          )}
        </div>

        {/* List Section */}
        <div className="flex-1 bg-gray-50/50 p-6 rounded-t-[40px] mt-4 border-t border-gray-100">
          <div className="flex justify-between items-center mb-6 px-2">
            <h3 className="text-gray-400 font-medium text-sm uppercase tracking-wider">Recent History</h3>
            <span className="text-xs text-gray-400 bg-white px-2 py-1 rounded-md border border-gray-100">
              {trips.length} Trips
            </span>
          </div>
          <TripList trips={trips} />
        </div>

      </div>
    </main>
  );
}