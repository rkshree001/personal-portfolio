import { useState } from "react"
import { createMessage } from "../lib/supabase"   

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "", message: "" })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus("")

    try {
      await createMessage(formData)
      setStatus("✅ Message sent successfully!")
      setFormData({ name: "", email: "", mobile: "", message: "" })
    } catch (error) {
      console.error(error)
      setStatus("❌ Failed to send message.")
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Send me a message</h2>

      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full p-2 mb-3 border rounded"
      />

      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full p-2 mb-3 border rounded"
      />

      <input
        type="text"
        name="mobile"
        placeholder="Your Mobile"
        value={formData.mobile}
        onChange={handleChange}
        required
        className="w-full p-2 mb-3 border rounded"
      />

      <textarea
        name="message"
        placeholder="Your Message"
        value={formData.message}
        onChange={handleChange}
        required
        className="w-full p-2 mb-3 border rounded"
        rows={4}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>

      {status && <p className="mt-3 text-center">{status}</p>}
    </form>
  )
}
