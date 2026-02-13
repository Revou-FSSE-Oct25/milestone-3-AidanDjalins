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

