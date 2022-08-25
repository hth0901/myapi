import React, { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";

const TestQR = (props) => {
    const qrVal = `<hoanghieu>|<hth0901@gmail.com>`;
    const qrRef = useRef();
    const qrCode = new QRCodeStyling({
        width: 300,
        height: 300,
        image: "images/hue_logo.png",
        dotsOptions: {
          color: "#4267b2",
          type: "rounded",
        },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 20,
        },
    });

    useEffect(() => {
        qrRef.current.innerHTML = '';
        qrCode.update({
            data: `${qrVal}`,
        });
        qrCode.append(qrRef.current);
    }, []);

    const btnClickHandler = (evt) => {
        const myCanvas = qrRef.current.querySelector("canvas");
        // console.log(myCanvas.toDataURL());

        var formdata = new FormData();
        formdata.append("ToName", "hoang hieu");
        formdata.append("ToEmail", "hth0901@gmail.com");
        formdata.append("Subject", "thử tiếp nè");
        formdata.append("Body", "đây là vé vô cửa");
        formdata.append("QrString", myCanvas.toDataURL());

        var requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow",
        };

        fetch("https://localhost:44311/api/PdfDemo", requestOptions)
        .then((response) => response.blob())
        .then((result) => {
            console.log(result);
            const bytes = new Uint8Array(59);
            
            for(let i = 0; i < 59; i++) {
                bytes[i] = 32 + i;
            }
            // const url = URL.createObjectURL(new Blob([bytes.buffer], {type: 'text/plain'}));
            const url = URL.createObjectURL(result);
            window.open(url, '_blank', '');
            // console.log(url);
        })
        .catch((error) => console.log("error", error));
    }

    return (
        <div className="">
          {/* <BannerSliderHome /> */}
          <h1>Thanh toán thành công</h1>
          {/* <QRCode
            value={qrVal}
            logoImage="images/hue_logo.png"
            logoWidth={50}
            eyeRadius={[
              [10, 10, 0, 10], // top/left eye
              [10, 10, 10, 0], // top/right eye
              [10, 0, 10, 10], // bottom/left
            ]}
          /> */}
          <div ref={qrRef} />
          <button onClick={btnClickHandler}>test</button>
        </div>
    );
}

export default TestQR;