import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'antd/dist/antd.css';

import { Spin } from 'antd';
import { getPeople, getImages } from './redux/actions/peopleActions';
import './App.css';

const App = () => {
    const { listPeople, listImages, loading } = useSelector((state) => state.people);
    const [visible, setVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef();
    const dispatch = useDispatch();

    const handleOutsideClick = (e) => {
        if (!e.path.includes(inputRef.current)) {
            setVisible(false);
        }
    };

    useEffect(() => {
        dispatch(getImages());
        dispatch(getPeople());
        document.body.addEventListener('click', handleOutsideClick);
    }, [dispatch]);

    const toggleVisible = () => {
        setVisible(true);
    };

    const choicePerson = (name) => {
        setInputValue(name);
        setVisible(false);
    };

    const changeInput = (e) => {
        setInputValue(e.target.value);
    };

    const renderOption = listPeople &&
        listPeople.length !== 0 &&
        listPeople.map(({ id, name, email }) => {
            const img = listImages &&
                listImages !== 0 &&
                listImages.find(item => item.id === id)?.thumbnailUrl;
            return (
                <div
                    onClick={() => choicePerson(name)}
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
        <>
            {loading ?
                <Spin /> :
                (<div
                    ref={inputRef}
                    className='search-form'>
                    <input
                        onClick={toggleVisible}
                        onChange={(e) => changeInput(e)}
                        list='list'
                        placeholder='Search'
                        className='search-list_input'
                        value={inputValue} >
                    </input>
                    {visible &&
                        <div
                            className='list-output'>
                            {renderOption}
                        </div>}
                </div>)}
        </>
    );
};

export default App;