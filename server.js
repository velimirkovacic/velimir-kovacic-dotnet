import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import cors from "cors";
import multer from "multer";

const upload = multer({ dest: 'uploads/' });

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
  email: { type: String, unique: true, required: true },
  name: String,
  surname: String,
  password: String, // Consider hashing passwords in production
  profilePictureUrl: String,
});

// Define Teacher schema
const teacherSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  name: String,
  surname: String,
  password: String, // Consider hashing passwords in production
  profilePictureUrl: String,
  subjects: [String],
});

const subjectSchema = new mongoose.Schema({
  title: { type: String, unique: true, required: true },
  url: { type: String, unique: true, required: true },
  description: String,
});

// Create models from the schemas
const Student = mongoose.model("Student", studentSchema);
const Teacher = mongoose.model("Teacher", teacherSchema);
const Subject = mongoose.model('Subject', subjectSchema);

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // for parsing application/json

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Student Registration
app.post("/register/student", upload.single('profilePicture'), async (req, res) => {
  try {
    // Check if student with the same email already exists
    const existingStudent = await Student.findOne({ email: req.body.email });
    if (existingStudent) {
      return res.status(409).send({ success: false, message: "Email is already registered" });
    }

    // If no existing student, proceed with registration
    const student = new Student(req.body);
    await student.save();
    return res.status(201).send({ success: true, message: "Student registered successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

// Teacher Registration
app.post("/register/professor", upload.single('profilePicture'), async (req, res) => {
  try {
    // Check if teacher with the same email already exists
    const existingTeacher = await Teacher.findOne({ email: req.body.email });
    if (existingTeacher) {
      return res.status(409).send({ success: false, message: "Email is already registered" });
    }

    // If no existing teacher, proceed with registration
    const teacher = new Teacher(req.body);
    await teacher.save();
    return res.status(201).send({ success: true, message: "Professor registered successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

const secretKey = "b08ebd58-5c18-439d-9003-097dcdf3ea06"

// Student Login
app.post("/login/student", async (req, res) => {
  try {
    const student = await Student.findOne({
      email: req.body.email,
      password: req.body.password, // Not secure, use hashing in production
    });
    if (!student) {
      return res.status(401).send({ success: false, message: "Login failed" });
    }

    const payload = { email: student.email };
    const token = jwt.sign(payload, secretKey);
    return res.status(200).send({ success: true, token, message: "Login successful", student: student});
  } catch (error) {
    console.log(error)
    return res.status(400).send(error);
  }
});

// Teacher Login
app.post("/login/professor", async (req, res) => {
  try {
    const teacher = await Teacher.findOne({
      email: req.body.email,
      password: req.body.password, // Not secure, use hashing in production
    });
    if (!teacher) {
      return res.status(401).send({ success: false, message: "Login failed" });
    }

    const payload = { email: teacher.email };
    const token = jwt.sign(payload, secretKey);
    return res.status(200).send({ success: true, token, message: "Login successful", professor: teacher });
  } catch (error) {
    console.log(error)
    return res.status(400).send(error);
  }
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];  // Bearer TOKEN_VALUE

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.get("/student/:email", authenticateToken, async (req, res) => {
  try {
    const email = req.params.email;
    const student = await Student.findOne({ email: email });
    if (!student) {
      return res.status(404).send({ success: false, message: "Student not found" });
    }
    return res.status(200).send({ success: true, student: student, message: "Student found"  });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

app.get("/students", authenticateToken, async (req, res) => {
  try {
    const students = await Student.find({});
    return res.status(200).send({ success: true, students: students });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

app.get("/professor/:email", authenticateToken, async (req, res) => {
  try {
    const email = req.params.email;
    const teacher = await Teacher.findOne({ email: email });
    if (!teacher) {
      return res.status(404).send({ success: false, message: "Professor not found" });
    }
    return res.status(200).send({ success: true, professor: teacher, message: "Professor found"  });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

app.get("/professors", authenticateToken, async (req, res) => {
  try {
    const teachers = await Teacher.find({});
    return res.status(200).send({ success: true, professors: teachers });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

app.post("/subject", authenticateToken, async (req, res) => {
  try {
    const existingSubject = await Subject.findOne({ url: req.body.url });
    if (existingSubject) {
      return res.status(409).send({ success: false, message: "Subject url already exists" });
    }

    const subject = new Subject(req.body);
    await subject.save();
    return res.status(201).send({ success: true, message: "Subject created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

app.get("/subject/:url", authenticateToken, async (req, res) => {
  try {
    const url = req.params.url;
    const subject = await Subject.findOne({ url: url });
    if (!subject) {
      return res.status(404).send({ success: false, message: "Subject not found" });
    }
    
    const teachers = await Teacher.find({ subjects: url })
    return res.status(200).send({ success: true, subject: subject, professors: teachers,
      message: "Subject and associated teachers found" });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

app.get("/subjects", authenticateToken, async (req, res) => {
  try {
    const subjects = await Subject.find({});
    return res.status(200).send({ success: true, subjects: subjects });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});