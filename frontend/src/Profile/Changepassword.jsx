import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Changepassword.css";
function Changepassword() {
  const navigate = useNavigate();
  const [values, setvalues] = useState({
    id: localStorage.getItem("id"),
    Oldpassword: "",
    Newpassword: "",
    Confirmpassword: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setvalues({ ...values, [name]: value });
  };

  const changepassword = async (e) => {
    console.log("enterd in function");
    e.preventDefault();
    const response = await fetch(
      "https://ecom-site-backend.vercel.app/api/changepassword",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );

    const data = await response.json();
    if (data.success == true) {
      navigate("/");
    } else {
      console.log("error hai bhai");
      console.log(data);
      console.log(data.message);
    }
  };
  return (
    <div className="changepasswordmaindiv">
      <div className="changepasswordcontainer">
        <div className="changepasswordpage">
          <div className="changepasswordimgdiv">
            <img
              src="https://plus.unsplash.com/premium_photo-1676618539983-d1a95978fd7d?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>

          <form action="" onSubmit={changepassword}>
            <input
              type="text"
              name="Oldpassword"
              id=""
              value={values.Oldpassword}
              onChange={handleInput}
              placeholder="Enter Old Password"
            />

            <input
              type="text"
              name="Newpassword"
              id=""
              value={values.Newpassword}
              onChange={handleInput}
              placeholder="Enter New Password"
            />

            <input
              type="text"
              name="Confirmpassword"
              id=""
              value={values.Confirmpassword}
              onChange={handleInput}
              placeholder="Confirtm New Password"
            />
            <button>Change Password</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Changepassword;
