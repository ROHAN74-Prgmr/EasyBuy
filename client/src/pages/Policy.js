
import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy - EasyBuy"}>
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="/images/pages/contactus.jpeg"
            alt="EasyBuy Privacy Policy"
            style={{ width: "100%" }}
          />
        </div>

        <div className="col-md-6">
          <h2>Privacy Policy</h2>
          <p>
            At EasyBuy, we value your privacy and protect your personal
            information.
          </p>
          <p>
            We collect basic details such as your name, email, phone number,
            and address to manage accounts and process orders.
          </p>
          <p>
            Your information is kept secure and is not sold to third parties.
          </p>
          <p>
            For any privacy-related questions, please contact our support team.
          </p>
          <strong>Thank you for shopping with EasyBuy!</strong>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;

