import React from 'react';
import "./style.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {HomePage} from "./pages/HomePage";
import {Layout} from "./components/Layout/Layout";
import {Posts} from "./components/Posts/Posts";
import {store} from "./store";
import {Provider} from "react-redux";
import {Comments} from "./components/Comments/Comments";
import {NewOrEditPost} from "./components/NewOrEditPost/NewOrEditPost";


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
                        <Route path="/create" element={<NewOrEditPost/>}/>
                        <Route path="/edit/:id" element={<NewOrEditPost/>}/>
                    </Routes>
                </Layout>
            </Provider>
        </BrowserRouter>
    );
};