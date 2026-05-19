import type { Booking } from "../types/MovieTypes";

const STORAGE_KEY = "cinebook_bookings";

const readBookings = (): Booking[] => {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as Booking[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const saveBookings = (bookings: Booking[]) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
};

export const ensureSeedBookings = (seed: Booking[]) => {
  const existing = readBookings();
  if (existing.length > 0) {
    return existing;
  }

  saveBookings(seed);
  return seed;
};

export const addBooking = (booking: Booking) => {
  const updated = [booking, ...readBookings()];
  saveBookings(updated);
  return updated;
};

export const markBookingPaid = (bookingId: string) => {
  const updated = readBookings().map((booking) =>
    booking._id === bookingId ? { ...booking, isPaid: true } : booking
  );
  saveBookings(updated);
  return updated;
};
