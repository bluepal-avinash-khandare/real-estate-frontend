import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { getMessagesForThread, sendMessage, getMyChatThreads } from '../../services/messageService';
import MessageForm from '../../components/forms/MessageForm';

const AgentMessages = () => {
  const { threadId } = useParams();
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const prevMessagesLengthRef = useRef(0);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (messages.length > prevMessagesLengthRef.current) {
      scrollToBottom();
    }
    prevMessagesLengthRef.current = messages.length;
  }, [messages]);

  // Auto-refresh effect
  useEffect(() => {
    let messageInterval;
    let threadInterval;

    // Set up intervals for auto-refresh
    if (threadId) {
      // Refresh messages every 3 seconds
      messageInterval = setInterval(() => {
        fetchMessages(true); // true indicates silent refresh (no loading state)
      }, 3000);
    }

    // Refresh threads every 10 seconds
    threadInterval = setInterval(() => {
      fetchThreads();
    }, 10000);

    // Initial fetch
    fetchThreads();
    if (threadId) {
      fetchMessages();
    }

    // Clean up intervals on unmount or when threadId changes
    return () => {
      clearInterval(messageInterval);
      clearInterval(threadInterval);
    };
  }, [threadId]);

  const fetchMessages = async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const response = await getMessagesForThread(threadId);
      console.log('Messages response:', response);
      
      // Handle different response structures
      let newMessages = [];
      if (response.data && response.data.content) {
        newMessages = response.data.content;
      } else if (Array.isArray(response.data)) {
        newMessages = response.data;
      } else if (response.content) {
        newMessages = response.content;
      }
      
      setMessages(newMessages);
      
      // Mark messages as read
      if (threadId && newMessages.length > 0) {
        try {
          // Assuming you have a function to mark messages as read
          // await markMessagesAsRead(threadId);
        } catch (err) {
          console.error('Error marking messages as read:', err);
        }
      }
    } catch (err) {
      if (!silent) {
        setError('Failed to load messages');
        console.error('Error fetching messages:', err);
      }
    } finally {
      if (!silent) setLoading(false);
    }
  };

  const fetchThreads = async () => {
    try {
      const response = await getMyChatThreads();
      console.log('Threads response:', response);
      
      // Handle different response structures
      if (response.data && response.data.content) {
        setThreads(response.data.content);
      } else if (Array.isArray(response.data)) {
        setThreads(response.data);
      } else if (response.content) {
        setThreads(response.content);
      } else {
        setThreads([]);
      }
    } catch (err) {
      console.error('Error fetching threads:', err);
    }
  };

  const handleSendMessage = async (values, { resetForm }) => {
    setSending(true);
    try {
      await sendMessage(threadId, values);
      resetForm();
      // Immediately refresh messages after sending
      await fetchMessages();
    } catch (err) {
      setError('Failed to send message');
      console.error('Error sending message:', err);
    } finally {
      setSending(false);
    }
  };

  if (loading && threadId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#16A085]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Threads Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Conversations</h2>
                <div className="flex items-center space-x-2">
                  <Link
                    to="/agent/start-chat"
                    className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-white bg-[#16A085] hover:bg-[#138871]"
                  >
                    New Chat
                  </Link>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                    Live
                  </span>
                </div>
              </div>
              <div className="p-4">
                {threads.length === 0 ? (
                  <div className="text-center py-8">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <p className="mt-2 text-gray-500">No conversations yet</p>
                    <p className="text-sm text-gray-400 mt-1">Start a conversation with a customer</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {threads.map((thread) => (
                      <Link
                        key={thread.id}
                        to={`/agent/messages/${thread.id}`}
                        className={`block p-3 rounded-lg ${
                          thread.id === parseInt(threadId)
                            ? 'bg-[#16A085] text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <div className="flex justify-between">
                          <p className="text-sm font-medium">Thread #{thread.id}</p>
                          {thread.status === 'NEW' && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                              New
                            </span>
                          )}
                        </div>
                        <p className="text-xs opacity-75 mt-1">
                          {thread.lastMessage && thread.lastMessage !== 'No messages yet' ? 
                            thread.lastMessage.substring(0, 30) + '...' : 
                            'No messages yet'
                          }
                        </p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Messages Main Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      {threadId ? `Chat Thread #${threadId}` : 'Messages'}
                    </h1>
                    <p className="text-gray-600">
                      {threadId ? 'Chat with customer' : 'Select a conversation from the sidebar'}
                    </p>
                  </div>
                  {threadId && (
                    <div className="flex items-center space-x-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                        Live
                      </span>
                      <Link
                        to="/agent/leads"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-[#16A085] to-[#2C3E50] hover:from-[#138871] hover:to-[#1a5f4f]"
                      >
                        Back to Leads
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {threadId && (
                <div className="p-6">
                  {error && (
                    <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-red-700">{error}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Messages List */}
                  <div 
                    className="space-y-4 mb-6 max-h-96 overflow-y-auto p-2" 
                    ref={messagesContainerRef}
                  >
                    {messages.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <p className="mt-2">No messages yet. Start the conversation!</p>
                      </div>
                    ) : (
                      messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.senderId === user.id ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.senderId === user.id
                                ? 'bg-[#16A085] text-white'
                                : 'bg-gray-200 text-gray-800'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p
                              className={`text-xs mt-1 ${
                                message.senderId === user.id ? 'text-blue-100' : 'text-gray-500'
                              }`}
                            >
                              {new Date(message.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Form */}
                  <div className="border-t border-gray-200 pt-4">
                    <MessageForm onSubmit={handleSendMessage} isSubmitting={sending} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentMessages;