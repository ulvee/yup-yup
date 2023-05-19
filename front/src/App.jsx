import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { jobSchema } from "./schema/JobForm";

function App() {
  const [users, setUsers] = useState([]);

  const getData = async () => {
    const res = await axios.get("http://localhost:5000/users");
    setUsers(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(jobSchema),
  });

  const postData = () => {
    const values = getValues();
    console.log(values);

    axios.post("http://localhost:5000/users", {
      image: values.image,
      title: values.title,
    });
  };

  return (
    <div>
      <div className="inputs">
        <form action="" onSubmit={handleSubmit(postData)}>
          <label htmlFor="image">Image</label>
          <input type="text" name="image" {...register("image")} />
          {errors.image?.message && (
            <p style={{ color: "red" }}>{errors.image?.message}</p>
          )}
          <label htmlFor="title">Title</label>
          <input type="text" name="title" {...register("title")} />
          {errors.title?.message && <p>{errors.title?.message}</p>}

          <input type="text" />
          <select name="" id="">
            <option value="">Marketing</option>
            <option value="">Developer</option>
          </select>
          <select name="" id="">
            <option value="">Part Time</option>
            <option value="">Full Time</option>
          </select>
          <input type="text" />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="cards">
        {users.map((user) => (
          <div className="card" key={user._id}>
            <div className="title">
              <div>{user.image}</div>
              <div>
                <p>{user.title}</p>
                <span>{user.createdAt.slice(0, 10)}</span>
              </div>
            </div>
            <div>{user.duty}</div>
            <div>{user.work}</div>
            <div>{user.workTime}</div>
            <div>{user.location}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
