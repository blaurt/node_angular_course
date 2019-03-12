"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer = require("multer");
const moment = require("moment");
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
exports.default = multer({ storage, fileFilter, limits });
//# sourceMappingURL=upload.js.map