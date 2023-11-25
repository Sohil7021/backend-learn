import multer from "multer"


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // We use file beacause some time file not store as json format
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  })
  
  export const upload = multer({ 
     storage, 
    })