import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../../firebase/firebase.init";
import { useState } from "react";

const Login = () => {
  const [user, setUser] = useState(null);

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const handleGoogelSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const logedInUser = result.user;
        console.log(logedInUser);
        setUser(logedInUser);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(result => {
        console.log(result);
        setUser(null)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {
        user ? <button onClick={handleSignOut}>Sign Out</button> :
        <button onClick={handleGoogelSignIn}>Google SignIn</button>
      }
      {user && (
        <div>
          <h2>User : {user.displayName}</h2>
          <p>Email: {user.email}</p>
          <img src={user.photoURL} alt="" />
        </div>
      )}
    </div>
  );
};

export default Login;
