[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/2EJ5Xvqu)

[[Live Preview with Vercel](https://revoshop-nine.vercel.app/)]

# Milestone 3 - Overview 

This is a mockup project of a fake e-commerce store platform built on Next.js. Product APIs were taken from Platzi Fake Store API

## Main Features

### Products
- Products listed dynamically with grid layout (tweaked layout for responsiveness)
- Products can be filtered by category
- Products, when clicked in list, navigates to dedicated product page with description and 'Add to Cart' button
- Products fetched from Platzi Fake Store API
- (!NEW) Added "Add to Cart" functionality which adds items to cart. Also added "Checkout Page"
- (!NEW) Added Admin Panel where admins can view and perform CRUD operations on product data

### User Interface
- Next.js Image component for optimized loading and performance\

### Performance and Optimization
- **Server-Side Rendering (SSR)** : Dynamic product pages with refresh on each request on product detail page
- **Client-Side Rendering (CSR)** : Interactive homepage with state management with refresh on each request on product detail page
- **Static-Side Generation (SSG)** : Static pages for privacy policy page

### Technologies Implemented
- **TypeScript**: General implemented syntax
- **Axios**: HTTP client for API requests with error handling
- **React Hooks**: useState, useEffect, useSearchParams for state management
- **Next.js App Router**: Modern routing with layouts and nested routes
- **TailwindCSS**: Majority of styling was done with tailwind
- **Lucide Icons**: UI elements for logo, cart, notification bell, and others
- **Zustand**: Cart state management

# Milestone 3 - Revision post-Iteration

These are the newest changes/additions to the app following the meeting with TL

## Main Features

### Login and Authentication
- Added Login Page to handle logging on between a user who is either a customer or admin
- User types are exported from Platzi Fake Store's API
- Redirect will occur if user inputs the correct credentials which will redirect the user to either home page or admin panel
  
### Test Files
- Added test files to ensure components and logic fit requirements (functionality only, visual tests are in progress..)
- Test files have been created for login page and product card

### Technologies Implemented
- **NextAuth**: Credentials and session provider, ensuring and handling of login process of users
- **Jest & React Testing Library**: Creation and testing of test files



