import React from "react";

// This component creates a visual placeholder without relying on external services
const PlaceholderImage = ({
  width,
  height,
  text,
  bgColor = "#3b82f6",
  textColor = "#ffffff",
}) => {
  const style = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
    backgroundColor: bgColor,
    color: textColor,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "sans-serif",
    fontSize: "1rem",
    borderRadius: "0.5rem",
    overflow: "hidden",
  };

  return <div style={style}>{text || `${width}×${height}`}</div>;
};

// Company logo placeholders
export const AwsLogo = () => (
  <div
    style={{
      width: "80px",
      height: "80px",
      backgroundColor: "#FF9900",
      borderRadius: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold",
      color: "white",
      fontSize: "1.2rem",
    }}
  >
    AWS
  </div>
);

export const AzureLogo = () => (
  <div
    style={{
      width: "80px",
      height: "80px",
      backgroundColor: "#0078D4",
      borderRadius: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold",
      color: "white",
      fontSize: "1.2rem",
    }}
  >
    Azure
  </div>
);

export const GcpLogo = () => (
  <div
    style={{
      width: "80px",
      height: "80px",
      backgroundColor: "#4285F4",
      borderRadius: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold",
      color: "white",
      fontSize: "1.2rem",
    }}
  >
    GCP
  </div>
);

// User avatar placeholder
export const UserAvatar = ({ name, size = 48 }) => {
  // Get initials from name
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // Generate a consistent color based on the name
  const stringToColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += ("00" + value.toString(16)).substr(-2);
    }

    return color;
  };

  const bgColor = stringToColor(name);

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: bgColor,
        color: "white",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: `${size / 2.5}px`,
        fontWeight: "bold",
      }}
    >
      {initials}
    </div>
  );
};

