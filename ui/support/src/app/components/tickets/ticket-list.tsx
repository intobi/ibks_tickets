'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchTickets } from '../../services/api';

export default function TicketList() {
    const [tickets, setTickets] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 6; // Number of tickets per page

    useEffect(() => {
        const loadTickets = async () => {
            const data = await fetchTickets(page - 1, pageSize);
            setTickets(data.items);
            setTotalPages(data.totalPages);
        };
        loadTickets();
    }, [page]);

    const handlePreviousPage = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };

    return (
        <div className="p-6">
            <table className="min-w-full bg-white mt-4">
                <thead>
                    <tr>
                        <th className="px-6 py-3 border-b">#</th>
                        <th className="px-6 py-3 border-b">Title</th>
                        <th className="px-6 py-3 border-b">Module</th>
                        <th className="px-6 py-3 border-b">Type</th>
                        <th className="px-6 py-3 border-b">State</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map((ticket: any) => (
                        <tr key={ticket.id} className="hover:bg-gray-100">
                            <td className="px-6 py-4 border-b">{ticket.id}</td>
                            <td className="px-6 py-4 border-b">
                                <Link href={`/tickets/${ticket.id}`}>
                                    <div className="text-blue-500">{ticket.title}</div>
                                </Link>
                            </td>
                            <td className="px-6 py-4 border-b">{ticket.module}</td>
                            <td className="px-6 py-4 border-b">{ticket.type}</td>
                            <td className="px-6 py-4 border-b">{ticket.state}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={handlePreviousPage}
                    disabled={page === 1}
                    className={`px-4 py-2 rounded ${page === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
                >
                    Previous
                </button>
                <span className="text-gray-600">Page {page} of {totalPages}</span>
                <button
                    onClick={handleNextPage}
                    disabled={page === totalPages}
                    className={`px-4 py-2 rounded ${page === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
}