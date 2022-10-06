import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React, { useEffect, useState} from "react";
import {NavigationType, useHistory} from "react-router-dom";
import UserService from "../services/UserService";

const Register = () =>{


  const { user} = useAuth0();
  console.log("Current: " + user.sub);
  const [users, setUsers] = useState([]);

  // Checks if user is new
  useEffect(() => {

    const fetchUsers = async () => {
      let results = await axios.get("http://localhost:8080/api/v1/user")
      try {
        let response = JSON.parse(results.request.response)  
        setUsers (response);
      } catch(err) {
        console(err)
      }
    };
    fetchUsers();

  }, []);

  if (users.find(u => u.timestamp == user.sub)) {
    console.log("Found you");
  } else {
    console.log("Your a new user"); 
  }



    const [currentUser , setCurrentUser] = useState({
        id: "",
        name: "",
        timestamp: "",
    });

    const[data, setData] = React.useState(null);
   
    const history = useHistory();

    const handleChange = (e) => {
        const value = e.target.value;
        // setCurrentUser({ ...currentUser,[e.target.name]:value});
        setCurrentUser({ id:"",[e.target.name]:value,timestamp:user.sub});
    }

    //everytime data is change sessionStorage will be set to data
    useEffect(()=>{
      sessionStorage.setItem("currentUser",JSON.stringify(data));
    },[data]);
    const saveUser = (e) => {
        e.preventDefault();
        UserService.saveUser(currentUser).then((response) => {
            //set response from database to data
            setData(response.data);
            //put it in local storage
            //localStorage.setItem('currentUser', JSON.stringify(data));
            //sessionStorage.setItem("currentUser",data);
              //setData(response.data);
              //sessionStorage.setItem("currentUser", data);
            
            //console.log(response);
            history.push("/chat");
        })
        .catch((error) =>{
            console.log(error);
        });
    };

    const reset = (e) => {
        e.preventDefault();
        setCurrentUser({
            id: "",
            name: "",
            timestamp: "",
        });
    };


    return(
 
        <div className="flex max-w-2xl mx-auto shadow border-b">
        <div className="px-8 py-8">
          <div className="font-thin text-2xl tracking-wider">
            <h1>Create New Username</h1>
          </div>
          <div className="items-center justify-center h-14 w-full my-4">
            <label className="block text-gray-600 text-sm font-normal">
              Username
            </label>
            <input
              type="text"
              name="name"
              value={currentUser.name}
              onChange={(e) => handleChange(e)}
              className="h-10 w-96 border mt-2 px-2 py-2"></input>
          </div>


          {/* <div className="items-center justify-center h-14 w-full my-4">
            <label className="block text-gray-600 text-sm font-normal">
              timestamp
            </label>
            <input
              type="text"
              name="timestamp"
              value={currentUser.timestamp}
              onChange={(e) => handleChange(e)}
              className="h-10 w-96 border mt-2 px-2 py-2"></input>
          </div> */}
  
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

export default Register;

