import { PGliteWorker} from "@electric-sql/pglite/worker";
import { live } from "@electric-sql/pglite/live";
let db;

export async function getDbInstance() {
  if (!db) {
    db = await PGliteWorker.create(
      new Worker(new URL("./worker.js", import.meta.url), {
        type: "module",
      })
      ,
      {
        extensions:{
          live
        }
      }
    );
  }
  return db;
}
