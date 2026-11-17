
import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About Us - EasyBuy"}>
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="/images/pages/about.jpeg"
            alt="About EasyBuy"
            style={{ width: "100%" }}
          />
        </div>

        <div className="col-md-6">
          <h2>About EasyBuy</h2>
          <p className="text-justify mt-2">
            Welcome to EasyBuy, your one-stop online shopping destination!
            We offer a wide range of quality products, including electronics,
            clothing, shoes, and accessories, at affordable prices.
          </p>
          <p className="text-justify">
            Our goal is to make online shopping simple, convenient, and
            enjoyable by providing a smooth shopping experience and
            customer-friendly service.
          </p>
          <p>
            <strong>Easy Shopping, Better Choices!</strong>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
