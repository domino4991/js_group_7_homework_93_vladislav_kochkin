import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {getEvents} from "../../store/actions/eventsActions";

const Main = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEvents());
    }, [dispatch]);

    return (
        <div>
            <h1>Hello</h1>
        </div>
    );
};

export default Main;