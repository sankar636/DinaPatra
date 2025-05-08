import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/temp')
    },
    filename: function( req, file, cb){
        cb(null, Date.now() + file.originalname) // file name
    }

})

// this is used to only accept images
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true)
    } else {
      cb(new Error("Only images are allowed"), false)
    }
  }

const upload = multer({storage: storage, fileFilter})

export default upload