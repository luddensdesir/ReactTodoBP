import * as UserData from "../dataAccess/users";
import * as helper from "../utils/jwtHelper";
import {config} from "../../localconfig";
import * as utils from "../utils/misc";
const curEnv = config.curEnv;
const dev = (curEnv === "development");

const registerController = ()=>{
  const register = async (req, res) =>{
    const newUser = new UserData({
          email: req.body.email,
          username: req.body.username,
          password: req.body.password,
          token: ""
      });
    
    UserData.getUserByEmail(newUser.email, (getEmailErr, resUser)=>{
      if(utils.n(getEmailErr)){
        if(utils.n(resUser)){
          UserData.registerUser(newUser, (registerErr, registeredUser)=>{
            if(utils.n(registerErr)){
              if(!utils.n(registeredUser)){
                const token = helper.getLoginToken(newUser.username);
                const expiryTime = Date.now() + (dev?360000:3600000);

                res.cookie("expiryTime", 
                  expiryTime, 
                  {expires: new Date(expiryTime),
                    secure: !dev,
                    httpOnly: false,
                  });

                res.cookie("token", 
                  token,
                  {expires: new Date(expiryTime),
                    secure: !dev,
                    httpOnly: true,
                  });
    
                res.cookie("loggedIn", 
                  true, 
                  {expires: new Date(expiryTime),
                    secure: !dev,
                    httpOnly: false,
                  });

                  utils.l(registeredUser);
                  // e(err, tr(10));
                res.status("200").send({data: "register success"});
              } else {
                res.status("500").send({ data: "registration failed"});
              }
            } else {
              res.status("500").send({ data: "registration failed" });
            }
          });
        } else {
          utils.l("User already defined");
          res.status("204").send({data:"user is already defined"});
        }
      } else {
        utils.tr(getEmailErr);
        res.status("500").send({data:"Error getting user"});
      }
    });
  };

  return {
    register
  };
};


export = registerController();