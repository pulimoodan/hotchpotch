import React, { useState, useEffect } from "react";
import { IoClose } from 'react-icons/io5';

const Message = (props) => {
    const [message, setMessage] = useState(props.message);
    const [active, setActive] = useState(false);

    useEffect(() => 
        {
            setMessage(props.message);
            if (props.message !== "")
            {
                setActive(true);
                setTimeout(() => 
                    {
                        setActive(false);
                    }, 
                    5000
                );
            }
        },
        [props.message]
    );

    const closeMessage = () =>
    {
        setActive(false);
    }

    return (
        <div className={"message error " + (active ? "active ": "") + (props.type) }>
            <p>{message}</p>
            <div className="close" onClick={closeMessage}>
                <IoClose size={20}/>
            </div>
        </div>
    );
};

export default Message;
