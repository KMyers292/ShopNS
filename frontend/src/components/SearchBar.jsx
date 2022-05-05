//===================================================================================================================================================================//
//                                                                         SearchBar Component                                                                       //
//===================================================================================================================================================================//

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

//===================================================================================================================================================================//

// Displays a searchbar text form.
const SearchBar = () => {

    const navigate = useNavigate();

    const [keyword, setKeyword] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();

        if(keyword.trim()) {
            navigate(`/search/${keyword}`);
        }
        else {
            navigate('/');
        }
    }

    //===============================================================================================================//

    return (
        <Form onSubmit={ submitHandler } className="d-flex">
            <Form.Control type='text' name='q' onChange={(e) => setKeyword(e.target.value)} placeholder='Search Products...' className='mr-sm-2 sl-sm-5'>
            </Form.Control>
            <Button type='submit' variant='success' className='p-2 ms-1'>Search</Button>
        </Form>
    )
};

//===================================================================================================================================================================//

export default SearchBar;