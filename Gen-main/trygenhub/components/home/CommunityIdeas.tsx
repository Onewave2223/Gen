"use client";

import * as React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { cn } from "@/lib/utils";

interface FeatureCardCopy {
  emoji: string;
  title: string;
  description: string;
}

interface CommunityIdeasCopy {
  title: string;
  subtitleLines: readonly string[];
  note: string;
  cards: readonly FeatureCardCopy[];
  nameLabel: string;
  emailLabel: string;
  suggestionLabel: string;
  suggestionPlaceholder: string;
  optional: string;
  submit: string;
  submitting: string;
  successTitle: string;
  successBody: string;
  sendAnother: string;
  errors: Record<
    "suggestion_required" | "suggestion_too_long" | "email_invalid" | "name_too_long" | "rate_limited" | "duplicate" | "generic",
    string
  >;
}

const COPY: Record<"en" | "ru", CommunityIdeasCopy> = {
  en: {
    title: "💡 Help Shape TryGenHub",
    subtitleLines: [
      "Love using TryGenHub?",
      "We're constantly adding new AI generators and features.",
      "Tell us what you'd love to see next. The best community ideas may become part of the website.",
    ],
    note: "❤️ Built together with our community.",
    cards: [
      {
        emoji: "💡",
        title: "New AI Generator",
        description: "Suggest a brand-new AI generator.",
      },
      {
        emoji: "⚡",
        title: "Improve Existing Tools",
        description: "Help us make generators even better.",
      },
      {
        emoji: "🚀",
        title: "Build the Future Together",
        description: "Your ideas help shape TryGenHub.",
      },
    ],
    nameLabel: "Name",
    emailLabel: "Email",
    suggestionLabel: "Suggestion",
    suggestionPlaceholder: "Describe your idea...",
    optional: "optional",
    submit: "Send Suggestion",
    submitting: "Sending...",
    successTitle: "🎉 Thank you!",
    successBody: "Your idea has been received and may be considered in a future update.",
    sendAnother: "Send another idea",
    errors: {
      suggestion_required: "Please describe your idea before sending.",
      suggestion_too_long: "That's a lot of idea! Please shorten it a little.",
      email_invalid: "That email address doesn't look right.",
      name_too_long: "Please shorten your name a little.",
      rate_limited: "You've sent a few ideas already — please try again a bit later.",
      duplicate: "Looks like you already sent this idea. Thanks again!",
      generic: "Something went wrong. Please try again.",
    },
  },
  ru: {
    title: "💡 Помогите развивать TryGenHub",
    subtitleLines: [
      "Вам нравится TryGenHub?",
      "Расскажите, какой AI-генератор, функцию или улучшение вы хотели бы увидеть.",
      "Мы внимательно читаем каждое предложение, а лучшие идеи могут появиться на сайте.",
    ],
    note: "❤️ Лучшие идеи приходят от наших пользователей.",
    cards: [
      {
        emoji: "💡",
        title: "Новый AI-генератор",
        description: "Предложите новый генератор.",
      },
      {
        emoji: "⚡",
        title: "Улучшение инструментов",
        description: "Помогите сделать существующие генераторы лучше.",
      },
      {
        emoji: "🚀",
        title: "Создаём будущее вместе",
        description: "Ваши идеи помогают развивать TryGenHub.",
      },
    ],
    nameLabel: "Имя",
    emailLabel: "Email",
    suggestionLabel: "Предложение",
    suggestionPlaceholder: "Опишите вашу идею...",
    optional: "необязательно",
    submit: "Отправить предложение",
    submitting: "Отправка...",
    successTitle: "🎉 Спасибо!",
    successBody: "Ваше предложение успешно отправлено.",
    sendAnother: "Отправить ещё одну идею",
    errors: {
      suggestion_required: "Пожалуйста, опишите вашу идею перед отправкой.",
      suggestion_too_long: "Слишком длинное описание — сократите его немного.",
      email_invalid: "Похоже, email указан неверно.",
      name_too_long: "Пожалуйста, сократите имя.",
      rate_limited: "Вы уже отправили несколько идей — попробуйте немного позже.",
      duplicate: "Похоже, вы уже отправляли эту идею. Спасибо ещё раз!",
      generic: "Что-то пошло не так. Попробуйте ещё раз.",
    },
  },
};

type SubmitStatus = "idle" | "loading" | "success" | "error";

export interface CommunityIdeasProps {
  locale?: "en" | "ru";
}

