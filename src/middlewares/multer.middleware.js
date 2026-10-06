// Ye code Multer ko configure karta hai ki uploaded file ko public/temp folder me uske original naam ke saath save karna hai.

import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp")
  },
  filename: function (req, file, cb) {   // file.originalname = user ne jo original filename bheja hai.
    
      cb(null, file.originalname)   // cb is saying there is no error and file ko isi name se save krdo
    }
  }
)

// Yahan hum Multer ko apni storage settings de rahe hain, mtlab Multer, jo storage maine upar define ki hai usi ke according files save karna.

export const upload = multer({  
     storage,
    })