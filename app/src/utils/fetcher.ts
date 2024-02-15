export const fetcher = (endpoint: string) =>
  fetch(`${import.meta.env.VITE_API_ENDPOINT as string}${endpoint}`, {
    method: "GET"
  }).then((res) => res.json())
