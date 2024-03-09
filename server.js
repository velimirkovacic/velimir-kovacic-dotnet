import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';


// Replace 'your_connection_string' with your actual MongoDB connection string
const mongoConnectionString =
  "mongodb+srv://fbuljan:dotget@dotget.0pfheso.mongodb.net/";

mongoose.connect(mongoConnectionString);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.once("open", function () {
  console.log("We're connected to the database!");
});

// Define Student schema
const studentSchema = new mongoose.Schema({
  email: String,
  name: String,
  surname: String,
  password: String, // Consider hashing passwords in production
  profilePictureUrl: String,
});

// Define Teacher schema
const teacherSchema = new mongoose.Schema({
  email: String,
  name: String,
  surname: String,
  password: String, // Consider hashing passwords in production
  profilePictureUrl: String,
  subjects: [String],
});

// Create models from the schemas
const Student = mongoose.model("Student", studentSchema);
const Teacher = mongoose.model("Teacher", teacherSchema);

const app = express();
app.use(cors());
app.use(bodyParser.json()); // for parsing application/json

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Student Registration
app.post("/register/student", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).send({ sucess: true, message: "Student registered successfully" });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Teacher Registration
app.post("/register/teacher", async (req, res) => {
  try {
    const teacher = new Teacher(req.body);
    await teacher.save();
    res.status(201).send({ sucess: true, message: "Teacher registered successfully" });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Student Login
app.post("/login/student", async (req, res) => {
  try {
    const student = await Student.findOne({
      email: req.body.email,
      password: req.body.password, // Not secure, use hashing in production
    });
    if (!student) {
      return res.status(401).send({ sucess: false, message: "Login failed" });
    }
    res.status(200).send({ sucess: true, message: "Login successful" });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Teacher Login
app.post("/login/teacher", async (req, res) => {
  try {
    const teacher = await Teacher.findOne({
      email: req.body.email,
      password: req.body.password, // Not secure, use hashing in production
    });
    if (!teacher) {
      return res.status(401).send({ sucess: false, message: "Login failed" });
    }
    res.status(200).send({ sucess: true, message: "Login successful" });
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});