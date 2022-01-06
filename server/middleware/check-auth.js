//! CHECKS WE ARE AUTHENTICATION OR NOT

import jwt from 'jsonwebtoken';

const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; //* authorization --> for attaching authorization information for a request

    //! hem google'dan gelen hem de bizim oluşturduğumuz 2 token mevcut. burada kullanacağımız kendi oluşturduğumuz token olacak. so o token'ı kullanmamız lazım
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.JWT_KEY); //? verify --> will also throw an error if it fails to verify

      //? for authorization --> so we can add routes/posts.js new post user data
      req.userId = decodedData?.id;
    } else {
      //! if we works google token
      decodedData = jwt.decode(token);

      //! we dont need secret
      //! sub --> is simply google's name for a specific id that differentiates every single google user
      req.userId = decodedData?.sub;
    }

    next(); //* let the execution continue
  } catch (error) {
    res.status(401).json({ message: 'You are not authenticated!' });
  }
};

export default checkAuth;
