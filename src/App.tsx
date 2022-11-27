import React from 'react';
import "./style.css";
import {BrowserRouter, HashRouter, Route, Routes} from "react-router-dom";
import {HomePage} from "./pages/HomePage";
import {Layout} from "./components/Layout/Layout";
import {Posts} from "./components/Posts/Posts";
import {store} from "./store";
import {Provider} from "react-redux";
import {Comments} from "./components/Comments/Comments";
import {NewOrEditPost} from "./components/NewOrEditPost/NewOrEditPost";
import {AlbumsPage} from "./pages/AlbumsPage";
import {Slider} from "./components/Slider/Slider";
import {TodoPage} from "./pages/TodoPage";
import {NewAlbum} from "./components/NewAlbum/NewAlbum";


export const App = () => {

    return (
        <BrowserRouter>
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
        </BrowserRouter>
    );
};