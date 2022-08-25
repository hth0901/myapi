import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const qrcodeRegionId = "html5qr-code-full-region";

const Html5QrcodePlugin = (props) => {
  useEffect(() => {
    const createConfig = (props) => {
      const config = {};
      if (props.fps) {
        config.fps = props.fps;
      }
      if (props.qrbox) {
        config.qrbox = props.qrbox;
      }
      if (props.aspectRatio) {
        config.aspectRatio = props.aspectRatio;
      }
      if (!props.disableFlip) {
        config.disableFlip = props.disableFlip;
      }

      return config;
    };

    const config = createConfig(props);
    const verbose = props.verbose === true;

    if (!props.qrCodeSuccessCallback) {
      throw "required callback";
    }

    const html5QrcodeScanner = new Html5QrcodeScanner(
      qrcodeRegionId,
      config,
      verbose
    );
    html5QrcodeScanner.render(
      props.qrCodeSuccessCallback,
      props.qrCodeErrorCallback
    );

    return () => {
      html5QrcodeScanner.clear().catch((error) => {
        console.log("dckmdckm");
      });
    };
  });

  return <div id={qrcodeRegionId}></div>;
};

export default Html5QrcodePlugin;
