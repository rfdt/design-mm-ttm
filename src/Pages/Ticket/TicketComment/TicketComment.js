import React from 'react';
import {Tag} from "primereact/tag";
import CommentFile from './TicketCommentFile'
import './TicketComment.css';

function TicketComment({files, text}) {
    // Files и text - заглушки на время отсуствия бд. Потом это записи из бд и т.д.
    return (
        <div className="Comment__Container">
            <div className="Comment__Header">
                <div className="Comment__Author">Кушнир Артём Александрович</div>
                <div className="Comment__Theme">
                    <Tag
                        severity="warning"
                        value="Передано на выезд"
                        className="Comment__Theme-Tag"
                    ></Tag>
                </div>
            </div>
            <div
                className="Comment__Text"
                dangerouslySetInnerHTML={{__html: text}}
            ></div>
            {files.length > 0 ? (
                <div className="Comment__Files">
                    {files.map((file) => (
                        <CommentFile key={file.id} name={file.name}/>
                    ))}
                </div>
            ) : null}
            <div className="Comment__Date">
                Создано: <span>{new Date().toLocaleString()}</span>
            </div>
        </div>
    );
}

export default TicketComment;