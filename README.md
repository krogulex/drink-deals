# Private Project "Drink Deals" - Web Application Specification

## Description

This document outlines the specification for the "Drink Deals" web application. The application aims to provide users with the ability to search for promotions on drink offers in Warsaw. Users will be able to check promotions available in selected bars and restaurants for different days of the week.

## Page Content

### Basic Assumptions

- Creation of an application for searching promotions on drink offers in Warsaw.
- Users can check which promotions are active in selected bars/restaurants on different days of the week.
- Users can filter promotions depending on the type of alcohol selected.
- Sample promotion: Monday, bar: "unknown" – a liter of beer at the price of 10 zł, between 4 PM to 6 PM.
- The application is targeted towards individuals who enjoy spending time in the city and want to save on their drink expenses.
- The App consist of two main parts: the user interface and the promotions database.

### Layout

- Home Page
  - Header with logo and name
  - Title with slogan
  - Section with filters for selecting specific promotions
  - List of promotions for a specific day (e.g., Monday) following days
    - Default set to the current day
    - Each promotion includes necessary information, such as:  place name, price, promotion details, date added etc.
    - Button reporting the expiry of the promotion
  - Section encouraging users to add promotions from their favorite restaurant
    - Promotions will be sent for approval to the site administrator
  - Form for filling in promotion details (e.g., venue name, promotion type, price, etc.)
    - Requires attaching evidence, such as link to promotion

## Technologies

- Backend: Node.js, express.js, MongoDB, render.com
- Frontend: HTML, CSS, JavaScript, React, Material-UI

## Requirements

### Application

- Supported language: Polish
- Use of a database to store promotion information
- Communication with the database
- Form allowing users to add new promotions

### User

- Display of promotions for the next seven days
- Ability to set filters
- Form enabling users to add their own promotions

### Administrator

- Approval of added promotions by the administrator
- Verifying reported promotions by the administrator

## Development directions 

  - Administrator page for managing promotions
  - Map of Warsaw with promotion markers
  - App for other cities
  - English language
  - Similar page for food promotion
