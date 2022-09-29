import axios from "axios";

const USER_API_BASE_URL  = "http://localhost:8080/api/v1/user";

class UserService{
    saveUser(user){
        return axios.post(USER_API_BASE_URL, user);
    }
    getData(){
        return axios.get(USER_API_BASE_URL+"messages");
    }

    getUserByName(name){
        return axios.get(USER_API_BASE_URL + "/" + name);
    }
    getUsers(){
        return axios.get(USER_API_BASE_URL );
    }

    deleteUser(id){
        return axios.delete(USER_API_BASE_URL + "/" + id);
    }

    getUserById(id){
        return axios.get(USER_API_BASE_URL +"/"+id);
    }

    updateUser(id, user){
        return axios.put(USER_API_BASE_URL + "/" + id, user);
    }
}

export default new UserService();