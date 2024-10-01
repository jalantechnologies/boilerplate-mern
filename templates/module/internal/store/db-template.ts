import { Schema, Types } from "mongoose";

export $dbTypeDef

export const $entityNameDbSchema: Schema = new Schema<$entityNameDB>(
  $dbSchema,
  {
    collection: "$moduleName",
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);
