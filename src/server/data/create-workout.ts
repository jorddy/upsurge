import { Prisma } from "@prisma/client";
import { prisma } from "../db";
import { CreateWorkoutInput } from "@/shared/create-workout-validator";

export const createWorkout = async (
  input: CreateWorkoutInput,
  userId: string
) =>
  prisma.workout.create({
    data: {
      name: input.name,
      createdAt: input.createdAt,
      user: { connect: { id: userId } },
      entries: {
        create: input.entries.map(entry => ({
          createdAt: input.createdAt,
          sets: {
            createMany: {
              data: entry.sets.map(set => ({
                ...set,
                createdAt: input.createdAt
              }))
            }
          },
          notes: entry.notes,
          exercise: { connect: { id: entry.exerciseId } }
        }))
      }
    }
  });

export type CreateWorkout = Prisma.PromiseReturnType<typeof createWorkout>;
