"use client";

import { useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function SyncManager() {
  useEffect(() => {
    let currentUser: any = null;

    const syncToCloud = async (favIds: string[]) => {
      if (!currentUser) return;
      try {
        const userRef = doc(db, 'users', currentUser.uid);
        await setDoc(userRef, { favorites: favIds }, { merge: true });
      } catch (error) {
        console.error("Error saving to cloud:", error);
      }
    };

    const handleLocalFavChange = () => {
      if (currentUser) {
        const localFavs = JSON.parse(localStorage.getItem('tlm_favorites') || '[]');
        syncToCloud(localFavs);
      }
    };

    window.addEventListener('tlm_favorites_changed', handleLocalFavChange);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      currentUser = user;
      if (user) {
        // User logged in, fetch cloud favs and merge
        try {
          const userRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(userRef);
          
          let cloudFavs: string[] = [];
          if (docSnap.exists()) {
            cloudFavs = docSnap.data().favorites || [];
          }

          const localFavs = JSON.parse(localStorage.getItem('tlm_favorites') || '[]');
          
          // Merge and deduplicate
          const mergedFavs = Array.from(new Set([...cloudFavs, ...localFavs]));
          
          if (mergedFavs.length > 0) {
            localStorage.setItem('tlm_favorites', JSON.stringify(mergedFavs));
            // Trigger UI update
            window.dispatchEvent(new Event('tlm_favorites_changed'));
            // Sync merged back to cloud
            await syncToCloud(mergedFavs);
          }
          
          // Also save user basic info
          await setDoc(userRef, {
            displayName: user.displayName || user.email?.split('@')[0],
            email: user.email,
            photoURL: user.photoURL,
            lastLogin: new Date().toISOString()
          }, { merge: true });

        } catch (error) {
          console.error("Error merging favorites:", error);
        }
      }
    });

    return () => {
      unsubscribe();
      window.removeEventListener('tlm_favorites_changed', handleLocalFavChange);
    };
  }, []);

  return null; // This is an invisible utility component
}
