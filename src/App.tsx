import React from 'react';
import {Provider} from "react-redux";
import {HashRouter, Route, Routes} from "react-router-dom";
import "./style.css";
import {store} from "./store";
import {HomePage} from "./pages/HomePage";
import {TodoPage} from "./pages/TodoPage";
import {AlbumsPage} from "./pages/AlbumsPage";
import {Layout} from "./components/Layout/Layout";
import {Posts} from "./components/Posts/Posts";
import {Comments} from "./components/Comments/Comments";
import {NewOrEditPost} from "./components/NewOrEditPost/NewOrEditPost";
import {Slider} from "./components/Slider/Slider";
import {NewAlbum} from "./components/NewAlbum/NewAlbum";


export const App = () => {
    return (
        <HashRouter basename="/">
            <Provider store={store}>
                <Layout>
                    <Routes>
                        <Route index element={<HomePage/>}/>
                        <Route path="/posts" element={<Posts/>}/>
                        <Route path ="/posts/:postId" element={<Comments/>}/>
                        <Route path="/posts/edit/:id" element={<NewOrEditPost/>}/>
                        <Route path="/posts/create" element={<NewOrEditPost/>}/>
                        <Route path="/albums" element={<AlbumsPage />}/>
                        <Route path="albums/create" element={<NewAlbum/>}/>
                        <Route path="/albums/:albumId" element={<Slider/>}/>
                        <Route path="/todos" element={<TodoPage/>}/>
                        <Route path="*" element={<div>Page is not Found!</div>}/>
                    </Routes>
                </Layout>
            </Provider>
        </HashRouter>
    );
};