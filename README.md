# Home Management App
The Home Management App is a web application designed to help property managers and house committees to manage various aspects of a building and its tenants. This app streamlines the process of managing a building by providing an easy-to-use interface that allows users to perform various tasks such as adding ordinary announcements or creating surveys.

One of the key features of the Home Management App is that it enables the house committee to manage the building's finances.  This feature provides transparency and accountability to the building's financial management, which is essential for building trust between the committee and the tenants.

In addition to financial management, the Home Management App also allows the house committee to open votes for the tenants. This feature enables the committee to gather opinions from the tenants on various issues, such as building maintenance, renovations, or other matters that affect the building and its occupants. By involving the tenants in the decision-making process, the committee can create a sense of community and promote a collaborative approach to building management.

Another key feature of the Home Management App is its ability to manage the building's control. The app provides a single interface for managing various aspects of the building, including maintenance requests, security access, and other essential functions. This feature helps the committee to respond quickly to tenant requests and ensure that the building is well-maintained and secure.

### Demo https://www.committeeb.com/
The site test must be connected with username:test and password:1234
## Features

- Manage building and its tenants through a single interface
- Add ordinary ads and create surveys
- Open votes for the home committee and the tenants
- View statistics of the building's management
- Add and manage tenants through a special address
- Display the most recent ads and second-hand products added to the store
- Allow tenants to pay the House Committee and purchase items using PayPal or credit card 
- Enable tenants to discuss issues within the building through a built-in chat

## Technologies Used
- React
- Redux
- TypeScript
- AWS Serverless
- PayPal API
- Next UI
- Axios

## Installation
To install the House Committee Management System, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/nta1998/committeeb.git
```
2. Go to the project directory:
``` bash
cd committeeb
```
3. Install the necessary packages:
```bash
npm i or npm i --force   
```
4. Create a file .env
```
add to the file 
REACT_APP_MY_SERVER = Your server url With https://*******
REACT_APP_WEBSOCKET = Your server url ******
```
5. Run the app at http://localhost:3000:
```bash
npm start
```

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

# Backend Repository
The backend repository for this project is located at https://github.com/nta1998/house-committee.
