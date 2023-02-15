import React from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

export default function PaginationComp(props) {
    return (
        <Pagination className='w-100 flex-center my-3' color='success'>
            <PaginationItem
                disabled={props.posts.pageNumber === 0}
                onClick={() => props.posts.pageNumber !== 0 &&
                    props.retrieveAllPosts(props.posts.pageNumber - 1, 10, props.sortBy)}
            >
                <PaginationLink previous>Prev</PaginationLink>
            </PaginationItem>
            {
                // converting totalPages which is a number value to an array to map over
                [...Array(props.posts.totalPages)].map((page, index) => {
                    return (
                        <PaginationItem
                            key={index}
                            active={index === props.posts.pageNumber}
                            onClick={() => props.retrieveAllPosts(index, 10, props.sortBy)}
                        >
                            <PaginationLink>
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    )
                })
            }
            <PaginationItem
                disabled={props.posts.lastPage}
                onClick={() => !props.posts.lastPage &&
                    props.retrieveAllPosts(props.posts.pageNumber + 1, 10, props.sortBy)}
            >
                <PaginationLink next>Next</PaginationLink>
            </PaginationItem>
        </Pagination>
    )
}
