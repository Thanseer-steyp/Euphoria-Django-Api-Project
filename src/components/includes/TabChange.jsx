import { useState } from "react";

function ProductDescription() {
  const [activeTab, setActiveTab] = useState("Description");

  return (
    <section className="productDescription">
      <div className="left">
        <div className="top">
          <div className="violet"></div>
          <h3>Product Description</h3>
        </div>
        <ul>
          <li
            className={activeTab === "Description" ? "active" : ""}
            onClick={() => setActiveTab("Description")}
          >
            Description
          </li>
          <li
            className={activeTab === "Comments" ? "active" : ""}
            onClick={() => setActiveTab("Comments")}
          >
            User Comments<div className="count">21</div>
          </li>
          <li
            className={activeTab === "QA" ? "active" : ""}
            onClick={() => setActiveTab("QA")}
          >
            Question & Answers<div className="count">40</div>
          </li>
        </ul>

        {activeTab === "Description" && (
          <p>
            100% Bio-washed Cotton – makes the fabric extra soft & silky.
            Flexible ribbed crew neck. Precisely stitched with no pilling & no
            fading. Provide all-time comfort. Anytime, anywhere. Infinite range
            of matte-finish HD prints.
          </p>
        )}

        {activeTab === "Comments" && (
          <div className="comments" style={{ margin: "30px 0" }}>
            <p>
              <strong>John:</strong> Great quality shirt! Very comfortable.
            </p>
            <p style={{ margin: "12px 0" }}>
              <strong>Maria:</strong> The fabric is soft and fits perfectly.
            </p>
          </div>
        )}

        {activeTab === "QA" && (
          <div className="qa" style={{ margin: "30px 0" }}>
            <p>
              <strong>Q:</strong> Is it machine washable?
            </p>
            <p style={{ margin: "6px 0" }}>
              <strong>A:</strong> Yes, absolutely. Use cold water.
            </p>
            <p style={{ margin: "6px 0" }}>
              <strong>Q:</strong> Does the color fade?
            </p>
            <p style={{ margin: "6px 0" }}>
              <strong>A:</strong> No fading after multiple washes.
            </p>
          </div>
        )}
      </div>

      <ul className="right">
        <li>
          <div className="featureContent">
            <h5>Fabric</h5>
            <h6>Bio-washed Cotton</h6>
          </div>
        </li>
        <li>
          <div className="featureContent">
            <h5>Pattern</h5>
            <h6>Printed</h6>
          </div>
        </li>
        <li>
          <div className="featureContent">
            <h5>Fit</h5>
            <h6>Regular-fit</h6>
          </div>
        </li>
        <li>
          <div className="featureContent">
            <h5>Neck</h5>
            <h6>Round Neck</h6>
          </div>
        </li>
        <li>
          <div className="featureContent">
            <h5>Sleeve</h5>
            <h6>Half-sleeves</h6>
          </div>
        </li>
        <li>
          <div className="featureContent">
            <h5>Style</h5>
            <h6>Casual Wear</h6>
          </div>
        </li>
      </ul>
    </section>
  );
}

export default ProductDescription;
