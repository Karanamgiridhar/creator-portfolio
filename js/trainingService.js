/* ==========================================================================
   TRAINING SERVICE & ENROLLMENT ENQUIRY
   ========================================================================== */

const TrainingService = {
    async submitEnquiry(formData) {
        // Honeypot spam check
        if (formData.honeypot) {
            return { success: false, message: "Spam submission rejected." };
        }

        const pack = CREATOR_DATA.trainingPacks.find(p => p.id === formData.trainingPackId);
        if (!pack) {
            return { success: false, message: "Invalid training course selected." };
        }

        return {
            success: true,
            isWaitlist: false,
            pack: pack,
            message: `Thank you, ${formData.fullName}! Your enquiry and enrollment request for ${pack.title} has been received. Our team will contact you via WhatsApp / Email with curriculum access and onboarding details.`
        };
    }
};
