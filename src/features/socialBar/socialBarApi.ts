import { getEntireCollection } from "../../services/db/getData";
import type { Social } from "./socialBarTypes";

export const fetchSocials = async (): Promise<Social[]> => {
  const collectionName = "Socials";
  const docData = await getEntireCollection(collectionName);
  return docData || [];
};

