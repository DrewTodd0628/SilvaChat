import axios from "axios";

const MESSAGE_API_BASE_URL = "http://localhost:8080/api/v1/user";
//const MESSAGE_API_BASE_URL = "/user";

class MessageService{
    saveMessage(userId, message){
        return axios.post(MESSAGE_API_BASE_URL + "/" + userId + "/message", message);
    }

   /// getMessagesByUserId(userId){
       // return axios.get(MESSAGE_API_BASE_URL + "/" + userId + "/" + message );

  //  }

  //  deleteUser(userId, id){
  //      return axios.delete(MESSAGE_API_BASE_URL + "/" + userId + "/" + message + "/" + id);
  //  }

  //  updateMessage(userId, id){
  //      return axios.put(MESSAGE_API_BASE_URL + "/" + userId + "/" + message + "/" + id, message);
  //  }
}

export default new MessageService();