export async function sendMsgToOpenAI(message) {
    try {
        const response = await fetch('http://localhost:5000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });
        const data = await response.json();
        console.log('API response:', data);
        return data.text;
    } catch (error) {
        console.error("Error communicating with server:", error);
        throw error;
    }
}
