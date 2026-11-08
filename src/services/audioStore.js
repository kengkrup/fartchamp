// IndexedDB persistence for audio blobs.
// localStorage stores metadata only; blobs live here so uploads survive refresh.

const DB_NAME = 'fartchamp_audio';
const STORE = 'blobs';

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      req.result.createObjectStore(STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export function saveAudioBlob(id, blob) {
  return openDB().then(
    (db) =>
      new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, 'readwrite');
        tx.objectStore(STORE).put(blob, id);
        tx.oncomplete = () => {
          db.close();
          resolve();
        };
        tx.onerror = () => reject(tx.error);
      }),
  );
}

export function loadAudioBlob(id) {
  return openDB().then(
    (db) =>
      new Promise((resolve, reject) => {
        const req = db.transaction(STORE).objectStore(STORE).get(id);
        req.onsuccess = () => {
          db.close();
          resolve(req.result || null);
        };
        req.onerror = () => reject(req.error);
      }),
  );
}
