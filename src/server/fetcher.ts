export const fetcher = async (url: string, mutate?: boolean, data?: any) => {
  if (mutate) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (!res.ok) throw await res.json();
    return await res.json();
  }

  const res = await fetch(url);

  if (!res.ok) throw await res.json();
  return await res.json();
};
