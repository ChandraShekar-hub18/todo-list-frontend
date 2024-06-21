import { Link } from "react-router-dom";
import styles from "./Login.module.css";

import { Resolver, useForm } from "react-hook-form";
import { registerUser } from "../../services/authApi";

type FormValues = {
  username: string;
  email: string;
  password: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: !values.username ? {} : values,
    errors: !values.username
      ? {
          username: {
            type: "required",
            message: "This is required",
          },
        }
      : {},
  };
};

export const Register: React.FC = () => {
  const { register, handleSubmit } = useForm<FormValues>({
    resolver: resolver,
  });

  const onSubmit = handleSubmit((data) => registerUser(data));

  return (
    <>
      {" "}
      <form className={styles.form} onSubmit={onSubmit}>
        <div>
          <label>Username</label>
          <input {...register("username")} placeholder="UserName" />
        </div>

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

        <button className={styles.loginBtn}>SignUp</button>
      </form>
      <Link to="/auth/login">Back to Login</Link>
    </>
  );
};
