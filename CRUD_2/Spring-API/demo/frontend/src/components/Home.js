import React, { useEffect, useState} from "react";
import {NavigationType, useNavigate} from "react-router-dom";
import UserService from "../services/UserService";

const Home = () =>{
    const [user , setUser] = useState({
        id: "",
        name: "",
        timestamp: "",
    });

    const[data, setData] = React.useState(null);
   
    const navigate = useNavigate();

    const handleChange = (e) => {
        const value = e.target.value;
        setUser({ ...user,[e.target.name]:value});
    }

    //everytime data is change sessionStorage will be set to data
    useEffect(()=>{
      sessionStorage.setItem("user",JSON.stringify(data));
    },[data]);
    const saveUser = (e) => {
        e.preventDefault();
        UserService.saveUser(user).then((response) => {
            //set response from database to data
            setData(response.data);
            //put it in local storage
            //localStorage.setItem('user', JSON.stringify(data));
            //sessionStorage.setItem("user",data);
              //setData(response.data);
              //sessionStorage.setItem("user", data);
            
            //console.log(response);
            navigate("/chat");
        })
        .catch((error) =>{
            console.log(error);
        });
    };

    const reset = (e) => {
        e.preventDefault();
        setUser({
            id: "",
            name: "",
            timestamp: "",
        });
    };


    return(
 
        <div className="flex max-w-2xl mx-auto shadow border-b">
        <div className="px-8 py-8">
          <div className="font-thin text-2xl tracking-wider">
            <h1>Add New User</h1>
          </div>
          <div className="items-center justify-center h-14 w-full my-4">
            <label className="block text-gray-600 text-sm font-normal">
              First Name
            </label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={(e) => handleChange(e)}
              className="h-10 w-96 border mt-2 px-2 py-2"></input>
          </div>
          <div className="items-center justify-center h-14 w-full my-4">
            <label className="block text-gray-600 text-sm font-normal">
              timestamp
            </label>
            <input
              type="text"
              name="timestamp"
              value={user.timestamp}
              onChange={(e) => handleChange(e)}
              className="h-10 w-96 border mt-2 px-2 py-2"></input>
          </div>
  
          <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
            <button
              onClick={saveUser}
              className="rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6">
              LogIn
            </button>
            <button
              onClick={reset}
              className="rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6">
              Clear
            </button>
          </div>
        </div>
      </div>
      );
 }

export default Home;

