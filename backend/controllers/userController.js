const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { uploadImageToCloudinary } = require('../utils/imageUploader');

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User doesn't exists"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const token = createToken(user._id);

    res.json({
      success: true,
      token,
      message: "User logged in"
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error"
    })
  }
};

// create token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET)
}

// register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // checking if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({
        success: false,
        message: "User already exists"
      });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword
    })

    const user = await newUser.save();
    const token = createToken(user._id);

    res.json({
      success: true,
      token,
      message: "User registered"
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error"
    })
  }
};

// user Data
const userData = async (req, res) => {
  const { userId } = req.body;
  try {
    const userDetails = await userModel.findById({_id: userId});

    res.json({
      success: true,
      message: "User data fetched",
      userDetails
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error"
    })
  }
};

// user Data Update
const userDataUpdate = async (req, res) => {
  const { name, userId } = req.body;

  // Check if the file exists
  const image = req.files ? req.files.image : null;
  let userImageUrl = null;

  // If an image was uploaded, upload it to Cloudinary
  if (image) {
    userImageUrl = await uploadImageToCloudinary(image, process.env.FOLDER_NAME);
  }

  try {
    const updatedUserDetails = await userModel.findByIdAndUpdate(
      userId,               
      { 
        name, 
        userImage: userImageUrl ? userImageUrl.secure_url : undefined // Update userImage only if new image was uploaded
      },            
      { new: true }         
    );

    res.json({
      success: true,
      message: "User data updated successfully",
      updatedUserDetails
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error updating user data"
    });
  }
};


module.exports = { loginUser, registerUser, userData, userDataUpdate };