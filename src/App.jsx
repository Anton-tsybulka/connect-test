import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'antd/dist/antd.css';

import { Spin } from 'antd';
import ListOutput from './components/ListOutput';
import { getPeople, getImages, changeInputValue } from './redux/actions/peopleActions';
import './App.css';


const App = () => {
    const { 
        listPeople, 
        listImages, 
        loading, 
        inputValue,
        searchListImages,
        searchListPeople
     } = useSelector(({people}) => people);

    const dataListOutput = {
        people: null,
        images: null
    };
    
    const [visible, setVisible] = useState(false);
    const [dataSwitch, setDataswitch] = useState(false);
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
        dispatch(changeInputValue(name));
        setVisible(false);
    };

    const changeInput = (e) => {        
        dispatch(changeInputValue(e.target.value));
        setDataswitch(true);
    };

    if (!dataSwitch) {
        dataListOutput.people = listPeople;
        dataListOutput.images = listImages;    
    } else {
        dataListOutput.people = searchListPeople;
        dataListOutput.images = searchListImages;
    }

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
                            <ListOutput 
                                dataListOutput={dataListOutput}
                                choicePerson={choicePerson} />
                        </div>}
                </div>)}
        </>
    );
};

export default App;