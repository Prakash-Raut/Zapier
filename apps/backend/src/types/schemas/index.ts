import { z } from "zod";

export const SignupSchema = z.object({
	name: z
		.string()
		.min(3, { message: "Name must be at least 3 characters long" }),
	email: z.string().email({ message: "Invalid email address" }),
	password: z
		.string()
		.min(6, { message: "Password must be at least 6 characters long" }),
});

export const SigninSchema = z.object({
	email: z.string().email({ message: "Invalid email address" }),
	password: z.string({ message: "Password is required" }),
});

export const ZapCreateSchema = z.object({
	availableTriggerId: z.string({ message: "Trigger ID is required" }),
	triggerMetadata: z.any().optional(),
	actions: z
		.array(
			z.object({
				availableActionId: z.string({
					message: "Action ID is required",
				}),
				actionMetadata: z.any().optional(),
			}),
		)
		.nonempty({ message: "At least one action is required" }),
});
