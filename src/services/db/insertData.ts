import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../app/configs/firebase';

export async function insertDataIntoCollection(collectionName: string, data: Record<string, any>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log(`Document written with ID: ${docRef.id}`);
    return docRef.id;
  } catch (error) {
    console.error('Error adding document: ', error);
    throw error;
  }
}

export async function updateDataInCollection(
  collectionName: string,
  docId: string,
  updatedFields: Record<string, any>
): Promise<void> {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, updatedFields);
    console.log(`Document with ID ${docId} updated successfully.`);
  } catch (error) {
    console.error(`Error updating document with ID ${docId}:`, error);
    throw error;
  }
}