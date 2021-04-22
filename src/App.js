import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'antd/dist/antd.css';

import { Spin } from 'antd';
import { getPeople, getImages } from './redux/actions/peopleActions';
import './App.css';

const App = () => {
    const { listPeople, listImages, loading } = useSelector((state) => state.people);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getImages());
        dispatch(getPeople());
    }, [dispatch]);

    const renderOption = listPeople &&
        listPeople.length !== 0 &&
        listPeople.map(({ id, name, email }) => {
            const img = listImages &&
                listImages !== 0 &&
                listImages.find(item => item.id === id)?.thumbnailUrl;
            return (
                <div
                    className='item-list'
                    key={id}>
                    <div
                        className='item-list_img'>
                        <img
                            key={`${id}${img}`}
                            src={img}
                            alt='Avatar' />
                    </div>
                    <div
                        className='item-list_people'>
                        <p
                            key={`${id}${name}`}
                            className='item-list_name' >
                            {name}
                        </p>
                        <p
                            key={`${id}${email}`}
                            className='item-list_email' >
                            {email}
                        </p>
                    </div>
                </div>
            )
        });

    return (
        <div
            className='search-form'>
            <input
                list='list'
                placeholder='Search'
                className='search-list_input'>
            </input>
            <div
                className='list-output'>
                {renderOption}
            </div>
        </div>
    );
};

export default App;