import { getTrips, getActiveTrip } from './actions';
import { StartTripForm, StopTripForm } from './components/TripForms';

export default async function Home() {
  const activeTrip = await getActiveTrip();
  const trips = await getTrips();

  // Find the last completed trip to get its End Odo for auto-fill
  const lastTrip = trips.length > 0 ? trips[0] : null;
  const lastEndOdo = lastTrip?.endOdo;

  const totalClaim = trips.reduce((sum: number, trip: any) => sum + (trip.claimAmount || 0), 0);

  return (
    <main className="max-w-md mx-auto p-4 bg-gray-50 min-h-screen">
      <header className="mb-6 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">AnyNet Travel Log</h1>
        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
          R {totalClaim.toFixed(2)}
        </div>
      </header>

      {/* --- ACTIVE TRIP SECTION --- */}
      <section className="bg-white p-6 rounded-xl shadow-sm mb-6 border border-gray-100">
        {activeTrip ? (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <h2 className="font-semibold text-gray-700">Trip in Progress</h2>
            </div>
            
            <div className="text-sm text-gray-500 mb-4">
              Started at: <span className="font-mono text-gray-800">{activeTrip.startOdo} km</span><br/>
              From: {activeTrip.from}
            </div>

            {/* Render Client Component for Stopping */}
            <StopTripForm trip={activeTrip} />
          </div>
        ) : (
          <div>
            <h2 className="font-semibold text-gray-700 mb-4">Start New Trip</h2>
            {/* Render Client Component for Starting */}
            <StartTripForm lastEndOdo={lastEndOdo} />
          </div>
        )}
      </section>

      {/* --- HISTORY SECTION --- */}
      <section>
        <h3 className="text-gray-500 font-medium text-sm mb-3">Recent History</h3>
        <div className="space-y-3">
          {trips.map((trip: any) => (
            <div key={trip._id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center">
              <div>
                <div className="font-semibold text-gray-800">{trip.reason}</div>
                <div className="text-xs text-gray-500">
                  {new Date(trip.date).toLocaleDateString()} • {trip.distance || 0} km
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {trip.from} ➝ {trip.to || '...'}
                </div>
              </div>
              <div className="text-right">
                {trip.status === 'COMPLETED' ? (
                  <span className="text-green-600 font-bold block">R {trip.claimAmount?.toFixed(2)}</span>
                ) : (
                  <span className="text-amber-500 text-xs font-bold px-2 py-1 bg-amber-50 rounded">ACTIVE</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}