export const otpEmailTemplate = (otp) => {
  return `
  <div style="
    font-family: Arial, sans-serif;
    background-color: #f6f9fc;
    padding: 40px;
  ">
    <div style="
      max-width: 480px;
      margin: auto;
      background: #ffffff;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      text-align: center;
    ">

      <h2 style="color:#333;">Email Verification</h2>

      <p style="color:#555; font-size:15px;">
        Use the OTP below to verify your email address.
      </p>

      <div style="
        font-size: 28px;
        letter-spacing: 6px;
        font-weight: bold;
        color: #2d89ef;
        margin: 25px 0;
        padding: 15px;
        background: #f0f6ff;
        border-radius: 8px;
      ">
        ${otp}
      </div>

      <p style="color:#777; font-size:13px;">
        This OTP will expire in <b>5 minutes</b>. Do not share it with anyone.
      </p>

      <hr style="margin:20px 0; border:none; border-top:1px solid #eee;" />

      <p style="font-size:12px; color:#999;">
        If you didn’t request this, you can safely ignore this email.
      </p>

    </div>
  </div>
  `;
};