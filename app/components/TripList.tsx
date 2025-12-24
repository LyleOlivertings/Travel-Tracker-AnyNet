'use client'

import { motion } from 'framer-motion';
import { MapPin, Calendar, ArrowRight, CheckCircle, Navigation } from 'lucide-react';
import clsx from 'clsx';

export default function TripList({ trips }: { trips: any[] }) {
  return (
    <div className="space-y-4">
      {trips.map((trip: any, index: number) => (
        <motion.div
          key={trip._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className={clsx(
            "p-5 rounded-2xl border transition-all duration-200",
            trip.status === 'COMPLETED' 
              ? "bg-white border-gray-100 shadow-sm hover:shadow-md" 
              : "bg-amber-50 border-amber-100 shadow-md ring-1 ring-amber-200"
          )}
        >
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-900 font-semibold">
                <Navigation className="w-4 h-4 text-blue-500" />
                {trip.reason}
              </div>
              
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Calendar className="w-3 h-3" />
                {new Date(trip.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                <span className="text-gray-300">|</span>
                <span className="font-mono">{trip.distance ? `${trip.distance} km` : 'Driving...'}</span>
              </div>

              <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
                <span className="truncate max-w-[120px]">{trip.from}</span>
                <ArrowRight className="w-3 h-3 text-gray-300" />
                <span className="truncate max-w-[120px] text-gray-900 font-medium">
                  {trip.to || '...'}
                </span>
              </div>
            </div>

            <div className="text-right">
              {trip.status === 'COMPLETED' ? (
                <div className="flex flex-col items-end">
                  <span className="text-emerald-600 font-bold text-lg">R {trip.claimAmount?.toFixed(2)}</span>
                  <div className="flex items-center gap-1 text-[10px] text-emerald-600/70 bg-emerald-50 px-2 py-0.5 rounded-full mt-1">
                    <CheckCircle className="w-3 h-3" />
                    PAID
                  </div>
                </div>
              ) : (
                <span className="flex items-center gap-1.5 text-amber-600 text-xs font-bold bg-amber-100 px-3 py-1 rounded-full animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                  ACTIVE
                </span>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}