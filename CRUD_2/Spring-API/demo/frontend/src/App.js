import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Home from "./components/Home";
import AddUser from "./components/AddUser";
import UserList from "./components/UserList";
import UpdateUser from "./components/UpdateUser";
import Chat from "./components/Chat";

function App(){
  return(
    <>
    <Router>
    <Routes>
      <Route exact path="/" element ={<Home/>}/>
      <Route path="/userList" element={<UserList/>}/>
      <Route path="/addUser" element={<AddUser/>}/>
      <Route path="/editUser/:id" element={<UpdateUser/>}/>
      <Route path="/chat" element={<Chat/>}/>
    </Routes>
    </Router>
    </>
  )
}

export default App;

// import React from 'react';
// import axios from "axios";

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state ={
//       users:[],
//       id:0,
//       name:'',
//       message:'',
//       timpstamp:''
//     }
//   }
//   // Did page refresh
//   componentDidMount(){

//     // Fetch from database
//     axios.get("http://localhost:8080/api/")
//     .then((res)=>{
//       this.setState({
//         users:res.data,
//         id:0,
//         name:'',
//         message:'',
//         timpstamp:''
//       })
//     })
//   }

//   // Send data to database
//   submit(event, id){
//     event.preventDefault();
//     if(id === 0){
//       axios.post("http://localhost:8080/api/user",{
//         name:this.state.name,
//         message:this.state.message,
//         timestamp:this.state.timestamp
//       })
//       .then((res)=>{
//         // Reload page after sending
//         this.componentDidMount();
//       })
//     } else(
//       axios.put("http://localhost:8080/api/user", {
//         id:this.state.id,
//         name:this.state.name,
//         message:this.state.message,
//         timestamp:this.state.timestamp
//       })
//       .then(()=>{
//         this.componentDidMount();
//       })
//     )
//   }

//   delete(id){
//     axios.delete(`http://localhost:8080/api/user/${id}`)
//     .then(()=>{
//       this.componentDidMount();
//     })
//   }

//   edit(id){
//     axios.get(`http://localhost:8080/api/user/${id}`)
//     .then((res)=>{
//       console.log(res.data);
//       this.setState({
//         id:res.data.id,
//         name:res.data.name,
//         message:res.data.message,
//         timestamp:res.data.timestamp
//       })
//     })
//   }

//   render() {
//     return (
//       <div className="container">


//         <div className="row">
//         <div className="col s6">
//           <form onSubmit={(e)=>this.submit(e, this.state.id)}>


//             <div className="input-field col s12">
//               <i className="material-icons prefix">person</i>
//               <input onChange={(e)=>this.setState({name:e.target.value})} value={this.state.name} type="text" id="autocomplete-input" class="autocomplete"/>
//               <label for="autocomplete-input">Name</label>
//             </div>
//             <div className="input-field col s12">
//               <i className="material-icons prefix">message</i>
//               <input onChange={(e)=>this.setState({message:e.target.value})} value={this.state.message} type="text" id="autocomplete-input" class="autocomplete"/>
//               <label for="autocomplete-input">Message</label>
//             </div>
//             <div className="input-field col s12">
//               <i className="material-icons prefix">vpn_key</i>
//               <input onChange={(e)=>this.setState({timestamp:e.target.value})} value={this.state.timestamp} type="text" id="autocomplete-input" class="autocomplete"/>
//               <label for="autocomplete-input">Time Sent</label>
//             </div>


//             <button class="btn waves-effect waves-light right" type="submit" name="action">Submit
//               <i class="material-icons right">send</i>
//             </button>


//           </form>
//         </div>
//         <div className="col s6">
//         <table>
//         <thead>
//           <tr>
//               <th>Name</th>
//               <th>Message</th>
//               <th>Time Sent</th>
//               <th>Edit</th>
//               <th>Delete</th>
//           </tr>
//         </thead>

//         <tbody>
//           {
//             this.state.users.map(user=>
//                 <tr key={user.id}>
//                   <td>{user.name}</td>
//                   <td>{user.message}</td>
//                   <td>{user.timestamp}</td>
//                   <td>
//                     <button onClick={(e)=>this.edit(user.id)} class="btn waves-effect waves-light right" type="submit" name="action">
//                       <i class="material-icons ">edit</i>
//                     </button>
//                   </td>
//                   <td>
//                     <button onClick={(e)=>this.delete(user.id)} class="btn waves-effect waves-light right" type="submit" name="action">
//                       <i class="material-icons ">delete</i>
//                     </button>
//                   </td>
//                 </tr>
//               )
//           }
//         </tbody>
//       </table>
//         </div>
//         </div>
        
//       </div>
//     );
//   }
// }

// export default App;
