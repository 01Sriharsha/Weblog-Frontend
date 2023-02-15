import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ListGroup, ListGroupItem, Row } from 'reactstrap'
import { getAllCategories } from '../api/apiService';
import SpinnerComp from '../utilities/SpinnerComp';

export default function CategorySideMenu() {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        retrieveAllCategories();
    }, [])

    const retrieveAllCategories = () => {
        getAllCategories().then(res => {
            setCategories(res.data);
        }).catch(err => {
            <SpinnerComp />
        })
    }

    const generateRandomId = (id) => {
        let randomId = (Math.random() + 1).toString(36).substring(2, 6);
        return (randomId + "_" + id + "x123" + randomId.substring(0, 2));
    }

    return (
        <ListGroup flush className='p-0'>
            <h5 className='pt-2 m-0 fw-semibold'>Categories</h5><hr />
            <Row >
                <Col xs={4} sm={3} md={12} className="text-dark">
                    <ListGroupItem className='px-2 text-dark py-1 border-0'
                        tag={Link} to={"/"} action={true}>
                        All Blogs
                    </ListGroupItem>
                </Col>
                <>
                    {categories?.map((category , index) => (
                        <Col xs={4} sm={3} md={12} className='text-dark' key={index}>
                            <ListGroupItem tag={Link} action={true}
                                to={`/category/${generateRandomId(category.id)}/${category.categoryTitle}`}
                                className='px-2 py-1 border-0 text-dark'
                            >
                                {category?.categoryTitle}
                            </ListGroupItem>
                        </Col>
                    ))}
                </>
            </Row>
        </ListGroup>
    )
}
