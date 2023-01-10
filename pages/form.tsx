import { FieldErrors, useForm } from "react-hook-form";

interface LoginForm {
  username: string;
  password: string;
  email: string;
  errors?: string;
}

export default function Forms() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    setValue,
    reset,
    resetField,
  } = useForm<LoginForm>({
    mode: "onChange",
  });
  const onValid = (data: LoginForm) => {
    console.log("im valid bby");
    reset();
  };
  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };
  const Button = () => (
    <button
      style={{ backgroundColor: "tomato" }}
      onClick={() => console.log("im clicked")}
    >
      Click me
    </button>
  );
  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <input
        {...register("username", {
          required: "Username is required",
          minLength: {
            message: "The username should be longer than 5 chars.",
            value: 5,
          },
        })}
        type="text"
        placeholder="Username"
      />
      {errors.username?.message}
      <input
        {...register("email", {
          required: "Email is required",
          validate: {
            notGmail: (value) =>
              !value.includes("@gmail.com") || "Gmail is not allowed",
          },
        })}
        type="email"
        placeholder="Email"
        className={`${Boolean(errors.email) ? "border-red-500" : ""}`}
      />
      {errors.email?.message}
      <input
        {...register("password", { required: "Password is required" })}
        type="password"
        placeholder="Password"
      />
      <input type="submit" value="Create Account" />
      <Button />
      {errors.errors?.message}
    </form>
  );
}
