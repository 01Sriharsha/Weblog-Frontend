import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import { Badge, Button, Card, CardBody, CardImg, Col, Row } from 'reactstrap'
import { BASE_URL } from '../../api/apiService'
import { CustomContext } from '../../context/AuthContext'
import { MdDelete } from 'react-icons/md'
import ConfirmModal from '../../utilities/ConfirmModal'
import { FiEdit } from 'react-icons/fi'

export default function Post({ post, deletePost }) {

    const context = CustomContext();

    const location = useLocation();

    const userDashboardPath = location.pathname === '/user/dashboard';


    const [animate, setAnimate] = useState(false);

    function slugify(slug) {
        const str = slug.toLowerCase().replace(/ /g, '-')
            .replace(/[^\w-]+/g, '')
        return str;
    }

    const printDate = new Date(post?.creationDate).toDateString().substring(4, 15);

    return (
        <Card className='post-card'
            onMouseEnter={() => setAnimate(true)}
            onMouseLeave={() => setAnimate(false)}
        >
            <CardBody className='d-flex align-items-center'>
                <Row className='card-row d-flex align-items-center'>
                    <Col sm={8} md={9} className="card-col">
                        <Row md={12} className='py-2 mt-2'>
                            <h3 className='fw-bolder text-capitalize'>
                                {post.postTitle}</h3>
                        </Row>
                        <Row className='py-2 px-0 m-0 d-flex align-items-center text-secondary' >
                            <Col xs={12} md={12} className='d-flex px-0 gap-2' style={{ cursor: 'pointer' }}>
                                <FaUser size={'1.2rem'} />
                                <strong>{post?.user?.username}</strong>
                                <span>&nbsp;|&nbsp;</span>
                                <em className='fw-bold'>{printDate}</em>
                            </Col>
                        </Row>
                        <Row className='py-2'>
                            <Col xs={12} sm={12} md={12} lg={12} className='d-flex pt-2'>
                                <span
                                    className='pe-3 feed-content'
                                    //appending content data as a html element
                                    dangerouslySetInnerHTML={{
                                        __html: post?.content?.trim().substring(0, 1500)
                                    }} />
                            </Col>
                        </Row>
                        <Row className="py-2 w-100">
                            <Col xs={8} sm={8} md={10} className='d-flex align-items-center gap-3'>
                                <Link to={`/posts/${post.id}/${slugify(post.postTitle)}`}>
                                    <Button color='success' className={`${animate && 'vibrate-3'}`} onClick={() => window.scroll(0, 0)}>
                                        Read More</Button>
                                </Link>
                                <p className='m-0'>Read {Math.floor((0.008) * post?.content?.split(" ").length)} min</p>
                            </Col>

                            <Col xs={4} sm={4} md={2} className='d-flex align-items-center justify-content-between'>
                                {/* Only for user post who has logged in and he should be in user dashboard  */}

                                {((context?.user?.id === post?.user?.id) && (location.pathname === '/user/dashboard')) &&
                                    <>
                                        <span>
                                            <FiEdit className='edit-icon' color='success' size={'1.8rem'} />
                                        </span>
                                        <span>
                                            <ConfirmModal
                                                // name={<Button color='danger'>Delete</Button>}
                                                icon={<MdDelete className='delete-icon' size={'1.8rem'} />}
                                                title={"Delete"}
                                                body={"Are you sure want to delete this post ?"}
                                                action={deletePost}
                                                postId={post.id}
                                            />
                                        </span>

                                    </>
                                }
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={4} md={3} className="card-col py-2" >
                        <div className="rounded w-100">
                            <CardImg
                                src={BASE_URL + `/api/v1/posts/image/${post.image}`}
                                style={{ width: '100%', height: '100%' }} />
                        </div>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}


