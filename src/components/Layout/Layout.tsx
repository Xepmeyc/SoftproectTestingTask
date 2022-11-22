import { Header } from "../Header/Header";
import React, {FC} from "react";


type ContentProps = {
    children : React.ReactNode
}

export const Layout: FC <ContentProps> = ({ children }) => {
    return (
        <div>
            <Header />
            <div>{children}</div>
        </div>
    );
};