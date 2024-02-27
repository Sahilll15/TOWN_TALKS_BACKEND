
export const gmailContent = (verificationToken, username) => {
    return `
        <html>
            <head>
                <style>
                    body {
                        font-family: 'Arial', sans-serif;
                        background-color: #f4f4f4;
                        color: #333;
                    }
                    .container {
                        max-width: 600px;
                        margin: 20px auto;
                        padding: 20px;
                        background-color: #fff;
                        border-radius: 5px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    p {
                        margin-bottom: 15px;
                    }
                    a {
                        color: #007BFF;
                        text-decoration: underline;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <p>Dear ${username},</p>
                    <p>Thank you for registering. Please verify your email by clicking <a href="http://your-verification-link/${verificationToken}">here</a>.</p>
                    <p>Regards,</p>
                    <p>Your Organization</p>
                </div>
            </body>
        </html>
    `;
};

export const eventCreationEmailContent = (eventDetails) => {
    return `
        <html>
            <head>
                <style>
                    body {
                        font-family: 'Arial', sans-serif;
                        background-color: #f4f4f4;
                        color: #333;
                    }
                    .container {
                        max-width: 600px;
                        margin: 20px auto;
                        padding: 20px;
                        background-color: #fff;
                        border-radius: 5px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    p {
                        margin-bottom: 15px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <p>Dear Organizer,</p>
                    <p>Your event ${eventDetails.eventName} has been created successfully. Details:</p>
                    <p>Event Name: ${eventDetails.eventName}</p>
                    <p>Date: ${eventDetails.eventDate}</p>
                    <p>Location: ${eventDetails.eventLocation}</p>
                    <p>Regards,</p>
                    <p>Your Organization</p>
                </div>
            </body>
        </html>
    `;
};

export const citizenJoinEventEmailContent = (eventDetails) => {
    return `
        <html>
            <head>
                <style>
                    body {
                        font-family: 'Arial', sans-serif;
                        background-color: #f4f4f4;
                        color: #333;
                    }
                    .container {
                        max-width: 600px;
                        margin: 20px auto;
                        padding: 20px;
                        background-color: #fff;
                        border-radius: 5px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    p {
                        margin-bottom: 15px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <p>Dear Citizen,</p>
                    <p>You have successfully joined the event ${eventDetails.eventName}. Details:</p>
                    <p>Event Name: ${eventDetails.eventName}</p>
                    <p>Date: ${eventDetails.eventDate}</p>
                    <p>Location: ${eventDetails.eventLocation}</p>
                    <p>Regards,</p>
                    <p>Your Organization</p>
                </div>
            </body>
        </html>
    `;
};
