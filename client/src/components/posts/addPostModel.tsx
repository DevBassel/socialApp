import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { AddAPhotoRounded } from "@mui/icons-material";
import MDEditor from "@uiw/react-md-editor";
import { ChangeEvent, useState } from "react";
import { Button, Stack } from "@mui/material";
import { handleImageUpload } from "../../utils/handelImage";

export default function AddPostModel({
  openAddPost,
  handleCloseAddPost,
}: {
  openAddPost: boolean;
  handleCloseAddPost(): void;
}) {
  const [value, setValue] = useState("**:(**");
  const [fileLoading, setFileLoading] = useState(false);

  const [image, setImage] = useState<{
    file: File;
    view: string;
  }>();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileLoading(true);
    console.log("loading");
    const files = e.target.files;
    if (files && files.length > 0) {
      handleImageUpload(files[0], (file, view) => {
        if (file)
          setImage({
            file,
            view,
          });
        setFileLoading(false);
        console.log("loading done");
      });
    }
  };

  return (
    <div>
      <Modal
        open={openAddPost}
        onClose={handleCloseAddPost}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex  items-center justify-center backdrop-blur-xl"
      >
        <Stack className="md:w-3/2 max-h-[70vh] overflow-scroll  rounded-2xl bg-black bg-opacity-35 p-5 w-full">
          {fileLoading && "loading"}
          <Box className=" flex-col  md:flex-row  items-center flex justify-evenly ">
            <Box>
              <MDEditor
                className="w-full mb-5 ms:mb-0"
                value={value}
                onChange={(newValue) => setValue(newValue || "")}
              />
            </Box>
            <Box
              border={"1px solid #fff"}
              className="w-60 h-60 relative rounded-xl p-5 overflow-hidden"
            >
              <AddAPhotoRounded className="text-7xl" />
              <input
                type="file"
                onChange={handleImageChange}
                className=" absolute w-full h-full cursor-pointer z-20 opacity-0 top-0 left-0"
              />
              <img
                className="absolute top-0 left-0 w-full h-full"
                src={image?.view}
                alt="ffff"
              />
            </Box>
          </Box>
          <Button
            onClick={() => console.log(image)}
            variant="outlined"
            className="w-1/2 mt-3 mx-auto "
          >
            Submit
          </Button>
        </Stack>
      </Modal>
    </div>
  );
}
