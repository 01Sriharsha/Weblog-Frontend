import React, { useState } from 'react';
import { useEffect } from 'react';
import { Form, Modal, Offcanvas } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { Button, Card, CardGroup, CardText, CardBody, Input } from 'reactstrap';
import { getAllCommentsOfPost } from '../../api/apiService';
import { createComment, deleteComment, updateComment } from '../../api/jwtService';
import { CustomContext } from '../../context/AuthContext'
import ConfirmModal from '../../utilities/ConfirmModal';

export default function Comment(props) {

    const context = CustomContext();

    const TOAST_PROP = { position: "top-center", hideProgressBar: true };

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const [comments, setComments] = useState([]);

    const [content, setContent] = useState('');

    const [update, setUpdate] = useState({ commentId: '', isUpdating: false });

    const [refreshComments, setRefreshComments] = useState(false);

    useEffect(() => {
        retrieveAllCommentsOfPost();
    }, [props.postId, refreshComments]);

    const retrieveAllCommentsOfPost = async () => {
        try {
            const response = await getAllCommentsOfPost(props.postId);
            setComments(response.data)
        } catch (error) {
            console.log(error);
            toast.error("Couldn't load comments", { position: "top-center", TOAST_PROP })
        }
    }

    const printPastDate = (data) => {
        const currentDate = new Date().getDate();
        const passedDate = new Date(data).getDate();
        const resultDate = currentDate - passedDate;
        return (resultDate === 0) ? ("Today") : (`${resultDate} Days Ago`);
    }

    //Updating a comment
    const handleUpdate = (commentId) => {
        const commentData = { content: content }
        updateComment(commentData, commentId).then(res => {
            setRefreshComments(true);
            toast.success("Comment Updated Successfully!!",)
            props.isCommentSectionRefreshed(true) //updating state of postPage comment icon
        }).catch(err => {
            console.log(err);
            toast.error("Something went wrong!! Try agian later", TOAST_PROP)
        })
    }

    //delete a comment
    const handleDelete = (commentId) => {
        deleteComment(commentId).then(res => {
            // setRefreshComments(true);
            const newComments = comments.filter(comment => comment.id !== commentId);
            setComments([...newComments])
            toast.success("Comment deleted Successfully!!", TOAST_PROP)
            props.isCommentSectionRefreshed(true)
        }).catch(err => {
            console.log(err);
            toast.error("Something went wrong!! Try agian later", TOAST_PROP)
        })
    }
    //Adding a comment
    const handleSubmit = (event) => {
        if (context.isAuthenticated) {
            if (content.trim() === "") {
                toast.error("Comment cannot ne empty!!", TOAST_PROP)
                return;
            }
            const commentData = { content: content }
            const userId = context?.user.id;
            const postId = props.postId;

            const commentPromise = createComment(commentData, userId, postId)
                .then(res => {
                    setComments([...comments, res.data])
                    props.isCommentSectionRefreshed(true)
                }).catch(err => {
                    console.log(err);
                })
            toast.promise(commentPromise, {
                pending: "Creating...",
                success: "Comment Added Successfully!!",
                error: "Something went wrong!! Comment not added",
            }, TOAST_PROP)

        } else {
            event.preventDefault();
            toast.error("Please Login To Comment!!", TOAST_PROP)
        }
    }

    return (
        <div>
            <Offcanvas show={props.show}
                onHide={props.toggle}
                backdropClassName={false}
                placement={"end"}
                className={''}
                style={{ width: '27rem' }}
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className='fw-bold'>{comments.length} Comments</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {(comments.length !== 0) ? (
                        <>
                            {comments?.map((comment) => (
                                <Card key={comment.id} className='mt-3 shadow-sm'>
                                    <CardGroup className='p-2'>
                                        <CardText className='d-flex gap-3 ps-3 m-0 w-100'>
                                            <span className='d-flex align-items-center gap-1 text-capitalize'>
                                                <FaUser size={'1.2rem'} className={"text-secondary"} />
                                                <strong>{comment.userUsername}</strong>
                                            </span>
                                            <em className='fw-semibold'>{printPastDate(comment.date)}</em>
                                        </CardText>
                                        <CardBody className='mt-2 overflow-hidden'>
                                            <span style={{ fontSize: '1.1rem' }} >
                                                {comment.content}
                                            </span>
                                            {(comment?.userId === context?.user?.id) && (
                                                <div className='mt-3 d-flex justify-content-between align-items-center'>
                                                    <ConfirmModal
                                                        icon={<MdDelete className='delete-icon' size={'1.8rem'} />}
                                                        title={"Delete"}
                                                        body={"Are you sure want to delete this comment ?"}
                                                        action={() => {
                                                            handleDelete(comment.id);
                                                            setRefreshComments(false)
                                                            props.isCommentSectionRefreshed(false)
                                                        }}
                                                    />
                                                    <FiEdit className='edit-icon' size={'1.8rem'} onClick={() => {
                                                        toggle();
                                                        setContent(comment.content);
                                                        setUpdate({
                                                            commentId: comment.id,
                                                            isUpdating: true
                                                        });
                                                    }} />
                                                </div>
                                            )}
                                        </CardBody>
                                    </CardGroup>
                                </Card>
                            ))}
                        </>
                    ) : (
                        <h2 className='text-center mt-3'>No Comments</h2>
                    )}
                </Offcanvas.Body>
                <span className='flex-center'>
                    <Button color='success' className='w-50 m-3' onClick={() => {
                        toggle();
                        setUpdate({ isUpdating: false })
                        setContent('')
                    }}>Add a Comment</Button>
                </span>
            </Offcanvas>
            <Modal show={modal} onHide={toggle}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a Comment</Modal.Title>
                </Modal.Header>
                <Form>
                    <Form.Group className="mb-3">
                        <Modal.Body>
                            <Input type="textarea" rows={3}
                                placeholder="Type Here..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button color='danger' onClick={toggle}>
                                Close
                            </Button>
                            <Button color="success" onClick={(event) => {
                                // console.log(update.isUpdating)
                                update.isUpdating ? handleUpdate(update.commentId) : handleSubmit(event);
                                setRefreshComments(false)
                                props.isCommentSectionRefreshed(false)
                                toggle();
                            }}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Form.Group>
                </Form>
            </Modal>
        </div >
    );
}

// {/* <Button color='secondary' outline
//onClick={() => {
//handleDelete(comment.id);
//setRefreshComments(false)
//props.isCommentSectionRefreshed(false)
//}}
//>Delete</Button> */}

// {/* <Button color='success' outline
//onClick={() => {
//toggle();
//setContent(comment.content);
//setUpdate({
//commentId: comment.id,
//isUpdating: true
//});
//}}>Edit</Button> */}