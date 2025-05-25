import { PGlite } from "@electric-sql/pglite";
import { worker } from "@electric-sql/pglite/worker";
import { vector } from '@electric-sql/pglite/vector';

worker({
  async init() {
    // Create and return a PGlite instance
    const pg = new PGlite({
      dataDir: "idb://hospital_db",
      extensions: {
        vector,
      },
    });
    return pg;
  },
});
