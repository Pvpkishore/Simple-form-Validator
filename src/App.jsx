import { useState } from "react";
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    email: "",
  });

  function handleFormChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateInput(name, value);
  }

  function validateInput(getName, getValue) {
    switch (getName) {
      case "username":
        setErrors((prevErrors) => ({
          ...prevErrors,
          username:
            getValue.length < 3 ? "Username must be at least 3 characters" : "",
        }));

        break;
      case "email":
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(getValue)
            ? ""
            : "Invalid email address",
        }));

        break;
      case "password":
        setErrors((prevErrors) => ({
          ...prevErrors,
          password:
            getValue.length < 5 ? "Password must be at least 5 characters" : "",
        }));

        break;

      default:
        break;
    }
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    const validateErrors = {};

    Object.keys(formData).forEach((dataItem) => {
      validateInput(dataItem, formData[dataItem]);
      if (errors[dataItem]) {
        validateErrors[dataItem] = errors[dataItem];
      }
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      ...validateErrors,
    }));

    if (Object.values(validateErrors).every((error) => error === "")) {
      //perform your form submission logic
    } else {
      console.log("error is present. Please fix");
    }
  }
  console.log(errors);

  return (
    <>
    <div className="mt-4 p-4 text-center flex flex-col justify-center font-poppins">
      <h1 className="mt-6 mb-4 text-3xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-600 to-slate-900" >Simple Form Validation</h1>
      <form className="w-fit mt-6 p-8 h-fit bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border-1 border-spacing-1 border-slate-950 rounded-lg self-center outline outline-offset-2 shadow-2xl"onSubmit={handleFormSubmit}>
        <div className="input-wrapper flex flex-col p-2">
          <label  className="self-start mb-1" htmlFor="username">User Name</label>
          <input
            className=" p-2 rounded-md outline hover:outline-offset-2 hover:outline-slate-950"
            type="text"
            name="username"
            id="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleFormChange}
          />
          <span>{errors?.username}</span>
        </div>
        <div className="input-wrapper flex flex-col p-2">
          <label className="self-start mb-1" htmlFor="email">Email</label>
          <input
           className=" p-2 rounded-md outline hover:outline-offset-2 hover:outline-slate-950"
            id="email"
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter your email"
            onChange={handleFormChange}
          />
          <span>{errors?.email}</span>
        </div>
        <div className="input-wrapper flex flex-col p-2">
          <label className="self-start mb-1" htmlFor="password">Password</label>
          <input
           className=" p-2 rounded-md outline hover:outline-offset-2 hover:outline-slate-950"
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleFormChange}
          />
          <span>{errors?.password}</span>
        </div>
        <button className="px-5 py-1 mt-3 border-1 bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 rounded-sm outline hover:outline-offset-2  font-medium font-sans" type="submit">Submit</button>
      </form> 
    </div>
    </>
  )
}

export default App; 