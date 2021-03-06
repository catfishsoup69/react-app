import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Message } from '../Message/message';
import { authors } from '../../utils/constants';

import './messageField.scss'

const initialMessages = {
  'id1': [],
  'id2': [],
  'id3': [],
  'id4': [],
  'id5': [],
};

const MessageField = () => {

  const {chatId} = useParams();

  const [messageArr, setMessageArr] = useState(initialMessages)

  const addMessage = useCallback((newMessage) => {
    setMessageArr({...messageArr, [chatId]: [...messageArr[chatId],{...newMessage, id: messageArr[chatId].length}]
    }, [chatId, messageArr])
  })

  useEffect(() => {
    let timeout;

    if (messageArr[chatId]?.[messageArr[chatId]?.length - 1]?.author === authors.human) {
      timeout = setTimeout(() => {
        addMessage({text: 'Смотри, я отвечаю! :)', author: authors.bot})
      }, 750)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [messageArr])

  return (
    <div className='message-field'>
      <div className='message-field--sent'>
        { messageArr[chatId]?.map(({author, text, id}) => {
          return (
            <div key={ id } className={ author === 'human' ? 'right' : '' }>
              { author }: { text }
            </div>
          )
        }) }
      </div>
      <Message addMessage={ addMessage }/>
    </div>
  )
}

export { MessageField };