import React from 'react';
import { useParams } from 'react-router-dom';
import MessageForm from '../../components/forms/MessageForm';
import { sendMessage } from '../../services/messageService';

const SendMessage = () => {
  const { threadId } = useParams();

  const handleSubmit = async (values) => {
    try {
      await sendMessage(threadId, values);
      alert('Message sent');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <MessageForm onSubmit={handleSubmit} />
    </div>
  );
};

export default SendMessage;