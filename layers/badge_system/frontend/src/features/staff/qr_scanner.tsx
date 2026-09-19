import { useEffect, useRef, useState } from "react";
import { normalize_order_lookup } from "./order_lookup";

export function QrScanner({
  on_read,
  on_close,
}: {
  on_read: (value: string) => void;
  on_close: () => void;
}) {
  const video_ref = useRef<HTMLVideoElement>(null);
  const [message, set_message] = useState("カメラの使用を許可してください。");
  useEffect(() => {
    let stopped = false;
    let stream: MediaStream | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const stop = () => {
      stopped = true;
      clearTimeout(timer);
      stream?.getTracks().forEach((track) => track.stop());
      if (video_ref.current) video_ref.current.srcObject = null;
    };
    const leave = () => {
      stop();
      on_close();
    };
    const visibility = () => {
      if (document.hidden) leave();
    };
    document.addEventListener("visibilitychange", visibility);
    window.addEventListener("pagehide", leave);
    async function start() {
      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          throw new Error(
            "このブラウザではカメラを使用できません。HTTPSで開くか、受付番号を入力してください。",
          );
        }
        const { default: decode } = await import("jsqr");
        if (stopped) return;
        stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: { facingMode: { ideal: "environment" } },
        });
        if (stopped) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }
        const video = video_ref.current;
        if (!video) {
          stop();
          return;
        }
        video.srcObject = stream;
        await video.play();
        if (stopped) return;
        set_message("注文QRをカメラに映してください。");
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d", { willReadFrequently: true });
        if (!context)
          throw new Error("QRを読み取れません。受付番号を入力してください。");
        const scan = () => {
          if (stopped) return;
          try {
            if (
              video.readyState >= 2 &&
              video.videoWidth &&
              video.videoHeight
            ) {
              const scale = Math.min(
                1,
                640 / Math.max(video.videoWidth, video.videoHeight),
              );
              canvas.width = Math.round(video.videoWidth * scale);
              canvas.height = Math.round(video.videoHeight * scale);
              context.drawImage(video, 0, 0, canvas.width, canvas.height);
              const frame = context.getImageData(
                0,
                0,
                canvas.width,
                canvas.height,
              );
              const code = decode(frame.data, frame.width, frame.height);
              if (code) {
                let value: string;
                try {
                  value = normalize_order_lookup(code.data);
                } catch {
                  set_message("5桁の受付番号が入った注文QRを映してください。");
                  timer = setTimeout(scan, 250);
                  return;
                }
                stop();
                on_read(value);
                return;
              }
            }
            timer = setTimeout(scan, 250);
          } catch {
            stop();
            set_message(
              "QRを読み取れません。カメラを閉じて受付番号を入力してください。",
            );
          }
        };
        scan();
      } catch (error) {
        if (stopped) return;
        stop();
        set_message(
          error instanceof Error && error.name !== "NotAllowedError"
            ? error.message
            : "カメラが許可されていません。受付番号を入力してください。",
        );
      }
    }
    void start();
    return () => {
      stop();
      document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener("pagehide", leave);
    };
  }, [on_close, on_read]);
  return (
    <section
      className="grid gap-3 rounded-md border border-slate-300 bg-white p-3"
      aria-label="注文QRカメラ"
    >
      <video
        ref={video_ref}
        autoPlay
        muted
        playsInline
        className="aspect-square w-full rounded-md bg-slate-900 object-cover"
      />
      <p role="status" className="text-sm">
        {message}
      </p>
      <button
        type="button"
        className="min-h-12 rounded-md border border-slate-300 px-3 font-semibold"
        onClick={on_close}
      >
        カメラを閉じる
      </button>
    </section>
  );
}
