const SUPABASE_URL = "https://ttzzzkcvuctveiqgyimf.supabase.co/rest/v1";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0enp6a2N2dWN0dmVpcWd5aW1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxMTE0NDYsImV4cCI6MjA3MTY4NzQ0Nn0.hasefB_bP6qOi_KUb6RT1J8v1oOsGvKOakLqMcscogw"; // replace with your actual anon key

// Define the type for a message
interface Message {
  name: string;
  email: string;
  mobile: string;
  message: string;
}

// Save a new message
export async function createMessage({ name, email, mobile, message }: Message) {
  const response = await fetch(`${SUPABASE_URL}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": API_KEY,
      "Authorization": `Bearer ${API_KEY}`,
      "Prefer": "return=representation"
    },
    body: JSON.stringify({ name, email, mobile, message }),
  });

  if (!response.ok) {
    throw new Error("Failed to save message");
  }

  return await response.json();
}

// Fetch all messages
export async function getMessages(): Promise<Message[]> {
  const response = await fetch(`${SUPABASE_URL}/messages?select=*`, {
    headers: {
      "apikey": API_KEY,
      "Authorization": `Bearer ${API_KEY}`
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch messages");
  }

  return await response.json();
}
