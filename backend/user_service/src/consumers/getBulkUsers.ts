import { consumeFromQueue, publishToQueue } from "../utils/rabbitmq"; // Import functions
import User from "../models/userModel"; // Your User model (Mongoose)

// Start listening for messages in the get_users queue
async function startUserConsumer() {
  await consumeFromQueue("get_bulk_users", async (data) => {
    console.log("📥 Received get_bulk_users request:", data);

    const { userIds, correlationId, replyTo } = data;

    // Fetch the users from the database (MongoDB)
    try {
      const users = await User.find({ _id: { $in: userIds } }).select("name profilePic"); // Adjust as needed
      const response = { correlationId, users };

      // Send the response back to the replyTo queue
      await publishToQueue(replyTo, response);
      console.log("📤 Sent users to reply queue:", replyTo);
    } catch (error) {
      console.error("❌ Error fetching users:", error);
    }
  });
}

// Start consuming messages
startUserConsumer();
