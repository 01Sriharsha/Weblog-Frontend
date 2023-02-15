import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { getAllPosts } from '../api/apiService'
import SortByComp from './new-feed/SortByComp';
import PaginationComp from './new-feed/PaginationComp'
import SpinnerComp from '../utilities/SpinnerComp';
import InfiniteScroll from 'react-infinite-scroll-component';
import Post from './new-feed/Post';

export default function NewFeed() {

    const [posts, setPosts] = useState({
        content: [],
        lastPage: false,
        pageNumber: 0,
        pageSize: 0,
        totalElements: 0,
        totalPages: 0
    });

    const [sortBy, setSortBy] = useState("postTitle");

    const [sortDir, setSortDir] = useState("ASC");

    const [currentPage, setCurrentPage] = useState(0);

    //updating state from child component that is SortByComponent
    const updateSort = (option) => {
        console.log(option);
        if (option === "postTitle") {
            setSortBy("postTitle")
        }
        if (option === "creationDate") {
            setSortBy("creationDate")
        }
        if (option === "ASC") {
            setSortDir("ASC")
        }
        else {
            setSortDir("DESC")
        }
    }

    //For loading all posts on change of SortBy
    useEffect(() => {
        setPosts(null);
        getAllPosts(0, 10, sortBy, sortDir).then(res => {
            setPosts(res.data)
        }).catch(err => {
            console.log(err);
        })
    }, [sortBy, sortDir])

    useEffect(() => {
        retrieveAllPosts(currentPage, 5, "creationDate", "DESC");
    }, [currentPage])

    const retrieveAllPosts = async (pageNumber = 0, pageSize = 10, sortBy = "postTitle", direction = "ASC") => {
        const verifySortBy = (sortBy === null) || (sortBy === undefined) ? ("postTitle") : (sortBy);
        console.log(pageNumber);
        console.log(pageSize);
        console.log(sortBy);
        console.log(direction);
        try {
            const response = await getAllPosts(pageNumber, pageSize, verifySortBy, direction);
            console.log(response.data);
            // window.scrollTo(0, 0);
            // setPosts(response.data);

            //Setting content of next page
            setPosts({
                //merging already existing posts with the coming page posts
                content: [...posts.content, ...response.data.content],
                lastPage: response.data.lastPage,
                pageNumber: response.data.pageNumber,
                pageSize: response.data.pageSize,
                totalElements: response.data.totalElements,
                totalPages: response.data.totalPages
            })

        } catch (error) {
            console.log(error);
            toast.error("Error loading posts!!", { position: "top-center" })
        }
    }

    //implmenting infinite scroll
    const changePageInfinite = () => {
        console.log("page changed");
        setCurrentPage(currentPage + 1)
    }

    return (
        <div className='new-feed'>
            <div className='w-100 d-flex justify-content-between mt-3'>
                <h1 className=''>Recent Posts</h1>
                <SortByComp updateSort={updateSort} />
            </div>
            <>
                {posts && posts.content.length
                    ? (
                        <InfiniteScroll
                            dataLength={posts?.content.length}
                            next={changePageInfinite}
                            hasMore={!posts.lastPage}
                            loader={<SpinnerComp />}
                            endMessage={
                                <p style={{ textAlign: 'center' }}>
                                    <b>Yay! You have seen it all</b>
                                </p>
                            }
                        >
                            {
                                posts?.content.map((post, index) => {
                                    return (
                                        <Post key = { index } post = { post } />
                                    )
                            })
                            }
                            {/* <PaginationComp posts={posts} retrieveAllPosts={retrieveAllPosts} sortBy={sortBy} /> */}
                        </InfiniteScroll>
                    ) : (
                        <SpinnerComp />
                    )
                }
            </>
        </div>
    )
}