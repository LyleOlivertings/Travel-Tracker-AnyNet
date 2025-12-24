'use server'

import dbConnect from '@/lib/db';
import Trip from '@/models/Trip';
import { revalidatePath } from 'next/cache';

// Define the state type for TS
export type FormState = {
  message?: string;
  error?: string;
}

// Update signature: add (prevState: FormState, formData: FormData)
export async function startTrip(prevState: FormState, formData: FormData): Promise<FormState> {
  await dbConnect();

  const startOdo = formData.get('startOdo');
  const from = formData.get('from');
  const reason = formData.get('reason');

  if (!startOdo || !from || !reason) {
    return { error: "Missing required fields" };
  }

  try {
    await Trip.create({
      startOdo: Number(startOdo),
      from: from as string,
      reason: reason as string,
      status: 'IN_PROGRESS'
    });

    revalidatePath('/');
    return { message: "Trip started!" };
  } catch (e) {
    return { error: "Database error: Failed to start trip" };
  }
}

export async function stopTrip(tripId: string, prevState: FormState, formData: FormData): Promise<FormState> {
  await dbConnect();
  
  const endOdo = formData.get('endOdo');
  const to = formData.get('to');
  
  if (!endOdo || !to) {
    return { error: "Missing required fields" };
  }

  try {
    const trip = await Trip.findById(tripId);
    if (!trip) return { error: "Trip not found" };

    if (Number(endOdo) <= trip.startOdo) {
        return { error: "End Odometer must be higher than Start Odometer" };
    }

    trip.endOdo = Number(endOdo);
    
    // FIX: Add 'as string' here
    trip.to = to as string; 
    
    await trip.save();

    revalidatePath('/');
    return { message: "Trip stopped!" };
  } catch (e) {
    return { error: "Failed to stop trip" };
  }
}

// Data fetching stays the same (no prevState needed)
export async function getTrips() {
  await dbConnect();
  const trips = await Trip.find({}).sort({ date: -1 }).lean();
  return JSON.parse(JSON.stringify(trips));
}

export async function getActiveTrip() {
  await dbConnect();
  const trip = await Trip.findOne({ status: 'IN_PROGRESS' }).lean();
  return trip ? JSON.parse(JSON.stringify(trip)) : null;
}