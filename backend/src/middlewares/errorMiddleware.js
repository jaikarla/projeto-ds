export const errorHandler = (err, req, res, next) => {
  console.error('Erro:', err);
  
  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'development' ? err.message : 'Erro interno do servidor';
  
  res.status(statusCode).json({ 
    status: 'erro', 
    mensagem: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
}