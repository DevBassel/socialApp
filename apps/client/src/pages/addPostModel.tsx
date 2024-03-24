import Box from "@mui/material/Box";
import { AddAPhotoRounded } from "@mui/icons-material";
import MDEditor from "@uiw/react-md-editor";
import { ChangeEvent, useState } from "react";
import { Button, Stack } from "@mui/material";
import { handleImageUpload } from "../utils/handelImage";
import { isRTL } from "../utils/IsRtl";
import Loading from "../components/common/loading";
import axios from "axios";
import { API } from "../utils/api";
import { AxiosConfig } from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function AddPostModel() {
  const navigate = useNavigate();
  const [value, setValue] = useState<{
    content: string;
    lang: string;
  }>();

  const [fileLoading, setFileLoading] = useState(false);
  const [image, setImage] = useState<{
    file: File | null;
    view: string;
  }>();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileLoading(true);
    console.log("loading");
    const files = e.target.files;
    if (files && files.length > 0)
      handleImageUpload(files[0], (file, view) => {
        if (file)
          setImage({
            file,
            view,
          });
        setFileLoading(false);
        console.log("loading done");
      });
  };
  const clear = () => {
    setImage({
      file: null,
      view: "",
    });
    setValue({
      content: ":)",
      lang: "en",
    });
  };
  return (
    <div>
      <Stack className="md:w-3/2 max-h-screen overflow-scroll  rounded-2xl bg-black bg-opacity-35 p-5 w-full">
        <Box className=" flex-col  md:flex-row  items-center flex justify-evenly ">
          <Box>
            <MDEditor
              className="mb-5 ms:mb-0"
              value={value?.content}
              lang={value?.lang}
              direction={value?.lang === "ar" ? "rtl" : "ltr"}
              onChange={(newValue) => {
                console.log(isRTL(String(newValue)) ? "ar" : "en");
                setValue({
                  content: newValue || "",
                  lang: isRTL(String(newValue)) ? "ar" : "en",
                });
              }}
            />
          </Box>
          <Box
            border={"1px solid #fff"}
            className="w-40 h-40 relative rounded-xl p-5 overflow-hidden"
          >
            <AddAPhotoRounded className="text-7xl" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className=" absolute w-full h-full cursor-pointer z-30 opacity-0 top-0 left-0"
            />
            {image?.view && (
              <img
                className="absolute top-0 left-0 z-10 object-cover w-full h-full"
                src={image?.view}
                alt="ffff"
              />
            )}

            {fileLoading && (
              <Loading className="absolute top-0 left-0 h-full w-full z-50" />
            )}
          </Box>
        </Box>
        <Box className="flex justify-evenly [&>button]:w-1/4 ">
          <Button
            onClick={async () => {
              console.log(image);
              const { data } = await axios.post(
                `${API}/posts`,
                {
                  ...value,
                },
                AxiosConfig
              );

              if (data) {
                console.log(data);
                clear();
              }
            }}
            variant="outlined"
            className=" mt-3 mx-auto "
          >
            Submit
          </Button>
          <Button
            onClick={() => {
              clear();
            }}
            variant="outlined"
            color="warning"
            className=" mt-3 mx-auto "
          >
            Clear
          </Button>
          <Button
            onClick={() => {
              navigate("/");
            }}
            variant="outlined"
            color="error"
            className=" mt-3 mx-auto "
          >
            Close
          </Button>
        </Box>
      </Stack>
    </div>
  );
}
