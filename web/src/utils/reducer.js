import { tableData, length } from "../assets/data";
let nextId = length;

export const reducer = (state = tableData, action) => {
  switch (action.type) {
    case "added": {
      console.log("added");
      return [
        ...state,
        {
          ...action.form,
          id: ++nextId,
        },
      ];
    }
    case "deleted": {
      console.log("deleted");
      return state.filter((person) => person.id !== action.id);
    }
    case "changed": {
      console.log("changed");
      return state.map((person) =>
        person.id === action.form.id ? action.form : person
      );
    }
    case "init": {
      console.log("init");
      return state;
    }
    default:
      throw Error("Unknown action:" + action.type);
  }
};
