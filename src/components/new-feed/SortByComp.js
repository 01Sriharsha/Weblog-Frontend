import React from 'react'
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap'

export default function SortByComp(props) {

    return (
        <UncontrolledDropdown className="me-2" direction="down">
            <DropdownToggle caret size='sm'> Sort By </DropdownToggle>
            <DropdownMenu className='pt-2'>
                <DropdownItem onClick={() => {
                    props.updateSort("postTitle")
                    // props.LoadAllPostsOnSort(0, 10, "postTitle", "ASC")
                }}>
                    Title
                </DropdownItem>

                <DropdownItem onClick={() => {
                    props.updateSort("creationDate")
                    // props.LoadAllPostsOnSort(0, 10, "creationDate", "ASC")
                }}>
                    Creation Date
                </DropdownItem>
                <DropdownItem onClick={() => {
                    props.updateSort("ASC")
                    // props.LoadAllPostsOnSort(0, 10, "creationDate", "DESC")
                }}>
                    ASC
                </DropdownItem>
                <DropdownItem onClick={() => {
                    props.updateSort("DESC")
                    // props.LoadAllPostsOnSort(0, 10, "creationDate", "DESC")
                }}>
                    DESC
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    )
}
