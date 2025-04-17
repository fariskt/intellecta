import { v4 as uuidv4 } from "uuid";
import { publishToQueue, consumeFromQueue } from "./rabbitmq"; // Import functions

// Function to get users from RabbitMQ
export async function getBulkUsers(userIds: string[]): Promise<any[]> {
  return new Promise(async (resolve, reject) => {
    const correlationId = uuidv4(); // Unique ID for this request
    const replyQueue = "user_fetched"; // The queue where the response will be sent

    // Listen for the response in the replyQueue
    await consumeFromQueue(replyQueue, (data) => {
      if (data.correlationId === correlationId) {
        resolve(data.users); // When response is received, resolve the promise with the users
      }
    });

    // Publish the request to the get_users queue
    await publishToQueue("get_bulk_users", {
      userIds,
      correlationId, // So we can match the response
      replyTo: replyQueue, // The queue to send the response to
    });

    // Optional: Timeout after 5 seconds if no response
    setTimeout(() => reject(new Error("Timeout waiting for user data")), 5000);
  });
}
