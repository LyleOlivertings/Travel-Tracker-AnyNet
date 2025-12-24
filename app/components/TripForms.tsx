'use client'

import { useFormState } from 'react-dom'; // or 'react' if on React 19 canary
import { startTrip, stopTrip } from '../actions';
// If using specific UI components (like a submit button with loading state) import here

const initialState = {
  message: '',
  error: '',
};

export function StartTripForm({ lastEndOdo }: { lastEndOdo?: number }) {
  const [state, formAction] = useFormState(startTrip, initialState);

  return (
    <form action={formAction} className="space-y-4">
      {state.error && <p className="text-red-500 text-sm bg-red-50 p-2 rounded">{state.error}</p>}
      
      <div>
        <label className="block text-sm font-medium text-gray-700">From</label>
        <input name="from" type="text" defaultValue="Home (Cape Town)" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Reason</label>
        <input name="reason" type="text" placeholder="e.g. Client Meeting" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Start Odometer</label>
        {/* Helper: Auto-fill the last known odometer reading */}
        <input 
          name="startOdo" 
          type="number" 
          defaultValue={lastEndOdo || ''}
          placeholder="Current Odo reading" 
          required 
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" 
        />
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition">
        Start Trip
      </button>
    </form>
  );
}

export function StopTripForm({ trip }: { trip: any }) {
  // We bind the ID so the action knows which trip to stop
  const stopTripWithId = stopTrip.bind(null, trip._id);
  const [state, formAction] = useFormState(stopTripWithId, initialState);

  return (
    <form action={formAction} className="space-y-4">
      {state.error && <p className="text-red-500 text-sm bg-red-50 p-2 rounded">{state.error}</p>}
      
      <div>
        <label className="block text-sm font-medium text-gray-700">End Location</label>
        <input name="to" type="text" placeholder="e.g. Client Office" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">End Odometer</label>
        <input name="endOdo" type="number" placeholder="e.g. 45050" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
      </div>
      <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition">
        Stop Trip
      </button>
    </form>
  );
}