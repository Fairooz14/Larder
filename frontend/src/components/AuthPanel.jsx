import React, { useState } from "react";
import { motion } from "framer-motion";
import { api } from "../api.js";

export default function AuthPanel({ onAuthed }) {
  const [tab, setTab] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError("");
    if (tab === "register" && password !== confirmPw) {
      setError("Those two passwords don't match.");
      return;
    }
    setBusy(true);
    try {
      const fn = tab === "login" ? api.login : api.register;
      const data = await fn(username, password);
      localStorage.setItem("lr_token", data.token);
      localStorage.setItem("lr_username", data.user.username);
      onAuthed(data.user);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    }
    setBusy(false);
  }

  return (
    <section id="auth" className="lr-auth">
      <motion.div
        className="lr-auth-copy"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="lr-eyebrow">Your pantry, sorted</p>
        <h2>
          Everything you
          <br />
          <em>already own</em>
          <br />
          is a start.
        </h2>
        <p className="lr-auth-desc">
          Keep a running list of what's in your kitchen. Larder matches it
          against real recipes and tells you exactly what you're missing,
          nothing more.
        </p>
      </motion.div>

      <motion.div
        className="lr-auth-card"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="lr-tabswitch">
          <button type="button" className={tab === "login" ? "active" : ""} onClick={() => { setTab("login"); setError(""); }}>
            Sign in
          </button>
          <button type="button" className={tab === "register" ? "active" : ""} onClick={() => { setTab("register"); setError(""); }}>
            Create account
          </button>
        </div>

        {error && <div className="lr-error">{error}</div>}

        <form onSubmit={submit}>
          <div className="lr-field">
            <label htmlFor="lr-username">Username</label>
            <input id="lr-username" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" required />
          </div>
          <div className="lr-field">
            <label htmlFor="lr-password">Password</label>
            <input
              id="lr-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={tab === "login" ? "current-password" : "new-password"}
              required
            />
          </div>
          {tab === "register" && (
            <div className="lr-field">
              <label htmlFor="lr-confirm">Confirm password</label>
              <input id="lr-confirm" type="password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} autoComplete="new-password" required />
            </div>
          )}
          <button type="submit" className="lr-cta lr-cta-block" disabled={busy}>
            {busy ? "one moment…" : tab === "login" ? "Sign in" : "Create account"}
          </button>
        </form>
      </motion.div>
    </section>
  );
}
