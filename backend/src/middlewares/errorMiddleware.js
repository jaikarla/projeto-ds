export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: 'Erro interno', message: err.message });
}