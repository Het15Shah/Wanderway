

# **WanderWays** 🌏  
**Find Your Next Adventure!!**

**WanderWays is a travel planning web app designed to make your travel experience seamless and memorable. From searching and booking trips to creating your own custom itineraries, WanderWays has got it all!**



Check out the live version of the project here:

🔗 **[Live Demo](https://wanderways-travel.netlify.app)**  

---

## **Table of Contents**  
1. [Overview](#overview)  
2. [Features](#features)  
3. [Tech Stack](#tech-stack)  
4. [Installation](#installation)  
5. [Environment Variables](#environment-variables)  
6. [Testing Highlights](#testing-highlights)  
7. [Team Members](#team-members)
8. [Photos](#photos)

---

## **Overview**  
WanderWays is a travel planning web application built using the MERN stack (MongoDB, Express, React.js, Node.js). It is designed to simplify travel planning by offering an intuitive interface, real-time functionalities, and personalized recommendations.  

---

## **Features**  
- **User Authentication**: Login and Signup functionality for secure access.  
- **Search & Book Trips**: Explore a wide range of curated travel plans.  
- **Custom Trip Planner**: Create personalized trips based on your preferences.  
- **Admin Controls**:  Add new trips to the platform.  
- **Booking Management**: View and manage your booked trips easily.  
- **Feedback System**: Share your experience by leaving reviews and exploring reviews from other travelers.  

---

## **Tech Stack 🛠️**  

### **Frontend**  
- **React.js**
- **Material-UI & Bootstrap**  
- **HTML/CSS**
  
### **Backend**  
- **Node.js** 
- **Express.js**
- **JWT** 

### **Database**  
- **MongoDB**

---

## **Installation**  

### **Prerequisites**  
Make sure you have the following installed:  
- [Node.js](https://nodejs.org/)    

### **Steps**  
1. **Clone the repository**:  
   ```bash  
   git clone https://github.com/Het15Shah/Wanderway.git  
   cd Wanderway  
   ```  

2. **Install dependencies**:  
   **Backend**:  
   ```bash  
   cd backend  
   npm install  
   ```  
   **Frontend**:  
   ```bash  
   cd frontend  
   npm install  
   ```  

3. **Set up environment variables**:  
   Create a `.env` file in both the `frontend` and `backend` directories. Refer to [Environment Variables](#environment-variables) for the required keys.  

4. **Run the application**:  
   **Start the Backend**:  
   ```bash  
   cd backend  
   npm run start  
   ```  
   **Start the Frontend**:  
   ```bash  
   cd frontend  
   npm run start  
   ```  

5. **Open in Browser**:  
   ```
   http://localhost:3000  
   ```  

---

## **Environment Variables**  

### **Backend (`/backend/.env`)**  
```dotenv
PORT=YOUR_PORT
JWT_SECRET=YOUR_JWT_SECRET
JWT_EXPIRES_IN=YOUR_JWT_EXPIRATION_TIME
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
MONGODB_URL=YOUR_MONGODB_URL
FRONTEND_URL=YOUR_FRONTEND_URL
```

### **Frontend (`/frontend/.env`)**  
```dotenv
REACT_APP_BACKEND_API=YOUR_BACKEND_API
```

---

## **Testing Highlights**  
Our testing process ensures reliability, performance, and usability:  

### **Unit Testing**  
- **Tools Used**: Mocha, Chai, Chai-http, Nyc  
- **Coverage**: High coverage for backend API endpoints and frontend components  

### **Black Box Testing**
- **Techniques Used**:  Equivalence Class Testing
- **Outcome**: Valid/invalid login credentials, signup credentials, search values 

### **Integration Testing**  
- **Tools Used**: Postman  
- **Scenario**: End-to-end testing for trip booking and custom trip creation workflows  

### **Performance(Non-functional) Testing**  
- **Tool Used**: JMeter  
- **Results**:  
  - Average response time: **600ms**  
  - Concurrent users handled: **300+**  

### **GUI Testing**  
- **Tool Used**: Selenium IDE  
- **Scenarios**: Login, trip search, booking, and custom trip,add trip, my trips workflows  

---

## **Team Members**  

We are a group of enthusiastic developers passionate about delivering high-quality software solutions:  

- **Darpan Lunagariya**
- **Het Shah**  
- **Meet Zalavadiya**  
- **Kavit Patel**  
- **Priyank Ramani**  
- **Neel Patel**  
- **Shrey Bavishi**  
- **Ram Patel**    
- **Divy Patel**  
- **Jinay Vora**  

---
## **Photos**

Login Page:
![screencapture-wanderways-travel-netlify-app-login-2024-12-02-23_45_17](https://github.com/user-attachments/assets/cd6c8c90-aaa0-4992-a6b3-94073e6231e7)

Signup Page:
![screencapture-wanderways-travel-netlify-app-signup-2024-12-02-23_45_43](https://github.com/user-attachments/assets/3cb81135-57e6-40da-969d-250fb37d5cb1)

HomePage:

![screencapture-wanderways-travel-netlify-app-2024-12-02-23_24_18](https://github.com/user-attachments/assets/1f441220-92cf-45e0-ab08-7593e645afe5)

ProfilePage:

![screencapture-wanderways-travel-netlify-app-profile-2024-12-02-23_44_13](https://github.com/user-attachments/assets/618ad143-a887-488b-bc00-3ba0e925d104)

ReviewPage:
![screencapture-wanderways-travel-netlify-app-review-2024-12-02-23_44_30](https://github.com/user-attachments/assets/32ef6d96-fe29-4b1f-b473-45f21809cdb2)

CustomTripPage:
![screencapture-wanderways-travel-netlify-app-create-2024-12-02-23_25_56](https://github.com/user-attachments/assets/032ef33d-fa18-43b6-92aa-771695e7e70a)

AddtripPage(for Admin):


![screencapture-wanderways-travel-netlify-app-add-trips-2024-12-02-23_44_01](https://github.com/user-attachments/assets/5e66fe62-e70d-48d0-9c4e-f0e858515c29)

MytripPage:

![screencapture-wanderways-travel-netlify-app-my-trips-2024-12-02-23_43_17](https://github.com/user-attachments/assets/da555206-e3a8-4507-abd0-ccf1f995aa51)

AboutusPage:

![screencapture-wanderways-travel-netlify-app-about-us-2024-12-02-23_55_59](https://github.com/user-attachments/assets/bc48a929-489b-4104-9dc0-a1843883d3c6)

                                                            -- Wanderways Team--

