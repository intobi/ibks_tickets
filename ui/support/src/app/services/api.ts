// services/api.js
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://localhost:44334', // Update the base URL to your API's address
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
});

export const fetchTickets = async (page: number, pageSize: number) => {
    const response = await apiClient.get('/tickets', {
        params: { page, pageSize }
    });
    return response.data;
};


export const fetchTicketDetails = async (ticketId: any) => {
    const response = await apiClient.get(`/tickets/${ticketId}`);
    return response.data;
};

export const createTicket = async (ticketData: any) => {
    const response = await apiClient.post('/tickets', ticketData);
    return response.data;
};

export const updateTicket = async (ticketData: any) => {
    const response = await apiClient.put('/tickets', ticketData);
    return response.data;
};

export const fetchReplies = async (ticketId: any) => {
    const response = await apiClient.get(`/ticket-replies/${ticketId}`);
    return response.data;
};

export const sendReply = async (replyData: any) => {
    const response = await apiClient.post('/ticket-replies', replyData);
    return response.data;
};