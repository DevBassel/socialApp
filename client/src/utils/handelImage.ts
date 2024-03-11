import imageCompression from "browser-image-compression";

export async function handleImageUpload(
  file: File,
  CB: (r: File | undefined, view: string) => void
) {
  if (file) {
    console.log(`originalFile size ${file.size / 1024 } KB`);
    const options = {
      maxSizeMB: 0.3,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(file, options);

      console.log(`size ${compressedFile.size / 1024 } KB`); // smaller than maxSizeMB

      const view = await imageCompression.getDataUrlFromFile(compressedFile);
      CB(compressedFile, String(view)); // write your own logic

      console.log(`done size ${compressedFile.size / 1024} KB`);
    } catch (error) {
      console.log(error);
    }
  }
}
