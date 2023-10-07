const fs = require("fs");
var db = require("../db");
try {
  const seedQuery = fs.readFileSync(`db/seeding.sql`, { encoding: `utf-8` });

  db.query(seedQuery, (err, res) => {
    if (err) {
      throw err;
    }
    console.log(`Seeding Complete`);
  });
} catch (error) {
  console.error(`Error: ${error.message}`);
}
