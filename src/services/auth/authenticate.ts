import { auth } from "../../app/configs/firebase";
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";

export async function authenticate(email: string, password: string): Promise<firebase.auth.UserCredential> {
  return await auth.signInWithEmailAndPassword(email, password);
}

export async function getAuthUID(): Promise<string> {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("User not found after authentication.");
  }

  return currentUser.uid;
}

export async function deauthenticate(): Promise<void> {
  return await auth.signOut();
}
