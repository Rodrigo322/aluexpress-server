import multer, { Options } from "multer";
import path from "path";

// Caminho relativo para a pasta de uploads
const uploadFolderPath = path.join(__dirname, "..", "..", "uploads");

// Tamanho máximo do arquivo em bytes (8MB)
const maxFileSize = 8 * 1024 * 1024;

// Tipos de arquivos permitidos
const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];

const storageOptions: Options["storage"] = multer.diskStorage({
  destination: uploadFolderPath,
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const limitsOptions: Options["limits"] = {
  fileSize: maxFileSize,
};

const fileFilterOptions: Options["fileFilter"] = (req, file, cb) => {
  // Validar o tipo do arquivo
  if (!allowedMimeTypes.includes(file.mimetype)) {
    // Criar uma instância de erro
    cb(new Error("Tipo de arquivo não suportado"));
  } else {
    // Se for um tipo de arquivo válido, não há erro
    cb(null, true);
  }
};

export const multerConfig: Options = {
  storage: storageOptions,
  limits: limitsOptions,
  fileFilter: fileFilterOptions,
};
