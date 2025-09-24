# development-projects
🏡 Trivana – Listings Platform

A full-stack web application where users can create, update, review, and explore property listings with location-based search.

🚀 Features

🔑 Authentication & Authorization with Passport.js (local strategy).

🏘️ Users can Create / Edit / Delete Listings.

🌍 Interactive Map Integration using Leaflet.js + OpenStreetMap.

📷 Image Uploads powered by Cloudinary.

💬 Reviews System for each listing.

✅ Secure sessions & flash messages for better UX.

🛠️ Built with MVC architecture for clean and scalable code.

🖥️ Tech Stack

Frontend: EJS, Bootstrap, Leaflet.js

Backend: Node.js, Express.js

Database: MongoDB (Mongoose ODM)

Auth: Passport.js

Cloud Storage: Cloudinary

⚙️ Installation & Setup
# Clone the repository
git clone https://github.com/your-username/trivana.git

# Move into the project directory
cd trivana

# Install dependencies
npm install

# Setup environment variables
touch .env
# Add the following inside .env
# ATLASDB_URL=<your_mongo_connection_string>
# CLOUD_NAME=<your_cloudinary_name>
# CLOUD_API_KEY=<your_cloudinary_api_key>
# CLOUD_API_SECRET=<your_cloudinary_secret>

# Run the app
nodemon app.js


Visit 👉 http://localhost:8080



📂 Project Structure
MAJORPROJECT/
│── models/        # Mongoose schemas
│── routes/        # Express routes
│── controllers/   # Business logic
│── views/         # EJS templates
│── public/        # CSS, JS, Images
│── app.js         # Main server



📌 Future Improvements

Google OAuth Login

Deploy to Render / Vercel with CI/CD

Search & Filter Listings

