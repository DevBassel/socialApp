import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserData {
  id: number;
  name: string;
  email: string;
  picture: string;
  providerId: string;
  createdAt: Date;
  updatedAt: Date;
}
export default function Profile() {
  const toeken: string | null = localStorage.getItem("access_token");
  const navigate = useNavigate();
  const API: string = "http://127.0.0.1:3000/api/users/me";
  const [userData, setUserData] = useState<UserData>();

  useEffect(() => {
    if (!toeken) {
      console.log(toeken);
      navigate("/login");
    }
    (async () => {
      const res = await axios.get(API, {
        headers: { Authorization: `Bearer ${toeken}` },
      });
      setUserData(res.data);
    })();
  }, [navigate, toeken]);
  return (
    userData && (
      <div>
        <h1>Profile</h1>
        <div className="data">
          <div className="box">
            <img src={userData.picture} alt="profile" />
          </div>
          <h2>{userData.name}</h2>
          <h2>{userData.email}</h2>
        </div>
      </div>
    )
  );
}
