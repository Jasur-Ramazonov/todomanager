import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const { register, handleSubmit, reset } = useForm<{
    email: string;
    password: string;
  }>();

  const navigate = useNavigate();

  return (
    <div className="h-[80vh] flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold">Enter to AdminPage</h1>
      <form
        onSubmit={handleSubmit((data) => {
          if (
            data.email === "jasur@gmail.com" &&
            data.password === "Jasur12@"
          ) {
            navigate("/adminpanel");
            localStorage.setItem("admin", "admin");
          } else {
            navigate("/");
          }
          reset();
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
      </form>
    </div>
  );
};

export default Admin;