export function CommunityIdeas({ locale = "en" }: CommunityIdeasProps = {}) {
  const copy = COPY[locale];

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [suggestion, setSuggestion] = React.useState("");
  const [honeypot, setHoneypot] = React.useState("");
  const [status, setStatus] = React.useState<SubmitStatus>("idle");
  const [errorKey, setErrorKey] = React.useState<keyof CommunityIdeasCopy["errors"] | null>(null);
  const [fieldError, setFieldError] = React.useState<"suggestion" | "email" | null>(null);

  // Timestamp the form became interactive — used for a lightweight
  // bot check on the server (real visitors take at least a moment).
  const renderedAtRef = React.useRef<number>(Date.now());

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedSuggestion = suggestion.trim();
    if (trimmedSuggestion.length < 5) {
      setStatus("error");
      setErrorKey("suggestion_required");
      setFieldError("suggestion");
      return;
    }

    setStatus("loading");
    setErrorKey(null);
    setFieldError(null);

    try {
      const response = await fetch("/api/community-ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          suggestion: trimmedSuggestion,
          name: name.trim() || undefined,
          email: email.trim() || undefined,
          locale,
          honeypot,
          renderedAt: renderedAtRef.current,
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as
          | { ok: false; error?: string }
          | null;
        const key = (data?.error ?? "generic") as keyof CommunityIdeasCopy["errors"];
        setStatus("error");
        setErrorKey(key in copy.errors ? key : "generic");
        setFieldError(
          key === "email_invalid" ? "email" : key === "suggestion_too_long" ? "suggestion" : null,
        );
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setSuggestion("");
    } catch {
      setStatus("error");
      setErrorKey("generic");
    }
  };

  const resetForm = () => {
    renderedAtRef.current = Date.now();
    setStatus("idle");
    setErrorKey(null);
    setFieldError(null);
  };

  return (
    <section
      aria-labelledby="community-ideas-heading"
      className="relative mx-auto max-w-6xl overflow-hidden px-4 py-16 sm:px-6"
    >
      <div
        aria-hidden="true"
        className="brand-orb brand-float pointer-events-none -left-16 top-0 h-40 w-40 sm:h-64 sm:w-64"
      />
      <div
        aria-hidden="true"
        className="brand-orb brand-orb-accent brand-float pointer-events-none -right-10 bottom-0 h-32 w-32 sm:h-56 sm:w-56"
        style={{ animationDelay: "-2.5s" }}
      />

      <div className="relative flex flex-col gap-2 text-center">
        <h2
          id="community-ideas-heading"
          className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl"
        >
          {copy.title}
        </h2>
        <div className="mx-auto flex max-w-xl flex-col gap-1">
          {copy.subtitleLines.map((line, i) => (
            <p
              key={i}
              className={cn(
                "text-sm",
                i === 0
                  ? "font-medium text-[var(--foreground)]"
                  : "text-[var(--muted)]",
              )}
            >
              {line}
            </p>
          ))}
        </div>
        <p className="mt-1 text-xs font-medium text-[var(--primary)]">{copy.note}</p>
      </div>

      <div className="relative mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {copy.cards.map((card, index) => (
          <ScrollReveal key={card.title} index={index}>
            <Card
              elevated
              padding="md"
              className="mystic-glow flex h-full flex-col items-center gap-2.5 text-center transition-transform duration-200 hover:-translate-y-0.5"
            >
              <span
                aria-hidden="true"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary-soft)] text-2xl"
              >
                {card.emoji}
              </span>
              <span className="text-sm font-semibold text-[var(--foreground)]">
                {card.title}
              </span>
              <span className="text-xs leading-relaxed text-[var(--muted)]">
                {card.description}
              </span>
            </Card>
          </ScrollReveal>
        ))}
      </div>

      <div className="relative mx-auto mt-10 max-w-xl">
        <Card
          elevated
          padding="lg"
          className="relative overflow-hidden shadow-[var(--shadow-glow)]"
        >
          {status === "success" ? (
            <div className="motion-result-reveal flex flex-col items-center gap-3 py-4 text-center">
              <span className="motion-success-pulse flex h-14 w-14 items-center justify-center rounded-full bg-[var(--primary-soft)] text-3xl">
                🎉
              </span>
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                {copy.successTitle}
              </h3>
              <p className="max-w-sm text-sm text-[var(--muted)]">{copy.successBody}</p>
              <Button variant="secondary" size="sm" className="mt-2" onClick={resetForm}>
                {copy.sendAnother}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
              {/* Honeypot — hidden from real visitors via CSS, not just visually offscreen,
                  so it doesn't get filled by autofill either. Bots that fill every field
                  trip this and are rejected server-side. */}
              <div className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
                <label htmlFor="community-idea-website">Website</label>
                <input
                  id="community-idea-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="community-idea-name"
                    className="text-sm font-medium text-[var(--foreground)]"
                  >
                    {copy.nameLabel}{" "}
                    <span className="font-normal text-[var(--muted)]">({copy.optional})</span>
                  </label>
                  <Input
                    id="community-idea-name"
                    name="name"
                    type="text"
                    maxLength={100}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={status === "loading"}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="community-idea-email"
                    className="text-sm font-medium text-[var(--foreground)]"
                  >
                    {copy.emailLabel}{" "}
                    <span className="font-normal text-[var(--muted)]">({copy.optional})</span>
                  </label>
                  <Input
                    id="community-idea-email"
                    name="email"
                    type="email"
                    maxLength={200}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "loading"}
                    error={fieldError === "email"}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="community-idea-suggestion"
                  className="text-sm font-medium text-[var(--foreground)]"
                >
                  {copy.suggestionLabel}
                </label>
                <Textarea
                  id="community-idea-suggestion"
                  name="suggestion"
                  required
                  rows={4}
                  maxLength={2000}
                  placeholder={copy.suggestionPlaceholder}
                  value={suggestion}
                  onChange={(e) => setSuggestion(e.target.value)}
                  disabled={status === "loading"}
                  error={fieldError === "suggestion"}
                />
              </div>

              {status === "error" && errorKey && (
                <p role="alert" className="text-sm text-[var(--danger)]">
                  {copy.errors[errorKey]}
                </p>
              )}

              <Button type="submit" size="lg" loading={status === "loading"} className="mt-1">
                {status === "loading" ? copy.submitting : copy.submit}
              </Button>
            </form>
          )}
        </Card>
      </div>
    </section>
  );
}

CommunityIdeas.displayName = "CommunityIdeas";
