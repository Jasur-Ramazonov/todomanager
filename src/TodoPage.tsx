import { DataSnapshot } from "firebase/database";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { changeStatus, deleteTodo, getTodos } from "./utils/requestToBack";

interface Todo {
  body: string;
  id: string;
  ownId: string;
  status: string;
  date: string;
}

const TodoPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const navigate = useNavigate();

  const { userId } = useParams();

  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      navigate("/signin");
    } else {
      getTodos(takeTodos);
    }
  }, []);

  function takeTodos(snapshot: DataSnapshot) {
    if (snapshot.exists()) {
      const data = snapshot.val();
      const Todos = Object.keys(data).map((itm) => {
        return { id: itm, ...data[itm] };
      });
      const myTodos = Todos.filter((itm) => itm.ownId === userId);
      setTodos(myTodos);
    } else {
      console.log("error");
    }
  }

  return (
    <div className="h-[100vh]">
      <h1 className="text-center text-3xl font-bold">Todos</h1>
      <div className="p-2 flex gap-2">
        <div className="h-[90vh] w-1/3  border p-2 flex flex-col gap-2">
          <h1 className="text-center">Do</h1>
          {todos
            .filter((itm) => itm.status === "do")
            .map((itm, i) => {
              return (
                <div
                  key={i}
                  className="bg-red-500 flex p-2 justify-between items-center text-dark rounded-md"
                >
                  <span className="font-bold">Todo: {itm.body}</span>
                  <span className="font-bold">Date: {itm.date}</span>
                  <button
                    onClick={() => {
                      itm.status = "doing";
                      changeStatus(itm);
                    }}
                    className="btn btn-success"
                  >
                    Next
                  </button>
                </div>
              );
            })}
        </div>
        <div className="h-[90vh] w-1/3  border p-2 flex flex-col gap-2">
          <h1 className="text-center">Doing</h1>
          {todos
            .filter((itm) => itm.status === "doing")
            .map((itm, i) => {
              return (
                <div
                  key={i}
                  className="bg-amber-500 flex p-2 justify-between items-center text-dark rounded-md"
                >
                  <span className="font-bold">Todo: {itm.body}</span>
                  <span className="font-bold">Date: {itm.date}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        itm.status = "do";
                        changeStatus(itm);
                      }}
                      className="btn btn-danger"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => {
                        itm.status = "done";
                        changeStatus(itm);
                      }}
                      className="btn btn-success"
                    >
                      Next
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="h-[90vh] w-1/3  border p-2 flex flex-col gap-2">
          <h1 className="text-center">Done</h1>
          {todos
            .filter((itm) => itm.status === "done")
            .map((itm, i) => {
              return (
                <div
                  key={i}
                  className="bg-green-500 flex p-2 justify-between items-center text-dark rounded-md"
                >
                  <span className="font-bold">Todo: {itm.body}</span>
                  <span className="font-bold">Date: {itm.date}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        itm.status = "doing";
                        changeStatus(itm);
                      }}
                      className="btn btn-danger"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => {
                        deleteTodo(itm.id);
                      }}
                      className="btn btn-success"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