// Dashboard preview image
export const DashboardPreview = () => (
  <div
    style={{
      width: "100%",
      height: "400px",
      backgroundColor: "#1e293b",
      borderRadius: "8px",
      padding: "16px",
      color: "white",
      overflow: "hidden",
      boxShadow:
        "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
    }}
  >
    {/* Header */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "16px",
      }}
    >
      <div style={{ fontWeight: "bold", fontSize: "24px" }}>
        TerraManager Dashboard
      </div>
      <div style={{ display: "flex", gap: "12px" }}>
        <div
          style={{
            width: "32px",
            height: "32px",
            backgroundColor: "rgba(255,255,255,0.1)",
            borderRadius: "6px",
          }}
        ></div>
        <div
          style={{
            width: "32px",
            height: "32px",
            backgroundColor: "rgba(255,255,255,0.1)",
            borderRadius: "6px",
          }}
        ></div>
      </div>
    </div>

    {/* Content */}
    <div style={{ display: "flex", gap: "16px", height: "calc(100% - 48px)" }}>
      {/* Left sidebar */}
      <div
        style={{
          width: "200px",
          backgroundColor: "rgba(0,0,0,0.2)",
          borderRadius: "8px",
          padding: "12px",
        }}
      >
        <div
          style={{
            padding: "8px",
            backgroundColor: "rgba(59, 130, 246, 0.3)",
            borderRadius: "4px",
            marginBottom: "8px",
          }}
        >
          Dashboard
        </div>
        <div style={{ padding: "8px", marginBottom: "8px" }}>Resources</div>
        <div style={{ padding: "8px", marginBottom: "8px" }}>Create</div>
        <div style={{ padding: "8px", marginBottom: "8px" }}>Settings</div>
      </div>

      {/* Main content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {/* Stats row */}
        <div style={{ display: "flex", gap: "16px" }}>
          <div
            style={{
              flex: 1,
              backgroundColor: "rgba(59, 130, 246, 0.2)",
              borderRadius: "8px",
              padding: "12px",
            }}
          >
            <div style={{ fontSize: "12px", opacity: 0.7 }}>VPC</div>
            <div style={{ fontSize: "24px", fontWeight: "bold" }}>1</div>
          </div>
          <div
            style={{
              flex: 1,
              backgroundColor: "rgba(16, 185, 129, 0.2)",
              borderRadius: "8px",
              padding: "12px",
            }}
          >
            <div style={{ fontSize: "12px", opacity: 0.7 }}>EC2</div>
            <div style={{ fontSize: "24px", fontWeight: "bold" }}>2</div>
          </div>
          <div
            style={{
              flex: 1,
              backgroundColor: "rgba(249, 115, 22, 0.2)",
              borderRadius: "8px",
              padding: "12px",
            }}
          >
            <div style={{ fontSize: "12px", opacity: 0.7 }}>RDS</div>
            <div style={{ fontSize: "24px", fontWeight: "bold" }}>1</div>
          </div>
          <div
            style={{
              flex: 1,
              backgroundColor: "rgba(124, 58, 237, 0.2)",
              borderRadius: "8px",
              padding: "12px",
            }}
          >
            <div style={{ fontSize: "12px", opacity: 0.7 }}>Total Cost</div>
            <div style={{ fontSize: "24px", fontWeight: "bold" }}>$95.60</div>
          </div>
        </div>

        {/* Resources table */}
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(255,255,255,0.05)",
            borderRadius: "8px",
            padding: "12px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "12px",
            }}
          >
            <div style={{ fontWeight: "bold" }}>Resources</div>
            <div
              style={{
                padding: "4px 8px",
                backgroundColor: "#3b82f6",
                borderRadius: "4px",
                fontSize: "12px",
              }}
            >
              + Create
            </div>
          </div>

          <div
            style={{
              width: "100%",
              height: "1px",
              backgroundColor: "rgba(255,255,255,0.1)",
              marginBottom: "8px",
            }}
          ></div>

          <div
            style={{
              display: "flex",
              gap: "16px",
              fontSize: "12px",
              opacity: 0.7,
              padding: "8px 0",
            }}
          >
            <div style={{ width: "30%" }}>Name</div>
            <div style={{ width: "15%" }}>Type</div>
            <div style={{ width: "15%" }}>Status</div>
            <div style={{ width: "20%" }}>Created</div>
            <div style={{ width: "20%" }}>Actions</div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "16px",
              padding: "8px 0",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div style={{ width: "30%" }}>production-vpc</div>
            <div style={{ width: "15%" }}>VPC</div>
            <div style={{ width: "15%" }}>
              <span
                style={{
                  backgroundColor: "rgba(16, 185, 129, 0.2)",
                  color: "#10b981",
                  padding: "2px 6px",
                  borderRadius: "9999px",
                  fontSize: "12px",
                }}
              >
                active
              </span>
            </div>
            <div style={{ width: "20%", fontSize: "14px", opacity: 0.7 }}>
              2025-03-10
            </div>
            <div style={{ width: "20%", display: "flex", gap: "8px" }}>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: "4px",
                }}
              ></div>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: "4px",
                }}
              ></div>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: "4px",
                }}
              ></div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "16px",
              padding: "8px 0",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div style={{ width: "30%" }}>app-server-1</div>
            <div style={{ width: "15%" }}>EC2</div>
            <div style={{ width: "15%" }}>
              <span
                style={{
                  backgroundColor: "rgba(16, 185, 129, 0.2)",
                  color: "#10b981",
                  padding: "2px 6px",
                  borderRadius: "9999px",
                  fontSize: "12px",
                }}
              >
                active
              </span>
            </div>
            <div style={{ width: "20%", fontSize: "14px", opacity: 0.7 }}>
              2025-03-12
            </div>
            <div style={{ width: "20%", display: "flex", gap: "8px" }}>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: "4px",
                }}
              ></div>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: "4px",
                }}
              ></div>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: "4px",
                }}
              ></div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "16px", padding: "8px 0" }}>
            <div style={{ width: "30%" }}>customer-db</div>
            <div style={{ width: "15%" }}>RDS</div>
            <div style={{ width: "15%" }}>
              <span
                style={{
                  backgroundColor: "rgba(16, 185, 129, 0.2)",
                  color: "#10b981",
                  padding: "2px 6px",
                  borderRadius: "9999px",
                  fontSize: "12px",
                }}
              >
                active
              </span>
            </div>
            <div style={{ width: "20%", fontSize: "14px", opacity: 0.7 }}>
              2025-03-14
            </div>
            <div style={{ width: "20%", display: "flex", gap: "8px" }}>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: "4px",
                }}
              ></div>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: "4px",
                }}
              ></div>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: "4px",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PlaceholderImage;
