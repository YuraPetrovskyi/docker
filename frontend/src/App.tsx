import { useEffect, useState } from "react";

type Employee = {
  id: string;
  full_name: string;
  role_title: string;
  email: string;
  created_at: string;
};

const API_URL = import.meta.env.VITE_API_URL as string; // ADDED

export default function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true); // ADDED
  const [error, setError] = useState<string | null>(null); // ADDED

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true); // ADDED
        setError(null); // ADDED

        const res = await fetch(`${API_URL}/employees`); // ADDED
        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`); // ADDED
        }

        const data: Employee[] = await res.json(); // ADDED
        setEmployees(data); // ADDED
      } catch (e) {
        setError(e instanceof Error ? e.message : "Unknown error"); // ADDED
      } finally {
        setLoading(false); // ADDED
      }
    };

    load();
  }, []);

  return (
    <div style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <h1>Employees</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "crimson" }}>Error: {error}</p>}

      {!loading && !error && (
        <ul style={{ lineHeight: 1.8 }}>
          {employees.map((e) => (
            <li key={e.id}>
              <strong>{e.full_name}</strong> — {e.role_title} — {e.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
