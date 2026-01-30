import React from "react";

const PrivacyPolicy = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

            <div className="prose prose-lg">
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-8">1. Information We Collect</h2>
                    <p className="text-gray-700 mb-4">
                        We collect information you provide directly to us, such as when you 
                        create an account, make a purchase, or contact support.
                    </p>
                </section>
            </div>

            <div className="prose prose-lg">
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-8">2. How We Use Your Information</h2>
                    <p className="text-gray-700 mb-4">
                        We use the information collected to process orders, maintain communication 
                        and improve our services overall.
                    </p>
                </section>
            </div>

            <div className="prose prose-lg">
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-8">3. Information Sharing</h2>
                    <p className="text-gray-700 mb-4">
                        We will <span className="font-semibold">never</span> sell your personal information to external third parties. 
                        We may relay your information to our partners that aid in operations. Please contact us if any agent demands 
                        for your information.
                    </p>
                </section>
            </div>

            <div className="prose prose-lg">
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-8">4. Contact Us</h2>
                    <p className="text-gray-700 mb-4">
                        Got any more questions or concerns regarding our privacy policy? Let our staff ease your thoughts by contacting us at
                        privacy@revoshop.com
                    </p>
                </section>
            </div>

            <p className="text-sm text-gray-500 mt-12">
                Last Updated: {new Date().toLocaleDateString()};
            </p>
        </div>
    );
};

export default PrivacyPolicy;