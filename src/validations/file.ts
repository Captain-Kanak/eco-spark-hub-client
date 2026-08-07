const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
const pdfExtensions = ["pdf"];

export const ALLOWED_FILE_EXTENSIONS = [...imageExtensions, ...pdfExtensions];

export const MAX_FILE_SIZE = 2 * 1024 * 1024;

export const IMAGE_ACCEPT = imageExtensions.join(",");
