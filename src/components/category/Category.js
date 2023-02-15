import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { Card, Col, Row } from 'reactstrap'
import { getAllPostByCategory } from '../../api/apiService';
import CategorySideMenu from '../CategorySideMenu'
import Post from '../new-feed/Post';

export default function Home() {

    const param = useParams();

    const categoryId = param.id?.split("_")[1].split("x123")[0];

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getAllPostByCategory(categoryId).then(res => {
            setPosts(res.data.content);
        }).catch(err => {
            console.log(err);
            toast.error("Error loading posts!!", { position: "top-center", hideProgressBar: true })
        })
    }, [categoryId])


    return (
        <>
            <Row className='pt-3'>
                <Col md={2} className="p-3">
                    <CategorySideMenu />
                </Col>
                <Col md={10}>
                    <div className='w-100 d-flex justify-content-between mt-3'>
                        <h1 className='ps-1 text-capitalize fw-bold'>{param.slug}</h1>
                        {/* <SortByComp retrieveAllPosts={retrieveAllPosts} updateSortBy={updateSortBy} /> */}
                    </div>
                    {posts?.map((post, index) => {
                        return (
                            <Post post={post} key={index} />
                        )
                    })
                    }
                </Col>
            </Row>
        </>

    )
}
