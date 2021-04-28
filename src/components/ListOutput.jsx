import React from 'react';
import PropTypes from 'prop-types';

const ListOutput = ({ dataListOutput: {people, images}, choicePerson }) => {
    return (
        <>
        {
            people &&
            people.length !== 0 &&
            people.map(({ id, name, email }) => {
                const img = images &&
                images !== 0 &&
                images.find(item => item.id === id)?.thumbnailUrl;
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
            })
        }
        </>
    );
};

ListOutput.propTypes = {
    dataListOutput: PropTypes.object,
    people: PropTypes.array,
    images: PropTypes.array,
    choicePerson: PropTypes.func,
};

export default ListOutput;