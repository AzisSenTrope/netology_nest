import multer from 'multer';

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'src/public/files');
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

export const fileMulter = multer({storage})
