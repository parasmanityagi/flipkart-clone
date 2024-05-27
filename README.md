# Flipkart Clone

A full-stack e-commerce application built using the MERN stack (MongoDB, Express.js, React, Node.js) with integrated Paytm payment gateway.

## Features

- User Authentication (Login/Register)
- Product Listing
- Product Details
- Shopping Cart
- Paytm Payment Integration

## Technologies Used

- **Client**: React, Redux
- **Server**: Node.js, Express.js
- **Database**: MongoDB
- **Payment Gateway**: Paytm

## Installation

### Prerequisites

- Node.js
- MongoDB
- Paytm Developer Account

### Steps

1. **Clone the repository**

    ```bash
    git clone https://github.com/yourusername/flipkart-clone.git
    cd flipkart-clone
    ```

2. **Install dependencies for both client and server**

    ```bash
    # For server
    cd server
    npm install

    # For client
    cd ../client
    npm install
    ```

3. **Set up environment variables**

    Create a `.env` file in the `server` directory and add the following variables:

    ```env
    PORT=your_port
    DB_URL=your_db_url
    DB_USERNAME=your_db_username
    DB_PASSWORD=your_db_password
    PAYTM_MID=your_paytm_mid
    PAYTM_WEBSITE=your_paytm_website
    PAYTM_CHANNEL_ID=your_paytm_channel_id
    PAYTM_INDUSTRY_TYPE_ID=your_paytm_industry_type_id
    PAYTM_CUST_ID=your_paytm_cust_id
    PAYTM_MERCHANT_KEY=your_paytm_merchant_key
    ```

4. **Run the application**

    ```bash
    # For server
    cd server
    npm start

    # For client
    cd ../client
    npm start
    ```

    The server will run on `http://localhost:5000` and the client will run on `http://localhost:3000`.

## Usage

1. **Register** a new user or **Login** with an existing account.
2. Browse through the **product listings**.
3. Add products to the **cart**.
4. Proceed to **checkout** and make a payment using Paytm.

## Acknowledgments

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Paytm](https://paytm.com/)
