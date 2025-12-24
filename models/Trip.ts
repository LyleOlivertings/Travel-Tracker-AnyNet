// models/Trip.ts
import mongoose, { Schema, Document, Model, CallbackError } from 'mongoose';

export interface ITrip extends Document {
  date: Date;
  from: string;
  to?: string;
  reason: string;
  startOdo: number;
  endOdo?: number;
  distance?: number;
  claimAmount?: number; // Calculated field
  status: 'IN_PROGRESS' | 'COMPLETED';
}

const TripSchema: Schema = new Schema({
  date: { type: Date, default: Date.now },
  from: { type: String, required: true },
  to: { type: String }, // Optional until trip ends
  reason: { type: String, required: true },
  startOdo: { type: Number, required: true },
  endOdo: { type: Number },
  distance: { type: Number },
  claimAmount: { type: Number },
  status: { type: String, enum: ['IN_PROGRESS', 'COMPLETED'], default: 'IN_PROGRESS' },
});

// Helper to calculate claim before saving
TripSchema.pre('save', function(next: any) {
  const trip = this as unknown as ITrip;

  if (trip.endOdo && trip.startOdo) {
    trip.distance = trip.endOdo - trip.startOdo;
    
    // SARS 2025 Guideline Rate: R4.76
    trip.claimAmount = parseFloat((trip.distance * 4.76).toFixed(2));
    trip.status = 'COMPLETED';
  }
  
  next(); // TypeScript will now allow this because 'any' can be called
});

const Trip: Model<ITrip> = mongoose.models.Trip || mongoose.model<ITrip>('Trip', TripSchema);
export default Trip;