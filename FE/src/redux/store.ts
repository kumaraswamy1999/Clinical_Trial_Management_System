import { configureStore } from '@reduxjs/toolkit';
import RegisterReducer from './slice/registerSlice';
import LoginReducer from './slice/loginSlice';

const store = configureStore({
    reducer: {
        userRegister: RegisterReducer,
        userLogin: LoginReducer,
    },
}
)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
