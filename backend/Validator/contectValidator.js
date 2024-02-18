const z = require("zod");

const loginValidat = z.object({
  username: z
    .string({ required_error: "Username Is Require" })
    .trim()
    .min(3, { message: "Name must be Atleast 3 chatecter long " }),
  email: z
    .string({ required_error: "Email Is Require" })
    .trim()
    .email({ message: "Invalid Email" }),
  message: z.string({ required_error: "Message is mendetory" }),
});

module.exports = loginValidat;
