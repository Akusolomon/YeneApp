# YENEAPP Backend

YENEAPP is a NestJS-based backend for an event platform built to help people discover, attend, and share experiences around events in cities across Ethiopia. The system supports event participation, social interaction, and awareness around activities happening at events.

## Overview

This backend powers features such as:

- Event discovery and management
- Ticket and attendance handling for events
- Social features like comments, likes, moments, and chat
- Friend requests and invites
- Community interaction around events
- Awareness features for staying informed about incidents or important updates related to events

The project was built as the server-side foundation for an event-driven application with a focus on modular architecture and scalability.

## Main Features

- User authentication and authorization
- Event creation and management
- Ticket and attendance flow for events
- Commenting, liking, and posting moments
- Friend connections and event invites
- Real-time chat and interaction support
- Backend modules for  places, payments, and event activity

## Tech Stack

- NestJS
- TypeScript
- MongoDB
- JWT authentication
- Passport


## Project Structure

The backend is organized into feature-based modules under the src folder, including:

- Authentication and user management
- Events and event attendance
- Comments, likes, and moments
- Chat and conversations
- Friends and invites
- Categories, places, and payments

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm or yarn

### Installation

```bash
npm install
```

### Environment Configuration

Set up the required environment variables before running the app.

### Run the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Development Notes

This repository focuses on the backend side of YENEAPP. Its modular structure makes it easier to extend the platform with notifications, payments, reporting, and other event-driven services in the future.

## Author

Built as a backend project for YENEAPP by its development team.
