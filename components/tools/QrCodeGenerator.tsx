"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function QrCodeGenerator() {
  const inputId = React.useId();
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [text, setText] = React.useState("");
  const [generated, setGenerated] = React.useState(false);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleGenerate = async () => {
    if (!text.trim()) {
      setError("Enter a URL or text first.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const QRCode = (await import("qrcode")).default;
      if (canvasRef.current) {
        await QRCode.toCanvas(canvasRef.current, text.trim(), {
          width: 256,
          margin: 2,
          color: { dark: "#000000", light: "#ffffff" },
        });
        setGenerated(true);
      }
    } catch {
      setError("Failed to generate QR code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  const handleClear = () => {
    setText("");
    setGenerated(false);
    setError("");
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx && canvasRef.current) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-[var(--foreground)]"
        >
          URL or text
        </label>
        <Input
          id={inputId}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="https://example.com"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleGenerate();
          }}
        />
        <p className="text-xs text-[var(--muted)]">
          Your input stays in your browser — nothing is sent to any server.
        </p>
      </div>

      {error && (
        <p role="alert" className="text-sm font-medium text-[var(--danger)]">
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <Button type="button" onClick={handleGenerate} disabled={loading}>
          {loading ? "Generating…" : "Generate QR Code"}
        </Button>
        {generated && (
          <Button type="button" variant="secondary" onClick={handleClear}>
            Clear
          </Button>
        )}
      </div>

      <div
        className={`flex flex-col items-center gap-4 ${!generated ? "hidden" : ""}`}
      >
        <canvas
          ref={canvasRef}
          width={256}
          height={256}
          className="rounded-[var(--radius)] border border-[var(--border)] bg-white"
          aria-label="Generated QR code"
        />
        {generated && (
          <Button type="button" variant="secondary" onClick={handleDownload}>
            Download PNG
          </Button>
        )}
      </div>

      {!generated && (
        <div className="flex h-32 items-center justify-center rounded-[var(--radius)] border border-dashed border-[var(--border)]">
          <span className="text-sm text-[var(--muted)]">
            Your QR code will appear here
          </span>
        </div>
      )}
    </div>
  );
}

QrCodeGenerator.displayName = "QrCodeGenerator";
