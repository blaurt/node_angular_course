import * as multer from "multer";
import * as moment from "moment";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads");
  },
  filename(req, file, cb) {
    const name = moment().format("DDMMYYYY-HHmmss_SSS");
    cb(null, `${name}-${file.originalname}`);
  }
});

function fileFilter(req, file, cb) {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
    cb(null, true);
  }
  cb(null, false);
}

const limits = { fileSize: 1024 * 1024 * 5 };

export default multer({ storage, fileFilter, limits });
