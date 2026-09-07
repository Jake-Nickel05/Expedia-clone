import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import firebase_app from "../01_firebase/config_firebase";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { fetch_users, login_user } from "../Redux/Authantication/auth.action";

const auth = getAuth(firebase_app);
const state = {
  number: "",
  otp: "",
  verify: false,
};

export const Login = () => {
  const [check, setCheck] = useState(state);
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuth, activeUser, user } = useSelector((store) => {
    return {
      isAuth: store.LoginReducer.isAuth,
      activeUser: store.LoginReducer.activeUser,
      user: store.LoginReducer.user,
    };
  });

  const { number, otp, verify } = check;

  let exist = false;
  let data = {};

  for (let i = 0; i <= user.length - 1; i++) {
    if (user[i].number == number) {
      exist = true;
      data = user[i];
      break;
    }
  }
  // console.log(user)
  //

  // Set up the invisible reCAPTCHA once when the page loads, instead of
  // re-creating it on every click. The old onCapture() (called from inside
  // handleVerifyNumber) rebuilt the verifier in the same container every
  // time, and its own solved-callback called handleVerifyNumber() again --
  // that second call tried to render a second reCAPTCHA into the same
  // "recaptcha-container" div, which Firebase rejects with "reCAPTCHA has
  // already been rendered in this element". That's an easy way for the
  // button to get stuck on "Please wait..." independent of any OTP issue.
  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
        },
        auth
      );
    }
  }, []);

  function handleVerifyNumber() {
    const nextButton = document.querySelector("#nextText");
    nextButton.innerText = "Please wait...";

    // NOTE: was hardcoded to "+91" (India) before, which rejected US-style
    // numbers with an invalid-phone-number error the old empty catch block
    // never surfaced. Update this if your team is testing with a different
    // country's numbers.
    const phoneNumber = `+1${number}`;
    const appVerifier = window.recaptchaVerifier;

    if (number.length === 10) {
      if (exist) {
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
          .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            setCheck({ ...check, verify: true });
            document.querySelector(
              "#loginMesageSuccess"
            ).innerHTML = `Otp Send To ${number} !`;
            document.querySelector("#loginMesageError").innerHTML = "";
            document.querySelector("#nextText").style.display = "none";
          })
          .catch((error) => {
            // Error; SMS not sent. Reset the button and show the real reason
            // instead of hanging on "Please wait..." forever.
            console.error("signInWithPhoneNumber failed:", error);
            nextButton.innerText = "SignIn";
            document.querySelector("#loginMesageSuccess").innerHTML = "";
            document.querySelector("#loginMesageError").innerHTML =
              "Failed to send OTP: " + error.message;
          });
      } else {
        document.querySelector("#loginMesageSuccess").innerHTML = ``;
        document.querySelector("#loginMesageError").innerHTML =
          "User does not exist Please Create Your Account !";
        nextButton.innerText = "SignIn";
        // Was setInterval, which would have kept firing every second if the
        // navigation were ever cancelled. A one-time redirect only needs
        // setTimeout.
        setTimeout(() => {
          window.location = "/register";
        }, 1000);
      }
      //
    } else {
      document.querySelector("#loginMesageSuccess").innerHTML = ``;
      document.querySelector("#loginMesageError").innerHTML =
        "Mobile Number is Invalid !";
      nextButton.innerText = "SignIn";
    }
  }

  //
  function verifyCode() {
    window.confirmationResult
      .confirm(otp)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;

        document.querySelector(
          "#loginMesageSuccess"
        ).innerHTML = `Verifyed Successful`;
        document.querySelector("#loginMesageError").innerHTML = "";

        dispatch(login_user(data));
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        document.querySelector("#loginMesageSuccess").innerHTML = ``;
        document.querySelector("#loginMesageError").innerHTML = "Invalid OTP";
        // ...
      });
  }

  //
  const handleChangeMobile = (e) => {
    let val = e.target.value;
    setCheck({ ...check, [e.target.name]: val });
  };
  // console.log(isAuth)

  useEffect(() => {
    dispatch(fetch_users);
    if (isAuth) {
      window.location = "/";
    }
  }, [isAuth]);

  return (
    <>
      <div className="mainLogin">
        <div id="recaptcha-container"></div>
        <div className="loginBx">
        <div className="logoImgdiv"><img className="imglogo" src="https://i.postimg.cc/QxksRNkQ/expedio-Logo.jpg':'https://i.postimg.cc/fRx4D7QH/logo3.png" alt="" /></div>
           
          <div className="loginHead">
          <hr /><hr /><hr />
            <h1>SignIn</h1>
          </div>
          <div className="loginInputB">
            <label htmlFor="">Enter Your Number</label>
            <span>
              <input
                type="number"
                readOnly={verify}
                name="number"
                value={number}
                onChange={(e) => handleChangeMobile(e)}
                placeholder="Number"
              />
              <button
                disabled={verify}
                onClick={handleVerifyNumber}
                id="nextText"
              >
                SignIn
              </button>
            </span>
          </div>
          {verify ? (
            <div className="loginInputB">
              <label htmlFor="">Enter Your OTP</label>
              <span>
                <input
                  type="number"
                  name="otp"
                  value={otp}
                  onChange={(e) => handleChangeMobile(e)}
                />
                <button onClick={verifyCode}>Continue</button>
              </span>
            </div>
          ) : (
            ""
          )}

          <div className="loginTerms">
            {/* <h2>Or USE ARE BUSSINESS ACCOUNT WITH</h2>
                    <p>By proceeding, you agree to MakeMyTrip'sT&Csand Privacy</p> */}
            <Link to="/register">Don't have an Account</Link>
            <Link to="/admin">Admin Login</Link>
            <div className="inpChecbx"><input className="inp" type="checkbox" /> <h2>Keep me signed in</h2></div>
            <p>Selecting this checkbox will keep you signed into your account on this device until you sign out. Do not select this on shared devices.</p>
            <h6>By signing in, I agree to the Expedia <span> Terms and Conditions</span>, <span>Privacy Statement</span> and <span>Expedia Rewards Terms and Conditions</span>.</h6>
          </div>
          <h3 id="loginMesageError"></h3>
          <h3 id="loginMesageSuccess"></h3>
        </div>
      </div>
    </>
  );
};
