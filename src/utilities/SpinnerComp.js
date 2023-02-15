import React from 'react'
import { Spinner } from 'reactstrap'

export default function SpinnerComp() {
    return (
        <div className='flex-center text-success' style={{ minHeight: '90vh' }}>
            <span style={{ fontSize: '3.5rem' }}>L<Spinner color='danger' />ading...</span>
        </div>
    )
}
