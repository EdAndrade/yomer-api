import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { v4 as uuidv4 } from 'uuid'

export const UploadInterceptor = FileInterceptor('image', {
    storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
            const [_, file_extension] = file.originalname.split('.')
            cb(null, `${uuidv4()}.${file_extension}`)
        }
    })
})