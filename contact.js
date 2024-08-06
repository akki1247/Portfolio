exports.handler = async (event, context) => {
    // Parse the request body
    const { name, email, subject, message } = JSON.parse(event.body);

    // Log the received data (this is optional and for debugging purposes)
    console.log(`Received contact form submission: ${JSON.stringify({ name, email, subject, message })}`);

    // Respond with a success message
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Form submitted successfully!' })
    };
};
