// lib/firestore.js
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from './firebase-config';

export const getUserRole = async (uid: string): Promise<string | null> => {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists() && userSnap.data().role) {
    return userSnap.data().role as string;
  } else {
    return null;
  }
};

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
