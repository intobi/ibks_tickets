import TicketDetails from "@/app/components/tickets/ticket-details";

export default async function Page({
    params,
}: {
    params: Promise<{ ticketId: number }>
}) {
    const ticketId = (await params).ticketId
    

    if (!ticketId) return <div>Loading...</div>;

    return <TicketDetails ticketId={ticketId} />;
}