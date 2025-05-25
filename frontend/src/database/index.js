import { PGlite } from '@electric-sql/pglite';

let db;

export async function getDbInstance() {
  if (!db) {
    db = await PGlite.create("idb://hospital_db");
  }
  return db; 
}

