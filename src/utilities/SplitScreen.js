import React from 'react'

export default function SplitScreen({ children }) {
    const [left, right] = children;

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ flex: 2, backgroundColor: 'red' }}>
                {left}
            </div>
            <div style={{ flex: 2, backgroundColor: 'green' }}>
                {right}
            </div>
        </div>
    )
}
