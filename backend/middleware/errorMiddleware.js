const errorMiddleware = (err, req, res, next) => {
  const message = err.message || "Backend Error";
  const extraDetail = err.extraDetail || "Backend Extra error";

  // return res.json({ message, extraDetail });
};
module.exports = errorMiddleware;
