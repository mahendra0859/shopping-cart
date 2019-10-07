import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import reducer from "./reducer";

export const store = createStore(
    persistReducer({ key: "root", storage }, reducer)
  ),
  persistor = persistStore(store);
