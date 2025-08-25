import jwt from "jsonwebtoken";

const secretToken = "jornadaJS123";

// function CreateToken(id_user) {
function CreateToken(id_user) {
  return jwt.sign({ id_user }, secretToken); // 🔥 sem expiração
}

function ValidateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Token não informado' });
  }
  const token = authHeader.split(' ')[1]; // formato: "Bearer <token>"
  try {
    const decoded = jwt.verify(token, secretToken); // verifica assinatura
    req.user = { id_user: decoded.id_user }; // injeta no req.user
    next(); // segue para o controller
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido' });
  }
}


// function ValidateToken(req, res, next) {
//   const authToken = req.headers.authorization; // "Bearer 000000000"

//   if (!authToken)
//     return res.status(401).json({ error: "Token não informado" });

//   const [bearer, token] = authToken.split(" ");  // "Bearer"   "000000000"

//   jwt.verify(token, secretToken, (err, tokenDecoded) => {
//     if (err)
//       return res.status(401).json({ error: "Token inválido" });
//     req.id_user = tokenDecoded.id_user;

//     next();
//   });
// }

function AuthMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Token não informado' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, secret);
    req.user = { id_user: decoded.id_user }; // ✅ injeta corretamente
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido' });
  }
}

export default { CreateToken, ValidateToken, AuthMiddleware };