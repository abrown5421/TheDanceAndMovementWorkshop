import { collection, onSnapshot, getFirestore } from "firebase/firestore";

export function listenToCollection(collectionName: string, callback: (data: any[]) => void) {
  const db = getFirestore();
  const colRef = collection(db, collectionName);

  const unsubscribe = onSnapshot(colRef, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(data);
  });

  return unsubscribe; }
