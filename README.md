URL Shortener Application
This is a simple URL Shortener application with analytics tracking for generated short URLs. It has a frontend built using React and a backend built with Node.js and MongoDB.

*Features
Shorten long URLs into concise, shareable links.
Track analytics for each short URL (clicks, timestamps).
View analytics data for all generated URLs.
Prerequisites
Before running the application, ensure you have the following installed:

Node.js (v14 or above)
npm or yarn
MongoDB (Local or a cloud-hosted instance like MongoDB Atlas)
Setup Instructions
Backend
1. Clone the Repository
bash
Copy code
git clone https://github.com/Sachin7397/url-shortener.git
cd url-shortener/backend
2. Install Dependencies
bash
Copy code
npm install
3. Configure Environment Variables in files only
PORT=8001
MONGO_URI=mongodb://localhost:27017/url-shortener
Replace MONGO_URI with your MongoDB connection string if you're using a hosted instance.
4. Start the Backend Server
bash
Copy code
npm start
The backend server will run on http://localhost:8001.
Frontend
1. Navigate to the Frontend Directory
bash
Copy code
cd ../frontend
2. Install Dependencies
bash
Copy code
npm install
3. Configure API Endpoint
Update the services/ApiEndpoint.js file in the frontend directory to point to your backend server. For local development, it should look like this:

javascript
Copy code
export const API_BASE_URL = "http://localhost:8001";
4. Start the React Development Server
bash
Copy code
npm start
The frontend will run on http://localhost:5173.
Running the Full Application
Start the backend server by running npm start in the backend directory.
Start the frontend development server by running npm start in the frontend directory.
Open your browser and navigate to http://localhost:5173.
