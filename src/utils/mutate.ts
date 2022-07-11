export const mutate = async (url: string, data: any) => {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw await res.json();
  }

  return await res.json();
};
