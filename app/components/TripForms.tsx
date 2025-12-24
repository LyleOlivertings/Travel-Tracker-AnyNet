'use client'

// 1. We switch to 'react' and use the new hook name
import { useActionState } from 'react'; 
import { startTrip, stopTrip } from '../actions';
import { motion } from 'framer-motion';
import { Play, Square, MapPin, Gauge } from 'lucide-react';

const initialState = {
  message: '',
  error: '',
};

export function StartTripForm({ lastEndOdo }: { lastEndOdo?: number }) {
  // 2. useActionState returns [state, action, isPending]
  const [state, formAction, isPending] = useActionState(startTrip, initialState);

  return (
    <motion.form 
      action={formAction} 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-4"
    >
      {state?.error && (
        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="text-red-600 font-medium text-sm bg-red-50 p-3 rounded-lg border border-red-200">
          ⚠️ {state.error}
        </motion.div>
      )}
      
      <div className="grid grid-cols-1 gap-4">
        {/* FROM INPUT */}
        <div className="relative">
          <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
          <input 
            name="from" 
            type="text" 
            defaultValue="Home (Cape Town)" 
            required 
            className="w-full pl-10 pr-4 py-4 rounded-xl border border-gray-300 bg-white text-gray-900 font-medium placeholder-gray-500 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all outline-none"
          />
        </div>

        {/* REASON INPUT */}
        <input 
          name="reason" 
          type="text" 
          placeholder="Purpose (e.g. Client Meeting)" 
          required 
          className="w-full px-4 py-4 rounded-xl border border-gray-300 bg-white text-gray-900 font-medium placeholder-gray-500 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all outline-none"
        />

        {/* ODOMETER INPUT */}
        <div className="relative">
          <Gauge className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
          <input 
            name="startOdo" 
            type="number" 
            defaultValue={lastEndOdo || ''}
            placeholder="Odometer Reading" 
            required 
            className="w-full pl-10 pr-4 py-4 rounded-xl border border-gray-300 bg-white text-gray-900 font-mono font-bold text-lg placeholder-gray-500 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all outline-none" 
          />
        </div>
      </div>

      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isPending}
        type="submit" 
        className="w-full bg-blue-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isPending ? 'Starting...' : (
          <>
            <Play className="w-5 h-5 fill-current" />
            Start Trip
          </>
        )}
      </motion.button>
    </motion.form>
  );
}

export function StopTripForm({ trip }: { trip: any }) {
  const stopTripWithId = stopTrip.bind(null, trip._id);
  const [state, formAction, isPending] = useActionState(stopTripWithId, initialState);

  return (
    <motion.form 
      action={formAction}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }} 
      className="space-y-4 mt-6 pt-6 border-t border-gray-700/30"
    >
      {state?.error && <p className="text-red-400 font-bold text-sm bg-red-900/30 p-2 rounded">{state.error}</p>}
      
      <div className="space-y-3">
        <label className="block text-gray-300 text-xs font-bold uppercase tracking-wider ml-1">Arrival</label>
        
        <input 
          name="to" 
          type="text" 
          placeholder="Where did you arrive?" 
          required 
          className="w-full px-4 py-4 rounded-xl border-0 bg-white/10 text-white font-medium placeholder-gray-400 focus:ring-2 focus:ring-green-400 focus:bg-white/20 transition-all outline-none backdrop-blur-sm"
        />
        
        <div className="relative">
          <Gauge className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
          <input 
            name="endOdo" 
            type="number" 
            placeholder="Final Odometer" 
            required 
            className="w-full pl-10 pr-4 py-4 rounded-xl border-0 bg-white/10 text-white font-mono font-bold text-lg placeholder-gray-400 focus:ring-2 focus:ring-green-400 focus:bg-white/20 transition-all outline-none backdrop-blur-sm" 
          />
        </div>
      </div>

      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isPending}
        type="submit" 
        className="w-full bg-white text-gray-900 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 shadow-lg"
      >
        {isPending ? 'Saving...' : (
          <>
            <Square className="w-5 h-5 fill-red-600 text-red-600" />
            Stop & Save Trip
          </>
        )}
      </motion.button>
    </motion.form>
  );
}