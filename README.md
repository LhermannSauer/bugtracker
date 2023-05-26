# Bugtracker

## Introduction

Welcome to the Bugtracker! This application is designed to help teams track and manage software bugs and feature requests effectively. It provides a user-friendly interface for creating, assigning, tracking, and resolving bugs, ensuring that your development process runs smoothly.

This README file serves as a comprehensive guide to understanding the BugTracker Application, its features, and how to set it up for your team's bug tracking needs.

## Table of Contents

1. About
1. Features
1. Technologies Used
1. Architecture
1. Setup and Installation
1. Usage
1. License

## About

The Bug Tracker Application is a comprehensive solution for tracking and managing software bugs and feature request. It provides a user-friendly interface for creating bug reports, assigning them to team members, tracking their progress, and resolving them. This application aims to streamline the bug tracking process, ensuring that teams can efficiently identify, prioritize, and resolve software issues.

## Features

The BugTracker Application provides the following key features:

- User Authentication: Secure user authentication and authorization system to ensure data privacy and access control.
- Bug Creation: Create detailed bug reports with information such as title, description, severity, and assignee.
- Bug Tracking: Track bugs throughout their lifecycle, from creation to resolution, with updates and status changes.
- Bug Filtering: Filter bugs based on severity, status, assignee, or other criteria for efficient bug management.
- Notifications: Real-time notifications for bug assignments, updates, and comments to keep everyone informed.
- Commenting System: Collaborate with team members by adding comments to bug reports for effective communication.
- Search Functionality: Search for specific bugs based on keywords, titles, or other relevant criteria.
- Dashboard: Visualize bug statistics and metrics, providing an overview of the current bug tracking progress.

## Technologies Used

The Bug Tracker Application is built using the following technologies and tools:

- Front-end: React, HTML, CSS
- Back-end: Node.js, Express, Typescript
- Database: SQLite
- Authentication: JWT, Passport
- Additional libraries and frameworks: TypeORM, Jest, Emotion, class-validator

## Architecture

The Bug Tracker Application follows a MVC architecture to ensure separation of concerns and maintainability. The front-end is built using ReactJS, while the back-end utilizes Node.js + Express with Typescript. The application follows best practices such as modular code organization, RESTful API design, and database normalization.

## Setup and Installation

To set up the Bug Tracker Application locally, follow these steps:

1. Clone the Bug Tracker repository from GitHub:
   ```bash
   git clone https://github.com/lhermannsauer/bugtracker.git
   ```
1. Install the necessary dependencies:
   ```bash
   cd bugtracker
   npm install
   ```
1. Configure the environment variables:
   - Create a `.env` file based on the provided `.env.example` template.
   - Set the appropriate values for database connection, authentication, and other variables.
1. Set up the database:
   - Create a database instance using [database technology of choice].
   - Run the necessary migrations and seeders to set up the initial database schema and data.
1. Start the application
   ```bash
   npm start
   ```

## Usage

Once the BugTracker Application is running, open a web browser and navigate to the application URL. You will be prompted to create an account or log in if you already have one.

Once logged in, you will have access to the following features:

- Create Bugs: Create new bug reports, providing details such as title, description, severity, and assignee.
- Track Bugs: Monitor the progress of each bug, including its status, assignee, creation date, and updates.
- Filter and Search: Easily search for specific bugs or filter them based on various criteria, such as severity, status, or assignee.
- Assign and Resolve Bugs: Assign bugs to team members and mark them as resolved once the fix is implemented.
- Commenting: Add comments to bug reports to provide additional information or collaborate with other team members.
- Notifications: Receive notifications for assigned bugs, updates, and comments to stay up to date with the bug tracking process.

## License

The BugTracker Application is released under the MIT License. You are free to use, modify, and distribute this software for both commercial and non-commercial purposes. See the LICENSE file for more details.

## Contact

If you have any questions, feedback, or need assistance with the BugTracker Application, please contact me at l.hermannsauer@gmail.com.
