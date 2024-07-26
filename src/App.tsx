import { useState, useEffect } from "react";
import Button from "./components/button";
import { base32 } from "@scure/base";
import { sha1 } from "js-sha1";
import { Buffer } from "buffer";

export default function App() {
  const [secret, setSecret] = useState("");
  const [totp, setTotp] = useState("");

  const generateTOTP = () => {
    try {
      if (!secret) {
        alert("Please enter a secret key.");
        return;
      }
      if (secret.length < 16) {
        alert("Secret key must be at least 16 characters long.");
        return;
      }

      const key = base32.decode(secret.replace(/\s+/g, "").toUpperCase());
      const epoch = Math.round(new Date().getTime() / 1000.0);
      const time = Math.floor(epoch / 30);
      const timeHex = ("0000000000000000" + time.toString(16)).slice(-16);

      const hmac = sha1.hmac.create(key);
      hmac.update(Buffer.from(timeHex, "hex"));
      const digest = hmac.array();

      const offset = digest[digest.length - 1] & 0x0f;
      const otp =
        (((digest[offset] & 0x7f) << 24) |
          ((digest[offset + 1] & 0xff) << 16) |
          ((digest[offset + 2] & 0xff) << 8) |
          (digest[offset + 3] & 0xff)) %
        1000000;

      setTotp(otp.toString().padStart(6, "0"));
    } catch (error) {
      setSecret("");
      alert("Invalid Secret Key. Please check and try again.");
    }
  };

  const copyToClipboard = () => {
    if (totp) {
      navigator.clipboard
      .writeText(totp)
      .then(() => {
        alert("2FA Code copied to clipboard!");
      });
    }
  };

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen space-y-6 p-4 max-w-4xl mx-auto">
        <div className="flex flex-col items-center w-full h-screen space-y-6">
          <div className="flex flex-row space-x-2 w-full">
            <h1 className="text-transparent font-mono font-bold lg:text-5xl text-3xl bg-gradient-to-t from-zinc-300 from-50% via-slate-300 via-30% to-slate-700 bg-clip-text">
              2FA Generator
            </h1>
          </div>
          <div className="w-full">
            <div className="flex flex-col space-y-2">
              <label className="text-xl font-semibold font-mono text-white">
                <span className="text-red-500">*</span> 2FA Secret
              </label>
              <textarea
                className="p-3 w-full sm:w-3/4 md:w-full border border-slate-900 bg-gray-100 text-black font-mono shadow-2xl shadow-blue-500/20 focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Enter your 2FA Secret here.."
                rows={4}
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-col space-y-2">
              <label className="text-xl font-semibold font-mono text-white">
                * 2FA Code
              </label>
              <textarea
                className="p-3 w-full sm:w-3/4 md:w-full border border-slate-900 bg-gray-100 text-black font-mono shadow-2xl shadow-blue-500/20 focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Your code will be generated here.."
                rows={4}
                value={totp}
                readOnly
                onClick={copyToClipboard}
              />
            </div>
          </div>
          <div className="w-full">
            <Button type="primary" className="font-mono" onClick={generateTOTP}>
              Generate Code
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
