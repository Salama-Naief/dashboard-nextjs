import Cookies from "js-cookie";
import { createContext, useReducer } from "react";
import { kanbanData } from "./data/dummy";

const initailState = {
  kanbanData: kanbanData,
};
export const Store = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "KANBANDATA": {
      return { ...state, kanbanData: action.payload };
    }
    default:
      return state;
  }
}

export default function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initailState);
  const value = { state, dispatch };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
