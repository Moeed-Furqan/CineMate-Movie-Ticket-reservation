const { movieBookingModel } = require("../models/MovieBooking.Model");

const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const result = await movieBookingModel(req.body.id);
    console.log(result);
    console.log("db helper working great");
    const movie = {
      title: result[0].title,
      images: result[0].images,
      content: {
        director: result[0].director,
        category: result[0].category,
        length: result[0].length,
        rating: result[0].rating,
      },
      bookingDetails: [],
    };

    // Iterate through the result rows to organize booking details
    result.forEach((row) => {
      // Check if a new date entry is needed in the movie object
      const dateEntry = movie.bookingDetails.find(
        (entry) => entry.date === row.date
      );
      if (!dateEntry) {
        const newDateEntry = {
          date: row.date,
          day: row.day,
          times: [],
        };
        movie.bookingDetails.push(newDateEntry);
      }

      // Add the show details to the corresponding date entry
      const timeEntry = {
        time: row.time,
        dimension: row.dimension,
        isBooked: row.isbooked,
      };
      const dateIndex = movie.bookingDetails.findIndex(
        (entry) => entry.date === row.date
      );
      movie.bookingDetails[dateIndex].times.push(timeEntry);
    });
    console.log(movie.images);
    console.log(movie);
    res.send(movie);
    // Log the formatted movie object
    // console.log(movie);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

// router.post("/register", async (req, res) => {
//   try {
//     await createTables();
//     const admin = await findIfExists(req.body.email);
//     console.log(admin);
//     // const admin = await AdminModel.findOne({ email });
//     if (admin.length > 0) {
//       return res.send({
//         message: "Admin already exists",
//       });
//     }
//     const value = req.body;
//     // console.log(value);
//     //let value = new AdminModel(req.body);
//     // await value.save();
//     await addAdmin(value);
//     // const data = await AdminModel.findOne({ email });
//     const data = await findIfExists(req.body.email);

//     const email = data[0].email;
//     console.log(email);
//     return res.send({ email, message: "Registered" });
//   } catch (error) {
//     res.send({ message: "error" });
//   }
// });

// const {
//   AdminModel,
//   AdminCredModel,
//   findIfExists,
//   createTables,
//   addAdmin,
//   getAdminCredsFromEmail,
//   deleteAdmin,
//   findCred,
//   getCredFromEmail,
// } = require("../models/Admin.model");
// const { getDoctorCredFromEmail } = require("../models/Doctor.model");
// const { getPatientCredFromEmail } = require("../models/Nurse.model");
// require("dotenv").config();
// const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer");
// const { NurseModel } = require("../models/Nurse.model");
// const { DoctorModel } = require("../models/Doctor.model");
// const { PatientModel } = require("../models/Patient.model");

// router.get("/", async (req, res) => {
//   try {
//     //const admins = await AdminModel.find();
//     await createTables();
//     res.status(200).send("admin table exists or created");
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({ error: "Something went wrong" });
//   }
// });

// router.post("/login", async (req, res) => {
//   const { adminID, password } = req.body;
//   //console.log({ adminID, password });
//   try {
//     const admin = await findCred(adminID);
//     //const admin = await AdminModel.findOne({ adminID, password });
//     if (
//       admin.length > 0 &&
//       adminID == admin[0].id &&
//       password == admin[0].password
//     ) {
//       const token = jwt.sign({ foo: "bar" }, process.env.KEY, {
//         expiresIn: "24h",
//       });
//       res.send({
//         message: "Successful",
//         user: { ...admin[0], userType: "admin" },
//         token: token,
//       });
//     } else {
//       res.send({ message: "Wrong credentials" });
//     }
//   } catch (error) {
//     console.log({ message: "Error" });
//     console.log(error);
//   }
// });

// router.patch("/:adminId", async (req, res) => {
//   const id = req.params.adminId;
//   const payload = req.body;
//   try {
//     const admin = await AdminModel.findByIdAndUpdate({ _id: id }, payload);
//     if (!admin) {
//       res.status(404).send({ msg: Admin with id ${id} not found });
//     }
//     res.status(200).send(Admin with id ${id} updated);
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({ error: "Something went wrong, unable to Update." });
//   }
// });

