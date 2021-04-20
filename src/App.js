import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'antd/dist/antd.css';

import { Select, Avatar } from 'antd';
import { getPeople, getImages } from './redux/actions/peopleActions';

const { Option } = Select;

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
                <Option key={id} value={id}>
                    <div style={{ display: 'inline-block' }}>
                        <Avatar size="small" src={img} />
                        <div style={{ display: 'inline-block' }}>
                            <p>{name}</p>
                            <p>{email}</p>
                        </div>
                    </div>
                </Option>
            )
        });

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '250px'
            }
            } >
            <Select
                showSearch
                style={{ width: 343 }}
                placeholder="Search to Select"
                optionFilterProp="children"
                filterOption={(input, option) =>
                    option.children.props.children[1].props.children[0].props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                filterSort={(optionA, optionB) => {
                    optionA.children.props.children[1].props.children[0].props.children.toLowerCase().localeCompare(optionB.children.props.children[1].props.children[0].props.children.toLowerCase())
                }
                }


            >
                {renderOption}
            </Select>
        </div >

    );
};

export default App;