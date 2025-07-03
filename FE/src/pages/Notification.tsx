import React, { useState } from 'react';
 
const Notifications: React.FC = () => {
  const [reminder, setReminder] = useState('');
 
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Patient Notifications</h2>
      <input
        type="text"
        placeholder="Reminder message"
        value={reminder}
onChange={(e) => setReminder(e.target.value)}
        className="w-full border p-2 rounded mb-2"
      />
      <button className="bg-yellow-600 text-white px-4 py-2 rounded">Send Notification</button>
    </div>
  );
};
 
export default Notifications;