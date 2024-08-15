import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchotp } from "../Redux/ForgotSlice";
import { setFilter } from "../Redux/FilterSlice";
// const apiKey =import.meta.env.VITE_APP_URL

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });

  const handleinput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://ecom-site-backend.vercel.app/api/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      console.log(data);
      if (data.success == true) {
        localStorage.setItem("Token", data.Token);
        localStorage.setItem("Img", data.Img);
        localStorage.setItem("Name", data.Name);
        localStorage.setItem("Role", data.Role);
        localStorage.setItem("Email", data.Email);
        localStorage.setItem("Mobile", data.Mobile);
        localStorage.setItem("id", data.id);
        localStorage.setItem("Cart", data.Cart);
        dispatch(setFilter({ filterName: "keyword", filterValue: "" }));
        dispatch(setFilter({ filterName: "page", filterValue: 1 }));
        navigate("/");
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error("Error: dara mat bhosdk", error);
    }
  };

  const forgotpassword = (e) => {
    e.preventDefault();
    dispatch(fetchotp({ Email: formData.Email }));
    console.log(formData.Email);
    navigate("/Verifyotp");
  };

  return (
    <div className="mainlogindiv">
      <section
        className=" w-70 d-flex align-items-center bg-white"
        style={{ minHeight: "90%" }}
      >
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-space-between mt-5 align-items-center h-100">
            <div className=" col-md-9 col-lg-6 col-xl-5 ">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Sample image"
              />
            </div>
            <div className="col-md-12 col-lg-6 col-xl-4 offset-xl-1">
              <form>
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                  <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                  <button
                    type="button"
                    className="btn btn-primary btn-floating mx-1"
                  >
                    <FontAwesomeIcon icon={faFacebook} />
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary btn-floating mx-1"
                  >
                    <FontAwesomeIcon icon={faTwitter} />
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary btn-floating mx-1"
                  >
                    <FontAwesomeIcon icon={faGoogle} />
                  </button>
                </div>

                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0">Or</p>
                </div>

                <div className="form-outline mb-4 d-flex justify-content-space-between">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="fas fa-user fa-lg me-2 fa-fw mt-2 "
                  />
                  <input
                    type="email"
                    id="form3Example3"
                    className="form-control form-control-lg"
                    name="Email"
                    value={formData.Email}
                    onChange={handleinput}
                    placeholder="Enter Email"
                  />
                </div>

                <div className="form-outline mb-3 d-flex justify-content-space-between">
                  <FontAwesomeIcon
                    icon={faLock}
                    className="fas fa-user fa-lg me-2 fa-fw mt-2 "
                  />
                  <input
                    type="password"
                    id="form3Example4"
                    className="form-control form-control-lg"
                    name="Password"
                    value={formData.Password}
                    onChange={handleinput}
                    placeholder="Enter password"
                  />
                </div>

                <div className="d-flex justify-content-center align-items-center">
                  <button
                    onClick={login}
                    className="btn btn-primary btn-lg ms-3"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  >
                    Login
                  </button>
                  <p
                    style={{
                      cursor: "pointer",
                      Color: "blue",
                      border: "2px solid red",
                    }}
                    className="text-body mt-0 ms-3 "
                    onClick={forgotpassword}
                  >
                    Forgot?
                  </p>{" "}
                </div>

                <div className="text-center text-lg-start">
                  <p className="small fw-bold mt-2 pt-1 mb-0 d-flex justify-content-center">
                    {" "}
                    Don`t have an account?
                    <NavLink to="/SignUp"> SignUP</NavLink>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginForm;
