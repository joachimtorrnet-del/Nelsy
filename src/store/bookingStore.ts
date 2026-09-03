import { create } from 'zustand';
import type { Service } from '../types';

interface BookingStore {
  isOpen: boolean;
  selectedService: Service | null;
  step: number;
  selectedDate: string | null;
  selectedTime: string | null;
  clientName: string;
  clientEmail: string;
  clientPhone: string;

  openModal: (service: Service) => void;
  // Pre-populates date + time and opens at step 3 (client info) — used by inline booking flow
  openWithDateTime: (service: Service, date: string, time: string) => void;
  closeModal: () => void;
  setStep: (step: number) => void;
  setSelectedDate: (date: string) => void;
  setSelectedTime: (time: string) => void;
  setClientInfo: (name: string, email: string, phone: string) => void;
  reset: () => void;
}

const initialState = {
  isOpen: false,
  selectedService: null,
  step: 1,
  selectedDate: null,
  selectedTime: null,
  clientName: '',
  clientEmail: '',
  clientPhone: '',
};

export const useBookingStore = create<BookingStore>((set) => ({
  ...initialState,

  openModal: (service) =>
    set({ isOpen: true, selectedService: service, step: 1, selectedDate: null, selectedTime: null }),

  openWithDateTime: (service, date, time) =>
    set({ isOpen: true, selectedService: service, step: 3, selectedDate: date, selectedTime: time }),

  closeModal: () =>
    set({ isOpen: false }),

  setStep: (step) => set({ step }),

  setSelectedDate: (date) => set({ selectedDate: date }),

  setSelectedTime: (time) => set({ selectedTime: time }),

  setClientInfo: (clientName, clientEmail, clientPhone) =>
    set({ clientName, clientEmail, clientPhone }),

  reset: () => set(initialState),
}));
