import { useState } from "react";
import "./Editprofile.css";
function EditProfile({ onClose }) {
  const [changedetails, setchangedetails] = useState({
    id: localStorage.getItem("id"),
    Name: localStorage.getItem("Name"),
    Img: localStorage.getItem("Img"),
    Email: localStorage.getItem("Email"),
    Mobile: localStorage.getItem("Mobile"),
  });

  const uploadImg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setchangedetails({ ...changedetails, Img: reader.result });
    };
    reader.readAsDataURL(file);
  };
  const handleinput = (e) => {
    const { name, value } = e.target;
    setchangedetails({ ...changedetails, [name]: value });
  };

  const ChangeData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://ecom-site-backend.vercel.app/api/changedetails",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(changedetails),
        }
      );
      const data = await response.json();
      if (data.success === true) {
        localStorage.setItem("Name", changedetails.Name);
        localStorage.setItem("Email", changedetails.Email);
        localStorage.setItem("Mobile", changedetails.Mobile);
        localStorage.setItem("Img", changedetails.Img);
        console.log("successfully changed the details");
      }
    } catch (error) {
      console.log("Error occurred:", error);
    }
  };
  const Crosseditprofile = () => {
    onClose();
  };

  return (
    <div className="editprofilemaindiv">
      <div className="editprofilecontainer">
        <span onClick={Crosseditprofile}>X</span>
        <div className="editprofileimage">
          <img src={changedetails.Img} alt="" />

          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={uploadImg}
          />
          <label htmlFor="fileInput" className="custom-file-upload">
            Change Profile Photo
          </label>
        </div>
        <hr style={{ width: "80%", marginLeft: "30px" }} />
        <div className="profileinputdiv">
          <form onSubmit={ChangeData}>
            <label htmlFor="">Name:</label>
            <input
              className="editinput"
              type="text"
              placeholder="Name"
              name="Name"
              value={changedetails.Name}
              onChange={handleinput}
            />
            <hr />
            <label htmlFor="">Email:</label>
            <input
              className="editinput"
              type="text"
              placeholder="Email"
              name="Email"
              value={changedetails.Email}
              onChange={handleinput}
            />
            <hr />
            <label htmlFor="">Mobile:</label>
            <input
              className="editinput"
              type="text"
              placeholder="Mobile"
              name="Mobile"
              value={changedetails.Mobile}
              onChange={handleinput}
            />
            <hr />
            <button type="submit">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
