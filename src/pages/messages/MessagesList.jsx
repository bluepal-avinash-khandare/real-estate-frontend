import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMessagesForThread } from '../../services/messageService';
import Table from '../../components/common/Table';
import Filter from '../../components/common/Filter';

const MessagesList = () => {
  const { threadId } = useParams();
  const [messages, setMessages] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      const data = await getMessagesForThread(threadId, { search: filter });
      setMessages(data.data.content);
    };
    fetchMessages();
  }, [filter, threadId]);

  const handleFilterChange = (e) => setFilter(e.target.value);

  const headers = ['ID', 'Content'];

  const rows = messages.map((msg) => ({ id: msg.id, content: msg.content }));

  return (
    <div>
      <Filter onChange={handleFilterChange} placeholder="Search Messages" />
      <Table headers={headers} rows={rows} />
    </div>
  );
};

export default MessagesList;