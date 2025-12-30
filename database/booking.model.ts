import { Schema, model, models, Document, Types } from "mongoose";

// TypeScript interface for Booking document
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event ID is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
    },
  },
  {
    timestamps: true, // Auto-generate createdAt and updatedAt
  }
);

// Pre-save hook: Validate that the referenced event exists
BookingSchema.pre("save", async function () {
  // Only validate eventId if it's new or has been modified
  if (this.isNew || this.isModified("eventId")) {
    try {
      // Dynamically import Event model to avoid circular dependencies
      const Event = models.Event || (await import("./event.model")).default;

      const eventExists = await Event.findById(this.eventId);

      if (!eventExists) {
        throw new Error(
          `Event with ID ${this.eventId} does not exist. Cannot create booking for non-existent event.`
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Failed to validate event reference during booking creation");
      }
    }
  }
});

// Create index on eventId for faster lookup of bookings by event
BookingSchema.index({ eventId: 1 });

// Compound index for finding unique bookings (optional: prevent duplicate bookings)
BookingSchema.index({ eventId: 1, email: 1 }, { unique: true });

// Export model, reuse existing model in development to prevent OverwriteModelError
const Booking = models.Booking || model<IBooking>("Booking", BookingSchema);

export default Booking;
