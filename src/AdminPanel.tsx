import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getUsers, setTodo } from "./utils/requestToBack";
import Select from "react-select";

const AdminPanel = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState<{ label: string; value: string }[]>([]);
  const [ownId, setOwnId] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("admin")) {
      navigate("/");
    } else {
      getUsers().then((res) => {
        const myUsers = res.docs.map((itm) => {
          return { id: itm.id, ...(itm.data() as { name: string }) };
        });

        const myUsers2 = myUsers.map((itm) => {
          return { label: itm.name, value: itm.id };
        });
        setUsers(myUsers2);
      });
    }
  }, []);

  const { handleSubmit, register, reset } = useForm<{
    body: string;
    date: string;
    ownId: string;
    status: string;
  }>();

  return (
    <div className="h-[80vh] flex justify-center items-center flex-col">
      <h1 className="text-center text-3xl font-bold">Create Todo</h1>
      <form
        onSubmit={handleSubmit((data) => {
          data.status = "do";
          data.ownId = ownId;

          setTodo(data).then(() => {
            reset();
          });
        })}
        className="flex justify-center items-center w-full flex-col gap-2"
      >
        <input
          {...register("body")}
          className="p-2 outline-none rounded-md text-dark focus:outline-[#3498db] ease-linear duration-100 md:w-1/4 w-3/4"
          type="text"
          placeholder="Todo..."
        />
        <input
          {...register("date")}
          className="p-2 outline-none rounded-md text-dark focus:outline-[#3498db] ease-linear duration-100 md:w-1/4 w-3/4"
          type="date"
          placeholder="date"
        />
        <Select
          onChange={(a) => {
            setOwnId(a!.value);
          }}
          options={users}
          className="p-2 outline-none rounded-md text-dark focus:outline-[#3498db] ease-linear duration-100 md:w-1/4 w-3/4 text-black"
        />

        <button className="btn btn-primary md:w-1/4 w-3/4">Save</button>
      </form>
    </div>
  );
};

export default AdminPanel;
