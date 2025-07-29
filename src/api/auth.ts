// src/api/auth.ts

export const login = async (email: string, password: string): Promise<string> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Error al iniciar sesión");
  }

  const data = await res.json();
  return data.token;
};
