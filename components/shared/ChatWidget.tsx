"use client";

import { tradeConfig } from "@/config/trade.config";
import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";

export function ChatWidget() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const chatEndRef = useRef<HTMLDivElement | null>(null);

    const {
        messages,
        input,
        handleInputChange,
        handleSubmit,
        isLoading,
        append,
        setMessages,
    } = useChat({
        api: "/api/chat",
        streamProtocol: "text",
        initialMessages: [],
    });

    useEffect(() => {
        const stored = localStorage.getItem(tradeConfig.chat.storageKey);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setMessages(parsed);
                    return;
                }
            } catch {
                // fall through to seed message
            }
        }
        setMessages([
            {
                id: "welcome",
                role: "assistant",
                content: `Hello, how can ${tradeConfig.brand.shortName} ${tradeConfig.trade} help you?`,
                parts: [],
            },
        ]);
    }, [setMessages]);

    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem(tradeConfig.chat.storageKey, JSON.stringify(messages));
        }
    }, [messages]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, [messages]);

    return (
        <>
            {isChatOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-[2px] sm:items-end sm:justify-end sm:p-6"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Ask for help chat"
                    onClick={() => setIsChatOpen(false)}
                >
                    <div
                        className="flex max-h-[85vh] w-full max-w-[92vw] animate-[chatSlideIn_260ms_ease-out] flex-col overflow-hidden rounded-3xl bg-slate-950 text-slate-50 shadow-2xl sm:max-h-[80vh] sm:max-w-sm sm:animate-[chatSlideInRight_260ms_ease-out]"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="flex items-center justify-between bg-sky-500 px-5 py-4 text-slate-950">
                            <div>
                                <p className="text-sm font-semibold">
                                    Ask {tradeConfig.brand.shortName}
                                </p>
                                <p className="text-[11px] text-slate-900/80">
                                    {tradeConfig.brand.name}
                                </p>
                            </div>
                            <button
                                type="button"
                                className="rounded-full p-1 text-slate-950/80 transition hover:text-slate-950"
                                onClick={() => setIsChatOpen(false)}
                                aria-label="Close chat"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="flex-1 space-y-4 overflow-y-auto bg-slate-950 px-5 py-4">
                            <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-lg text-slate-950">
                                    {tradeConfig.brand.initials}
                                </div>
                                <div className="rounded-2xl bg-slate-900 px-4 py-3 text-sm text-slate-100">
                                    👋 Hi! I&apos;m here to help with your {tradeConfig.trade}{" "}
                                    question. Ask me anything and we&apos;ll get you sorted.
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-2">
                                {[
                                    "What should I do for a leaking faucet?",
                                    "Do I need a tank or tankless heater?",
                                    "How do I handle a burst pipe?",
                                    "I have a different question",
                                ].map((label) => (
                                    <button
                                        key={label}
                                        type="button"
                                        onClick={() =>
                                            append({ role: "user", content: label, parts: [] })
                                        }
                                        className="rounded-full border border-sky-500 px-4 py-2 text-xs font-semibold text-sky-300 transition hover:bg-slate-900"
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>

                            <a
                                href={`tel:${tradeConfig.brand.phoneE164}`}
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-500 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-950 shadow-sm transition hover:bg-sky-400"
                            >
                                Call now
                            </a>

                            <div className="max-h-64 space-y-3 overflow-y-auto pr-1 text-sm">
                                {messages.map((message) => {
                                    const text = message.parts
                                        .filter((part) => part.type === "text")
                                        .map((part) => part.text)
                                        .join("");
                                    const content =
                                        text ||
                                        ("content" in message && typeof message.content === "string"
                                            ? message.content
                                            : "");
                                    return (
                                        <div
                                            key={message.id}
                                            className={
                                                message.role === "user"
                                                    ? "ml-auto w-fit max-w-[85%] rounded-2xl bg-sky-500 px-4 py-2 text-slate-950"
                                                    : "w-fit max-w-[85%] rounded-2xl bg-slate-900 px-4 py-2 text-slate-100"
                                            }
                                        >
                                            <p className="whitespace-pre-wrap">{content}</p>
                                        </div>
                                    );
                                })}
                                <div ref={chatEndRef} />
                            </div>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="flex items-center gap-2 border-t border-slate-800 bg-slate-950 px-4 py-3"
                        >
                            <input
                                value={input}
                                onChange={handleInputChange}
                                placeholder="Type and press [enter]..."
                                className="h-11 flex-1 rounded-full border border-slate-800 bg-slate-900 px-4 text-sm text-slate-100 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-500/40"
                            />
                            <button
                                type="submit"
                                disabled={isLoading || input.trim().length === 0}
                                className="rounded-full bg-sky-500 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-950 shadow-sm transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            )}
            {!isChatOpen && (
                <a
                    href="#assistant"
                    onClick={(event) => {
                        event.preventDefault();
                        setIsChatOpen(true);
                    }}
                    className="group fixed bottom-6 right-6 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-sky-500 bg-sky-500 text-slate-950 shadow-lg shadow-sky-900/40 transition hover:bg-sky-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
                    aria-label="Ask for help"
                >
                    <span
                        className="text-[11px] font-bold uppercase tracking-[0.12em]"
                        aria-hidden="true"
                    >
                        Help
                    </span>
                    <span className="sr-only">Ask for help</span>
                    <span className="pointer-events-none absolute bottom-14 right-0 hidden whitespace-nowrap rounded-full bg-slate-950 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-100 shadow-md sm:inline-flex sm:opacity-0 sm:transition sm:group-hover:opacity-100">
                        Ask for help
                    </span>
                </a>
            )}
        </>
    );
}
