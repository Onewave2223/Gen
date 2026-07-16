"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";

export function QrCodeGeneratorRu() {
  const inputId = React.useId();
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [text, setText] = React.useState("");
  const [generated, setGenerated] = React.useState(false);
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const generate = async () => {
    const value = text.trim();
    if (!value) {
      setError("Введите текст или URL.");
      return;
    }
    setError("");
    setIsLoading(true);
    try {
      const QRCode = (await import("qrcode")).default;
      const canvas = canvasRef.current;
      if (!canvas) return;
      await QRCode.toCanvas(canvas, value, {
        width: 256,
        margin: 2,
        color: { dark: "#000000", light: "#ffffff" },
      });
      setGenerated(true);
    } catch {
      setError("Не удалось сгенерировать QR-код. Попробуйте ещё раз.");
    } finally {
      setIsLoading(false);
    }
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "qr-code.png";
    a.click();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-medium text-[var(--foreground)]">
          Текст или URL
        </label>
        <textarea
          id={inputId}
          value={text}
          onChange={(e) => { setText(e.target.value); setGenerated(false); }}
          placeholder="Введите ссылку или текст..."
          rows={3}
          className="w-full resize-none rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] p-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
        />
      </div>

      {error && <p role="alert" className="text-sm font-medium text-[var(--danger)]">{error}</p>}

      <div className="flex flex-wrap gap-3">
        <Button onClick={generate} disabled={isLoading}>
          {isLoading ? "Генерация..." : "Создать QR-код"}
        </Button>
        {generated && (
          <Button variant="secondary" onClick={download}>
            Скачать PNG
          </Button>
        )}
      </div>

      <div className={generated ? "block" : "hidden"}>
        <div className="flex justify-center rounded-[var(--radius)] border border-[var(--border)] bg-white p-4">
          <canvas ref={canvasRef} />
        </div>
        <p className="mt-2 text-center text-xs text-[var(--muted)]">
          Ваши данные не отправляются на сервер — QR-код генерируется локально в браузере.
        </p>
      </div>

      {!generated && (
        <div className="flex items-center justify-center rounded-[var(--radius)] border border-dashed border-[var(--border)] bg-[var(--surface)] p-12">
          <span className="text-sm text-[var(--muted)]">QR-код появится здесь</span>
        </div>
      )}
    </div>
  );
}

QrCodeGeneratorRu.displayName = "QrCodeGeneratorRu";
