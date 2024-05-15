import { useState } from "react";
import {
  DialogContent,
  TextField,
  Button,
  IconButton,
  Snackbar,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import useForm from "../../Services/useForm";
import { ClipLoader } from "react-spinners";
import * as auth from "../../Services/auth";
import Alert from '@mui/material/Alert';
import { NavLink } from "react-router-dom";
import validator from "validator";
import zxcvbn from "zxcvbn";
import PasswordStrengthIndicator from "../../PasswordStrengthIndicator";
import PasswordStrengthSuggestions from "../../PasswordStrengthSuggestions";
import "./SignUp.css";

const SignUp = () => {
  

  const [pwdStrengthScore, setPwdStrengthScore] = useState(0);
  const [strengthSuggestions, setStrengthSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setloading] = useState(false);

  

  const stateSchema = {
    signupEmail: { value: "", error: "" },
    password: { value: "", error: "" },
    confirmPassword: { value: "", error: "" },
  };

  const stateValidatorSchema = {
    signupEmail: {
      required: true,
      validator: {
        func: (value) => validator.isEmail(value),
        error: "Email must be a valid one",
      },
    },
    password: {
      required: { value: true },
    },
  };

  const { values, errors, dirty, handleOnChange } = useForm(
    stateSchema,
    stateValidatorSchema
  );

  const { signupEmail, password, confirmPassword } = values;


  const [passSignValue, setPassSignValue] = useState({
    password: "",
    showPassword: false,
  });

  const [confirmSignValue, setConFirmSignValue] = useState({
    password: "",
    showPassword: false,
  });

  const handlePasswordChange = (e) => {
    handleOnChange(e);
    let pwd = zxcvbn(e.target.value);
    setStrengthSuggestions(pwd.feedback.suggestions);
    if (e.target.value === "") {
      setPwdStrengthScore(0);
      return;
    }
    setPwdStrengthScore(pwd.score + 1);
  };

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickSignConfirmPassword = () => {
    setConFirmSignValue({
      ...confirmSignValue,
      showPassword: !confirmSignValue.showPassword,
    });
  };

  const handleClickSignPassword = () => {
    setPassSignValue({
      ...passSignValue,
      showPassword: !passSignValue.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const signUp = async (e) => {
    e.preventDefault();
    const data = {
      email: signupEmail,
      password: password,
    };

    if (signupEmail === "" || password === "" || confirmPassword === "") {
      setloading(false);
      setOpen(true);
      setAlert({
        open: true,
        message: `All fields are required`,
        severity: "error",
      });
    } else if (password !== confirmPassword) {
      setAlert({
        open: true,
        message: `Passwords do not match`,
        severity: "error",
      });
    } else if (pwdStrengthScore < 4) {
      setloading(false);
      setOpen(true);
      setAlert({
        open: true,
        message: "Password is too weak",
        severity: "error"
      });
    } else {
      setloading(true);
     
      auth
        .signUpUser(data)
        .then(() => {
          setloading(false);
          window.location.assign("/");
        })
        .catch((error) => {
          setloading(false);
          setOpen(true);
          setAlert({
            open: true,
            message: `${error?.response?.data?.error}`,
            severity: "error",
          });
        });
    }
  };

  return (
    <div className="body">
     
        <div className="basis-3/6 my-auto card-padding">
          
            <p className="header">Get Started</p>
            <div>
          <Snackbar
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
          >
            <Alert
              severity={`${alert.severity}`}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setAlert({
                      open: false,
                      message: "",
                      severity: "",
                    });
                  }}
                ></IconButton>
              }
            >
              {alert.message}
            </Alert>
          </Snackbar>
        </div>
          <DialogContent style={{ paddingTop: "0.625rem" }}>
            <form onSubmit={signUp}>
            
              <div className="label">
            
              <TextField
                id="email"
                required
                asterisk
                label= "Email"
                type="email"
                variant="outlined"
                size="small"
                fullWidth
                name="signupEmail"
                className=""
                value={signupEmail}
              
                onChange={handleOnChange}
                helperText={
                  errors.signupEmail &&
                  dirty.signupEmail && (
                    <p className="error-text">{errors.signupEmail}</p>
                  )
                }
              />
              </div>
              <div className="label">
              

                <TextField
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  required
                  asterisk
                  size="small"
                  type={passSignValue.showPassword ? "text" : "password"}
                  value={password}
                  name="password"
                  onChange={handlePasswordChange}
                  helperText={
                    errors.password &&
                    dirty.password && (
                      <p className="error-text">{errors.password}</p>
                    )
                  }
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickSignPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {passSignValue.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    ),
                  }}
                  className="password"
                  fullWidth
                />
                   {pwdStrengthScore > 0 && <PasswordStrengthIndicator score={pwdStrengthScore} />}
              {pwdStrengthScore > 0 && <PasswordStrengthSuggestions suggestions={strengthSuggestions}/>}
              </div>
              <div
              style={{ paddingTop: "0.938rem",marginTop:"4px" }}
              className={
                errors.password &&
                  dirty.password &&
                  errors.password !== "Field can't be empty"
                  ? "row signUpErrorTextOne signUpErrorTextOneMobile"
                  : errors.password && dirty.password
                    ? "row signUpErrorTextOne"
                    : "row signUpNoErrorText"
              }
            >
              <TextField
                required
                asterisk
                size="small"
                label="Confirm Password"
                variant="outlined"
                id="confirm-password"
                fullWidth
                type={confirmSignValue.showPassword ? "text" : "password"}
                value={confirmPassword}
                name="confirmPassword"
                className="password"
                onChange={handleOnChange}
                helperText={
                  password !== confirmPassword && confirmPassword.length > 1 ? (
                    <p className="error-text">Passwords do not match</p>
                  ) : null
                }
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickSignConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {confirmSignValue.showPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  ),
                }}
              />
            </div>
            <div
              className={
                password !== confirmPassword && confirmPassword.length > 1
                  ? "signUpErrorTextOne row text-center"
                  : "row text-center signUpNoErrorText"
              }
              style={{ marginTop: "0.938rem" }}
            >
              <p>
                By signing up, you are agreeing to the
                <a
                  href="/privacy-policy"
                  className="navLink"
                  style={{ fontWeight: "700" }}
                >
                  {" "}
                  terms & privacy policy
                </a>{" "}
                of bpotech.com
              </p>
            </div>


            <div className="row text-center mt-2">
              <Button
                variant="contained"
                className="btn w-100"
                type="submit"
                onClick={signUp}
                disabled={loading}
              >
                {loading && (
                  <div>
                    <ClipLoader size={15} color="#1b98e0" loading />
                  </div>
                )}
                {loading ? "" : "Sign Up"}
              </Button>
            </div>
            <hr />
            <div className="row text-center">
              <p>
                Already have an account?{" "}
                <NavLink
                  to={"/"}
                  className="navLink"
                  style={{ whiteSpace: "nowrap" }}
                >
                  Log In
                </NavLink>
              </p>
            </div>

            </form>
          </DialogContent>
        </div>
     
      <div className="basis-3/6 bg-[#F4F6FA]  card-padding">
<img src="./images/signup.svg" alt=""/>
<p class="text-center font-semibold">Know where you stand, assess leads with confidence</p>
        <p class="text-center">Assess your leads with ease using our platform leveling up tool</p>
      </div>

   
    </div>
  );
};

export default SignUp;
