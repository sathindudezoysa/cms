import { collection, getDocs, query, orderBy, limit as firestoreLimit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Post, Category } from '@/lib/types';
import { doc, getDoc } from 'firebase/firestore';

// Helper to fetch posts with optional limit
export async function getPosts(category: Category, limitCount?: number) {
  try {
    const collectionRef = collection(db, category);
    
    // Build query: Sort by newest first
    let q = query(collectionRef, orderBy('createdAt', 'desc'));
    
    // Apply limit if requested (e.g., for Home page)
    if (limitCount) {
      q = query(collectionRef, orderBy('createdAt', 'desc'), firestoreLimit(limitCount));
    }

    const snapshot = await getDocs(q);
    
    // Map and formatting
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      // Convert Firestore Timestamp to number/string for Next.js to be happy
      createdAt: doc.data().createdAt || Date.now()
    })) as Post[];
    
  } catch (error) {
    console.error(`Error fetching ${category}:`, error);
    return [];
  }

  
}
export async function getPostById(category: Category, id: string) {
  try {
    const docRef = doc(db, category, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt || Date.now()
      } as Post;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching doc:", error);
    return null;
  }
}