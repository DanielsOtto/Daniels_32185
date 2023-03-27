export function errorHandler(error, req, res, next) {
  switch (error.type) {
    case 'EMPTY_COLLECTION':
      res.status(204);
      break;
    case 'INVALID_ARGUMENT':
      res.status(400);
      break;
    case 'ID_NOT_FOUND':
      res.status(404);
      break;
    case 'NO_STOCK':
      res.status(409);
      break;
    default:
      res.status(500);
  }
  res.json({ message: error.message });
}