'use client'
import { useEffect, useState } from 'react';
import { fetchReplies, fetchTicketDetails, sendReply, updateTicket } from '../../services/api';
import Link from 'next/link';
import ReplyList from '../replies/reply-list';

export default function TicketDetails({ ticketId }: any) {
    const [ticket, setTicket]: any = useState(null);
    const [isLoading, setIsLoading]: any = useState(true);
    const [isSubmitting, setIsSubmitting]: any = useState(false);

    const [title, setTitle]: any = useState('');
    const [description, setDescription]: any = useState('');
    const [typeId, setTypeId]: any = useState('');
    const [priorityId, setPriorityId]: any = useState('');
    const [applicationId, setApplicationId]: any = useState('');
    const [statusId, setStatusId]: any = useState('');

    const [replies, setReplies]: any = useState([]);
    const [newReply, setNewReply]: any = useState('');

    useEffect(() => {
        const getTicketDetails = async () => {
            try {
                const data: any = await fetchTicketDetails(ticketId);
                setTicket(data);
                setTitle(data.title);
                setDescription(data.description);
                setTypeId(data.typeId);
                setPriorityId(data.priorityId);
                setApplicationId(data.applicationId);
                setStatusId(data.statusId);
            } catch (error) {
                console.error('Error fetching ticket details:', error);
            } finally {
                setIsLoading(false);
            }
        };

        const loadReplies = async () => {
            const data = await fetchReplies(ticketId);
            setReplies(data);
        };

        loadReplies();
        getTicketDetails();
    }, [ticketId]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsSubmitting(true);

        const updatedTicket = {
            ticketId,
            title,
            description,
            typeId: parseInt(typeId),
            priorityId: parseInt(priorityId),
            applicationId: parseInt(applicationId),
            statusId: parseInt(statusId),
            applicationName: 'HR',
        };

        try {
            await updateTicket(updatedTicket);
            alert('Ticket updated successfully!');
        } catch (error) {
            console.error('Error updating ticket:', error);
            alert('Failed to update ticket.');
        } finally {
            setIsSubmitting(false);
        }
    };


    const handleReplySubmit = async () => {
        const replyData = { ticketId, replyText: newReply };
        const reply = await sendReply(replyData);
        setReplies([...replies, reply]);
        setNewReply('');
    };

    if (isLoading) {
        return <div>Loading ticket details...</div>;
    }

    return (
        <>
            <div className="p-6 max-w-md mx-auto bg-white rounded-md shadow-md">
                <h2 className="text-2xl font-bold mb-4">Ticket #{ticketId} - Edit</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-gray-700">Type</label>
                        <select
                            value={typeId}
                            onChange={(e) => setTypeId(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="">Select Type</option>
                            <option value="1">Question</option>
                            <option value="2">Issue</option>
                            <option value="3">Suggestion</option>
                            <option value="4">Feedback</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700">Priority</label>
                        <select
                            value={priorityId}
                            onChange={(e) => setPriorityId(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="">Select Priority</option>
                            <option value="1">Low</option>
                            <option value="2">Medium</option>
                            <option value="3">High</option>
                            <option value="4">None</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700">Application</label>
                        <select
                            value={applicationId}
                            onChange={(e) => setApplicationId(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="">Select Application</option>
                            <option value="1">Loader</option>
                            <option value="2">Finance</option>
                            <option value="3">HR</option>
                            <option value="12">Clusters</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700">Status</label>
                        <select
                            value={statusId}
                            onChange={(e) => setStatusId(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="">Select Status</option>
                            <option value="1">New</option>
                            <option value="2">Open</option>
                            <option value="3">Awaiting response - User</option>
                            <option value="4">Awaiting response - Development</option>
                            <option value="5">Awaiting response - Vendor</option>
                            <option value="6">Closed</option>
                        </select>
                    </div>
                    <div className="flex align-center justify-between">
                        <Link href="/tickets">
                            <button
                                type="submit"
                                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                            >
                                Close
                            </button>
                        </Link>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            {isSubmitting ? 'Updating...' : 'Update Ticket'}
                        </button>
                    </div>
                </form>
            </div>

            <div className="p-6 max-w-md mx-auto bg-white rounded-md shadow-md">
                <h2 className="text-xl font-bold mt-6">Replies</h2>
                <ReplyList replies={replies} />
                <textarea
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    className="w-full border mt-2 p-2"
                    placeholder="Write your reply..."
                ></textarea>
                <button onClick={handleReplySubmit} className="bg-blue-500 text-white py-2 px-4 rounded mt-2">
                    Send Reply
                </button>
            </div>
        </>
    );
}