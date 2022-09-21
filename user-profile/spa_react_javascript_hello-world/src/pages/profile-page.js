import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { PageLayout } from "../components/page-layout";
import Card from "react-bootstrap/Card";
import "C:/SilvaChat/user-profile/spa_react_javascript_hello-world-2/src/styles/profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import{ faTwitter, faFacebook, faInstagram, faLinkedin} from "@fortawesome/free-brands-svg-icons";
export const ProfilePage = () => {
  const { user } = useAuth0();

  if (!user) {
    return null;
  }

  return (
    <PageLayout>
      {
        <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
          <Card className="card p-4">
            <div className=" image d-flex flex-column justify-content-center align-items-center">
              <button className="btn btn-secondary">
                <img src={user.picture}></img>
              </button>
              <span className="name mt-3">{user.nickname}</span>
              <span className="idd">{user.email}</span>
            </div>
            <div className="d-flex flex-row justify-content-center align-items-center mt-3">
              <span className="number">0  <span className="follow">Followers</span></span>
            </div>
            <div className=" d-flex flex-row justify-content-center align-items-center mt-2">
              <button className="btn1">Edit Profile</button>
            </div>
            <div className=" d-flex flex-row justify-content-center align-items-center mt-2">
              <button className="btn2">Chat</button>
            </div>
            <div className="text mt-3">
              <span>Summary.<br></br><br></br>Summary.</span>
            </div>
            <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
              <span>
                <a href="https://twitter.com">
                  <FontAwesomeIcon icon={faTwitter} className="fa-2xl"/>
                </a>
              </span>
              <span>
                <a href="https://facebook.com">
                  <FontAwesomeIcon icon={faFacebook} className="fa-2xl"/>
                </a>
              </span>
              <span>
                <a href="https://instagram.com">
                  <FontAwesomeIcon icon={faInstagram} className="fa-2xl"/>
                </a>
              </span>
              <span>
                <a href="https://linkedin.com">
                  <FontAwesomeIcon icon={faLinkedin} className="fa-2xl"/>
                </a>
              </span>
            </div>
            <div className=" px-2 rounded mt-4 date ">
              <span className="updated">{user.updated_at}</span>
            </div>
          </Card>
        </div>
      }
    </PageLayout>
  );
};
