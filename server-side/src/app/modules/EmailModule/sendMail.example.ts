"use strict";

import nodemailer, { Transporter } from "nodemailer";

const transporter: Transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "",
        pass: ""
    },
    // tls: { rejectUnauthorized: false }  
});

transporter.verify(function(error, success) {
    if (error) {
          console.log(error);
    } else {
          console.log('Server is ready to take our messages');
    }
  });
  
export default transporter;
