import { auth } from "../../app/configs/firebase";
import firebase from "firebase/compat/app";

export async function authenticate(email: string, password: string): Promise<firebase.auth.UserCredential> {
  return await auth.signInWithEmailAndPassword(email, password);
}
