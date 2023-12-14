import * as React from "react";

export const AfterDashboard: React.FC = () => {
  return (
    <div className="border-t border-custom-elevation-100 pt-custom-base space-y-custom-base">
      <h4 className="mt-0 mb-0">Test Config</h4>
      <p className="mt-0 mb-0">
        The /test directory is used for creating custom configurations and data
        seeding for developing features, writing e2e and integration testing.
      </p>
    </div>
  );
};
