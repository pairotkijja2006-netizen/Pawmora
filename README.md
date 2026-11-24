# 🐾 Pawmora

**Matching hearts. Saving paws.**

A full-stack pet adoption platform designed to transform traditional pet discovery through an interactive, TikTok-style video feed. Pawmora combines short-form video content, social engagement features, user authentication, and personalized pet collections to make discovering adoptable animals more engaging, accessible, and meaningful.

Developed as a collaborative hackathon project for **Kickstart '25**.

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## 🔗 Project Links

- **Live Demo:** [pawmora.vercel.app](https://pawmora.vercel.app)
- **Devpost:** [Pawmora](https://devpost.com/software/pawmora)

[![Live Demo](https://img.shields.io/badge/Live_Demo-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://pawmora.vercel.app)
[![Devpost](https://img.shields.io/badge/Devpost-003E54?style=for-the-badge&logo=devpost&logoColor=white)](https://devpost.com/software/pawmora)

> Pawmora is an early-stage hackathon prototype. Some visual elements and functionalities may contain bugs or require further development.

---

## 💡 Inspiration

Traditional pet adoption platforms often present animals through static images and descriptions, making it difficult for potential adopters to understand their personalities and form meaningful emotional connections.

At the same time, short-form video platforms such as TikTok have transformed how people discover and engage with content through immersive and interactive experiences.

We wanted to explore how this familiar form of digital interaction could be applied to a meaningful social challenge: helping animals find suitable and loving homes.

Pawmora was developed to bridge the gap between social media engagement and pet adoption. Rather than treating animals as static listings, we wanted to create an experience where users could discover their personalities, learn about their individual characteristics, and build emotional connections before considering adoption.

Our long-term goal is to help animals find owners whose lifestyles, personalities, and preferences align with their individual needs.

---

## 🚀 Key Features

### Interactive Vertical Video Feed

Developed a TikTok-inspired video feed that allows users to discover adoptable pets through an immersive scrolling experience.

The interface emphasizes:

- Full-screen portrait video content
- Vertical scrolling navigation
- Interactive pet discovery
- Responsive mobile and desktop layouts
- Minimal distractions from the displayed content

### Social Engagement System

Implemented social interaction features that encourage users to engage with adoptable animals and the wider pet-loving community.

- **🐾 Paw Likes:** A customized paw-print interaction that allows users to express interest in pets.
- **💬 Comments:** Interactive comment sections for community engagement and discussion.
- **🔖 Saves:** Bookmark favorite pets and organize them into personal collections.

### User Authentication

Integrated Supabase Authentication to support individual user accounts.

Users can:

- Register new accounts.
- Sign in to existing accounts.
- Access personalized application features.
- Manage their individual interactions with pet content.

### Personalized Pet Collections

Developed a bookmarking system that allows users to save pets they are interested in and revisit them later.

This creates a more intentional discovery experience by allowing potential adopters to explore their options without immediately committing to an adoption decision.

### Canadian Pet Discovery

Curated pet content from multiple Canadian cities, including:

- Vancouver
- Toronto
- Montreal

The platform is designed with the goal of helping Canadian animal shelters increase visibility and connect with potential adopters.

---

## ⚙️ System Architecture

Pawmora follows a client-server architecture that connects a React-based frontend with Supabase authentication and database services.

**Frontend — React, TypeScript, Vite**

Handles user interactions, video feed presentation, navigation, and responsive interface components.

**Backend — Supabase**

Provides authentication services and PostgreSQL-based database infrastructure for application data.

**Deployment — Vercel**

Hosts the frontend application and makes the platform publicly accessible through a web browser.

---

## 🧠 Technical Implementation

### Component-Based Frontend Architecture

Developed the frontend using React and TypeScript, organizing the application around reusable interface components.

The application includes functionality for:

- Video feed presentation
- Pet interaction controls
- Comment interfaces
- Saved pet collections
- Authentication interfaces
- Application navigation

This component-based approach supports maintainability and allows individual features to be developed and refined independently.

### Interactive Video Feed

Designed a vertically oriented content discovery experience inspired by modern short-form video platforms.

The interface combines video presentation with interaction controls, allowing users to engage with pet content without leaving the discovery experience.

### Database Management

Integrated Supabase with its PostgreSQL database infrastructure to support user-related data and application interactions.

The platform's data management requirements include:

- User accounts and profiles
- Pet content
- User likes
- Comments
- Saved pet collections

The repository also includes SQL-related files supporting the backend infrastructure.

### Authentication Integration

Integrated Supabase Authentication with the frontend to support account registration and login functionality.

This provides a foundation for personalized user experiences and account-specific interactions.

### User Interaction and State Management

Developed interactive frontend features that respond to user actions, including liking, commenting, saving, and navigating through pet content.

React's component architecture provides a foundation for managing interface states and updating displayed content.

### Responsive User Interface

Designed the application using Tailwind CSS and shadcn/ui, emphasizing:

- Responsive screen layouts
- Mobile-friendly navigation
- Reusable interface components
- Consistent visual styling
- Intuitive interaction controls

### Build and Deployment

Used Vite as the frontend build tool, providing a development environment with rapid feedback during implementation.

Deployed the application through Vercel to provide a publicly accessible prototype.

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Programming Languages | TypeScript, SQL, PL/pgSQL |
| Frontend Framework | React |
| Build Tool | Vite |
| Styling | Tailwind CSS, CSS |
| UI Components | shadcn/ui, Radix UI |
| Backend Services | Supabase |
| Database | PostgreSQL |
| Authentication | Supabase Auth |
| Routing | React Router |
| Supporting Libraries | TanStack Query, Lucide React |
| Deployment | Vercel |
| Version Control | Git, GitHub |

---

## ⚠️ Technical Challenges

- Designing an immersive vertical video discovery interface.
- Managing multiple interactive features within individual feed components.
- Integrating frontend interfaces with backend authentication services.
- Structuring application data within a relational database.
- Managing user-specific interactions and saved content.
- Designing responsive interfaces across mobile and desktop devices.
- Maintaining consistent styling across reusable components.
- Coordinating development within a collaborative hackathon environment.
- Balancing feature implementation, interface design, and debugging under limited development time.

---

## 🏅 Accomplishments

- Developed a functional full-stack pet discovery prototype.
- Implemented a TikTok-inspired vertical video feed.
- Developed social engagement features, including likes, comments, and bookmarks.
- Integrated user authentication through Supabase.
- Connected frontend components with backend services.
- Designed a responsive user interface using Tailwind CSS and shadcn/ui.
- Collaboratively developed and presented the project for Kickstart '25.
- Created video content to demonstrate the application and communicate its purpose.
- Deployed a publicly accessible web application through Vercel.

---

## 📚 What We Learned

Through developing Pawmora, we gained practical experience in:

- Full-stack web application development
- TypeScript and React development
- Component-based software architecture
- Relational database management
- PostgreSQL and SQL
- Backend service integration
- User authentication
- Interactive frontend development
- Responsive user interface design
- Collaborative software development
- Rapid prototyping and iterative debugging
- Hackathon project management
- Product demonstrations and storytelling
- Cloud deployment
- Developing technology with social impact

---

## 🔮 Future Development

- [ ] Personalized pet recommendation algorithm
- [ ] Lifestyle-based pet compatibility scoring
- [ ] Location-based pet discovery
- [ ] Direct integration with animal shelters
- [ ] Verified shelter and rescue organization accounts
- [ ] Shelter dashboard for managing pet listings
- [ ] Video uploading and content management
- [ ] Advanced search and filtering functionality
- [ ] Direct communication between shelters and potential adopters
- [ ] Adoption application management
- [ ] Improved video loading and feed performance
- [ ] Enhanced privacy and content moderation
- [ ] Mobile application support
- [ ] Expansion to additional cities and countries

---

## 👥 Development Team

- Mio Pairotkijja
- Danny Nosrati
- Daniel Morgan

Developed collaboratively for **Kickstart '25**.

---

## 🧪 Getting Started

### Prerequisites

- Node.js
- npm
- Supabase project
- Supabase project URL
- Supabase publishable or anonymous API key

### Installation

Clone the repository:

```bash
git clone https://github.com/pairotkijja2006-netizen/Pawmora.git
```

Navigate into the project directory:

```bash
cd Pawmora
```

Install the required dependencies:

```bash
npm install
```

Configure the environment variables required by the application's Supabase integration and ensure that the corresponding database infrastructure is configured.

Start the local development server:

```bash
npm run dev
```

Open the local development URL displayed in the terminal.

### Production Build

To generate a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

### Security Note

Never commit private API keys, Supabase service-role credentials, database passwords, or sensitive user information to a public repository.

---

## 🌎 Our Vision

Pawmora aims to transform pet adoption from a transactional browsing experience into a meaningful journey of discovery and connection.

By combining interactive media, social engagement, and thoughtful software design, we hope to help potential adopters better understand animals beyond their photographs and descriptions.

Our long-term vision is to develop a platform that helps animals find compatible, loving homes while empowering shelters to reach wider communities.

We believe technology should not only improve how people interact with digital content but also create opportunities to make a positive difference in the real world.

**Built with technology. Inspired by compassion. Dedicated to saving paws. 🐾**
