import imageCompression from "browser-image-compression";

export async function handleImageUpload(
  file: File,
  CB: (r: File | undefined, view: string) => void
) {
  if (file) {
    console.log("originalFile instanceof Blob", file instanceof Blob); // true
    console.log(`originalFile size ${file.size / 1024 / 1024} MB`);
    const options = {
      maxSizeMB: 0.4,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(file, options);
      console.log(
        "compressedFile instanceof Blob",
        compressedFile instanceof Blob
      ); // true
      console.log(
        `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
      ); // smaller than maxSizeMB
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => {
        const view = reader.result;

        CB(compressedFile, String(view)); // write your own logic

        console.log(
          "originalFile instanceof Blob",
          compressedFile instanceof Blob
        ); // true
        console.log(
          `originalFile size ${compressedFile.size / 1024 / 1024} MB`
        );
      };
    } catch (error) {
      console.log(error);
    }
  }
}
