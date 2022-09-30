import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";




export const IsNew = () => {

  // const navigate = useNavigate();
  const [data, setData] = useState('')
  const id = 1;

  axios.get('http://localhost:8080/api/v1/username/' + id)
  .then(res => {

    console.log(res.data)
    // navigate("/chat");
  }).catch(err => {

    console.log(err);
    // navigate("/");
  })



  // new NewUser();
}
class NewUser extends React.Component {





  // constructor(props) {
  //   super(props);
  //   this.state ={
  //     users:[],
  //     id:0,
  //     name:'',
  //     timpstamp:''
  //   }
  //   this.componentDidMount();
  // }
  // // Did page refresh
  // componentDidMount(){

  //   // Fetch from database
  //   axios.get("http://localhost:8080/api/v1/user")
  //   .then((res)=>{
  //     this.setState({
  //       users:res.data,
  //       id:0,
  //       name:'',
  //       timpstamp:''
  //     })
  //     console.log("Name: " + this.name);
  //   })
  // }
}
export default IsNew