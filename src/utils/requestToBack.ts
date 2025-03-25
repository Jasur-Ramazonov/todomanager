import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, database, db } from "./firebaseconfig";
import { addDoc, collection, getDocs } from "firebase/firestore";
import {
  DataSnapshot,
  onValue,
  push,
  ref,
  remove,
  update,
} from "firebase/database";

export function createAuth(data: { email: string; password: string }) {
  return createUserWithEmailAndPassword(auth, data.email, data.password);
}

export function createUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  return addDoc(collection(db, "users"), data);
}

export function checkAuth(data: { email: string; password: string }) {
  return signInWithEmailAndPassword(auth, data.email, data.password);
}

export function getUsers() {
  return getDocs(collection(db, "users"));
}

export function getTodos(func: (snapshot: DataSnapshot) => void) {
  onValue(ref(database, "Todos"), func);
}

export function setTodo(data: {
  body: string;
  date: string;
  status: string;
  ownId: string;
}) {
  return push(ref(database, "Todos"), data);
}

export function changeStatus(data: {
  body: string;
  date: string;
  status: string;
  ownId: string;
  id: string;
}) {
  return update(ref(database, `Todos/${data.id}`), {
    body: data.body,
    date: data.date,
    status: data.status,
    ownId: data.ownId,
  });
}

export function deleteTodo(id: string) {
  return remove(ref(database, `Todos/${id}`));
}
