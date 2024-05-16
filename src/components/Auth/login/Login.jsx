import { useState } from "react";
import {  TextField, Snackbar,Button,DialogContent,IconButton } from "@mui/material";
import useForm from "../../Services/useForm";
import Alert from '@mui/material/Alert';
import { ClipLoader } from "react-spinners";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import * as auth from "../../Services/auth";
import { CiLocationOn } from "react-icons/ci";

const Login = () => {
  const [passvalue, setPassvalue] = useState({
    password: "",
    showPassword: false,
  });
  const [loading, setloading] = useState(false);


    // HOOKS FOR OPENING OF SNACK BAR
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({
      open: false,
      message: "",
      severity: "success",
    });
  
    const handleClose = () => {
      setOpen(false);
    };

  const stateSchema = {
    loginMail: { value: "", error: "" },
    password: { value: "", error: "" },
  };

  const stateValidatorSchema = {
    loginMail: {
      required: true,
      validator: {
        func: (value) =>
          /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            value
          ),
        error: "Email must be a valid one",
      },
    },
    password: {
      required: { value: true },
      validator: {
        func: (value) => {
          return /^(?=.*\d)(?=.*[!@#\]$~/%[^&|`'?.{+_\\,;=\-()<>":}*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(
            value
          );
        },
        error: "Minimum 8, at least a special character & a number",
      },
    },
  };


  const { values,  handleOnChange } = useForm(
    stateSchema,
    stateValidatorSchema
  );

  

  const { loginMail, password } = values;

 
  const handleClickShowPassword1 = () => {
    setPassvalue({ ...passvalue, showPassword: !passvalue.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const loginUser = async (e) => {
    
    e.preventDefault();
    const data = {
      email: loginMail?.trim(),
      password: password?.trim(),
    };
    if (loginMail === "" || password === "") {
      setOpen(true);
      setAlert({
        open: true,
        message: "Both fields cannot be empty",
        severity: "error",
      });
    } else {
      setloading(true);
      auth
        .loginUser(data)
        .then((response) => {
       
          setloading(false);
          setOpen(true);
          setAlert({
            open: true,
            message: "Login successful. Please wait...",
            severity: "success",
          });
           window.location.assign('/tdhc/leadCapture')
         
        })
        .catch((error) => {
         
          setloading(false);
          setOpen(true);
          setAlert({
            open: true,
            message: `${error.response.data.data}`,
            severity: "error",
          });
        })
    }
  };

  

  return (
    <div className="body flex h-screen">
    <div className="basis-3/6 my-auto card-padding">
      <p className="header">Welcome to the Divine Healer's Church</p>
      <p className="text-neutral-[#474D66] text-[0.833rem] leading-4 sm:text-base">
        Log in
      </p>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert
          severity={alert.severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setAlert({
                  open: false,
                  message: '',
                  severity: '',
                });
              }}
            ></IconButton>
          }
        >
          {alert.message}
        </Alert>
      </Snackbar>
      <DialogContent style={{ paddingTop: '0.625rem' }}>
        <form onSubmit={loginUser}>
          <div className="label">
            <TextField
              label="Email"
              variant="outlined"
              id="email"
              value={loginMail}
              type="email"
              size="small"
              name="loginMail"
              fullWidth
              onChange={handleOnChange}
              required
              asterisk
            />
          </div>
          <div className="label">
            <TextField
              label="Password"
              variant="outlined"
              size="small"
              id="password"
              name="password"
              fullWidth
              className="password"
              type={passvalue.showPassword ? 'text' : 'password'}
              value={password}
              onChange={handleOnChange}
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword1}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {passvalue.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                ),
              }}
            />
          </div>
          <div className="row text-center mt-2">
            <Button
              variant="contained"
              color="primary"
              className="btn mb-2 w-100"
              type="submit"
              onClick={loginUser}
              disabled={loading}
            >
              {loading && (
                <div>
                  <ClipLoader size={15} color="#1b98e0" loading />
                </div>
              )}
              {loading ? '' : 'Log In'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </div>

    <div className="basis-3/6 bg-[#F4F6FA] p-5 justify-center">
      <div>
      <img src="./images/login.svg" alt="Signup Illustration" className="h-full w-auto" />
    <p className="text-center font-semibold mt-8">
              The Divine Healer's Church shall be totally committed to seeking the kingdom of God
              and made subject to the Lordship of Jesus Christ
            </p>
            <small className="text-center">
             1 Corinthians 3:10
            </small>
            <div className="text-center">
  <small className="inline-block align-middle">
    <span className="inline-block align-middle">
      <CiLocationOn className='text-lg' />
    </span>
    <span className="inline-block align-middle">: District E1 Prampram Mobole No.1 Assembly</span>
  </small>
</div>

      </div>
   
  </div>
  </div>
  );
};

export default Login;
