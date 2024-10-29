// services/customerService.ts
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface CustomerData {
  email: string;
  whatsapp: string;
  planId: string;
  planName: string;
  isAnnual: boolean;
  planPrice: string;
  setupFee: number;
  status: 'pending' | 'active' | 'cancelled';
}

export async function saveCustomerData(data: CustomerData) {
  try {
    const customersRef = collection(db, 'customers');
    const docRef = await addDoc(customersRef, {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving customer data:', error);
    throw error;
  }
}