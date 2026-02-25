import z from "zod";
import { Gender } from "../../../generated/prisma/enums";

export const createDoctorZodSchema = z.object({
    password: z.string("Password is required").min(6, "Password must be at least 6 characters").max(20, "Password must be less than 20 characters"),
    doctor: z.object({
        name: z.string("Name is required").min(5, "Name must be at least 5 characters").max(50, "Name must be less than 50 characters"),
        email: z.string("Email is required"),
        contactNumber: z.string("Contact number is required").min(10, "Contact number must be at least 10 characters").max(15, "Contact number must be less than 15 characters"),
        address: z.string("Address is required").min(10, "Address must be at least 10 characters").max(100, "Address must be less than 100 characters").optional(),
        registrationNumber: z.string("Registration number is required"),
        experience: z.int("Experience must be an integer").nonnegative("Experience must be a non-negative integer").optional(),
        gender: z.enum([Gender.MALE, Gender.FEMALE], "Gender must be either Male or Female"),

        qualification: z.string("Qualification is required").min(5, "Qualification must be at least 5 characters").max(100, "Qualification must be less than 100 characters").optional(),
        currentWorkingPlace: z.string("Current working place is required").min(5, "Current working place must be at least 5 characters").max(100, "Current working place must be less than 100 characters").optional(),
        designation: z.string("Designation is required").min(5, "Designation must be at least 5 characters").max(100, "Designation must be less than 100 characters").optional(),

    }),

    specialties: z.array(z.uuid(),"specialties must be an array of UUIDs").min(1, "At least one specialty is required")
})
