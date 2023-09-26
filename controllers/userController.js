import User from "../models/userModel.js";
import bcrypt from 'bcrypt';

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.redirect('/login') // registieren isleminden sonra login sayfasina yönlendiriyoruz!!!
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log('req.body', req.body);

    const user = await User.findOne({ username });

    let same = false;

    if (user) {
      same = await bcrypt.compare(password, user.password);
      console.log('same', same);
    } else {
      return res.status(401).json({
        succeded: false,
        error: 'Es gibt keinen solchen Benutzer',
      });
    }

    if (same) {
      const token = createToken(user._id);
      res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      });

      res.redirect('/users/dashboard');
    } else {
      res.status(401).json({
        succeded: false,
        error: 'Password wird nicht abgeglichen',
      });
    }
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error,
    });
  }
};

const getDashboardPage = (req, res) => {
  res.render('dashboard', {
    link: 'dashboard',
  });
};

export { createUser, loginUser, getDashboardPage};