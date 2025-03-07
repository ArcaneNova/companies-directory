import { NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'

export async function handleDatabaseError(error: unknown) {
  console.error('Database Error:', error)

  if (error instanceof Prisma.PrismaClientInitializationError) {
    return NextResponse.json(
      {
        error: 'Database connection error',
        message: 'Unable to connect to the database. Please try again later.',
      },
      { status: 503 }
    )
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Handle known Prisma errors
    switch (error.code) {
      case 'P2002':
        return NextResponse.json(
          {
            error: 'Constraint violation',
            message: 'A record with this information already exists.',
          },
          { status: 409 }
        )
      case 'P2025':
        return NextResponse.json(
          {
            error: 'Not found',
            message: 'The requested record was not found.',
          },
          { status: 404 }
        )
      default:
        return NextResponse.json(
          {
            error: 'Database error',
            message: 'An error occurred while processing your request.',
          },
          { status: 500 }
        )
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return NextResponse.json(
      {
        error: 'Validation error',
        message: 'Invalid data provided.',
      },
      { status: 400 }
    )
  }

  // Generic error response for unknown errors
  return NextResponse.json(
    {
      error: 'Internal server error',
      message: 'An unexpected error occurred.',
    },
    { status: 500 }
  )
} 