// router.delete("/:adminId", async (req, res) => {
//   const id = req.params.adminId;
//   try {
//     const admin = await AdminModel.findByIdAndDelete({ _id: id });
//     if (!admin) {
//       res.status(404).send({ msg: Admin with id ${id} not found });
//     }
//     res.status(200).send(Admin with id ${id} deleted);
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({ error: "Something went wrong, unable to Delete." });
//   }
// });

// router.post("/verification", async (req, res) => {
//   //TODO
//   //const { email, userId, password } = req.body;
//   console.log(req.body);
//   // const creds = await getCreds(req.body.email);
//   // console.log(creds);
//   const verificationCode = Math.floor(1000 + Math.random() * 9000);
//   const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: process.env.SMTP_PORT,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: process.env.SMTP_MAIL, // generated ethereal user
//       pass: process.env.SMTP_PASSWORD, // generated ethereal password
//     },
//   });

//   var mailOptions = {
//     from: process.env.SMTP_MAIL,
//     to: req.body.email,
//     subject: "Verification Code",
//     text: Your verification code is: ${verificationCode} .,
//   };

//   transporter.sendMail(mailOptions, async (error, info) => {
//     if (error) {
//       console.log("error sending email", error);
//       return res.send({ message: "error" });
//     }
//     console.log(info.messageId);
//     res.status(200).send({ message: "successful", code: verificationCode });
//   });
// });

// router.post("/mailCreds", async (req, res) => {
//   try {
//     console.log(req.body);
//     const user = req.body;
//     const creds =
//       user.userType === "admin"
//         ? await getAdminCredsFromEmail(req.body.email)
//         : user.userType === "doctor"
//         ? await getDoctorCredFromEmail(req.body.email)
//         : await getPatientCredFromEmail(req.body.email);
//     console.log("creds", creds);
//     const transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST,
//       port: process.env.SMTP_PORT,
//       secure: false, // true for 465, false for other ports
//       auth: {
//         user: process.env.SMTP_MAIL, // generated user
//         pass: process.env.SMTP_PASSWORD, // generated password
//       },
//     });

//     var mailOptions = {
//       from: process.env.SMTP_MAIL,
//       to: user.email,
//       subject: "Account ID and Password",
//       text: Your login id is ${creds[0].id} and password is ${creds[0].password},
//     };

//     transporter.sendMail(mailOptions, async (error, info) => {
//       if (error) {
//         console.log(error); //await deleteAdmin(req.body.email);
//         return res.send({ message: "error" });
//       }
//       console.log(info.messageId);
//       return res.status(200).send({ message: "successful" });
//     });
//   } catch (error) {
//     res.send({ message: "error" });
//   }
// });

// router.post("/forgot", async (req, res) => {
//   const { email, type } = req.body;
//   let user;
//   let userId;
//   let password;

//   if (type == "nurse") {
//     user = await NurseModel.find({ email });
//     userId = user[0]?.nurseID;
//     password = user[0]?.password;
//   }
//   if (type == "patient") {
//     user = await PatientModel.find({ email });
//     userId = user[0]?.nurseID;
//     password = user[0]?.password;
//   }

//   if (type == "admin") {
//     user = await AdminModel.find({ email });
//     userId = user[0]?.adminID;
//     password = user[0]?.password;
//   }

//   if (type == "doctor") {
//     user = await DoctorModel.find({ email });
//     userId = user[0]?.docID;
//     password = user[0]?.password;
//   }

//   if (!user) {
//     return res.send({ message: "User not found" });
//   }

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "agrawaljoy1@gmail.com",
//       pass: "zxkyjqfuhiizmxrg",
//     },
//   });

//   const mailOptions = {
//     from: "agrawaljoy1@gmail.com",
//     to: email,
//     subject: "Account ID and Password",
//     text: This is your User Id : ${userId} and  Password : ${password} .,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       return res.send(error);
//     }
//     return res.send("Password reset email sent");
//   });
// });
