import React from "react";

const CommentFile = ({name}) => {
    return (
        <div className="CommentFile__Container">
            <span className="pi pi-file CommentFile__Icon"></span>
            <span className='CommentFile__Title'>{name}</span>
        </div>
    );
};

export default CommentFile