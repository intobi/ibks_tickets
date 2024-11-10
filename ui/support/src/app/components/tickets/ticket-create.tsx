'use client'
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { createTicket } from '../../services/api';
import Link from 'next/link';

export default function TicketCreate() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [typeId, setTypeId] = useState('');
    const [priorityId, setPriorityId] = useState('');
    const [applicationId, setApplicationId] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsSubmitting(true);

        const ticketData = {
            title,
            description,
            typeId: parseInt(typeId),
            priorityId: parseInt(priorityId),
            applicationId: parseInt(applicationId),
            applicationName: 'HR',
        };

            try {
            const createdTicket = await createTicket(ticketData);
            alert('Ticket created successfully!');
            router.push(`/tickets/${createdTicket.id}`);
            setTitle('');
            setDescription('');
            setTypeId('');
            setPriorityId('');
            setApplicationId('');
        } catch (error) {
            console.error('Error creating ticket:', error);
            alert('Failed to create ticket.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">Create New Ticket</h2>
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
                        {isSubmitting ? 'Creating...' : 'Create Ticket'}
                    </button>
                </div>
            </form>
        </div>
    );
}