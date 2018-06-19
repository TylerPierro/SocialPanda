import { Post } from "../../model/Post";
import { homeTypes } from "./home.types";

export const createPost = (msg: Post) => {
  return {
    payload: {
        msg
    },
    type: homeTypes.CREATE_POST
  }
}