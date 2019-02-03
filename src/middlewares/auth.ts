import * as passport from "passport";
import * as passportJwt from "passport-jwt";
import { config } from "../config/main";
import { verify } from "jsonwebtoken";
import { User } from "../models/user";

const options = {
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtKey
};

export const useJwt = (passportObj: typeof passport) => {
  passportObj.use(
    new passportJwt.Strategy(options, async (payload, verify) => {
      try {
        const user = await User.findById(payload.userId).select("email id");
        if (!user) {
          return verify(null, false);
        }
        verify(null, user);
      } catch (e) {
        // console.error(e);
      }
    })
  );
};
