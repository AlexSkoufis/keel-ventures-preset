"use client";

import { useEffect, useRef, useState } from "react";
import Arrow from "./Arrow";
import styles from "./ContactForm.module.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm({ form, email }) {
  const [topic, setTopic] = useState(form.topics[0].value);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const formRef = useRef(null);

  // Any "[data-topic]" link on the page pre-selects the matching topic.
  useEffect(() => {
    const onClick = (e) => {
      const link = e.target.closest("[data-topic]");
      if (link && form.topics.some((t) => t.value === link.dataset.topic)) {
        setTopic(link.dataset.topic);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [form.topics]);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(formRef.current);
    const values = Object.fromEntries(["name", "email", "company", "message"].map((k) => [k, String(data.get(k) || "").trim()]));

    const next = {};
    if (!values.name) next.name = form.errors.name;
    if (!EMAIL_RE.test(values.email)) next.email = form.errors.email;
    if (!values.message) next.message = form.errors.message;
    setErrors(next);

    const firstInvalid = Object.keys(next)[0];
    if (firstInvalid) {
      formRef.current.elements[firstInvalid]?.focus();
      return;
    }

    const topicLabel = form.topics.find((t) => t.value === topic)?.label;
    const subject = `${form.subjectPrefix}: ${topicLabel}${values.company ? `, ${values.company}` : ""}`;
    const body = [
      values.message,
      "",
      `${form.fields.name.label}: ${values.name}`,
      `${form.fields.email.label}: ${values.email}`,
      values.company && `${form.fields.company.label}: ${values.company}`,
      `${form.topicLabel} ${topicLabel}`,
    ]
      .filter((line) => line !== false && line !== "")
      .join("\n");

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const field = (name, props = {}) => {
    const f = form.fields[name];
    const Tag = props.multiline ? "textarea" : "input";
    const id = `contact-${name}`;
    return (
      <div className={`${styles.field} ${props.wide ? styles.wide : ""}`}>
        <label htmlFor={id}>{f.label}</label>
        <Tag
          id={id}
          name={name}
          type={props.type || (props.multiline ? undefined : "text")}
          placeholder={f.placeholder}
          autoComplete={props.autoComplete}
          rows={props.multiline ? 4 : undefined}
          required={props.required}
          aria-invalid={errors[name] ? true : undefined}
          aria-describedby={errors[name] ? `${id}-error` : undefined}
        />
        {errors[name] && (
          <p id={`${id}-error`} className={styles.error}>
            {errors[name]}
          </p>
        )}
      </div>
    );
  };

  return (
    <form
      ref={formRef}
      className={styles.form}
      action={`mailto:${email}`}
      method="post"
      encType="text/plain"
      onSubmit={onSubmit}
      noValidate
    >
      <fieldset className={styles.topics}>
        <legend>{form.topicLabel}</legend>
        <div className={styles.chips}>
          {form.topics.map((t) => (
            <label key={t.value} className={styles.chip}>
              <input
                type="radio"
                name="topic"
                value={t.value}
                checked={topic === t.value}
                onChange={() => setTopic(t.value)}
              />
              <span>{t.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className={styles.fields}>
        {field("name", { autoComplete: "name", required: true })}
        {field("email", { type: "email", autoComplete: "email", required: true })}
        {field("company", { autoComplete: "organization", wide: true })}
        {field("message", { multiline: true, wide: true, required: true })}
      </div>

      <div className={styles.actions}>
        <button type="submit" className="btn" data-magnetic>
          {form.submit}
          <Arrow />
        </button>
        <p className={styles.note}>{form.note}</p>
      </div>

      <p className={styles.status} role="status" aria-live="polite">
        {sent && (
          <>
            {form.success} <a href={`mailto:${email}`}>{email}</a>.
          </>
        )}
      </p>
    </form>
  );
}
