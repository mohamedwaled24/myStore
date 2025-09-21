'use client';
import React, { useState } from 'react';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');

    const form = e.currentTarget;
    const formData = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('Thank you! Your message has been sent.');
        form.reset();
      } else {
        alert(data.error || 'Something went wrong.');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    }

    setLoading(false);
  };

  return (
    <section id="contact" className="bg-gray-50 py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 tracking-wide">Contact Us</h2>
        <form
          className="bg-white p-8 rounded-lg shadow-md"
          onSubmit={handleSubmit}
        >
          <label className="block mb-4">
            <span className="text-gray-700 font-semibold">Name</span>
            <input
              type="text"
              name="name"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="Your name"
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700 font-semibold">Email</span>
            <input
              type="email"
              name="email"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="you@example.com"
            />
          </label>
          <label className="block mb-6">
            <span className="text-gray-700 font-semibold">Message</span>
            <textarea
              name="message"
              rows={4}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="Write your message here..."
            ></textarea>
          </label>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-600 text-white font-bold py-3 rounded-md hover:bg-pink-700 transition"
          >
            {loading ? 'Sending...' : 'Submit'}
          </button>
          {success && <p className="mt-4 text-green-600">{success}</p>}
        </form>
      </div>
    </section>
  );
}
