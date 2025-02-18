const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file)
    cb(null, 'uploads/')

  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
})

const fileFilter = function (req, file, cb) {
      if(file.fieldname==='BannerImage'){
         if (file.mimetype === 'image/jpg' || file.mimetype == 'image/png' || file.mimetype === 'image/jpeg') {
           cb(null, true);
         } else {
           cb(new Error('Only JPEG, JPG, and PNG image files are allowed!'), false);
         }
        }
     else if(file.fieldname==="Image") {
            console.log('BannerImage is not supported for BookPdf!')
            if(file.mimetype=='image/png' ||file.mimetype=='image/jpeg' ||file.mimetype=='image/jpeg'){
              cb(null,true);
            }
            else{
              cb(new Error('Only JPEG, JPG, and PNG image files are allowed!'), false);
            }
        
      }
}
const upload = multer({ storage: storage,fileFilter: fileFilter })

module.exports = upload;