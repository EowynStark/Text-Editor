import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

  const dbpromise = initdb();

// method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const db = await dbpromise;
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  await store.put(content);
  await tx.done;
};

// method that gets all the content from the database
export const getDb = async () => {
  const db = await dbpromise;
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  await tx.done;
  return store.getAll();
};

