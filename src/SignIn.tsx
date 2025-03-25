import { useForm } from "react-hook-form";
import { checkAuth, getUsers } from "./utils/requestToBack";
import { Link, useNavigate } from "react-router-dom";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

const SignIn = () => {
  const { handleSubmit, register, reset } = useForm<{
    email: string;
    password: string;
  }>();

  const navigate = useNavigate();

  return (
    <div className="h-[80vh] flex flex-col justify-center items-center">
      <h1 className="text-center text-3xl font-bold">Sign In</h1>
      <form
        onSubmit={handleSubmit((data) => {
          checkAuth({ email: data.email, password: data.password }).then(() => {
            getUsers().then((res) => {
              let users: User[] = res.docs.map((itm) => {
                return {
                  id: itm.id,
                  ...(itm.data() as {
                    email: string;
                    password: string;
                    name: string;
                  }),
                };
              });
              let user = users.find((itm) => itm.email === data.email);
              navigate(`/${user?.id}`);
              localStorage.setItem("userId", user!.id);
              reset();
            });
          });
        })}
        className="flex flex-col justify-center items-center gap-2 w-full"
      >
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
        <Link to="/signup" className="btn btn-success md:w-1/4 w-3/4">
          Sign Up
        </Link>
      </form>
    </div>
  );
};

export default SignIn;
