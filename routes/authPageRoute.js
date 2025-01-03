const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("auth/login", {
    title: "Login",
    pageStylesheet: "css/auth/login.css",
    pageScripts: [
      "/js/auth/login.js",
    ],
  });
});

router.get("/forgetPass", (req, res) => {
  res.render("auth/forgetPass", {
    title: "Forget Password",
    pageStylesheet: "css/auth/forgetPass.css",
    pageScripts: [
      "/js/auth/forgetPass.js",
    ],
  });
});

router.get("/resetPass", (req, res) => {
  res.render("auth/resetPass", {
    title: "Reset Password",
    pageStylesheet: "css/auth/resetPass.css",
    pageScripts: [
      "/js/auth/resetPass.js",
    ],
  });
});

// router.get("/profile", (req, res) => {
//   res.render("admin/profile", {
//     title: "Admin Profile",
//     pageScripts: [],
//     pageStylesheet: "css/admin/profile.css",
//   });
// })

module.exports = router;
