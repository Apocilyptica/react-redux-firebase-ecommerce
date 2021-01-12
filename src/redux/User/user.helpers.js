import { auth } from "../../firebase/utils";

export const handleResetPasswwordAPI = (email) => {
  const config = {
    url: "http://localhost:3000/login",
  };

  return new Promise((resolve, reject) => {
    auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        resolve();
      })
      .catch(() => {
        const err = ["Email not found. Please try again."];
        reject(err);
      });
  });
};
