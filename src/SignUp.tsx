import { useForm } from "react-hook-form";
import { createAuth, createUser } from "./utils/requestToBack";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const { register, handleSubmit, reset } = useForm<{
    name: string;
    email: string;
    password: string;
  }>();

  const navigate = useNavigate();

  return (
    <div className="h-[80vh] flex flex-col justify-center items-center">
      <h1 className="text-center text-3xl font-bold">Sign Up</h1>
      <form
        onSubmit={handleSubmit((data) => {
          createAuth({ email: data.email, password: data.password }).then(
            () => {
              createUser({
                name: data.name,
                email: data.email,
                password: data.password,
              }).then(() => {
                navigate("/signin");
                reset();
              });
            }
          );
        })}
        className="flex flex-col justify-center items-center gap-2 w-full"
      >
        <input
          {...register("name")}
          type="text"
          className="p-2 outline-none rounded-md text-dark focus:outline-[#3498db] ease-linear duration-100 md:w-1/4 w-3/4"
          placeholder="Name..."
        />
        <input
          {...register("email")}
          type="text"
          className="p-2 outline-none rounded-md text-dark focus:outline-[#3498db] ease-linear duration-100 md:w-1/4 w-3/4"
          placeholder="Email..."
        />
        <input
          {...register("password")}
          type="text"
          className="p-2 outline-none rounded-md text-dark focus:outline-[#3498db] ease-linear duration-100 md:w-1/4 w-3/4"
          placeholder="Password..."
        />
        <button className="btn btn-primary  md:w-1/4 w-3/4">Save</button>
        <Link to="/signin" className="btn btn-success md:w-1/4 w-3/4">
          Sign In
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
