const validate = (schema) => async (req, res, next) => {
  try {
    const parsebody = await schema.parseAsync(req.body);
    req.body = parsebody;
    // res.json({parsebody})
    next();
  } catch (err) {
    // console.log(err.errors.message);
    // console.log(err);
    const msg = err.errors[0].message;
    res.json({ error: msg });
    // console.log("catch block", err);
    const eroor = {
      message: err,
    };
    next(eroor);
  }
};

module.exports = validate;
