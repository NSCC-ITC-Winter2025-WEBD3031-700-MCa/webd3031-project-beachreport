# Beach Report

## Authors
[Andrea Morshead](https://www.linkedin.com/in/andreamorshead/), [Kortney Foley](https://www.linkedin.com/in/kortney-foley/), [Miguel Vidito](https://www.linkedin.com/in/miguel-vidito-davis-aa88a1291/)

**Purpose:**  
Looking for the perfect beach day? 🏖️ Whether you’re hunting for hidden gems or just need to know where the nearest sandy spot is, The Beach Report has you covered!

With our easy-to-use platform, you’ll always be in the know about the best beaches near you.

## Features:  
- Find your closest beaches – No more guessing, just good vibes and great views!
- Get the scoop – Check ratings, read real reviews, and see what other beachgoers are saying.
- Know before you go – Find out if there’s parking, flush toilets, or other must-have amenities.
- Report & share – Spot an issue? Have a tip? Help make beach days better for everyone!

## Tech Stack:  
- **Next.js**: The framework powering the application.  
- **Play Next.js Template**: Built using the Play Next.js SaaS starter kit, providing authentication, database integration, and more.  
- **Prisma**: ORM used to interact with the database.  
- **Neon Database**: Cloud-native PostgreSQL database for storing data.  
- **pnpm**: Fast, disk space efficient package manager for Node.js.  

## Live Demo:  
[View the Live Site](https://webd3031-project-beachreport.vercel.app/)

## Setup Instructions

To set up and run the Beach Report project locally:

1. Clone the repository or download the template.
2. Navigate to the project directory:

   ```bash
   cd beach-report
3. If pnpm is not installed you can installed it with 
    npm install -g pnpm
4. Verify the Installation
    pnpm --version
5. Install the dependencies using pnpm:
    pnpm install
6. Start the development server:
    pnpm dev


## Prisma Database instructions 
1. Prisma is built into this template, you can set up your own database following the steps provided by NextJS documentation: https://nextjs.org/learn/dashboard-app/setting-up-your-database
2. Replace the .env.example with the real variables from your new setup
4. Set up the database and run Prisma migrations:
    pnpx prisma migrate dev
5. Run Prisma Studio to access the database GUI:
    pnpx prisma studio
6. Start the Development Server (if you haven't already):
    pnpm dev


## Copyright 
© 2025 Beach Report. All rights reserved.
