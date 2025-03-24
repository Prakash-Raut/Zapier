import { db } from "@repo/db";
import { Kafka } from "kafkajs";

const TOPIC_NAME = "zap-events";

const kafka = new Kafka({
	clientId: "outbox-processor",
	brokers: ["localhost:9092"],
});

async function main() {
	const producer = kafka.producer();
	await producer.connect();

	while (true) {
		const pendingRows = await db.zapRunOutbox.findMany({
			where: {},
			take: 10,
		});

		producer.send({
			topic: TOPIC_NAME,
			messages: pendingRows.map((r) => {
				return {
					value: JSON.stringify({ zapRunId: r.zapRunId, stage: 0 }),
				};
			}),
		});

		await db.zapRunOutbox.deleteMany({
			where: {
				id: {
					in: pendingRows.map((x) => x.id),
				},
			},
		});

		await new Promise((r) => setTimeout(r, 3000));
	}
}

main();
