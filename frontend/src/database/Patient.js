import { getDbInstance } from ".";

const db = await getDbInstance();

const DUMMY_PATIENTS = [
  {
    name: "Sarah Connor",
    age: 35,
    gender: "Female",
    diagnosis: "Fracture",
    address: "123 Main St, Los Angeles, CA",
  },
  {
    name: "David Banner",
    age: 50,
    gender: "Male",
    diagnosis: "High Blood Pressure",
    address: "456 Elm St, New York, NY",
  },
  {
    name: "Nina Patel",
    age: 29,
    gender: "Female",
    diagnosis: "Migraine",
    address: "789 Oak St, Chicago, IL",
  },
];

export const createTable = async () => {
    console.log("Creating patients table if it doesn't exist...");
  await db.exec(`
      CREATE TABLE IF NOT EXISTS patients (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        age INTEGER NOT NULL,
        gender TEXT CHECK(gender IN ('Male', 'Female', 'Other')) NOT NULL,
        diagnosis TEXT,
        address TEXT
      );
    `);
    console.log("Patients table created successfully.");
};

const validatePatient = (patient) => {
  if (
    !patient ||
    !patient.name ||
    !patient.age ||
    !patient.gender ||
    !patient.diagnosis ||
    !patient.address
  ) {
    throw new Error("Invalid patient data");
  }
};

export const insertPatient = async (patient) => {
  validatePatient(patient);

  await db.query(
    `INSERT INTO patients (name, age, gender, diagnosis, address)
         VALUES ($1, $2, $3, $4, $5)`,
    [
      patient.name,
      patient.age,
      patient.gender,
      patient.diagnosis,
      patient.address,
    ]
  );
};

export const insertDummyPatients = async () => {
  for (const patient of DUMMY_PATIENTS) {
    await insertPatient(patient);
  }
};

export const getPatients = async () => {
  const result = await db.query("SELECT * FROM patients");
  return result.rows;
};
