import React from "react";
import styles from "./Login.module.css";
import { Resolver, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authApi";
import { useAuth } from "../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

type FormValues = {
  email: string;
  password: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: !values.email ? {} : values,
    errors: !values.email
      ? {
          email: {
            type: "required",
            message: "This is required",
          },
        }
      : {},
  };
};

export const Login: React.FC = () => {
  const { register, handleSubmit } = useForm<FormValues>({
    resolver: resolver,
  });
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const loginData = await loginUser(data);
      if (loginData?.status === 200) {
        login(loginData.data.token);
        toast.success("Login successful");
        navigate("/dashboard");
      } else {
        toast.error("Login unsuccessful");
      }
    } catch (err) {
      console.error(err);
    }
  });

  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <form className={styles.form} onSubmit={onSubmit}>
        <div>
          <label>Email</label>
          <input {...register("email")} placeholder="Email" type="email" />
        </div>
        <div>
          <label>Password</label>
          <input
            {...register("password")}
            placeholder="Password"
            type="password"
          />
        </div>

        {/* <div className={styles.login}> */}
        <button className={styles.loginBtn}>Login</button>
        {/* </div> */}
      </form>

      <Link to="/auth/register" className={styles.signUpLink}>
        <button className={styles.loginBtn}>SignUp</button>
      </Link>
    </>
  );
};
