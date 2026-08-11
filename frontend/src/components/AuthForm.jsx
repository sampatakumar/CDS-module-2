import { useState } from "react";

export default function AuthForm({ onSubmit, submitLabel, error }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ name, email, password });
  };

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2>{submitLabel}</h2>
      {submitLabel === "Register" && (
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your name"
          />
        </label>
      )}
      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter your password"
        />
      </label>
      {error && <div className="form-error">{error}</div>}
      <button type="submit" className="button">
        {submitLabel}
      </button>
    </form>
  );
}
