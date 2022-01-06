import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(401).json({
        message: "User doesn't exist"
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: 'Invalid authentication credentials!'
      });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_KEY, //? ana iskelette oluşturduğumuz nodemon.json dosyasından çekiyoruz. ilave olarak import etmeye gerek yok
      { expiresIn: '1h' } //? token 1 saat sonra yok olacak
    );

    //! if token create succesfully
    res.status(200).json({
      result: existingUser,
      token: token
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong!'
    });
  }
};

export const signup = async (req, res) => {
  const { email, password, name, password2 } = req.body;
  // console.log(req.body);

  try {
    const existingUser = await User.findOne({ email });
    // console.log('user', existingUser);

    if (existingUser) {
      return res.status(401).json({
        message: 'User already exist'
      });
    }

    if (password !== password2) {
      return res.status(404).json({ message: "Passwords don't match!" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    // console.log('pass', hashedPassword);

    const result = await User.create({ email, password: hashedPassword, name });
    // console.log('result', result);

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.JWT_KEY, //? ana iskelette oluşturduğumuz nodemon.json dosyasından çekiyoruz. ilave olarak import etmeye gerek yok
      { expiresIn: '1h' } //? token 1 saat sonra yok olacak
    );
    // console.log('token', token);

    //! if token create succesfully
    res.status(200).json({
      result: result,
      token: token
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong!'
    });
  }
};
