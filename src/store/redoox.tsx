import React, { useReducer, useState, Reducer, ReactElement } from "react";
//import { notesReducer, NotesActions } from "../components/notes-reducer";
import { Note } from "../model";

// export type StoreItemType<S, A> = {
//   item: any;
//   reducer?: Reducer<S, A>;
// };

// Redoox (pronounced as "re-dooks") is a redux-like implementation of a
// global state management store, using ReactJS native hooks and context. It is
// intended for use within single-page-aplications written in ReactJS.
export default class Redoox {
  constructor() {}

  static store: any = {};

  static useData<V, A>(name: any, initialValue?: V, reducer?: Reducer<V, A>) {
    if (reducer) {
    }
    // simple value
    else {
      let nameSetter: any;
      [name, nameSetter] = useState(initialValue);
      this.store = { ...this.store, name };
      const storeNameSetter = `set${this.capitalize(name.toString())}`;
      this.store[storeNameSetter] = nameSetter;
    }
    return [this.store];
  }

  static useStoreProvider(): Array<ReactElement> {
    const MyContext = React.createContext({});

    const StoreContextProvider: React.FC<{}> = () => {
      return <MyContext.Provider value={{}}></MyContext.Provider>;
    };

    return [<StoreContextProvider />];

    //const initialStore: StoreType = { state: initialState, dispatch: () => {} };
    //const [store, dispatch] = useReducer(notesReducer, initialStore);
    //return useReducer(notesReducer, initialStore);
  }

  static useStoreConsumer() {}

  static capitalize(s: string) {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
}
