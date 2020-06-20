# Food Log: RFC

## Users
- End User: Default “I want” is from the viewpoint of the User
- Developer: Working on Code / New Features
- Ops: Support / etc
- Shareholder: Management, Business Manager, Owner, etc
- Functional Requirements

## Functional Requirements
### P0
- I need to to be able to add food to a log
- I need to be able to review my previous food log
- I need to be able to manually add in a food item and calories
- I need to edit previous calorie information
- I need to be able to remove previous calorie information
- I want the ability to have auto-complete on common food items

### P1
- I want the ability to set a calorie goal
- I want to be able to track where I am with my calorie goal


## Non Functional Requirements
### P0
- As a developer I want to host the application online
- As a developer I want to uses unit testing to harden code

### P1
- I want to use any device for the system (multiplatform)
- As a Developer I want to monitor the results of queries being used
- As an Ops I want to measure the amount of traffic using the system
- As a Shareholder I want to use target market ads to generate revenue


## Technical Requirements
- Front End
- React (?)

### Backend
- Node.js <Ease of Use>

### External Dataset 
- Nutritional Values for Types of Food

### Database
- Initially in memory datastore
- Explore Postgres / MySQL (open source DB)