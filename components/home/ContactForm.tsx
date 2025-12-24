"use client";

import { tradeConfig } from "@/config/trade.config";
import type { FormEvent } from "react";
import { useState } from "react";

export function ContactForm() {
    const [leadStatus, setLeadStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [leadError, setLeadError] = useState<string | null>(null);
    const [leadFields, setLeadFields] = useState({
        name: "",
        phone: "",
        details: "",
    });
    const [leadFieldErrors, setLeadFieldErrors] = useState<{
        name?: string;
        phone?: string;
        details?: string;
    }>({});

    const handleLeadChange = (
        field: "name" | "phone" | "details",
        value: string,
    ) => {
        setLeadFields((prev) => ({ ...prev, [field]: value }));
        setLeadFieldErrors((prev) => ({ ...prev, [field]: undefined }));
        if (leadStatus !== "idle") {
            setLeadStatus("idle");
            setLeadError(null);
        }
    };

    const validateLead = () => {
        const nextErrors: {
            name?: string;
            phone?: string;
            details?: string;
        } = {};
        if (leadFields.name.trim().length < 2) {
            nextErrors.name = "Please enter your full name.";
        }
        const phoneDigits = leadFields.phone.replace(/\D/g, "");
        if (phoneDigits.length < 10) {
            nextErrors.phone = "Add a valid phone number with at least 10 digits.";
        }
        if (leadFields.details.trim().length < 10) {
            nextErrors.details = "Tell us a bit more about the issue or project.";
        }
        setLeadFieldErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleLeadSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLeadError(null);
        if (!validateLead()) {
            return;
        }
        setLeadStatus("submitting");
        try {
            const response = await fetch("/api/lead", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(leadFields),
            });
            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(
                    typeof data?.error === "string"
                        ? data.error
                        : "We couldn't submit your request. Please try again.",
                );
            }
            setLeadStatus("success");
            setLeadFields({ name: "", phone: "", details: "" });
        } catch (error) {
            setLeadStatus("error");
            setLeadError(
                error instanceof Error
                    ? error.message
                    : "We couldn't submit your request. Please try again.",
            );
        }
    };

    return (
        <div
            className="animate-fadeUp rounded-3xl border border-slate-800 bg-slate-950/80 p-6"
            style={{ animationDelay: "80ms" }}
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
                        {tradeConfig.whySection.aside.eyebrow}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-slate-50">
                        {tradeConfig.whySection.aside.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-300">
                        {tradeConfig.whySection.aside.description}
                    </p>
                    <p className="mt-3 text-[11px] text-slate-400">
                        For active leaks, burst pipes, or other emergencies, please call us directly at
                        {" "}
                        <a
                            href={`tel:${tradeConfig.brand.phoneE164}`}
                            className="font-semibold text-sky-300"
                        >
                            {tradeConfig.brand.phoneDisplay}
                        </a>
                        {" "}
                        for the fastest help. For non-urgent requests, use this form.
                    </p>
                </div>
                <div className="hidden rounded-2xl border border-slate-800 bg-slate-900/60 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-slate-300 sm:block">
                    {tradeConfig.whySection.aside.badge}
                </div>
            </div>

            <form
                id="contact-form"
                className="mt-5 space-y-3 text-xs"
                onSubmit={handleLeadSubmit}
            >
                <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1">
                        <label className="block text-[11px] text-slate-300">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={leadFields.name}
                            onChange={(event) =>
                                handleLeadChange("name", event.target.value)
                            }
                            className="h-9 w-full rounded-md border border-slate-700 bg-slate-950 px-3 text-xs text-slate-100 outline-none ring-sky-500/60 focus:border-sky-400 focus:ring-1"
                            placeholder="Your name"
                            aria-invalid={leadFieldErrors.name ? "true" : "false"}
                            aria-describedby={
                                leadFieldErrors.name ? "lead-name-error" : undefined
                            }
                        />
                        {leadFieldErrors.name && (
                            <p
                                id="lead-name-error"
                                className="text-[10px] text-rose-300"
                            >
                                {leadFieldErrors.name}
                            </p>
                        )}
                    </div>
                    <div className="space-y-1">
                        <label className="block text-[11px] text-slate-300">
                            Phone (preferred for fastest response)
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={leadFields.phone}
                            onChange={(event) =>
                                handleLeadChange("phone", event.target.value)
                            }
                            className="h-9 w-full rounded-md border border-slate-700 bg-slate-950 px-3 text-xs text-slate-100 outline-none ring-sky-500/60 focus:border-sky-400 focus:ring-1"
                            placeholder={tradeConfig.brand.phoneDisplay}
                            aria-invalid={leadFieldErrors.phone ? "true" : "false"}
                            aria-describedby={
                                leadFieldErrors.phone ? "lead-phone-error" : undefined
                            }
                        />
                        {leadFieldErrors.phone && (
                            <p
                                id="lead-phone-error"
                                className="text-[10px] text-rose-300"
                            >
                                {leadFieldErrors.phone}
                            </p>
                        )}
                    </div>
                </div>
                <div className="space-y-1">
                    <label className="block text-[11px] text-slate-300">
                        How can we help?
                    </label>
                    <textarea
                        rows={3}
                        name="details"
                        value={leadFields.details}
                        onChange={(event) =>
                            handleLeadChange("details", event.target.value)
                        }
                        className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 outline-none ring-sky-500/60 focus:border-sky-400 focus:ring-1"
                        placeholder={`Tell us about your ${tradeConfig.trade} issue, project, or renovation.`}
                        aria-invalid={leadFieldErrors.details ? "true" : "false"}
                        aria-describedby={
                            leadFieldErrors.details
                                ? "lead-details-error"
                                : undefined
                        }
                    />
                    {leadFieldErrors.details && (
                        <p
                            id="lead-details-error"
                            className="text-[10px] text-rose-300"
                        >
                            {leadFieldErrors.details}
                        </p>
                    )}
                </div>
                {leadStatus === "success" && (
                    <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-[11px] text-emerald-100">
                        {tradeConfig.whySection.aside.successMsg}
                    </div>
                )}
                {leadStatus === "error" && leadError && (
                    <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-[11px] text-rose-100">
                        {leadError}
                    </div>
                )}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <button
                        type="submit"
                        className="w-full rounded-full bg-sky-500 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-slate-950 shadow-md shadow-sky-500/40 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                        disabled={leadStatus === "submitting"}
                    >
                        {leadStatus === "submitting"
                            ? tradeConfig.whySection.aside.submitLoading
                            : tradeConfig.whySection.aside.submitIdle}
                    </button>
                    <p className="text-[10px] text-slate-500">
                        {tradeConfig.whySection.aside.formPrivacy}
                    </p>
                </div>
            </form>
        </div>
    );
}
