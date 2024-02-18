const contectValidate = (schema) => async (req, res, next) => {
  try {
    const parsebody = await schema.parseAsync(req.body);
    req.body = parsebody;
    next();
  } catch (err) {
    // console.log(err.errors.message);
    const msg = err.errors[0].message;
    // res.json({ error: msg });
    const eroor = {
      message: msg,
    };
    next(eroor);
  }
};

module.exports = contectValidate;
