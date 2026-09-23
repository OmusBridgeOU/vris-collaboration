export function CopyrightNotice({
    className = "",
}: {
    className?: string;
}) {
    return (
        <p
            className={`text-center text-[10px] leading-4 text-slate-500 ${className}`}
        >
            © 2026 VketReal in 札幌 実行委員会. All rights reserved.
        </p>
    );
}