const z = require("zod");

const signupSchema = z.object({
  username: z
    .string({ required_error: "Username Is Require" })
    .trim()
    .min(3, { message: "Username must be Atleast 3 chatecter long " }),
  email: z
    .string({ required_error: "Email Is Require" })
    .trim()
    .email({ message: "Invalid Email" }),
  phone: z
    .string({ required_error: "Phoen no is  Requird" })
    .trim()
    .min(10, { message: "write At Least 10 Digits of number" }),
  password: z
    .string({ required_error: "Password is mendetory" })
    .min(4, { message: "Length of password is heigher than 4 letter" }),
  isAdmin: z.any(),
  active: z.any(),
  date: z.any(),
});

module.exports = signupSchema;
