import { createStore } from "redux";
import { persistStore, persistReducer, createTransform } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import storage from "redux-persist/lib/storage";

import rootReducer from "./reducers";


const persistConfig = {
    key: "root",
    storage,
    whitelist: ["events"],
    transforms: [
        createTransform(JSON.stringify, toRehydrate =>
            JSON.parse(toRehydrate, (key, value) =>
                typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
                    ? new Date(value)
                    : value,
            ),
        ),
    ],
};

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer, composeWithDevTools());
export const persistor = persistStore(store);
