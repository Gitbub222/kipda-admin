// lib/firestore.js
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase-config';

export async function getUsers() {
  const usersCol = collection(db, 'users');
  const userSnapshot = await getDocs(usersCol);
  const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return userList;
}

export const fetchNotifications = async () => {
  const notificationsRef = collection(db, 'notifications');
  const snapshot = await getDocs(notificationsRef);
  const notificationsData = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date?.toDate().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
      }) || '',
  }));
  return notificationsData;
};
