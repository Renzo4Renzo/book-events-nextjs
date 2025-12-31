import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Event, { IEvent } from "@/database/event.model";

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * GET /api/events/[slug]
 * Fetches a single event by its slug
 */
export async function GET(request: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  try {
    // Await params to access the slug (Next.js 15+ async params)
    const { slug } = await params;

    // Validate slug parameter exists
    if (!slug) {
      return NextResponse.json({ message: "Slug parameter is required" }, { status: 400 });
    }

    // Validate slug format (alphanumeric, hyphens, min 1 char, max 200 chars)
    const slugRegex = /^[a-z0-9-]{1,500}$/;
    if (!slugRegex.test(slug)) {
      return NextResponse.json(
        {
          message:
            "Invalid slug format. Slug must contain only lowercase letters, numbers, and hyphens (1-500 characters)",
        },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Query event by slug with proper typing
    const event: IEvent | null = await Event.findOne({ slug }).lean();

    // Handle event not found
    if (!event) {
      return NextResponse.json({ message: `Event with slug '${slug}' not found` }, { status: 404 });
    }

    // Return successful response with event data
    return NextResponse.json(
      {
        message: "Event fetched successfully",
        event,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    // Log error for debugging (use proper logging service in production)
    console.error("Error fetching event by slug:", error);

    // Handle different error types
    if (error instanceof Error) {
      // Handle database/mongoose errors
      return NextResponse.json(
        {
          message: "Failed to fetch event",
          error: error.message,
        },
        { status: 500 }
      );
    }

    // Handle unexpected errors
    return NextResponse.json(
      {
        message: "An unexpected error occurred while fetching the event",
      },
      { status: 500 }
    );
  }
}
