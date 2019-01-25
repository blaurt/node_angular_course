export function errorHandler(err, res) {
  console.error(err);
  res.status(500);
}
