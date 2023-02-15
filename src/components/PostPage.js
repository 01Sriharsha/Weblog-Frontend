import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { Card, CardBody, CardImg, CardText, Col, Row } from 'reactstrap';
import { BASE_URL, getAllPosts, getSinglePost } from '../api/apiService';
import SpinnerComp from '../utilities/SpinnerComp';
import { FaCommentAlt } from 'react-icons/fa'
import Comment from './postpage/Comments';
import Post from './new-feed/Post';

export default function PostPage() {

  const param = useParams();

  const [show, setShow] = useState(false);

  const toggle = () => setShow(!show);

  const [allPosts, setAllPosts] = useState(null);

  const [post, setPost] = useState(null);

  useEffect(() => {
    loadAllPosts();
  }, [])

  //checking wheteher comment section is updated
  const [updateComment, setUpdateComment] = useState(false)

  //if comment section is updated fetching updated post
  useEffect(() => {
    retrieveSinglePost();
  }, [param.id, updateComment])

  async function isCommentSectionRefreshed(option) {
    if (option) {
      setUpdateComment(true)
    } else {
      setUpdateComment(false)
    }
  }

  const retrieveSinglePost = async () => {
    try {
      const response = await getSinglePost(param.id);
      setPost(response?.data)
    } catch (error) {
      console.log(error);
      toast.error("Couldn't load post", { position: 'top-center' })
    }
  }

  const loadAllPosts = () => {
    getAllPosts(0, 5, "postTitle").then((res) => {
      setAllPosts(res.data);
    }).catch((error) => {
      console.log(error);
    })
  }

  const printDate = (data) => new Date(data).toDateString().substring(4, 15);

  return (
    <Row className='bg-light min-height'>
      {
        (post) ? (
          <Col md={12} className='left-post-content'>
            {/* Post Section */}
            <div className='mt-3 text-capitalize ps-3 py-2'>
              <em>Category  : </em>
              Published in &nbsp;
              <strong>{post?.category.categoryTitle}</strong>
            </div>
            <hr />
            <Card className='my-3 border-0 py-3'>
              <div className='bg-light ps-3'>
                <CardText className='text-capitalize'>
                  <em>Published by ,&nbsp;</em>
                  <strong>{post?.user.username}</strong>
                  <span>&nbsp; at &nbsp;<strong>{printDate(post.creationDate)}</strong></span>
                </CardText>
                <h1 className='fs-1 text-capitalize' style={{ fontWeight: 'bolder' }}>
                  {post.postTitle}
                </h1>
              </div>
              <CardBody className='w-100 d-flex justify-content-center flex-column align-items-center'>
                <div >
                  <div className='w-50 rounded'>
                    <CardImg
                      src={BASE_URL + `/api/v1/posts/image/${post.image}`}
                      style={{ maxWidth: '100%' }}
                    />
                  </div>
                </div>
                <CardText
                  className='a-success mt-5 text-dark'
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </CardBody>

              {/* Comment Section (Icon) */}
              <div className='comment-section px-3 pb-2 d-flex justify-content-end align-items-center gap-1' style={{ cursor: 'pointer' }} onClick={toggle}>
                <span className='text-decoration-underline text-success fw-bold'>Comments</span>&nbsp;
                <FaCommentAlt className='text-success' size={'1.3rem'} />
                <span>{post.comments.length}&nbsp;</span>
              </div>
              <Comment postId={param.id} show={show} toggle={toggle} isCommentSectionRefreshed={isCommentSectionRefreshed} />
            </Card>
          </Col>
        ) : (
          <SpinnerComp />
        )
      }
      <div>
        <h1 className='fs-4 fw-bolder'>More From Weblog</h1>
        {
          (allPosts && allPosts?.content.length) ? (
            <div>
              {//listing all posts except the current opened post using filter and then mapping..
                allPosts?.content.filter(currentPost => currentPost.id !== post.id)
                  .map((post) => {
                    return (
                      <Post key={post.id} post={post} />
                    )
                  })
              }
            </div>
          ) : (
            <SpinnerComp />
          )
        }
      </div>
    </Row >
  )
}
