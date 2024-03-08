const JWT=require('jsonwebtoken');
module.exports = async (req, res, next) => {
 
    try {
        const token = req.headers["authorization"].split(' ')[1];
        JWT.verify(token, process.env.SECRET_KEY,(err, decode) => {
    
          if (err) {
            return res.status(200).send({ message: "auth faild", success: false });
          } else {
             req.body.userId =decode.id;
            next();
          }
        });
        
    } catch (error) {
        console.log(error);
    }
};
