'use client'
import Link from "next/link";
import TicketList from "../components/tickets/ticket-list";

export default function Tickets() {
    return (
        <div>
            <div className="flex justify-between align-center p-4">
                <h1 className="text-2xl font-bold mb-4">Support Tickets</h1>
                    <Link href="/tickets/create">
                        <button className="bg-green-500 text-white py-2 px-4 rounded">Add New Ticket</button>
                    </Link>
            </div>
            <TicketList />
        </div>
    );
}