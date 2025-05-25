import { getDbInstance } from ".";

const db = await getDbInstance();

const DUMMY_PATIENTS = [
  {
    name: "Sarah Connor",
    age: 35,
    gender: "Female",
    diagnosis: "Fracture",
    admission_date: "2024-06-15",
  },
  {
    name: "David Banner",
    age: 50,
    gender: "Male",
    diagnosis: "High Blood Pressure",
    admission_date: "2024-06-18",
  },
  {
    name: "Nina Patel",
    age: 29,
    gender: "Female",
    diagnosis: "Migraine",
    admission_date: "2024-06-20",
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
       admission_date DATE NOT NULL
      );
    `);
    console.log("Patients table created or already exists.");
};

const validatePatient = (patient) => {
  if (
    !patient ||
    !patient.name ||
    !patient.age ||
    !patient.gender ||
    !patient.diagnosis ||
    !patient.admission_date
  ) {
    throw new Error("Invalid patient data");
  }
};

export const insertPatient = async (patient) => {
  validatePatient(patient);

  await db.query(
    `INSERT INTO patients (name, age, gender, diagnosis, admission_date)
         VALUES ($1, $2, $3, $4, $5)`,
    [
      patient.name,
      patient.age,
      patient.gender,
      patient.diagnosis,
      patient.admission_date,
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
}
