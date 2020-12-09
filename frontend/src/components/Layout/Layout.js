import React from 'react';
import HeaderAppBar from "../HeaderAppBar/HeaderAppBar";
import { Container } from "@material-ui/core";

const Layout = props => {
    return (
        <>
            <HeaderAppBar />
            <main>
                <Container>
                    {props.children}
                </Container>
            </main>
        </>
    );
};

export default Layout;