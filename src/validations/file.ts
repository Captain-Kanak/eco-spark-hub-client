const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];

export const ALLOWED_IMAGE_EXTENSIONS = imageExtensions.map(
  (extension) => `.${extension}`,
);

export const ALLOWED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];

export const IMAGE_ACCEPT = [
  ...ALLOWED_IMAGE_EXTENSIONS,
  ...ALLOWED_IMAGE_MIME_TYPES,
].join(",");

const pdfExtensions = ["pdf"];

export const ALLOWED_FILE_EXTENSIONS = [
  ...ALLOWED_IMAGE_EXTENSIONS,
  ...pdfExtensions.map((extension) => `.${extension}`),
];

export const MAX_FILE_SIZE = 2 * 1024 * 1024;
