import { consumeFromQueue } from "../utils/rabbitmq/rabbitmqConsumer"; 

const userCache = new Map<string, any>();

async function startConsumer() {
    console.log("Initializing RabbitMQ consumer...");
  
    await consumeFromQueue("userData", async (data) => {
        if (data) {
            userCache.set(data._id, data);
            console.log("Content consumer received user_fetched event:", userCache);
        }
    });
}

startConsumer().catch((err) => console.error("Failed to start consumer:", err));

export function getUserData(userId: string) {
    return new Promise((resolve, reject) => {
        const checkCache = () => {
            if (userCache.has(userId)) {
                resolve(userCache.get(userId));
            } else {
                setTimeout(checkCache, 500); 
            }
        };
        checkCache();
    });
}
