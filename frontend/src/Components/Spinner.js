import React from "react";
import { InfinitySpin } from "react-loader-spinner";

const Spinner = ({ statee }) => {
  return (
    <InfinitySpin
      visible={statee}
      width="200"
      color="#4fa94d"
      ariaLabel="infinity-spin-loading"
    />
  );
};

export default Spinner;
