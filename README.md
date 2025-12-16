# EcoWear - Sustainable Fashion Marketplace

A MERN stack application for sustainable fashion with impact tracking.

## Features
- **Buy & Sell**: Marketplace for eco-certified clothing.
- **Impact Tracking**: Track CO2e saved and trees planted.
- **Transparency**: detailed product sourcing info and eco-labels.
- **Green UI**: Designed with sustainability in mind.

## Setup Instructions

### Prerequisites
- Node.js
- MongoDB (running locally or URI needed)

### Installation

1.  **Clone/Open Project**

2.  **Server Setup**
    ```bash
    cd server
    npm install
    # Create .env if missing with:
    # PORT=5000
    # MONGO_URI=mongodb://localhost:27017/ecowear
    # JWT_SECRET=secret
    npm start
    ```

3.  **Client Setup**
    ```bash
    cd client
    npm install
    npm run dev
    ```

4.  **Access App**
    Open `http://localhost:5173`
