const z = require("zod");

const loginValidat = z.object({
  email: z
    .string({ required_error: "Email Is Require" })
    .trim()
    .email({ message: "Invalid Email" }),
  password: z
    .string({ required_error: "Password is mendetory" })
    .min(4, { message: "Length of password is heigher than 4 letter" }),
});

module.exports = loginValidat;
