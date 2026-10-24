/* ==========================================================================
   CLIENT ENQUIRY SERVICE
   ========================================================================== */

const ClientEnquiryService = {
    async submitClientProject(data) {
        if (data.honeypot) {
            return { success: false, message: "Spam rejected." };
        }

        if (!data.name || !data.email) {
            return { success: false, message: "Please provide your name and email address." };
        }

        return {
            success: true,
            message: `Thank you, ${data.name}! Your project enquiry for ${data.projectType || 'Creative Production'} has been received. We review all incoming briefs within 24 hours and will reach out to discuss next steps.`
        };
    }
};
