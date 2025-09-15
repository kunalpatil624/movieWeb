import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="px-6 md:px-16 lg:px-36 mt-20 w-full text-gray-300">
      <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>

      <p className="mb-4">
        Welcome to our theater request platform. By submitting a theater request, you agree to comply with the following terms and conditions.
      </p>

      <h2 className="text-xl font-semibold mt-4 mb-2">1. User Eligibility</h2>
      <p className="mb-2">
        Only registered users who own or manage theaters are eligible to submit a theater request. By submitting the request, you confirm that you are authorized to do so.
      </p>

      <h2 className="text-xl font-semibold mt-4 mb-2">2. Information Accuracy</h2>
      <p className="mb-2">
        You must provide accurate and complete information about your theater, including its name, location, number of seats, and available facilities. Any misleading or false information may result in request rejection.
      </p>

      <h2 className="text-xl font-semibold mt-4 mb-2">3. Request Processing</h2>
      <p className="mb-2">
        All theater requests are reviewed by our admin team. The status of your request may be pending, approved, or rejected. Approval is at the sole discretion of the admin.
      </p>

      <h2 className="text-xl font-semibold mt-4 mb-2">4. Facilities & Compliance</h2>
      <p className="mb-2">
        The facilities you indicate in your request (such as AC, 3D Screens, Snack Bar, etc.) must be actually available at your theater. Compliance may be verified by our team during the approval process.
      </p>

      <h2 className="text-xl font-semibold mt-4 mb-2">5. Liability</h2>
      <p className="mb-2">
        By submitting a theater request, you agree that our platform is not liable for any discrepancies, damages, or losses related to the theater's operations, services, or audience experience.
      </p>

      <h2 className="text-xl font-semibold mt-4 mb-2">6. Privacy & Data</h2>
      <p className="mb-2">
        Any personal information or theater details submitted will be used only for processing your theater request and for related communications. We will not share your information with third parties without consent.
      </p>

      <h2 className="text-xl font-semibold mt-4 mb-2">7. Modification of Terms</h2>
      <p className="mb-2">
        We reserve the right to modify these terms and conditions at any time. Users are advised to review this page periodically for updates.
      </p>

      <h2 className="text-xl font-semibold mt-4 mb-2">8. Acceptance</h2>
      <p className="mb-2">
        By submitting a theater request, you acknowledge that you have read, understood, and agreed to these terms and conditions.
      </p>
    </div>
  );
};

export default TermsAndConditions;
