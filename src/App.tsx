import React from 'react';
import "./style.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {HomePage} from "./pages/HomePage";
import {Layout} from "./components/Layout/Layout";
import {Posts} from "./components/Posts/Posts";
import {store} from "./store";
import {Provider} from "react-redux";
import {Comments} from "./components/Comments/Comments";


export const App = () => {

    return (
        <BrowserRouter>
            <Provider store={store}>
                <Layout>
                    <Routes>
                        <Route index element={<HomePage/>}/>
                        <Route path="/posts" element={<Posts/>}>
                            <Route path = ":postId" element={<Comments/>}/>
                        </Route>
                    </Routes>
                </Layout>
            </Provider>
        </BrowserRouter>
    );
};