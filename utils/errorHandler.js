module.exports = {
    handleError: (error, response) => {

        if (error.message.includes('404 Not Found')) {
            return response.status(404).json({
                data: null,
                error: `Furniture with that ID not found.`
            });
        };

        if (error.message.includes('415 Unsupported Media Type')) {
            return response.status(415).json({
                data: null,
                error: `415 Unsupported Media Type: The request body must be in JSON format.`
            });
        };

        if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
            return response.status(500).json({ 
                data: [], 
                error: 'Internal Server Error: External service timeout' 
            });
        };

        if (error.message.includes('too many clients already')) {
            return response.status(500).json({ 
                data: [], 
                error: 'too many clients already' 
            });
        };

        return response.status(500).json({ 
            data: [], 
            error: 'Internal Server Error: Error fetching furniture data' 
        });
    }
};