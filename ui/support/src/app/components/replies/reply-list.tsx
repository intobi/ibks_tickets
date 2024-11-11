'use client'
export default function ReplyList({ replies }: any) {
    return (
        <div className="mt-4">
            {replies.map((reply: any, index: any) => (
                <div key={index} className="p-2 border-b border-gray-200">
                    <p>{reply.text}</p>
                </div>
            ))}
        </div>
    );
}