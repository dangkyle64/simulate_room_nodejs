module.exports = {
    handleError: (error, response) => {
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